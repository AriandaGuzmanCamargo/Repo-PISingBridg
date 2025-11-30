import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions, ScrollView } from 'react-native';
import BarraNavegacionInferior from '../components/BarraNavegacionInferior';

const { width } = Dimensions.get('window');
const ANCHO = width * 0.9;

// Abecedario completo
const ABECEDARIO = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Descripciones por letra
const DESCRIPCIONES = {
    'A': 'Con la mano cerrada, se muestran las uñas y se estira el dedo pulgar hacia un lado. La palma mira al frente.',
    'B': 'Se extienden todos los dedos hacia arriba con la palma al frente.',
    'C': 'La mano forma una C con los dedos curvados.',
    'D': 'El dedo índice se extiende hacia arriba, los demás dedos tocan el pulgar.',
    'E': 'Todos los dedos se curvan sobre el pulgar.',
    'F': 'El dedo índice y pulgar forman un círculo, los demás dedos extendidos.',
    'G': 'El dedo índice y pulgar extendidos horizontalmente.',
    'H': 'El dedo índice y medio extendidos horizontalmente.',
    'I': 'El dedo meñique extendido hacia arriba.',
    'J': 'El dedo meñique dibuja una J en el aire.',
    'K': 'El dedo índice apunta hacia arriba, el medio hacia afuera.',
    'L': 'El pulgar y el índice forman una L.',
    'M': 'El pulgar está entre los tres primeros dedos.',
    'N': 'El pulgar está entre los dos primeros dedos.',
    'Ñ': 'Similar a N con un movimiento adicional.',
    'O': 'Todos los dedos forman un círculo.',
    'P': 'Similar a K pero inclinado hacia abajo.',
    'Q': 'El pulgar y el índice apuntan hacia abajo.',
    'R': 'El índice y el medio se cruzan.',
    'S': 'El puño cerrado con el pulgar sobre los dedos.',
    'T': 'El pulgar entre el índice y el medio.',
    'U': 'El índice y el medio juntos apuntan hacia arriba.',
    'V': 'El índice y el medio separados en V.',
    'W': 'El índice, medio y anular separados hacia arriba.',
    'X': 'El índice doblado en forma de gancho.',
    'Y': 'El pulgar y el meñique extendidos.',
    'Z': 'El dedo índice dibuja una Z en el aire.',
};

// Mapa de imágenes por letra
const IMAGENES_LETRAS = {
    'A': require('../assets/A.jpg'),
    'B': require('../assets/B.jpg'),
    'C': require('../assets/C.jpg'),
    'D': require('../assets/D.jpg'),
    'E': require('../assets/E.jpg'),
    'F': require('../assets/F.jpg'),
    'G': require('../assets/G.jpg'),
    'H': require('../assets/H.jpg'),
    'I': require('../assets/I.jpg'),
    'J': require('../assets/J.jpg'),
    'K': require('../assets/K.jpg'),
    'L': require('../assets/L.jpg'),
    'M': require('../assets/M.jpg'),
    'N': require('../assets/N.jpg'),
    'Ñ': require('../assets/N2.jpg'),
    'O': require('../assets/O.jpg'),
    'P': require('../assets/P.jpg'),
    'Q': require('../assets/Q.jpg'),
    'R': require('../assets/R.jpg'),
    'S': require('../assets/S.jpg'),
    'T': require('../assets/T.jpg'),
    'U': require('../assets/U.jpg'),
    'V': require('../assets/V.jpg'),
    'W': require('../assets/W.jpg'),
    'X': require('../assets/X.jpg'),
    'Y': require('../assets/Y.jpg'),
    'Z': require('../assets/Z.jpg'),
};

const COLORES = {
  azulFuerte: '#1F3A5F', 
  azulIntermedio: '#A2BCD6',  
  azulClaro: '#004A93', 
  fondoGeneral: '#e4e4e4ff', 
  blanco: '#ffffff',
  grisClaro: '#e4e4e4ff',
};

export default function PantallaDetalleLetra({ navigation, route }) {
    const [selectedTab, setSelectedTab] = useState('home');
    const indiceInicial = route.params?.indiceLetra ?? 0;
    const [indiceLetra, setIndiceLetra] = useState(indiceInicial);
    
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    
    // Actualizar el índice si cambian los parámetros
    useEffect(() => {
        if (route.params?.indiceLetra !== undefined) {
            setIndiceLetra(route.params.indiceLetra);
        }
    }, [route.params?.indiceLetra]);
    
    const letraActual = ABECEDARIO[indiceLetra];
    const descripcionActual = DESCRIPCIONES[letraActual] || 'Descripción no disponible.';
    const imagenActual = IMAGENES_LETRAS[letraActual] || IMAGENES_LETRAS['A'];
    
    // Navegar a la letra anterior
    const irLetraAnterior = () => {
        if (indiceLetra > 0) {
            setIndiceLetra(indiceLetra - 1);
        }
    };

    // Navegar a la letra siguiente
    const irLetraSiguiente = () => {
        if (indiceLetra < ABECEDARIO.length - 1) {
            setIndiceLetra(indiceLetra + 1);
        }
    };    return(
        <View style={styles.contenedorPrincipal}>
            {/* Header tipo Vocabulario */}
            <View style={styles.headerContainer}>
                <View style={styles.headerCard}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.botonAtras}>
                        <Text style={styles.textoBotonAtras}>←</Text>
                    </Pressable>
                    <Text style={styles.headerTitle}>Letra {letraActual}</Text>
                    <Image source={require('../assets/Logo.png')} style={styles.headerLogo} />
                </View>
            </View>

            {/* Contenido Principal */}
            <ScrollView style={styles.contenedorContenido} contentContainerStyle={styles.scrollContent}>

                {/* Sección de Navegación de Letra */}
                <View style={styles.navegacionLetra}>
                    <Pressable 
                        style={[
                            styles.botonNavLetra,
                            indiceLetra === 0 && styles.botonDeshabilitado
                        ]}
                        onPress={irLetraAnterior}
                        disabled={indiceLetra === 0}
                    >
                        <Text style={styles.textoNavLetra}>{'<'}</Text>
                    </Pressable>
                    <Text style={styles.letraActual}>{letraActual}</Text>
                    <Pressable 
                        style={[
                            styles.botonNavLetra,
                            indiceLetra === ABECEDARIO.length - 1 && styles.botonDeshabilitado
                        ]}
                        onPress={irLetraSiguiente}
                        disabled={indiceLetra === ABECEDARIO.length - 1}
                    >
                        <Text style={styles.textoNavLetra}>{'>'}</Text>
                    </Pressable>
                </View>

                {/* Tarjeta de la Seña */}
                <View style={styles.tarjetaSeña}>
                    <Image
                        source={imagenActual}
                        style={styles.imagenMano}
                    />
                    <Text style={styles.textoDescripcion}>{descripcionActual}</Text>
                    
                    {/* Botón de Vocabulario */}
                    <Pressable 
                        style={styles.botonVocabulario}
                        onPress={() => navigation.navigate('vocabulario', { indiceLetra: indiceLetra })}
                    >
                        <Text style={styles.textoBotonVocabulario}>Vocabulario</Text>
                    </Pressable>
                </View>

            </ScrollView>
            
             {/* Barra de navegación inferior */}
            <BarraNavegacionInferior 
                selectedTab={selectedTab} 
                onTabChange={handleTabChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        backgroundColor: COLORES.grisClaro,
    },
    headerContainer: {
        paddingTop: 50, 
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    headerCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    botonAtras: {
        padding: 5,
        marginRight: 10,
    },
    textoBotonAtras: {
        fontSize: 28,
        color: '#000',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
    },
    headerLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    contenedorContenido: {
        flex: 1,
        paddingHorizontal: 15,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    
    
    navegacionLetra: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORES.azulIntermedio, 
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
    },
    botonNavLetra: {
        backgroundColor: COLORES.azulFuerte,
        width: 35,
        height: 35,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonDeshabilitado: {
        backgroundColor: '#94A3B8',
        opacity: 0.5,
    },
    textoNavLetra: {
        color: COLORES.blanco,
        fontSize: 20,
        fontWeight: 'bold',
    },
    letraActual: {
        color: COLORES.blanco,
        fontSize: 36,
        fontWeight: 'bold',
    },

    tarjetaSeña: {
        backgroundColor: COLORES.blanco,
        borderRadius: 10,
        padding: 20,
        marginTop: 15,
        alignItems: 'center',
        minHeight: 450,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    imagenMano: {
        width: 250,
        height: 250,
        marginBottom: 15,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    textoDescripcion: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
        paddingHorizontal: 10,
    },

    botonVocabulario: {
        backgroundColor: COLORES.azulFuerte,
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 18,
        marginTop: 'auto', 
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    textoBotonVocabulario: {
        color: COLORES.blanco,
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
});