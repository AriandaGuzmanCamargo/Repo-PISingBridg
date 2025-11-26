# Sistema de Autenticación - SingBridge

## Estructura del Proyecto

### 📁 database/
- **database.js**: Configuración y operaciones de la base de datos SQLite
  - `initDatabase()`: Inicializa la BD y crea las tablas
  - `insertarUsuario()`: Registra un nuevo usuario
  - `buscarUsuarioPorEmail()`: Busca un usuario por email
  - `verificarCredenciales()`: Verifica login
  - `actualizarUsuario()`: Actualiza datos del usuario
  - `actualizarPassword()`: Cambia la contraseña

### 📁 models/
- **Usuario.js**: Modelo de datos del usuario
  - Validaciones de email, password y nombre
  - Métodos para conversión de datos

### 📁 controllers/
- **AuthController.js**: Lógica de negocio para autenticación
  - `registrarUsuario()`: Maneja el registro completo
  - `iniciarSesion()`: Maneja el login
  - `verificarEmailExiste()`: Para recuperación de contraseña

## Base de Datos

### Tabla: usuarios
```sql
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Flujo de Registro

1. Usuario completa el formulario en `Screens/registro.js`
2. Se validan los datos en el frontend
3. Se llama a `AuthController.registrarUsuario()`
4. El controlador valida los datos usando el modelo `Usuario`
5. Se verifica que el email no exista
6. Se inserta el usuario en la BD usando `database.insertarUsuario()`
7. Se muestra mensaje de éxito y se navega al Login

## Flujo de Login

1. Usuario ingresa credenciales en `Screens/login.js`
2. Se llama a `AuthController.iniciarSesion()`
3. El controlador valida el formato de los datos
4. Se verifican las credenciales en la BD usando `verificarCredenciales()`
5. Si es correcto, se navega al Dashboard
6. Si falla, se muestra mensaje de error

## Seguridad

⚠️ **IMPORTANTE**: En producción deberías:
- Hashear las contraseñas (usar bcrypt o similar)
- Implementar tokens JWT para sesiones
- Agregar límite de intentos de login
- Validación de contraseñas más robusta
- HTTPS para comunicaciones

## Uso en las Pantallas

### Registro
```javascript
import { AuthController } from '../controllers/AuthController';

const resultado = await AuthController.registrarUsuario(
    nombre, email, password, confirmPassword
);

if (resultado.exito) {
    // Usuario registrado
} else {
    // Error: resultado.mensaje
}
```

### Login
```javascript
import { AuthController } from '../controllers/AuthController';

const resultado = await AuthController.iniciarSesion(email, password);

if (resultado.exito) {
    // Login exitoso
    // resultado.usuario contiene los datos
} else {
    // Error: resultado.mensaje
}
```

## Próximas Mejoras

- [ ] Implementar hash de contraseñas
- [ ] Sistema de sesiones persistentes
- [ ] Recuperación de contraseña funcional
- [ ] Actualización de perfil conectada a BD
- [ ] Validación de email único en tiempo real
- [ ] Sistema de roles (admin, usuario, etc.)
