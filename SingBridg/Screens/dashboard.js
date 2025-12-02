import { Text, StyleSheet, View, ScrollView, Pressable, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import BarraNavegacionInferior from '../components/BarraNavegacionInferior'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard({ navigation }) {
    const [selectedTab, setSelectedTab] = useState('home');
    const [nombreUsuario, setNombreUsuario] = useState('Usuario');
    
    useEffect(() => {
        const cargarUsuario = async () => {
            try {
                const data = await AsyncStorage.getItem('usuario');
                if (data) {
                    const usuario = JSON.parse(data);
                    setNombreUsuario(usuario.nombre);
                }
            } catch (error) {
                console.log('Error cargando usuario desde AsyncStorage:', error);
            }
        };
        cargarUsuario();
    }, []);
    
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        if (tab === 'traductor') {
            navigation.navigate('Traductor');
        } else if (tab === 'profile') {   
        } else if (tab === 'settings') {
        }
    };

    // Secciones del Dashboard
    const secciones = [
        {
            id: 1,
            titulo: 'Alfabeto en Señas',
            descripcion: 'Aprende el alfabeto completo',
            imagen: require('../assets/alfabeto.png'),
            color: '#2B5DA2',
            pantalla: 'Diccionario'
        },
        {
            id: 2,
            titulo: 'Traductor',
            descripcion: 'Traduce texto a señas',
            imagen: require('../assets/traducir.png'),
            color: '#4FC3F7',
            pantalla: 'traductor'
        },
        {
            id: 3,
            titulo: 'Letras',
            descripcion: 'Detalles de cada letra',
            imagen: require('../assets/computadora-con-signos-de-letras-flotantes.png'),
            color: '#1F3A5F',
            pantalla: 'DetalleLetra'
        },
        {
            id: 4,
            titulo: 'Vocabulario',
            descripcion: 'Palabras básicas en señas',
            imagen: require('../assets/vocabulario.png'),
            color: '#A2BCD6',
            pantalla: 'vocabulario'
        },
    ];
    
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <View style={styles.headerCard}>
                        <Text style={styles.headerTitle}>Dashboard</Text>
                        <Image source={require('../assets/Logo.png')} style={styles.headerLogo} />
                    </View>
                </View>

                {/* Mensaje de Bienvenida */}
                <View style={styles.bienvenidaContainer}>
                    <Text style={styles.bienvenidaTitulo}>¡Bienvenido, {nombreUsuario}! </Text>
                    <Text style={styles.bienvenidaTexto}>Explora y aprende lenguaje de señas</Text>
                </View>

                {/* Sección Dashboard */}
                <Text style={styles.seccionTitulo}>Explora</Text>

                <View style={styles.gridContainer}>
                    {secciones.map((seccion) => (
                        <Pressable 
                            key={seccion.id}
                            style={[styles.tarjetaSeccion, { backgroundColor: seccion.color }]}
                            onPress={() => navigation.navigate(seccion.pantalla)}
                        >
                            <Image source={seccion.imagen} style={styles.imagenSeccion} />
                            <Text style={styles.seccionTitulo2}>{seccion.titulo}</Text>
                            <Text style={styles.seccionDescripcion}>{seccion.descripcion}</Text>
                        </Pressable>
                    ))}
                </View>

                <View style={styles.tarjetaMotivacion}>
                    <Text style={styles.motivacionIcono}>🎯</Text>
                    <Text style={styles.motivacionTitulo}>Sigue Practicando</Text>
                    <Text style={styles.motivacionTexto}>Cada día es una oportunidad para aprender algo nuevo</Text>
                </View>

            </ScrollView>
            
            {/* Barra de navegación inferior */}
            <BarraNavegacionInferior 
                selectedTab={selectedTab} 
                onTabChange={handleTabChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollContent: {
        paddingBottom: 100,
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
    bienvenidaContainer: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bienvenidaTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2B5DA2',
        marginBottom: 8,
    },
    bienvenidaTexto: {
        fontSize: 14,
        color: '#666',
    },
    seccionTitulo: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 15,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 20,
        justifyContent: 'space-between',
    },
    tarjetaSeccion: {
        width: '48%',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        minHeight: 140,
        alignItems: 'center',
    },
    imagenSeccion: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 10,
        tintColor: '#FFFFFF',
    },
    seccionIcono: {
        fontSize: 32,
        marginBottom: 10,
    },
    seccionTitulo2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 5,
        textAlign: 'center',
    },
    seccionDescripcion: {
        fontSize: 12,
        color: '#FFFFFF',
        opacity: 0.9,
    },
    tarjetaMotivacion: {
        backgroundColor: '#E3F2FD',
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#2B5DA2',
    },
    motivacionIcono: {
        fontSize: 40,
        marginBottom: 10,
    },
    motivacionTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2B5DA2',
        marginBottom: 8,
    },
    motivacionTexto: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
})