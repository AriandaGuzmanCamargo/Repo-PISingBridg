import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, SafeAreaView, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');
const ANCHO = width * 0.9;

// --- Colores Consistentes ---
const COLORES = {
    azulFuerte: '#1F3A5F', // Titulo y pie de página
    azulIntermedio: '#A2BCD6', // Recuadro de navegación de letra
    blanco: '#ffffff', // Fondo de tarjeta
    grisClaro: '#e4e4e4ff', // Fondo general
};

// --- Componente de Fila de Vocabulario ---
const ItemVocabulario = ({ palabra, alPresionar }) => (
    <Pressable style={styles.contenedorItem} onPress={alPresionar}>
        <Text style={styles.textoPalabra}>{palabra}</Text>
        <Text style={styles.flecha}>{'>'}</Text>
    </Pressable>
);

export default function vocabulario({ navigation }) {
    // Datos de ejemplo
    const datosVocabulario = [
        'Agua',
        'Abrir',
        'Alto',
        'Ayuda',
        'Apetito',
        'Amigo',
        'Adiós',
    ];

    const manejarDetallePalabra = (palabra) => {
        console.log(`Navegando al detalle de: ${palabra}`);
        // navigation.navigate('DetallePalabra', { palabra });
    };

    return(
        <SafeAreaView style={styles.contenedorPrincipal}>
            {/* Cabecera (Adaptado) */}
            <View style={styles.cabecera}>
                <Pressable onPress={() => navigation.goBack()} style={styles.iconoBackContainer}>
                    <Text style={styles.textoIconoNav}>{'<'}</Text>
                </Pressable>
                <Text style={styles.tituloCabecera}>LETRA A</Text>
                <Pressable onPress={() => {/* Navegar a Ajustes */}} style={styles.iconoAjustesContainer}>
                    <Text style={styles.textoIconoNav}>{'⛭'}</Text>
                </Pressable>
            </View>

            {/* Contenido Principal */}
            <ScrollView style={styles.vistaDesplazableContenido}>
                
                {/* Sección de Navegación de Letra (Recuadro azul claro) */}
                <View style={styles.navegacionLetra}>
                    <Pressable style={styles.botonNavLetra}>
                        <Text style={styles.textoNavLetra}>{'<'}</Text>
                    </Pressable>
                    <Text style={styles.letraActual}>A</Text>
                    <Pressable style={styles.botonNavLetra}>
                        <Text style={styles.textoNavLetra}>{'>'}</Text>
                    </Pressable>
                </View>

                <Text style={styles.tituloLista}>Interfaz del vocabulario básico</Text>

                {/* Lista de Vocabulario */}
                <View style={styles.contenedorLista}>
                    {datosVocabulario.map((palabra, indice) => (
                        <ItemVocabulario 
                            key={indice} 
                            palabra={palabra} 
                            alPresionar={() => manejarDetallePalabra(palabra)}
                        />
                    ))}
                </View>

            </ScrollView>
            
            {/* Barra de Navegación Inferior (Footer) */}
            <View style={styles.piePagina}>
                <Text style={styles.iconoPie}>⚙️</Text>
                <Text style={styles.iconoPie}>🏠</Text>
                <Text style={styles.iconoPie}>👤</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        backgroundColor: COLORES.grisClaro,
    },
    // --- Cabecera de la Pantalla ---
    cabecera: {
        backgroundColor: COLORES.azulFuerte,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    tituloCabecera: {
        fontWeight: '700',
        fontSize: 18,
        color: COLORES.blanco,
    },
    iconoBackContainer: {
        padding: 5,
    },
    iconoAjustesContainer: {
        padding: 5,
    },
    textoIconoNav: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORES.blanco,
    },
    vistaDesplazableContenido: {
        flex: 1,
        padding: 15,
    },
    
    // --- Navegación de Letra (Recuadro Azul Claro) ---
    navegacionLetra: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORES.azulIntermedio, 
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
    },
    botonNavLetra: {
        backgroundColor: COLORES.azulFuerte,
        width: 35,
        height: 35,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoNavLetra: {
        color: COLORES.blanco,
        fontSize: 20,
        fontWeight: 'bold',
    },
    letraActual: {
        color: COLORES.blanco,
        fontSize: 36,
        fontWeight: 'bold',
    },
    
    // --- Lista de Vocabulario ---
    tituloLista: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        fontWeight: '500',
    },
    contenedorLista: {
        backgroundColor: COLORES.blanco,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    contenedorItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORES.grisClaro,
    },
    textoPalabra: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
    },
    flecha: {
        fontSize: 20,
        color: COLORES.azulFuerte,
    },

    // --- Pie de Página (Footer) ---
    piePagina: {
        backgroundColor: COLORES.azulFuerte,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    iconoPie: {
        fontSize: 28,
        color: COLORES.blanco,
    },
});