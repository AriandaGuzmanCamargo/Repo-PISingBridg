import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image, TextInput, Dimensions } from 'react-native';
import BarraNavegacionInferior from '../components/BarraNavegacionInferior'; 

const { width } = Dimensions.get('window');
const COLORES = {
    azulFuerte: '#1F3A5F', 
    azulIntermedio: '#A2BCD6', 
    blanco: '#ffffff',
    grisClaro: '#e4e4e4ff',
    grisMedio: '#CCCCCC',
    negro: '#000000',
    azulBoton: '#004A93', 
};


export default function Traductor({ navigation }) {
    
    const [textoEntrada, setTextoEntrada] = useState('Ellos');
    const [selectedTab, setSelectedTab] = useState('home');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        if (tab === 'home') navigation.navigate(tab);
    };

    const handleSwitch = () => {
        alert("Función de alternar no implementada");
    };

    return (
        <View style={estilos.contenedorPrincipal}>
            <View style={estilos.contenedorEncabezado}>
                <View style={estilos.tarjetaEncabezado}>
                    <Pressable onPress={() => navigation.goBack()} style={estilos.botonVolver}>
                        <Text style={estilos.textoBotonVolver}>←</Text>
                    </Pressable>
                    <Text style={estilos.tituloEncabezado}>SignBridge</Text> 
                    <Image 
                        source={require('../assets/Logo.png')} 
                        style={estilos.logoEncabezado} 
                    />
                </View>


                <View style={estilos.contenedorBotonPrincipal}>
                    <Pressable style={estilos.botonPrincipal}>
                        <Text style={estilos.textoBotonPrincipal}>Traductor</Text>
                    </Pressable>
                </View>
            </View>

            <ScrollView contentContainerStyle={estilos.contenidoScroll} showsVerticalScrollIndicator={false}>
                

                <View style={estilos.contenedorMedios}>
                    
        
                    <View style={estilos.columnaMedio}>
                        <Text style={estilos.tituloMedio}>Texto</Text>
                        <View style={estilos.tarjetaEntrada}>
                            <TextInput
                                style={estilos.inputTexto}
                                onChangeText={setTextoEntrada}
                                value={textoEntrada}
                                multiline={true}
                                placeholder="Escribe aquí..."
                            />
                        </View>
                    </View>

                    <Pressable onPress={handleSwitch} style={estilos.botonAlternar}>
                        <Text style={estilos.iconoAlternar}>⇆</Text>
                    </Pressable>

           
                    <View style={estilos.columnaMedio}>
                        <Text style={estilos.tituloMedio}>Señas</Text>
                        <View style={estilos.tarjetaSalida}>
            
                            <Image 
                                source={{ uri: 'https://placehold.co/150x150/d1d1d1/000000?text=SEÑA' }} 
                                style={estilos.imagenSeña}
                            />
                        </View>
                    </View>
                </View>

                <View style={estilos.contenedorDescripcion}>
                    <Text style={estilos.tituloDescripcion}>Descripción</Text>
                    <Text style={estilos.textoDescripcion}>
                        Se estira el dedo índice, se mueve en medio círculo, y con él se señala a varias personas.
                    </Text>
                </View>

            </ScrollView>


            <BarraNavegacionInferior 
                selectedTab={selectedTab} 
                onTabChange={handleTabChange}
            />
        </View>
    );
}

const estilos = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        backgroundColor: COLORES.azulIntermedio,
    },
    contenedorEncabezado: {
        backgroundColor: COLORES.azulIntermedio,
        paddingTop: 50, 
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
    },
    tarjetaEncabezado: {
        backgroundColor: COLORES.blanco,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    botonVolver: {
        padding: 5,
    },
    textoBotonVolver: {
        fontSize: 28,
        color: COLORES.negro,
        fontWeight: 'bold',
    },
    tituloEncabezado: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORES.negro,
    },
    logoEncabezado: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    contenedorBotonPrincipal: {
        alignItems: 'center',
    },
    botonPrincipal: {
        backgroundColor: COLORES.azulBoton,
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 50,
        width: width * 0.7,
        alignItems: 'center',
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    textoBotonPrincipal: {
        color: COLORES.blanco,
        fontSize: 22,
        fontWeight: 'bold',
    },
    contenidoScroll: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 120, 
    },
    contenedorMedios: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
        position: 'relative',
    },
    columnaMedio: {
        width: '45%', 
    },
    tituloMedio: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORES.negro,
        marginBottom: 5,
        textAlign: 'center',
    },
    tarjetaEntrada: {
        backgroundColor: COLORES.grisClaro,
        borderRadius: 10,
        height: 150,
        justifyContent: 'center',
        padding: 10,
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    inputTexto: {
        fontSize: 16,
        color: COLORES.negro,
        textAlignVertical: 'center',
        height: '100%',
        padding: 0,

    },
    botonAlternar: {
        position: 'absolute',
        top: '30%', 
        left: '46%', // Posiciona cerca del centro horizontal
        zIndex: 10, // Asegura que esté encima de las tarjetas
        backgroundColor: COLORES.blanco,
        borderRadius: 50,
        padding: 5,
        borderWidth: 1,
        borderColor: COLORES.grisMedio,
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    iconoAlternar: {
        fontSize: 24,
        color: COLORES.azulBoton,
        fontWeight: 'bold',
    },
    tarjetaSalida: {
        backgroundColor: COLORES.grisClaro,
        borderRadius: 10,
        height: 150,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    imagenSeña: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    contenedorDescripcion: {
        backgroundColor: COLORES.blanco,
        borderRadius: 10,
        padding: 20,
        shadowColor: COLORES.negro,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tituloDescripcion: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORES.azulFuerte,
        marginBottom: 10,
    },
    textoDescripcion: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
});