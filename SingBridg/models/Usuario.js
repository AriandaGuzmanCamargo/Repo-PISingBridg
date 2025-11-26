// Modelo de Usuario
export class Usuario {
    constructor(id, nombre, email, password, fecha_creacion) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.fecha_creacion = fecha_creacion;
    }

    // Validar email
    static validarEmail(email) {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    // Validar contraseña
    static validarPassword(password) {
        return password && password.length >= 6;
    }

    // Validar nombre
    static validarNombre(nombre) {
        return nombre && nombre.trim().length >= 2;
    }

    // Crear objeto desde datos de base de datos
    static fromDatabase(data) {
        return new Usuario(
            data.id,
            data.nombre,
            data.email,
            data.password,
            data.fecha_creacion
        );
    }

    // Convertir a objeto plano (sin password para seguridad)
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            fecha_creacion: this.fecha_creacion
        };
    }
}

export default Usuario;
