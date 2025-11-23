import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default function Login () {
    return (
        <View style={styles.container}>
            <View style={styles.titulocontainer}>
                <View style={styles.titulo}>
                    <Text style={styles.textoTitulo}>SingBridge</Text>
                </View>
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
    },
    textoTitulo: {
        fontFamily:'Times New Roman',
        fontWeight: '700',
        fontSize: 25,
        color: '#ffffffff',
    },
})