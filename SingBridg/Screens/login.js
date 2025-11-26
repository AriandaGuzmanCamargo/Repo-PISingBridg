import { Text, StyleSheet, View, Image,TextInput,Pressable, Dimensions, Alert, Modal, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AuthController } from '../controllers/AuthController'
import { initDatabase } from '../database/database'

const { width } = Dimensions.get('window');
export default function Login ({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cargando, setCargando] = React.useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [recoverEmail, setRecoverEmail] = useState('');

    // Inicializar la base de datos cuando se carga el componente
    useEffect(() => {
        initDatabase()
            .then(() => console.log('Base de datos inicializada en Login'))
            .catch(error => console.error('Error al inicializar BD:', error));
    }, []);

    //validacion de formulario y login
    const validacion = async () => {
        setCargando(true);
        
        try {
            const resultado = await AuthController.iniciarSesion(email, password);
            
            if (resultado.exito) {
                // Limpiar formulario
                setEmail('');
                setPassword('');
                // Navegar al Dashboard
                navigation.navigate('Dashboard');
            } else {
                Alert.alert("Error", resultado.mensaje);
            }
        } catch (error) {
            console.error('Error en login:', error);
            Alert.alert("Error", "Ocurrió un error al iniciar sesión. Intente nuevamente.");
        } finally {
            setCargando(false);
        }
    }

    const handleRecuperar = async () => {
        if(recoverEmail.trim() === '') {
            Alert.alert("Error", "Por favor ingresa tu correo para recuperar la contraseña");
            return;
        }
        
        try {
            const resultado = await AuthController.verificarEmailExiste(recoverEmail);
            
            if (resultado.exito) {
                Alert.alert(
                    "Correo Enviado", 
                    "Si el correo existe, recibirás instrucciones para restablecer tu contraseña."
                );
                setModalVisible(false);
                setRecoverEmail('');
            } else {
                Alert.alert("Error", "No se encontró una cuenta con ese correo");
            }
        } catch (error) {
            console.error('Error en recuperación:', error);
            Alert.alert("Error", "Ocurrió un error. Intente nuevamente.");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.titulocontainer}>
                <Pressable style={styles.botonRegresar} onPress={() => navigation.goBack()}>
                    <Text style={styles.flechaRegresar}>←</Text>
                </Pressable>
                <View style={styles.titulo}>
                    <Text style={styles.textoTitulo}>SingBridge</Text>
                </View>
                <View style={styles.espacioVacio}></View>
            </View>
            
            <View style={styles.contTex}>
                <Text style={styles.text}>Inicia Sesión</Text>
            </View>
            <View style={styles.contLogo}>
                <Image source={require('../assets/usuario.png')} style={styles.logo} />
            </View>
            
            <View style={styles.formulario}>
                <View style={styles.inputContainer}>
                    <Text style={styles.etiqueta}>Email:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='ejemplo@gmail.com'
                            placeholderTextColor='#999'
                            keyboardType='email-address'
                            value={email}
                            onChangeText={setEmail}

                        />
                    </View>
                    
                    <View style={styles.linea}></View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.etiqueta}>Contraseña:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='••••••••'
                            placeholderTextColor='#999'
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    
                    <Pressable style={styles.olvidoContra} onPress={() => setModalVisible(true)}>
                        <Text style={styles.textoOlvido}>¿Olvidaste tu contraseña?</Text>
                    </Pressable>
                    <Pressable 
                        style={[styles.botonIniciar, cargando && styles.botonDeshabilitado]} 
                        onPress={validacion}
                        disabled={cargando}
                    >
                        {cargando ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.textoBotonIniciar}>Iniciar Sesión</Text>
                        )}
                    </Pressable>
                    
                    <Pressable style={styles.botonRegistro} onPress={() => navigation.navigate('Registro')}>
                        <Text style={styles.textoRegistro}>¿No tienes una cuenta? <Text style={styles.textoRegistroDestacado}>Regístrate</Text></Text>
                    </Pressable>
                </View>

                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Recuperar Contraseña</Text>
                        <Text style={styles.modalText}>Ingresa tu correo electrónico para recibir instrucciones.</Text>
                        
                        <TextInput
                            style={[styles.input, { width: '100%', marginBottom: 20 }]}
                            placeholder='ejemplo@gmail.com'
                            placeholderTextColor='#999'
                            keyboardType='email-address'
                            value={recoverEmail}
                            onChangeText={setRecoverEmail}/>

                        <Pressable style={[styles.botonIniciar, { marginBottom: 10, width: '100%' }]} onPress={handleRecuperar}>
                            <Text style={styles.textoBotonIniciar}>Enviar</Text>
                        </Pressable>

                        <Pressable style={[styles.botonRegistro]} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={[styles.textoRegistroDestacado, { color: '#FF4444' }]}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A2BCD6',
    },
    titulocontainer: {
        backgroundColor: '#1F3A5F',
        fontWeight: '700',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    botonRegresar: {
        padding: 5,
    },
    flechaRegresar: {
        fontSize: 30,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    titulo: {
        flex: 1,
        alignItems: 'center',
    },
    espacioVacio: {
        width: 40,
    },
    textoTitulo: {
        fontFamily:'Times New Roman',
        fontWeight: '700',
        fontSize: 25,
        color: '#ffffffff',
    },
    contTex: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0E3A6F',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginTop: 20,
    },
    contLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    formulario: {
        paddingHorizontal: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    linea: {
        height: 1,
        backgroundColor: '#000000',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    etiqueta: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 14,
        fontSize: 16,
        borderWidth: 2,
        borderColor: '#004A93',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    olvidoContra: {
        alignSelf: 'flex-end',
        marginBottom: 25,
    },
    textoOlvido: {
        color: '#1103AB',
        fontSize: 14,
        fontWeight: '500',
    },
    botonIniciar: {
        backgroundColor: '#004A93',
        borderRadius: 14,
        paddingVertical: 15,
        paddingHorizontal: 50,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 10,
        shadowColor: '#004A93',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
    botonDeshabilitado: {
        backgroundColor: '#6B8BB5',
        opacity: 0.7,
    },
    textoBotonIniciar: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
    botonRegistro: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    textoRegistro: {
        color: '#000000',
        fontSize: 14,
    },
    textoRegistroDestacado: {
        fontWeight: '700',
        textDecorationLine: 'underline',
        color: '#1103AB',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.6)' // Fondo oscuro semitransparente
    },
    modalView: {
        width: '85%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#1F3A5F',
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
        color: '#555',
        fontSize: 16
    }
})