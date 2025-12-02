import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BarraNavegacionInferior({ selectedTab, onTabChange }) {
    const navigation = useNavigation();

    return (
        <View style={styles.barraInferior}>
            <Pressable 
                style={styles.botonTab}
                onPress={() => {
                    onTabChange('settings');
                    navigation.navigate('Configuracion');
                }}
            >
                <View style={[styles.iconoContainer, selectedTab === 'settings' && styles.iconoActivo]}>
                    <Image source={require('../assets/configuraciones.png')} style={styles.icono}/>
                </View>
            </Pressable>
            
            <Pressable 
                style={styles.botonTab}
                onPress={() => {
                    onTabChange('home');
                    navigation.navigate('Dashboard');
                }}
            >
                <View style={[styles.iconoContainer, styles.iconoCentral, selectedTab === 'home' && styles.iconoActivo]}>
                    <Image source={require('../assets/boton-de-inicio.png')} style={styles.iconoCentro}/>
                </View>
            </Pressable>
            
            <Pressable 
                style={styles.botonTab}
                onPress={() => {
                    onTabChange('profile');
                    navigation.navigate('EdicionPerfil');
                }}
            >
                <View style={[styles.iconoContainer, selectedTab === 'profile' && styles.iconoActivo]}>
                    <Image source={require('../assets/usuario.png')} style={styles.icono}/>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    barraInferior: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: '#2B5DA2',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    botonTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconoContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconoCentral: {
        backgroundColor: '#FFFFFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: -30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    iconoActivo: {
        backgroundColor: 'rgba(122, 211, 239, 0.3)',
        borderRadius: 25,
    },
    icono: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    iconoCentro: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
    },
});
