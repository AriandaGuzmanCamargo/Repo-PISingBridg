
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image, Dimensions } from 'react-native';
import BarraNavegacionInferior from '../components/BarraNavegacionInferior'; 

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

export default function DetallePalabra({ navigation, route }) {
    const palabra = (route.params || {}).palabra || 'Agua';
    const letra = palabra.charAt(0).toUpperCase();
    const indicaciones = "Se estira el dedo índice; luego, se hace un movimiento de encoger y de estirar.";

    const [selectedTab, setSelectedTab] = React.useState('home');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <View style={styles.contenedorPrincipal}>
            <View style={styles.contenedorEncabezado}>
                <View style={styles.encabezado}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.botonAtras}>
                        <Text style={styles.textoBotonAtras}>←</Text>
                    </Pressable>
    
                    <Text style={styles.tituloLetra}>LETRA {letra}</Text> 
                    <Image 
                        source={require('../assets/Logo.png')} 
                        style={styles.headerLogo} 
                    />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                <View style={styles.contenedorPalabra}>
                    <View style={styles.palabraCard}>
                        <Text style={styles.palabraTexto}>{palabra}</Text>
                    </View>
                </View>
                <View style={styles.contenedorImageVideo}>
                    <Text style={styles.tituloSeccion}>Imagen</Text>
                    <Text style={styles.tituloSeccion}>Video</Text>
                </View>

                <View style={styles.mediaContainer}>
                    {/* Imagen */}
                    <View style={styles.mediaCard}>
                        <Image 
                            source={require('../assets/agua.png')} 
                            style={styles.mediaPlaceholder}
                        />
                        
                    </View>
                    
                    {/* Video */}
                    <View style={styles.mediaCard}>
                         <Image 
                            source={{ uri: 'https://placehold.co/150x150/d1d1d1/000000?text=VIDEO+DE+SEÑA' }} 
                            style={styles.mediaPlaceholder}
                        />
                        <View style={styles.playOverlay}>
                             <Text style={styles.playIcon}>▶</Text>
                        </View>
                    </View>
                </View>

                {/* Indicaciones */}
                <View style={styles.indicacionesContainer}>
                    <Text style={styles.indicacionesTitulo}>Indicaciones:</Text>
                    <Text style={styles.indicacionesTexto}>{indicaciones}</Text>
                </View>

            </ScrollView>

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
        backgroundColor: COLORES.azulIntermedio,
    },
    contenedorEncabezado: {
        paddingTop: 50, 
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    encabezado: {
        backgroundColor: COLORES.blanco,
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: COLORES.negro,
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
        color: COLORES.negro,
        fontWeight: 'bold',
    },
    tituloLetra: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORES.negro,
    },
    headerLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, 
    },
    contenedorPalabra: {
        marginBottom: 20,
        alignItems: 'center',
    },
    palabraCard: {
        backgroundColor: COLORES.azulBoton,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 50,
        width: '100%',
        alignItems: 'center',
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
     
    },
    palabraTexto: {
        color: COLORES.blanco,
        fontSize: 32,
        fontWeight: 'bold',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    contenedorImageVideo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 10,
    },
    tituloSeccion: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORES.azulFuerte,
        textAlign: 'center',
        width: '45%', 
    },
    mediaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    mediaCard: {
        width: '45%',
        height: 150,
        backgroundColor: COLORES.blanco,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        elevation: 4,
    },
    mediaPlaceholder: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    indicacionesContainer: {
        backgroundColor: COLORES.blanco,
        borderRadius: 10,
        padding: 20,
        shadowColor: COLORES.negro,
    },
    indicacionesTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORES.azulFuerte,
        marginBottom: 10,
    },
    indicacionesTexto: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
});