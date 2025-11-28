import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions, SafeAreaView } from 'react-native';
import BarraNavegacionInferior from '../components/BarraNavegacionInferior';

const { width } = Dimensions.get('window');
const ANCHO = width * 0.9;


const COLORES = {
  azulFuerte: '#1F3A5F', 
  azulIntermedio: '#A2BCD6',  
  azulClaro: '#004A93', 
  fondoGeneral: '#e4e4e4ff', 
};

export default function PantallaDetalleLetra({ navigation }) {
    
    const datosLetra = {
        letra: 'A',
        descripcion: 'Con la mano cerrada, se muestran las uñas y se estira el dedo pulgar hacia un lado. La palma mira al frente.',
        imagenSenia: require('../assets/A.jpg'), 
    };

    return(
        <SafeAreaView style={styles.contenedorPrincipal}>
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
            
             {/* Barra de navegación inferior */}
            <BarraNavegacionInferior 
            selectedTab={selectedTab} 
            onTabChange={handleTabChange}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        backgroundColor: COLORES.fondoGeneral,
    },
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

    tarjetaSeña: {
        width: ANCHO * 0.95,
        backgroundColor: COLORES.blanco,
        borderRadius: 10,
        padding: 20,
        marginTop: 15,
        alignItems: 'center',
        height: '70%', 
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