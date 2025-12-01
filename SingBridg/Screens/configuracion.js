import { Text, StyleSheet, View, ScrollView, Pressable, Image, Alert, Switch, Modal, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import BarraNavegacionInferior from '../components/BarraNavegacionInferior';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const ANCHO = width * 0.9;

export default function Configuracion({ navigation }) {
    console.log('🔧 Configuracion component loaded');
    const [selectedTab, setSelectedTab] = useState('settings');
    const [nombreUsuario, setNombreUsuario] = useState('Usuario');
    const [correoUsuario, setCorreoUsuario] = useState('correo@ejemplo.com');
    
    // Estados para configuraciones
    const [idioma, setIdioma] = useState('Español');
    const [modoOscuro, setModoOscuro] = useState(false);
    const [notificaciones, setNotificaciones] = useState(true);
    const [sonido, setSonido] = useState(true);
    const [autoguardado, setAutoguardado] = useState(true);
    
    // Estados para modales
    const [modalIdioma, setModalIdioma] = useState(false);
    const [modalApariencia, setModalApariencia] = useState(false);
    const [modalAccesibilidad, setModalAccesibilidad] = useState(false);
    const [modalAlmacenamiento, setModalAlmacenamiento] = useState(false);
    const [modalSoporte, setModalSoporte] = useState(false);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const data = await AsyncStorage.getItem('usuario');
            if (data) {
                const usuario = JSON.parse(data);
                setNombreUsuario(usuario.nombre);
                setCorreoUsuario(usuario.email);
            }
            
            // Cargar configuraciones guardadas
            const configData = await AsyncStorage.getItem('configuraciones');
            if (configData) {
                const config = JSON.parse(configData);
                setIdioma(config.idioma || 'Español');
                setModoOscuro(config.modoOscuro || false);
                setNotificaciones(config.notificaciones !== undefined ? config.notificaciones : true);
                setSonido(config.sonido !== undefined ? config.sonido : true);
                setAutoguardado(config.autoguardado !== undefined ? config.autoguardado : true);
            }
        } catch (error) {
            console.log('Error cargando datos:', error);
            // Continuar con valores por defecto
        }
    };

    const guardarConfiguraciones = async () => {
        try {
            const config = {
                idioma,
                modoOscuro,
                notificaciones,
                sonido,
                autoguardado
            };
            await AsyncStorage.setItem('configuraciones', JSON.stringify(config));
        } catch (error) {
            console.log('Error guardando configuraciones:', error);
            // Continuar sin guardar
        }
    };

    useEffect(() => {
        guardarConfiguraciones();
    }, [idioma, modoOscuro, notificaciones, sonido, autoguardado]);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        if (tab === 'home') {
            navigation?.navigate?.('Dashboard');
        } else if (tab === 'traductor') {
            navigation?.navigate?.('Traductor');
        } else if (tab === 'profile') {
            navigation?.navigate?.('EdicionPerfil');
        }
    };

    const handleCerrarSesion = () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro que deseas cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar Sesión',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('usuario');
                        } catch (error) {
                            console.log('Error al cerrar sesión:', error);
                        }
                        navigation?.reset?.({
                            index: 0,
                            routes: [{ name: 'Inicio' }],
                        });
                    }
                }
            ]
        );
    };

    const limpiarCache = () => {
        Alert.alert(
            'Limpiar Caché',
            '¿Deseas limpiar los datos en caché? Esto no eliminará tu progreso.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Limpiar',
                    onPress: () => {
                        Alert.alert('Éxito', 'Caché limpiado correctamente');
                    }
                }
            ]
        );
    };

    const OpcionMenu = ({ icono, titulo, onPress, mostrarFlecha = true }) => (
        <Pressable style={styles.opcionMenu} onPress={onPress}>
            <View style={styles.opcionIzquierda}>
                <Text style={styles.icono}>{icono}</Text>
                <Text style={styles.opcionTexto}>{titulo}</Text>
            </View>
            {mostrarFlecha && <Text style={styles.flecha}>›</Text>}
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <View style={styles.headerCard}>
                        <Pressable onPress={() => navigation?.goBack?.()} style={styles.botonAtras}>
                            <Text style={styles.iconoAtras}>‹</Text>
                        </Pressable>
                        <Text style={styles.headerTitle}>Configuración</Text>
                        <View style={styles.iconoVisible}>
                            <Text style={styles.iconoOjo}></Text>
                        </View>
                    </View>
                </View>

                {/* Sección Perfil */}
                <View style={styles.seccionPerfil}>
                    <Pressable 
                        style={styles.perfilCard}
                        onPress={() => navigation?.navigate?.('EdicionPerfil')}
                    >
                        <View style={styles.perfilIzquierda}>
                            <Text style={styles.iconoPerfil}>👤</Text>
                            <Text style={styles.perfilTexto}>Perfil</Text>
                        </View>
                        <Text style={styles.flecha}>›</Text>
                    </Pressable>
                </View>

                {/* Sección Generales */}
                <View style={styles.seccionContainer}>
                    <Text style={styles.seccionTitulo}>Generales</Text>
                    <View style={styles.opcionesContainer}>
                        <OpcionMenu 
                            icono="🌐" 
                            titulo="Idioma y contenido"
                            onPress={() => setModalIdioma(true)}
                        />
                        <OpcionMenu 
                            icono="📄" 
                            titulo="Accesibilidad"
                            onPress={() => setModalAccesibilidad(true)}
                        />
                        <OpcionMenu 
                            icono="☁️" 
                            titulo="Almacenamiento"
                            onPress={() => setModalAlmacenamiento(true)}
                        />
                        <OpcionMenu 
                            icono="🎨" 
                            titulo="Apariencia"
                            onPress={() => setModalApariencia(true)}
                        />
                    </View>
                </View>

                {/* Sección Soporte */}
                <View style={styles.seccionContainer}>
                    <Pressable 
                        style={styles.soporteCard}
                        onPress={() => setModalSoporte(true)}
                    >
                        <View style={styles.soporteIzquierda}>
                            <Text style={styles.icono}>❓</Text>
                            <Text style={styles.soporteTexto}>Soporte y Ayuda</Text>
                        </View>
                        <Text style={styles.flecha}>›</Text>
                    </Pressable>
                </View>

                {/* Botón Cerrar Sesión */}
                <View style={styles.seccionContainer}>
                    <Pressable style={styles.botonCerrarSesion} onPress={handleCerrarSesion}>
                        <Text style={styles.textoCerrarSesion}>Cerrar Sesión</Text>
                    </Pressable>
                </View>
            </ScrollView>

            {/* Modal Idioma y Contenido */}
            <Modal
                visible={modalIdioma}
                transparent
                animationType="slide"
                onRequestClose={() => setModalIdioma(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContenido}>
                        <Text style={styles.modalTitulo}>Idioma y Contenido</Text>
                        
                        <View style={styles.configItem}>
                            <Text style={styles.configLabel}>Idioma de la aplicación</Text>
                            <Pressable 
                                style={styles.selectorBtn}
                                onPress={() => {
                                    Alert.alert('Idioma', 'Selecciona un idioma', [
                                        { text: 'Español', onPress: () => setIdioma('Español') },
                                        { text: 'English', onPress: () => setIdioma('English') },
                                        { text: 'Cancelar', style: 'cancel' }
                                    ]);
                                }}
                            >
                                <Text style={styles.selectorText}>{idioma}</Text>
                                <Text style={styles.iconoDown}>▼</Text>
                            </Pressable>
                        </View>

                        <Pressable style={styles.botonCerrarModal} onPress={() => setModalIdioma(false)}>
                            <Text style={styles.textoCerrarModal}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Modal Accesibilidad */}
            <Modal
                visible={modalAccesibilidad}
                transparent
                animationType="slide"
                onRequestClose={() => setModalAccesibilidad(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContenido}>
                        <Text style={styles.modalTitulo}>Accesibilidad</Text>
                        
                        <View style={styles.configItem}>
                            <Text style={styles.configLabel}>Subtítulos automáticos</Text>
                            <Switch
                                value={notificaciones}
                                onValueChange={setNotificaciones}
                                trackColor={{ false: '#d1d1d1', true: '#2B5DA2' }}
                            />
                        </View>

                        <View style={styles.configItem}>
                            <Text style={styles.configLabel}>Efectos de sonido</Text>
                            <Switch
                                value={sonido}
                                onValueChange={setSonido}
                                trackColor={{ false: '#d1d1d1', true: '#2B5DA2' }}
                            />
                        </View>

                        <View style={styles.configItem}>
                            <Text style={styles.configLabel}>Alto contraste</Text>
                            <Switch
                                value={false}
                                onValueChange={() => Alert.alert('Info', 'Función en desarrollo')}
                                trackColor={{ false: '#d1d1d1', true: '#2B5DA2' }}
                            />
                        </View>

                        <Pressable style={styles.botonCerrarModal} onPress={() => setModalAccesibilidad(false)}>
                            <Text style={styles.textoCerrarModal}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Modal Almacenamiento */}
            <Modal
                visible={modalAlmacenamiento}
                transparent
                animationType="slide"
                onRequestClose={() => setModalAlmacenamiento(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContenido}>
                        <Text style={styles.modalTitulo}>Almacenamiento</Text>
                        
                        <View style={styles.configItem}>
                            <Text style={styles.configLabel}>Autoguardado</Text>
                            <Switch
                                value={autoguardado}
                                onValueChange={setAutoguardado}
                                trackColor={{ false: '#d1d1d1', true: '#2B5DA2' }}
                            />
                        </View>

                        <View style={styles.infoAlmacenamiento}>
                            <Text style={styles.iconoInfo}>ℹ️</Text>
                            <Text style={styles.infoTexto}>Espacio usado: 12.5 MB</Text>
                        </View>

                        <Pressable style={styles.botonAccion} onPress={limpiarCache}>
                            <Text style={styles.iconoTrash}>🗑️</Text>
                            <Text style={styles.botonAccionTexto}>Limpiar caché</Text>
                        </Pressable>

                        <Pressable style={styles.botonCerrarModal} onPress={() => setModalAlmacenamiento(false)}>
                            <Text style={styles.textoCerrarModal}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Modal Apariencia */}
            <Modal
                visible={modalApariencia}
                transparent
                animationType="slide"
                onRequestClose={() => setModalApariencia(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContenido}>
                        <Text style={styles.modalTitulo}>Apariencia</Text>
                        
                        <View style={styles.configItem}>
                            <Text style={styles.configLabel}>Modo oscuro</Text>
                            <Switch
                                value={modoOscuro}
                                onValueChange={(value) => {
                                    setModoOscuro(value);
                                    Alert.alert('Info', 'El modo oscuro estará disponible próximamente');
                                }}
                                trackColor={{ false: '#d1d1d1', true: '#2B5DA2' }}
                            />
                        </View>

                        <View style={styles.infoAlmacenamiento}>
                            <Text style={styles.iconoInfo}>ℹ️</Text>
                            <Text style={styles.infoTexto}>
                                Cambia el tema visual de la aplicación
                            </Text>
                        </View>

                        <Pressable style={styles.botonCerrarModal} onPress={() => setModalApariencia(false)}>
                            <Text style={styles.textoCerrarModal}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Modal Soporte y Ayuda */}
            <Modal
                visible={modalSoporte}
                transparent
                animationType="slide"
                onRequestClose={() => setModalSoporte(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContenido}>
                        <Text style={styles.modalTitulo}>Soporte y Ayuda</Text>
                        
                        <Pressable 
                            style={styles.opcionSoporte}
                            onPress={() => Alert.alert('Centro de ayuda', 'Próximamente disponible')}
                        >
                            <Text style={styles.iconoSoporte}>📚</Text>
                            <Text style={styles.opcionSoporteTexto}>Centro de ayuda</Text>
                        </Pressable>

                        <Pressable 
                            style={styles.opcionSoporte}
                            onPress={() => Alert.alert('Contacto', 'Email: soporte@singbridge.com')}
                        >
                            <Text style={styles.iconoSoporte}>✉️</Text>
                            <Text style={styles.opcionSoporteTexto}>Contactar soporte</Text>
                        </Pressable>

                        <Pressable 
                            style={styles.opcionSoporte}
                            onPress={() => Alert.alert('Versión', 'SingBridge v1.0.0')}
                        >
                            <Text style={styles.iconoSoporte}>ℹ️</Text>
                            <Text style={styles.opcionSoporteTexto}>Acerca de</Text>
                        </Pressable>

                        <Pressable 
                            style={styles.opcionSoporte}
                            onPress={() => Alert.alert('Políticas', 'Términos y condiciones disponibles en nuestro sitio web')}
                        >
                            <Text style={styles.iconoSoporte}>🛡️</Text>
                            <Text style={styles.opcionSoporteTexto}>Términos y privacidad</Text>
                        </Pressable>

                        <Pressable style={styles.botonCerrarModal} onPress={() => setModalSoporte(false)}>
                            <Text style={styles.textoCerrarModal}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <BarraNavegacionInferior selectedTab={selectedTab} onTabChange={handleTabChange} />
        </View>
    );
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
        marginBottom: 20,
    },
    headerCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 15,
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
    },
    iconoAtras: {
        fontSize: 32,
        color: '#000',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        flex: 1,
        textAlign: 'center',
    },
    iconoVisible: {
        width: 24,
    },
    iconoOjo: {
        fontSize: 20,
    },
    seccionPerfil: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    perfilCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    perfilIzquierda: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconoPerfil: {
        fontSize: 36,
        marginRight: 15,
    },
    perfilTexto: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    seccionContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    seccionTitulo: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
    },
    opcionesContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    opcionMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    opcionIzquierda: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icono: {
        fontSize: 22,
        marginRight: 15,
    },
    opcionTexto: {
        fontSize: 16,
        color: '#333',
    },
    flecha: {
        fontSize: 24,
        color: '#999',
        fontWeight: 'bold',
    },
    soporteCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    soporteIzquierda: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    soporteTexto: {
        fontSize: 16,
        color: '#333',
    },
    botonCerrarSesion: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FF3B30',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    textoCerrarSesion: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF3B30',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContenido: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 25,
        minHeight: 300,
    },
    modalTitulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 25,
    },
    configItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    configLabel: {
        fontSize: 16,
        color: '#333',
    },
    selectorBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    selectorText: {
        fontSize: 14,
        color: '#333',
        marginRight: 8,
    },
    iconoDown: {
        fontSize: 12,
        color: '#666',
    },
    infoAlmacenamiento: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
    },
    iconoInfo: {
        fontSize: 18,
        marginRight: 10,
    },
    infoTexto: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    botonAccion: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF5F5',
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#FFE0E0',
    },
    iconoTrash: {
        fontSize: 18,
        marginRight: 10,
    },
    botonAccionTexto: {
        fontSize: 16,
        color: '#FF3B30',
        fontWeight: '500',
    },
    opcionSoporte: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    iconoSoporte: {
        fontSize: 22,
        marginRight: 15,
    },
    opcionSoporteTexto: {
        fontSize: 16,
        color: '#333',
    },
    botonCerrarModal: {
        backgroundColor: '#2B5DA2',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 25,
    },
    textoCerrarModal: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});