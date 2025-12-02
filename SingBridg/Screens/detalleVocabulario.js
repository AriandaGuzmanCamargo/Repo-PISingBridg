
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
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
    const { palabra, imagen, descripcion } = route.params || {};

    // 2. CORRECCIÓN: Definir la variable 'letra' para que no de error
    // Si hay palabra, tomamos la primera letra, si no, dejamos cadena vacía
    const letra = palabra ? palabra.charAt(0).toUpperCase() : '';

    // 3. DEFINIR INDICACIONES
    const indicaciones = descripcion || "Sin indicaciones disponibles.";
    

    const [selectedTab, setSelectedTab] = useState('home');
    const [status, setStatus] = useState({});
    const videoRef = useRef(null);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    
    const togglePlayPause = async () => {
        if (videoRef.current) {
            if (status.isPlaying) {
                await videoRef.current.pauseAsync();
            } else {
                await videoRef.current.playAsync();
            }
        }
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
                        <Text style={styles.palabraTexto}>{palabra || 'Palabra'}    </Text>
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
                            source={imagen ? imagen : require('../assets/Logo.png')} 
                            style={styles.mediaPlaceholder}
                            resizeMode="contain"
                        />
                    </View>
                    
                    {/* Video */}
                    <Pressable style={styles.mediaCard} onPress={togglePlayPause}>
                        <Video
                            ref={videoRef}
                            style={styles.video}
                            source={{
                                uri: 'https://www.w3schools.com/html/mov_bbb.mp4', // URL de ejemplo - reemplaza con tu video
                            }}
                            useNativeControls={false}
                            resizeMode={ResizeMode.CONTAIN}
                            isLooping
                            onPlaybackStatusUpdate={status => setStatus(() => status)}
                        />
                        {!status.isPlaying && (
                            <View style={styles.playOverlay}>
                                <Text style={styles.playIcon}>▶</Text>
                            </View>
                        )}
                    </Pressable>
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
        overflow: 'hidden',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    playOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        fontSize: 40,
        color: COLORES.blanco,
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