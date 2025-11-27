import * as SQLite from 'expo-sqlite';

// Abrir la base de datos con la nueva API
const db = SQLite.openDatabaseSync('singbridge.db');

// Inicializar la base de datos y crear tablas
export const initDatabase = () => {
    try {
        // Crear tabla de usuarios
        db.execSync(
            `CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
            );`
        );
        console.log('Tabla usuarios creada exitosamente');
        return Promise.resolve();
    } catch (error) {
        console.log('Error al crear tabla usuarios:', error);
        return Promise.reject(error);
    }
};

// Insertar un nuevo usuario
export const insertarUsuario = (nombre, email, password) => {
    try {
        const result = db.runSync(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, password]
        );
        console.log('Usuario insertado exitosamente');
        return Promise.resolve(result);
    } catch (error) {
        console.log('Error al insertar usuario:', error);
        return Promise.reject(error);
    }
};

// Buscar usuario por email
export const buscarUsuarioPorEmail = (email) => {
    try {
        const result = db.getAllSync(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );
        return Promise.resolve(result);
    } catch (error) {
        console.log('Error al buscar usuario:', error);
        return Promise.reject(error);
    }
};

// Verificar credenciales de login
export const verificarCredenciales = (email, password) => {
    try {
        const result = db.getAllSync(
            'SELECT * FROM usuarios WHERE email = ? AND password = ?',
            [email, password]
        );
        if (result.length > 0) {
            return Promise.resolve(result[0]);
        } else {
            return Promise.resolve(null);
        }
    } catch (error) {
        console.log('Error al verificar credenciales:', error);
        return Promise.reject(error);
    }
};

// Obtener todos los usuarios (para debug)
export const obtenerTodosUsuarios = () => {
    try {
        const result = db.getAllSync(
            'SELECT id, nombre, email, fecha_creacion FROM usuarios'
        );
        return Promise.resolve(result);
    } catch (error) {
        console.log('Error al obtener usuarios:', error);
        return Promise.reject(error);
    }
};

// Actualizar usuario
export const actualizarUsuario = (id, nombre, email) => {
    try {
        const result = db.runSync(
            'UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?',
            [nombre, email, id]
        );
        console.log('Usuario actualizado exitosamente');
        return Promise.resolve(result);
    } catch (error) {
        console.log('Error al actualizar usuario:', error);
        return Promise.reject(error);
    }
};

export const eliminarUsuarioPorEmail = (email) => {
    try {
        const result = db.runSync(
            'DELETE FROM usuarios WHERE email = ?',
            [email]
        );
        console.log('Usuario eliminado exitosamente');
        return Promise.resolve(result);
    } catch (error) {
        console.log('Error al eliminar usuario:', error);
        return Promise.reject(error);
    }
};

export default db;
