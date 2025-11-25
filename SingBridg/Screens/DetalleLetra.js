import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions, SafeAreaView } from 'react-native';

const { width } = Dimensions.get('window');
const ANCHO = width * 0.9;

// --- Colores Consistentes ---
const COLORES = {
  azulFuerte: '#1F3A5F', // Titulo y botones principales
  azulIntermedio: '#A2BCD6', // Fondo del pie de página en el inicio, lo usaremos para secciones claras
  azulClaro: '#004A93', // Botón principal (Iniciar Sesión)
  fondoGeneral: '#e4e4e4ff', // Fondo general
};

export default function PantallaDetalleLetra({ navigation }) {
    // Datos de ejemplo para la letra 'A'
    const datosLetra = {
        letra: 'A',
        descripcion: 'Con la mano cerrada, se muestran las uñas y se estira el dedo pulgar hacia un lado. La palma mira al frente.',
        // Nota: Debes asegurar que la imagen exista en tu carpeta assets
        imagenSenia: require('../assets/letra_a_sign.png'), 
    };

    return(
        <SafeAreaView style={styles.contenedorPrincipal}>
            {/* Cabecera (Similar a titulocontainer pero con iconos) */}
            <View style={styles.cabecera}>
                <Pressable onPress={() => navigation.goBack()} style={styles.iconoBackContainer}>
                    <Text style={styles.textoIconoNav}>{'<'}</Text>
                </Pressable>
                <Text style={styles.tituloCabecera}>LETRA A</Text>
                <Pressable onPress={() => {/* Navegar a Ajustes */}} style={styles.iconoAjustesContainer}>
                    <Text style={styles.textoIconoNav}>{'⛭'}</Text>
                </Pressable>
            </View>

            {/* Contenido Principal */}
            <View style={styles.contenedorContenido}>

                {/* Sección de Navegación de Letra (El recuadro azul claro) */}
                <View style={styles.navegacionLetra}>
                    <Pressable style={styles.botonNavLetra}>
                        <Text style={styles.textoNavLetra}>{'<'}</Text>
                    </Pressable>
                    <Text style={styles.letraActual}>{datosLetra.letra}</Text>
                    <Pressable style={styles.botonNavLetra}>
                        <Text style={styles.textoNavLetra}>{'>'}</Text>
                    </Pressable>
                </View>

                {/* Tarjeta de la Seña */}
                <View style={styles.tarjetaSeña}>
                    <Image
                        source={datosLetra.imagenSenia}
                        style={styles.imagenMano}
                    />
                    <Text style={styles.textoDescripcion}>{datosLetra.descripcion}</Text>
                    
                    {/* Botón de Vocabulario */}
                    <Pressable 
                        style={styles.botonVocabulario}
                        onPress={() => navigation.navigate('Vocabulario')} // Navegar a la pantalla de Vocabulario
                    >
                        <Text style={styles.textoBotonVocabulario}>Vocabulario</Text>
                    </Pressable>
                </View>

            </View>
            
            {/* Barra de Navegación Inferior (Footer) - Adaptado de 'fondoM' */}
            <View style={styles.piePagina}>
                <Text style={styles.iconoPie}>⚙️</Text>
                <Text style={styles.iconoPie}>🏠</Text>
                <Text style={styles.iconoPie}>👤</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        backgroundColor: COLORES.fondoGeneral,
    },
    // --- Cabecera de la Pantalla (Adaptado de titulocontainer) ---
    cabecera: {
        backgroundColor: COLORES.azulFuerte,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    tituloCabecera: {
        fontWeight: '700',
        fontSize: 18,
        color: COLORES.blanco,
    },
    iconoBackContainer: {
        padding: 5,
    },
    iconoAjustesContainer: {
        padding: 5,
    },
    textoIconoNav: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORES.blanco,
    },
    contenedorContenido: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    
    // --- Navegación de Letra (Recuadro Azul Claro) ---
    navegacionLetra: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: ANCHO * 0.95,
        backgroundColor: COLORES.azulIntermedio, 
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    botonNavLetra: {
        backgroundColor: COLORES.azulFuerte,
        width: 35,
        height: 35,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
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

    // --- Tarjeta de Contenido ---
    tarjetaSeña: {
        width: ANCHO * 0.95,
        backgroundColor: COLORES.blanco,
        borderRadius: 10,
        padding: 20,
        marginTop: 15,
        alignItems: 'center',
        height: '70%', // Ocupa gran parte del espacio disponible
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    imagenMano: {
        width: '80%',
        height: 200, 
        marginBottom: 15,
        borderRadius: 8,
    },
    textoDescripcion: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    
    // --- Botón de Vocabulario (Adaptado de botonConfirmar) ---
    botonVocabulario: {
        backgroundColor: COLORES.azulFuerte,
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 18,
        marginTop: 'auto', // Lo empuja hacia abajo en la tarjeta
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

    // --- Pie de Página (Footer) ---
    piePagina: {
        backgroundColor: COLORES.azulFuerte,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    iconoPie: {
        fontSize: 28,
        color: COLORES.blanco,
    },
});