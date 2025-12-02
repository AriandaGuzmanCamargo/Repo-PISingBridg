import { Text, StyleSheet, View, Image,TextInput,Pressable, Dimensions, Alert, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { AuthController } from '../controllers/AuthController'
import { initDatabase } from '../database/database'

const { width } = Dimensions.get('window');
export default function Registro ({ navigation }) {
    const [nombre, setNombre] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [cargando, setCargando] = React.useState(false);
    
    // Inicializar la base de datos cuando se carga el componente
    useEffect(() => {
        initDatabase()
            .then(() => console.log('Base de datos inicializada'))
            .catch(error => console.error('Error al inicializar BD:', error));
    }, []);
    
    //validacion de formulario y registro
    const validacion = async () => {
        setCargando(true);
        
        try {
            const resultado = await AuthController.registrarUsuario(
                nombre,
                email,
                password,
                confirmPassword
            );
            
            if (resultado.exito) {
                Alert.alert("Éxito", resultado.mensaje, [
                    {
                        text: "OK",
                        onPress: () => {
                            // Limpiar formulario
                            setNombre('');
                            setEmail('');
                            setPassword('');
                            setConfirmPassword('');
                            navigation.navigate('Login');
                        }
                    }
                ]);
            } else {
                Alert.alert("Error", resultado.mensaje);
            }
        } catch (error) {
            console.error('Error en registro:', error);
            Alert.alert("Error", "Ocurrió un error al registrar. Intente nuevamente.");
        } finally {
            setCargando(false);
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
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contTex}>
                    <Text style={styles.text}>Regístrate</Text>
                </View>
                <View style={styles.contLogo}>
                    <Image source={require('../assets/Logo.png')} style={styles.logo} />
                </View>
            
            <View style={styles.formulario}>
                <View style={styles.inputContainer}>
                    <Text style={styles.etiqueta}>Nombre:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Tu nombre completo'
                            placeholderTextColor='#999'
                            value={nombre}
                            onChangeText={setNombre}
                        />
                    </View>
                    
                    <View style={styles.linea}></View>
                    
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
                    
                    <View style={styles.linea}></View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.etiqueta}>Confirmar Contraseña:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='••••••••'
                            placeholderTextColor='#999'
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>
                    
                    <Pressable 
                        style={[styles.botonIniciar, cargando && styles.botonDeshabilitado]} 
                        onPress={validacion}
                        disabled={cargando}
                    >
                        {cargando ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.textoBotonIniciar}>Registrarse</Text>
                        )}
                    </Pressable>
                    
                    <Pressable style={styles.botonRegistro} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.textoRegistro}>¿Ya tienes cuenta? <Text style={styles.textoRegistroDestacado}>Inicia Sesión</Text></Text>
                    </Pressable>
                </View>
            </ScrollView>
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
        width: 115,
        height: 115,
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
})