import axios from 'axios';

// Servicio de IA para obtener explicaciones de señas
// Usando la API gratuita de Google Gemini

// TODO: Obtén tu API key gratuita en: https://makersuite.google.com/app/apikey
const GEMINI_API_KEY = 'AIzaSyBQt7QDlPu05CO4pPm3heBvrXuHOxP-xLg'; // Reemplazar con tu API key real
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

class IAService {
  constructor() {
    this.cache = new Map();
  }

  async obtenerExplicacionSena(palabra, contexto = '') {
    // Verificar caché
    const cacheKey = `${palabra}-${contexto}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const prompt = `Como experto en lenguaje de señas mexicano (LSM), explica brevemente y de forma clara cómo hacer la seña para "${palabra}"${contexto ? ` en el contexto de "${contexto}"` : ''}. 

Incluye:
1. Posición de las manos
2. Movimiento básico
3. Un consejo útil

Máximo 3 oraciones cortas y claras para principiantes.`;

      const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000
        }
      );

      const explicacion = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
        'No se pudo obtener una explicación en este momento.';

      // Guardar en caché
      this.cache.set(cacheKey, explicacion);
      
      return explicacion;
    } catch (error) {
      console.log('⚠️ Error al obtener explicación de IA:', error.message);
      
      // Respuesta de respaldo
      return this.obtenerExplicacionLocal(palabra);
    }
  }

  obtenerExplicacionLocal(palabra) {
    // Explicaciones locales básicas como respaldo
    const explicacionesBasicas = {
      'hoy': '1. Apunta hacia abajo con ambas manos. 2. Haz un movimiento breve hacia adelante. 3. Representa el tiempo presente.',
      'no': '1. Extiende tu mano con la palma hacia adelante. 2. Mueve la cabeza de lado a lado. 3. Expresa negación claramente.',
      'poder': '1. Forma puños con ambas manos. 2. Lleva los puños hacia tu pecho mostrando fuerza. 3. Representa capacidad.',
      'si': '1. Cierra tu puño. 2. Mueve tu mano hacia arriba y abajo como asintiendo. 3. Expresa afirmación.',
      'estar': '1. Coloca tu mano derecha abierta frente a ti. 2. Mantén la posición firme. 3. Indica presencia o estado.',
    };

    return explicacionesBasicas[palabra.toLowerCase()] || 
      `Para expresar "${palabra}" en lenguaje de señas, deletrea la palabra usando el alfabeto manual, letra por letra, asegurándote de que cada letra sea clara y visible.`;
  }

  async obtenerGuiaFrase(frase, palabrasTraducidas, palabrasNoTraducidas) {
    try {
      const prompt = `Como instructor de lenguaje de señas mexicano, proporciona una guía breve para expresar la frase completa: "${frase}".

Palabras con seña específica: ${palabrasTraducidas.join(', ')}
Palabras que se deletrean: ${palabrasNoTraducidas.join(', ')}

Proporciona:
1. El orden correcto de las señas (máximo 2 líneas)
2. Un consejo para la expresión facial o contexto (1 línea)

Sé muy breve y directo.`;

      const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000
        }
      );

      const guia = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
        'Sigue el orden de las palabras y mantén contacto visual con tu interlocutor.';

      return guia;
    } catch (error) {
      console.log('⚠️ Error al obtener guía de frase:', error.message);
      return 'Realiza cada seña de forma clara y secuencial. Las palabras deletreadas deben hacerse letra por letra con pausas entre cada palabra.';
    }
  }

  limpiarCache() {
    this.cache.clear();
  }
}

export default new IAService();
