import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput, Dimensions, Modal } from 'react-native';

const { width } = Dimensions.get('window');
const ANCHO = width * 0.9;

export default function Inicio({ navigation }) {
    return(
        <View style={styles.container}>
            <View style={styles.titulocontainer}>
                <View style={styles.titulo}>
                    <Text style={styles.textoTitulo}>SingBridge</Text>
                </View>
            </View>
            <View style={styles.bienvenida}>
                <Image source={require('../assets/Logo.png')} style={styles.logo} />
                <Text style={styles.textoBienvenida}>¡Bienvenido a SingBridge!</Text>
            </View>

            <View style={styles.fondoM}>
                <View style={styles.sombraContenedor}>
                    <View style={styles.modalContenido}>

                        <Pressable style={styles.botonConfirmar} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.textoBoton}>Iniciar Sesión</Text>
                        </Pressable>

                        <Pressable style={styles.botonConfirmar} onPress={() => navigation.navigate('Registro')}>
                            <Text style={styles.textoBoton}>Registrarse</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
         </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4e4e4ff',
    },
    titulocontainer: {
        backgroundColor: '#1F3A5F',
        fontWeight: '700',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoTitulo: {
        fontFamily:'Times New Roman',
        fontWeight: '700',
        fontSize: 25,
        color: '#ffffffff',
    },
    bienvenida: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    textoBienvenida: {
        fontSize: 24,
        fontWeight: '600',
        color: '#0E3A6F',
    },
    botonConfirmar: {
        marginTop: 20,
        width: '80%',
        height: 70,
        borderRadius: 18,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#004A93',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        
    },
    textoBoton: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    Contrasena: {
        width: ANCHO * 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        paddingHorizontal: 18,
        paddingVertical: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    textoContra: {
        fontSize: 16,
        color: '#000',
    },
    fondoM: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.0)',
    },

    sombraContenedor: {
        width: '100%',
        backgroundColor: '#1F3A5F',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 15,
    },
    modalContenido: {
        height: '100%',
        width: '100%',
        backgroundColor: '#A2BCD6',
        paddingVertical:30,
        paddingHorizontal: 20,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    etiqueta2: {
        fontSize: 20,
        color: '#000',
        fontWeight: '500',
        marginBottom: 30,
        marginTop: 10,
    },
    input2: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 18,
    }

});
