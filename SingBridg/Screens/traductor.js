import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image, TextInput, Dimensions } from 'react-native';
import BarraNavegacionInferior from '../components/BarraNavegacionInferior'; 
import imagenes from '../utils/imagenes';  
import descripciones from '../utils/descripciones';
import { obtenerLetrasSeñas } from '../utils/alfabeto';

const { width } = Dimensions.get('window');
const COLORES = {
  azulFuerte: '#1F3A5F', 
  azulIntermedio: '#A2BCD6', 
  blanco: '#ffffff',
  grisClaro: '#e4e4e4ff',
  grisMedio: '#CCCCCC',
  negro: '#000000',
  azulBoton: '#004A93', 
};

// Diccionario de frases comunes
const FRASES_COMUNES = {
  'hola': ['hola'],
  'adios': ['adios'],
  'buenos dias': ['bueno', 'dia'],
  'buenas tardes': ['bueno', 'tarde'],
  'buenas noches': ['bueno', 'noche'],
  'gracias': ['gracias'],
  'por favor': ['favor'],
  'de nada': ['nada'],
  'como estas': ['como', 'estar'],
  'bien': ['bueno'],
  'mal': ['malo'],
  'si': ['si'],
  'no': ['no'],
  'aqui': ['aqui'],
  'alla': ['alla'],
  'hoy': ['hoy'],
  'mañana': ['manana'],
  'ayer': ['ayer'],
  'ahora': ['ahora'],
  'despues': ['despues'],
  'antes': ['antes'],
  'no puedo': ['no', 'poder'],
  'hoy no puedo': ['hoy', 'no', 'poder'],
  'lo siento': ['pena'],
  'disculpa': ['pena'],
  'ayuda': ['ayudar'],
  'necesito ayuda': ['necesitar', 'ayudar'],
  'tengo hambre': ['tener', 'hambre'],
  'quiero comer': ['querer', 'comida'],
  'mama': ['mama'],
  'papa': ['papa'],
  'casa': ['hogar'],
  'agua': ['agua'],
  'comida': ['comida'],
};

export default function Traductor({ navigation }) {
  const [textoEntrada, setTextoEntrada] = useState('');
  const [resultado, setResultado] = useState([]);
  const [selectedTab, setSelectedTab] = useState('traductor');
  const [sugerencias, setSugerencias] = useState([]);

  const normalize = (s) => {
    if (!s) return '';
    return s
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-z0-9\s]/g, '')
      .trim();
  };

  const buscarImagen = (palabraNormalizada) => {
    // Buscar en el diccionario de imágenes
    const imagenKey = Object.keys(imagenes).find((k) => 
      normalize(k.replace('.png', '')) === palabraNormalizada
    );
    return imagenKey;
  };

  const buscarDescripcion = (palabraNormalizada) => {
    // Buscar descripción en el diccionario
    return descripciones[palabraNormalizada] || null;
  };

  const traducirTexto = (texto) => {
    const textoNormalizado = normalize(texto);
    
    if (!textoNormalizado) {
      setResultado([]);
      return;
    }

    // Buscar frase completa
    let palabrasParaTraducir = [];
    if (FRASES_COMUNES[textoNormalizado]) {
      palabrasParaTraducir = FRASES_COMUNES[textoNormalizado];
    } else {
      // Si no es una frase común, dividir en palabras
      palabrasParaTraducir = textoNormalizado.split(/\s+/).filter(p => p.length > 0);
    }

    const resultadosPalabras = palabrasParaTraducir.map(palabra => {
      const imagen = buscarImagen(palabra);
      const descripcion = buscarDescripcion(palabra);
      
      if (imagen) {
        return {
          palabra: palabra,
          imagen: imagen,
          descripcion: descripcion,
          encontrado: true,
          tipo: 'seña'
        };
      } else {
        // Deletrear con alfabeto
        const letras = obtenerLetrasSeñas(palabra);
        return {
          palabra: palabra,
          letras: letras,
          encontrado: false,
          tipo: 'deletreo'
        };
      }
    });

    setResultado(resultadosPalabras);
  };

  const generarSugerencias = (texto) => {
    const textoNorm = normalize(texto);
    if (textoNorm.length < 2) {
      setSugerencias([]);
      return;
    }

    // Buscar frases que coincidan
    const frasesCoincidentes = Object.keys(FRASES_COMUNES)
      .filter(frase => frase.includes(textoNorm))
      .slice(0, 5);

    // Buscar palabras que coincidan
    const palabrasCoincidentes = Object.keys(imagenes)
      .map(k => k.replace('.png', ''))
      .filter(palabra => normalize(palabra).includes(textoNorm))
      .slice(0, 5);

    const todasSugerencias = [...new Set([...frasesCoincidentes, ...palabrasCoincidentes])].slice(0, 6);
    setSugerencias(todasSugerencias);
  };

  useEffect(() => {
    traducirTexto(textoEntrada);
    generarSugerencias(textoEntrada);
  }, [textoEntrada]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleSugerenciaPress = (sugerencia) => {
    setTextoEntrada(sugerencia);
    setSugerencias([]);
  };

  const limpiarTexto = () => {
    setTextoEntrada('');
    setResultado([]);
    setSugerencias([]);
  };

  return (
    <View style={estilos.contenedorPrincipal}>
      {/* Encabezado */}
      <View style={estilos.contenedorEncabezado}>
        <View style={estilos.tarjetaEncabezado}>
          <Pressable onPress={() => navigation.goBack()} style={estilos.botonVolver}>
            <Text style={estilos.textoBotonVolver}>←</Text>
          </Pressable>
          <Text style={estilos.tituloEncabezado}>SignBridge</Text> 
          <Image 
            source={require('../assets/Logo.png')} 
            style={estilos.logoEncabezado} 
          />
        </View>

        <View style={estilos.contenedorBotonPrincipal}>
          <Pressable style={estilos.botonPrincipal}>
            <Text style={estilos.textoBotonPrincipal}>Traductor</Text>
          </Pressable>
        </View>
      </View>

      {/* Contenido */}
      <ScrollView contentContainerStyle={estilos.contenidoScroll} showsVerticalScrollIndicator={false}>
        <View style={estilos.contenedorMedios}>
          {/* Entrada de texto */}
          <View style={estilos.columnaMedio}>
            <Text style={estilos.tituloMedio}>Texto</Text>
            <View style={estilos.tarjetaEntrada}>
              <TextInput
                style={estilos.inputTexto}
                onChangeText={setTextoEntrada}
                value={textoEntrada}
                multiline={true}
                placeholder="Escribe aquí..."
                placeholderTextColor="#999"
              />
              {textoEntrada.length > 0 && (
                <Pressable onPress={limpiarTexto} style={estilos.botonLimpiar}>
                  <Text style={estilos.textoLimpiar}>✕</Text>
                </Pressable>
              )}
            </View>

            {/* Sugerencias */}
            {sugerencias.length > 0 && (
              <View style={estilos.contenedorSugerencias}>
                {sugerencias.map((sugerencia, index) => (
                  <Pressable 
                    key={index}
                    style={estilos.botonSugerencia}
                    onPress={() => handleSugerenciaPress(sugerencia)}
                  >
                    <Text style={estilos.textoSugerencia}>{sugerencia}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Botón alternar */}
          <View style={estilos.contenedorIconoCentral}>
            <View style={estilos.iconoCentral}>
              <Text style={estilos.iconoAlternar}>→</Text>
            </View>
          </View>

          {/* Salida de señas */}
          <View style={estilos.columnaMedio}>
            <Text style={estilos.tituloMedio}>Señas</Text>
            <ScrollView 
              style={estilos.tarjetaSalida}
              contentContainerStyle={estilos.contenidoSalida}
              showsVerticalScrollIndicator={true}
            >
              {resultado.length === 0 && (
                <Text style={estilos.textoSinResultado}>Escribe para traducir</Text>
              )}
              
              {resultado.map((item, index) => (
                <View key={index} style={estilos.itemSeña}>
                  {item.tipo === 'seña' && item.imagen ? (
                    <>
                      <Image 
                        source={imagenes[item.imagen]} 
                        style={estilos.imagenSeña}
                      />
                      <Text style={estilos.textoItemSeña}>{item.palabra}</Text>
                      <Text style={estilos.badgeTipo}>Seña específica</Text>
                    </>
                  ) : item.tipo === 'deletreo' && item.letras ? (
                    <>
                      <View style={estilos.contenedorDeletreo}>
                        <Text style={estilos.textoDeletreo}>📝 Deletrear:</Text>
                        <Text style={estilos.palabraDeletreo}>{item.palabra.toUpperCase()}</Text>
                        <ScrollView 
                          horizontal 
                          showsHorizontalScrollIndicator={false}
                          style={estilos.scrollLetras}
                        >
                          {item.letras.map((letraObj, idx) => (
                            <View key={idx} style={estilos.itemLetra}>
                              <Image 
                                source={letraObj.imagen} 
                                style={estilos.imagenLetra}
                              />
                              <Text style={estilos.textoLetra}>{letraObj.letra}</Text>
                            </View>
                          ))}
                        </ScrollView>
                      </View>
                    </>
                  ) : (
                    <View style={estilos.itemNoEncontrado}>
                      <Text style={estilos.textoNoEncontrado}>❓</Text>
                      <Text style={estilos.textoItemSeña}>{item.palabra}</Text>
                      <Text style={estilos.textoNoDisponible}>No disponible</Text>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Descripciones de las señas */}
        {resultado.some(item => item.tipo === 'seña' && item.descripcion) && (
          <View style={estilos.seccionDescripciones}>
            <Text style={estilos.tituloSeccionDescripciones}>📖 Descripciones</Text>
            {resultado.map((item, index) => (
              item.tipo === 'seña' && item.descripcion ? (
                <View key={`desc-${index}`} style={estilos.contenedorDescripcionSeña}>
                  <Text style={estilos.tituloDescripcionSeña}>💡 {item.palabra}:</Text>
                  <Text style={estilos.textoDescripcionSeña}>{item.descripcion}</Text>
                </View>
              ) : null
            ))}
          </View>
        )}

        {/* Información de ayuda */}
        {resultado.length === 0 && textoEntrada.length === 0 && (
          <View style={estilos.contenedorAyuda}>
            <Text style={estilos.tituloAyuda}>Prueba escribir:</Text>
            <View style={estilos.listaEjemplos}>
              {['hola', 'gracias', 'por favor', 'hoy no puedo', 'mama', 'papa', 'agua', 'comida'].map((ejemplo, index) => (
                <Pressable 
                  key={index}
                  style={estilos.botonEjemplo}
                  onPress={() => setTextoEntrada(ejemplo)}
                >
                  <Text style={estilos.textoEjemplo}>{ejemplo}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Estadísticas de traducción */}
        {resultado.length > 0 && (
          <View style={estilos.contenedorEstadisticas}>
            <Text style={estilos.textoEstadistica}>
              ✓ {resultado.filter(r => r.tipo === 'seña').length} señas específicas • 
               {resultado.filter(r => r.tipo === 'deletreo').length} palabras a deletrear
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Barra inferior */}
      <BarraNavegacionInferior 
        selectedTab={selectedTab} 
        onTabChange={handleTabChange}
      />
    </View>
  );
}



const estilos = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        backgroundColor: COLORES.azulIntermedio,
    },
    contenedorEncabezado: {
        backgroundColor: COLORES.azulIntermedio,
        paddingTop: 50, 
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
    },
    tarjetaEncabezado: {
        backgroundColor: COLORES.blanco,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    botonVolver: {
        padding: 5,
    },
    textoBotonVolver: {
        fontSize: 28,
        color: COLORES.negro,
        fontWeight: 'bold',
    },
    tituloEncabezado: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORES.negro,
    },
    logoEncabezado: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    contenedorBotonPrincipal: {
        alignItems: 'center',
    },
    botonPrincipal: {
        backgroundColor: COLORES.azulBoton,
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 50,
        width: width * 0.7,
        alignItems: 'center',
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    textoBotonPrincipal: {
        color: COLORES.blanco,
        fontSize: 22,
        fontWeight: 'bold',
    },
    contenidoScroll: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 120, 
    },
    contenedorMedios: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
        position: 'relative',
    },
    columnaMedio: {
        width: '45%', 
    },
    tituloMedio: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORES.negro,
        marginBottom: 5,
        textAlign: 'center',
    },
    tarjetaEntrada: {
        backgroundColor: COLORES.grisClaro,
        borderRadius: 10,
        minHeight: 120,
        justifyContent: 'flex-start',
        padding: 10,
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        position: 'relative',
    },
    inputTexto: {
        fontSize: 16,
        color: COLORES.negro,
        textAlignVertical: 'top',
        minHeight: 100,
        padding: 0,
    },
    botonLimpiar: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: COLORES.grisMedio,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoLimpiar: {
        fontSize: 18,
        color: COLORES.blanco,
        fontWeight: 'bold',
    },
    contenedorSugerencias: {
        marginTop: 10,
        backgroundColor: COLORES.blanco,
        borderRadius: 8,
        padding: 8,
        maxHeight: 150,
    },
    botonSugerencia: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORES.grisClaro,
    },
    textoSugerencia: {
        fontSize: 14,
        color: COLORES.azulBoton,
    },
    contenedorIconoCentral: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconoCentral: {
        backgroundColor: COLORES.blanco,
        borderRadius: 25,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    botonAlternar: {
        position: 'absolute',
        top: '30%', 
        left: '46%',
        zIndex: 10,
        backgroundColor: COLORES.blanco,
        borderRadius: 50,
        padding: 5,
        borderWidth: 1,
        borderColor: COLORES.grisMedio,
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    iconoAlternar: {
        fontSize: 20,
        color: COLORES.azulBoton,
        fontWeight: 'bold',
    },
    tarjetaSalida: {
        backgroundColor: COLORES.grisClaro,
        borderRadius: 10,
        minHeight: 120,
        maxHeight: 400,
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    contenidoSalida: {
        padding: 10,
        alignItems: 'center',
    },
    textoSinResultado: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 40,
    },
    itemSeña: {
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: COLORES.blanco,
        borderRadius: 8,
        padding: 10,
        width: '100%',
    },
    imagenSeña: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    textoItemSeña: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORES.azulFuerte,
        textAlign: 'center',
    },
    badgeTipo: {
        fontSize: 11,
        color: COLORES.blanco,
        backgroundColor: COLORES.azulBoton,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
        marginTop: 5,
    },
    contenedorDeletreo: {
        width: '100%',
        alignItems: 'center',
        padding: 10,
    },
    textoDeletreo: {
        fontSize: 14,
        color: COLORES.azulFuerte,
        fontWeight: '600',
        marginBottom: 5,
    },
    palabraDeletreo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORES.azulFuerte,
        marginBottom: 10,
    },
    scrollLetras: {
        width: '100%',
        maxHeight: 120,
    },
    itemLetra: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    imagenLetra: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderRadius: 5,
    },
    textoLetra: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORES.azulFuerte,
        marginTop: 3,
    },
    itemNoEncontrado: {
        alignItems: 'center',
        padding: 15,
    },
    textoNoEncontrado: {
        fontSize: 40,
        marginBottom: 5,
    },
    textoNoDisponible: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    contenedorAyuda: {
        backgroundColor: COLORES.blanco,
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tituloAyuda: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORES.azulFuerte,
        marginBottom: 15,
    },
    listaEjemplos: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    botonEjemplo: {
        backgroundColor: COLORES.azulIntermedio,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 15,
        margin: 5,
    },
    textoEjemplo: {
        fontSize: 14,
        color: COLORES.blanco,
        fontWeight: '500',
    },
    contenedorEstadisticas: {
        backgroundColor: COLORES.blanco,
        borderRadius: 8,
        padding: 12,
        marginTop: 15,
        alignItems: 'center',
    },
    textoEstadistica: {
        fontSize: 14,
        color: COLORES.azulFuerte,
        fontWeight: '500',
    },
    seccionDescripciones: {
        backgroundColor: COLORES.blanco,
        borderRadius: 15,
        padding: 15,
        marginTop: 15,
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    tituloSeccionDescripciones: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORES.azulFuerte,
        marginBottom: 10,
        textAlign: 'center',
    },
    contenedorDescripcionSeña: {
        backgroundColor: '#F0F8FF',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        borderLeftWidth: 4,
        borderLeftColor: COLORES.azulBoton,
    },
    tituloDescripcionSeña: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORES.azulFuerte,
        marginBottom: 5,
    },
    textoDescripcionSeña: {
        fontSize: 13,
        color: '#333',
        lineHeight: 18,
    },
});