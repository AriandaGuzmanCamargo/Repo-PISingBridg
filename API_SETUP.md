# Configuración de APIs

## Google Gemini API (Gratis)

Para obtener tu API key gratuita de Google Gemini:

1. Ve a: https://makersuite.google.com/app/apikey
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Create API Key"
4. Copia la API key generada

## Configurar la API Key

Abre el archivo: `SingBridg/services/iaService.js`

Reemplaza esta línea:
```javascript
const GEMINI_API_KEY = 'AIzaSyDGR8h9Lm4FqB8KvP0XxQxKxXxXxXxXxXx';
```

Con tu API key real:
```javascript
const GEMINI_API_KEY = 'TU_API_KEY_AQUI';
```

## Límites de la API Gratuita

- 60 peticiones por minuto
- Completamente gratis
- No requiere tarjeta de crédito

## Nota de Seguridad

⚠️ **IMPORTANTE**: No compartas tu API key públicamente ni la subas a GitHub.

Para mayor seguridad, considera usar variables de entorno en producción.
