import { Text, StyleSheet, View, Image,TextInput,Pressable, Dimensions, Alert } from 'react-native'
import React, { Component } from 'react'

const { width } = Dimensions.get('window');
export default function Login ({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    return (
        <View style={styles.container}>
            <View style={styles.titulocontainer}>
                <View style={styles.titulo}>
                    <Text style={styles.textoTitulo}>SingBridge</Text>
                </View>
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
                        />
                    </View>
                    
                    <Pressable style={styles.olvidoContra}>
                        <Text style={styles.textoOlvido}>¿Olvidaste tu contraseña?</Text>
                    </Pressable>
                    <Pressable style={styles.botonIniciar}>
                        <Text style={styles.textoBotonIniciar}>Iniciar Sesión</Text>
                    </Pressable>
                    
                    <Pressable style={styles.botonRegistro} onPress={() => navigation.navigate('Registro')}>
                        <Text style={styles.textoRegistro}>¿No tienes una cuenta? <Text style={styles.textoRegistroDestacado}>Regístrate</Text></Text>
                    </Pressable>
                </View>
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
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