import * as SQLite from 'expo-sqlite';

// Compatibility wrapper: newer versions of `expo-sqlite` expose
// `openDatabaseSync` / `openDatabaseAsync` instead of the legacy
// `openDatabase` function. The rest of the app uses the classic
// `db.transaction(tx => tx.executeSql(...))` API, so we provide a
// small adapter that maps the modern API to the legacy surface.

const createCompatDb = (nativeDb) => {
    return {
        // transaction(fn)
        transaction: (fn, errorCallback, successCallback) => {
            const tx = {
                executeSql: (sql, params = [], successCb, errorCb) => {
                    try {
                        const isSelect = /^\s*(SELECT|PRAGMA)\b/i.test(sql);
                        if (isSelect) {
                            // getAllSync/getAllAsync -> return array of rows
                            if (typeof nativeDb.getAllSync === 'function') {
                                const rows = nativeDb.getAllSync(sql, params);
                                const result = { rows: { _array: rows } };
                                successCb && successCb(tx, result);
                                return result;
                            }
                            if (typeof nativeDb.getAllAsync === 'function') {
                                return nativeDb.getAllAsync(sql, params).then((rows) => {
                                    const result = { rows: { _array: rows } };
                                    successCb && successCb(tx, result);
                                    return result;
                                }).catch((err) => {
                                    errorCb && errorCb(tx, err);
                                });
                            }
                        } else {
                            // Non-select queries
                            if (typeof nativeDb.runSync === 'function') {
                                const res = nativeDb.runSync(sql, params);
                                successCb && successCb(tx, res);
                                return res;
                            }
                            if (typeof nativeDb.runAsync === 'function') {
                                return nativeDb.runAsync(sql, params).then((res) => {
                                    successCb && successCb(tx, res);
                                    return res;
                                }).catch((err) => {
                                    errorCb && errorCb(tx, err);
                                });
                            }
                        }
                        // If none of the above matched, throw
                        throw new Error('No compatible sqlite method found on native DB');
                    } catch (err) {
                        errorCb && errorCb(tx, err);
                    }
                }
            };

            try {
                const maybe = fn(tx);
                // If the transaction function returned a Promise, handle it
                if (maybe && typeof maybe.then === 'function') {
                    maybe.then(() => successCallback && successCallback()).catch((e) => errorCallback && errorCallback(e));
                } else {
                    successCallback && successCallback();
                }
            } catch (e) {
                errorCallback && errorCallback(e);
            }
        }
    };
};

let db;
if (typeof SQLite.openDatabase === 'function') {
    db = SQLite.openDatabase('singbridge.db');
} else if (typeof SQLite.openDatabaseSync === 'function') {
    const nativeDb = SQLite.openDatabaseSync('singbridge.db');
    db = createCompatDb(nativeDb);
} else if (typeof SQLite.openDatabaseAsync === 'function') {
    // Fallback to async open (create an adapter using async/await)
    // We create a synchronous-looking wrapper that queues operations until the DB opens.
    let ready = false;
    let nativeDbRef = null;
    const queue = [];
    SQLite.openDatabaseAsync('singbridge.db').then((nativeDb) => {
        nativeDbRef = nativeDb;
        ready = true;
        // process queued transactions
        for (const {fn, onErr, onOk} of queue) {
            try { fn(createCompatDb(nativeDb)); onOk && onOk(); } catch(e) { onErr && onErr(e); }
        }
    }).catch((e) => {
        console.error('Failed to open DB async', e);
    });

    db = {
        transaction: (fn, errorCb, successCb) => {
            if (ready) {
                try {
                    fn(createCompatDb(nativeDbRef));
                    successCb && successCb();
                } catch (e) {
                    errorCb && errorCb(e);
                }
            } else {
                queue.push({fn, onErr: errorCb, onOk: successCb});
            }
        }
    };
} else {
    throw new Error('No sqlite openDatabase function available');
}

const executeSql = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    sql,
                    params,
                    (_tx, result) => resolve(result),
                    (_tx, err) => reject(err)
                );
            },
            (txError) => reject(txError)
        );
    });
};

export const initDatabase = () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS usuarios (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        nombre TEXT NOT NULL,
                        email TEXT UNIQUE NOT NULL,
                        password TEXT NOT NULL,
                        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
                    );`,
                    [],
                    () => {},
                    (_tx, err) => {
                        console.log('Error creando tabla usuarios', err);
                        return false;
                    }
                );

                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS diccionario (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        palabra TEXT UNIQUE NOT NULL,
                        descripcion TEXT NOT NULL,
                        imagen TEXT NOT NULL
                    );`,
                    [],
                    () => {},
                    (_tx, err) => {
                        console.log('Error creando tabla diccionario', err);
                        return false;
                    }
                );
            },
            (txError) => {
                console.log('Transacción initDatabase fallida', txError);
                reject(txError);
            },
            () => {
                console.log('Tablas creadas/validadas correctamente');
                resolve();
            }
        );
    });
};

export const insertarUsuario = (nombre, email, password) => {
    return executeSql('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?);', [nombre, email, password]);
};

export const buscarUsuarioPorEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'SELECT * FROM usuarios WHERE email = ?;',
                    [email],
                    (_tx, result) => resolve(result.rows._array),
                    (_tx, err) => reject(err)
                );
            },
            (txError) => reject(txError)
        );
    });
};

export const verificarCredenciales = (email, password) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'SELECT * FROM usuarios WHERE email = ? AND password = ?; ',
                    [email, password],
                    (_tx, result) => {
                        const rows = result.rows._array;
                        if (rows.length > 0) resolve(rows[0]);
                        else resolve(null);
                    },
                    (_tx, err) => reject(err)
                );
            },
            (txError) => reject(txError)
        );
    });
};

export const obtenerTodosUsuarios = () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'SELECT id, nombre, email, fecha_creacion FROM usuarios; ',
                    [],
                    (_tx, result) => resolve(result.rows._array),
                    (_tx, err) => reject(err)
                );
            },
            (txError) => reject(txError)
        );
    });
};

export const actualizarUsuario = (id, nombre, email) => {
    return executeSql('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?;', [nombre, email, id]);
};

export const eliminarUsuarioPorEmail = (email) => {
    return executeSql('DELETE FROM usuarios WHERE email = ?;', [email]);
};

export const insertarPalabra = (palabra, descripcion, imagen) => {
    return executeSql('INSERT INTO diccionario (palabra, descripcion, imagen) VALUES (?, ?, ?);', [palabra.toLowerCase(), descripcion, imagen]);
};

export const buscarPalabra = (palabra) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'SELECT * FROM diccionario WHERE palabra = ?;',
                    [palabra.toLowerCase()],
                    (_tx, result) => resolve(result.rows._array),
                    (_tx, err) => reject(err)
                );
            },
            (txError) => reject(txError)
        );
    });
};

export const actualizarPassword = (id, nuevaPassword) => {
    return executeSql('UPDATE usuarios SET password = ? WHERE id = ?;', [nuevaPassword, id]);
};

export default db;

