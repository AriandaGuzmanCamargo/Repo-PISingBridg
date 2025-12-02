import { Text, StyleSheet, View, Image,TextInput,Pressable, Dimensions, Alert, Modal, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AuthController } from '../controllers/AuthController'
import { initDatabase } from '../database/database'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
export default function Login ({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cargando, setCargando] = React.useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [recoverEmail, setRecoverEmail] = useState('');
    const [recoveryStep, setRecoveryStep] = useState(1); 
    const [generatedCode, setGeneratedCode] = useState('');
    const [enteredCode, setEnteredCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

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
                try{
                    await AsyncStorage.setItem(
                        'usuario',
                        JSON.stringify(resultado.usuario));

                    } catch (error){
                    console.error('Error al guardar en AsyncStorage:', error);
                }

                // Limpiar formulario
                setEmail('');
                setPassword('');

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard' }],
                });
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
            // Generar código local y mostrarlo en la UI
            const resultado = await AuthController.generarCodigoRecuperacionLocal(recoverEmail);

            if (resultado.exito) {
                setGeneratedCode(resultado.codigo || '');
                setRecoveryStep(2);
                // Mostrar aviso aclaratorio
                Alert.alert('Código Generado', 'Se generó un código de verificación local. En el siguiente paso ingrésalo junto con la nueva contraseña.');
            } else {
                Alert.alert('Error', resultado.mensaje || 'No se encontró una cuenta con ese correo');
            }
        } catch (error) {
            console.error('Error en recuperación:', error);
            Alert.alert('Error', 'Ocurrió un error. Intente nuevamente.');
        }
    }

    const handleVerificarYCambiar = async () => {
        if (!enteredCode.trim()) {
            Alert.alert('Error', 'Ingresa el código de verificación');
            return;
        }
        if (!newPassword || !confirmNewPassword) {
            Alert.alert('Error', 'Ingresa la nueva contraseña y confírmala');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        try {
            const resultado = await AuthController.verificarCodigoYCambiar(recoverEmail, enteredCode.trim(), newPassword);
            if (resultado.exito) {
                Alert.alert('Éxito', 'Contraseña actualizada correctamente. Ahora puedes iniciar sesión con la nueva contraseña.');
                setModalVisible(false);
                setRecoverEmail('');
                setRecoveryStep(1);
                setGeneratedCode('');
                setEnteredCode('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                Alert.alert('Error', resultado.mensaje || 'No se pudo actualizar la contraseña');
            }
        } catch (error) {
            console.error('Error al cambiar contraseña:', error);
            Alert.alert('Error', 'Ocurrió un error al actualizar la contraseña');
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
                        {recoveryStep === 1 ? (
                            <>
                                <Text style={styles.modalText}>Ingresa tu correo electrónico para generar un código local.</Text>

                                <TextInput
                                    style={[styles.input, { width: '100%', marginBottom: 20 }]}
                                    placeholder='ejemplo@gmail.com'
                                    placeholderTextColor='#999'
                                    keyboardType='email-address'
                                    value={recoverEmail}
                                    onChangeText={setRecoverEmail}/>

                                <Pressable style={[styles.botonIniciar, { marginBottom: 10, width: '100%' }]} onPress={handleRecuperar}>
                                    <Text style={styles.textoBotonIniciar}>Generar Código</Text>
                                </Pressable>

                                <Pressable style={[styles.botonRegistro]} onPress={() => { setModalVisible(!modalVisible); setRecoveryStep(1); setGeneratedCode(''); }}>
                                    <Text style={[styles.textoRegistroDestacado, { color: '#FF4444' }]}>Cancelar</Text>
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <Text style={styles.modalText}>Código generado:</Text>
                                <Text style={[styles.modalText, { fontWeight: '700', fontSize: 18, color: '#1103AB' }]}>{generatedCode}</Text>

                                <TextInput
                                    style={[styles.input, { width: '100%', marginBottom: 10 }]}
                                    placeholder='Ingresa el código'
                                    placeholderTextColor='#999'
                                    keyboardType='number-pad'
                                    value={enteredCode}
                                    onChangeText={setEnteredCode}
                                />

                                <TextInput
                                    style={[styles.input, { width: '100%', marginBottom: 10 }]}
                                    placeholder='Nueva contraseña'
                                    placeholderTextColor='#999'
                                    secureTextEntry={true}
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                />

                                <TextInput
                                    style={[styles.input, { width: '100%', marginBottom: 20 }]}
                                    placeholder='Confirmar nueva contraseña'
                                    placeholderTextColor='#999'
                                    secureTextEntry={true}
                                    value={confirmNewPassword}
                                    onChangeText={setConfirmNewPassword}
                                />

                                <Pressable style={[styles.botonIniciar, { marginBottom: 10, width: '100%' }]} onPress={handleVerificarYCambiar}>
                                    <Text style={styles.textoBotonIniciar}>Verificar y Cambiar</Text>
                                </Pressable>

                                <Pressable style={[styles.botonRegistro]} onPress={() => { setModalVisible(!modalVisible); setRecoveryStep(1); setGeneratedCode(''); setEnteredCode(''); setNewPassword(''); setConfirmNewPassword(''); }}>
                                    <Text style={[styles.textoRegistroDestacado, { color: '#FF4444' }]}>Cancelar</Text>
                                </Pressable>
                            </>
                        )}
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
        paddingTop: 30,
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