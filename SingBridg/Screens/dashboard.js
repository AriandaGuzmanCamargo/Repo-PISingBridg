import { Text, StyleSheet, View, ScrollView, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import BarraNavegacionInferior from '../components/BarraNavegacionInferior'

export default function Dashboard({ navigation }) {
    const [selectedTab, setSelectedTab] = useState('home');
    
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        if (tab === 'traductor') {
            navigation.navigate('Traductor');
        } else if (tab === 'profile') {   
        } else if (tab === 'settings') {
        }
    };

    // Datos de ejemplo de cursos
    const cursos = [
        {
            id: 1,
            titulo: 'Alfabeto en Señas',
            nivel: 'Básico',
            progreso: 65,
            imagen: require('../assets/Logo.png'),
            color: '#4CAF50',
            pantalla: 'Diccionario'
        },
        {
            id: 2,
            titulo: 'Traductor',
            nivel: 'Básico',
            progreso: 30,
            imagen: require('../assets/Logo.png'),
            color: '#9E9E9E',
            pantalla: 'vocabulario'
        },
        {
            id: 3,
            titulo: 'Letras',
            nivel: 'Intermedio',
            progreso: 15,
            imagen: require('../assets/usuario.png'),
            color: '#2196F3',
                pantalla: 'DetalleLetra'
        },
    ];
    
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <View style={styles.headerCard}>
                        <Text style={styles.headerTitle}>Cursos</Text>
                        <Image source={require('../assets/Logo.png')} style={styles.headerLogo} />
                    </View>
                </View>

                {/* Tarjeta de Progreso General */}
                <View style={styles.tarjetaProgreso}>
                    <View style={styles.progresoIcono}>
                        <Text style={styles.iconoGrafico}>📊</Text>
                    </View>
                    <Text style={styles.progresoTitulo}>Progreso General</Text>
                    <View style={styles.estadisticas}>
                        <View style={styles.estadItem}>
                            <Text style={styles.estadNumero}>3</Text>
                            <Text style={styles.estadLabel}>Cursos</Text>
                        </View>
                        <View style={styles.estadItem}>
                            <Text style={styles.estadNumero}>48%</Text>
                            <Text style={styles.estadLabel}>Completado</Text>
                        </View>
                        <View style={styles.estadItem}>
                            <Text style={styles.estadNumero}>12</Text>
                            <Text style={styles.estadLabel}>Días</Text>
                        </View>
                    </View>
                </View>

                {/* Sección Mis Cursos */}
                <Text style={styles.seccionTitulo}>Mis Cursos</Text>

                {/* Lista de Cursos */}
                {cursos.map((curso) => (
                    <Pressable 
                        key={curso.id}
                        style={styles.tarjetaCurso}
                        onPress={() => navigation.navigate(curso.pantalla)}
                    >
                        <Image 
                            source={curso.imagen}
                            style={[styles.cursoImagen, { backgroundColor: curso.color }]}
                            resizeMode="cover"
                        />
                        <View style={styles.cursoInfo}>
                            <Text style={styles.cursoTitulo}>{curso.titulo}</Text>
                            <Text style={styles.cursoNivel}>{curso.nivel}</Text>
                            <View style={styles.progresoContainer}>
                                <View style={styles.progresoFondo}>
                                    <View 
                                        style={[
                                            styles.progresoRelleno, 
                                            { width: `${curso.progreso}%` }
                                        ]} 
                                    />
                                </View>
                                <Text style={styles.progresoTexto}>{curso.progreso}%</Text>
                            </View>
                        </View>
                    </Pressable>
                ))}

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
    tarjetaProgreso: {
        backgroundColor: '#2B5DA2',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 15,
        padding: 20,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    progresoIcono: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    iconoGrafico: {
        fontSize: 24,
    },
    progresoTitulo: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    estadisticas: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    estadItem: {
        alignItems: 'center',
    },
    estadNumero: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    estadLabel: {
        fontSize: 12,
        color: '#B3D4FF',
        marginTop: 5,
    },
    seccionTitulo: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 15,
    },
    tarjetaCurso: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 12,
        flexDirection: 'row',
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    cursoImagen: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    cursoInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    cursoTitulo: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    cursoNivel: {
        fontSize: 13,
        color: '#4FC3F7',
        marginBottom: 8,
    },
    progresoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progresoFondo: {
        flex: 1,
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        overflow: 'hidden',
        marginRight: 10,
    },
    progresoRelleno: {
        height: '100%',
        backgroundColor: '#4FC3F7',
        borderRadius: 3,
    },
    progresoTexto: {
        fontSize: 12,
        color: '#999',
        width: 35,
    },
})