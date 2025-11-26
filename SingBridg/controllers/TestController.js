// Script de prueba para verificar la base de datos
// Puedes importar estas funciones en cualquier pantalla para probar

import { obtenerTodosUsuarios } from '../database/database';

// Función para listar todos los usuarios (solo para debug)
export const listarUsuarios = async () => {
    try {
        const usuarios = await obtenerTodosUsuarios();
        console.log('=== USUARIOS REGISTRADOS ===');
        console.log('Total de usuarios:', usuarios.length);
        usuarios.forEach(usuario => {
            console.log(`ID: ${usuario.id}`);
            console.log(`Nombre: ${usuario.nombre}`);
            console.log(`Email: ${usuario.email}`);
            console.log(`Fecha creación: ${usuario.fecha_creacion}`);
            console.log('---');
        });
        return usuarios;
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        return [];
    }
};

// Ejemplo de cómo usar en una pantalla:
// import { listarUsuarios } from '../controllers/TestController';
// 
// En un botón o useEffect:
// const usuarios = await listarUsuarios();
