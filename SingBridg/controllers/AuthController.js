import { insertarUsuario, buscarUsuarioPorEmail, verificarCredenciales } from '../database/database';
import Usuario from '../models/Usuario';

// Controlador de Autenticación
export class AuthController {
    
    // Registrar nuevo usuario
    static async registrarUsuario(nombre, email, password, confirmPassword) {
        try {
            // Validaciones
            if (!nombre || !email || !password || !confirmPassword) {
                return {
                    exito: false,
                    mensaje: 'Por favor complete todos los campos'
                };
            }

            if (!Usuario.validarNombre(nombre)) {
                return {
                    exito: false,
                    mensaje: 'El nombre debe tener al menos 2 caracteres'
                };
            }

            if (!Usuario.validarEmail(email)) {
                return {
                    exito: false,
                    mensaje: 'Por favor ingrese un email válido'
                };
            }

            if (!Usuario.validarPassword(password)) {
                return {
                    exito: false,
                    mensaje: 'La contraseña debe tener al menos 6 caracteres'
                };
            }

            if (password !== confirmPassword) {
                return {
                    exito: false,
                    mensaje: 'Las contraseñas no coinciden'
                };
            }

            // Verificar si el email ya existe
            const usuarioExistente = await buscarUsuarioPorEmail(email.toLowerCase());
            if (usuarioExistente && usuarioExistente.length > 0) {
                return {
                    exito: false,
                    mensaje: 'Este email ya está registrado'
                };
            }

            // Insertar usuario en la base de datos
            const resultado = await insertarUsuario(
                nombre.trim(),
                email.toLowerCase().trim(),
                password // En producción, deberías hashear la contraseña
            );

            return {
                exito: true,
                mensaje: 'Registro exitoso',
                usuarioId: resultado.insertId
            };

        } catch (error) {
            console.error('Error en registrarUsuario:', error);
            return {
                exito: false,
                mensaje: 'Error al registrar el usuario. Por favor intente nuevamente.'
            };
        }
    }

    // Iniciar sesión
    static async iniciarSesion(email, password) {
        try {
            // Validaciones básicas
            if (!email || !password) {
                return {
                    exito: false,
                    mensaje: 'Por favor complete todos los campos'
                };
            }

            if (!Usuario.validarEmail(email)) {
                return {
                    exito: false,
                    mensaje: 'Por favor ingrese un email válido'
                };
            }

            // Verificar credenciales
            const usuario = await verificarCredenciales(
                email.toLowerCase().trim(),
                password
            );

            if (!usuario) {
                return {
                    exito: false,
                    mensaje: 'Email o contraseña incorrectos'
                };
            }

            // Login exitoso
            const usuarioObj = Usuario.fromDatabase(usuario);
            return {
                exito: true,
                mensaje: 'Inicio de sesión exitoso',
                usuario: usuarioObj.toJSON()
            };

        } catch (error) {
            console.error('Error en iniciarSesion:', error);
            return {
                exito: false,
                mensaje: 'Error al iniciar sesión. Por favor intente nuevamente.'
            };
        }
    }

    // Verificar si el email existe (para recuperación de contraseña)
    static async verificarEmailExiste(email) {
        try {
            if (!Usuario.validarEmail(email)) {
                return {
                    exito: false,
                    mensaje: 'Por favor ingrese un email válido'
                };
            }

            const usuario = await buscarUsuarioPorEmail(email.toLowerCase().trim());
            
            return {
                exito: usuario && usuario.length > 0,
                mensaje: usuario && usuario.length > 0 
                    ? 'Email encontrado' 
                    : 'Email no registrado'
            };

        } catch (error) {
            console.error('Error en verificarEmailExiste:', error);
            return {
                exito: false,
                mensaje: 'Error al verificar el email'
            };
        }
    }
}

export default AuthController;
