import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, ScrollView, Image } from 'react-native';
import BarraNavegacionInferior from '../components/BarraNavegacionInferior';


import IMAGENES_DICCIONARIO from '../utils/imagenes';
import DESCRIPCIONES_DICCIONARIO from '../utils/descripciones'; 

const { width } = Dimensions.get('window');

const COLORES = {
    azulFuerte: '#1F3A5F', 
    azulIntermedio: '#A2BCD6', 
    blanco: '#ffffff', 
    grisClaro: '#e4e4e4ff',
};

const ABECEDARIO = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const VOCABULARIO_POR_LETRA = {
    'A': ['Abajo', 'Acompañado', 'Aqui'],
    'B': ['Balon', 'Bueno', 'Bonito', 'Bondad'],
    'C': ['Comida', 'Cerrar', 'Cual', 'Cuidado'],
    'D': ['Dulce', 'Diferente', 'Duda', 'Dirigir'],
    'E': ['Enojado', 'Entregar', 'Espejo', 'Escalera'],
    'F': ['Fuego', 'Favor', 'Fin', 'Foco', 'Frio'],
    'G': ['Golpear', 'Guardar'],
    'H': ['Hambre', 'Hogar', 'Hacer', 'Horno'],
    'I': ['Iglesia', 'Invitar'],
    'J': ['Jugar', 'Jerga', 'Jardin'],
    'K': [],
    'L': ['Llave', 'Luna', 'Libre', 'Lampara', 'Licuadora'],
    'M': ['Mama', 'Manejar', 'Momentito', 'Mujer'],
    'N': ['Nino', 'Nina', 'Nadar', 'No esta'],
    'Ñ': [],
    'O': ['Otro', 'Ojala', 'Otra vez', 'Oir'],
    'P': ['Papa', 'Pasos', 'Paz', 'Pena', 'Persona'],
    'Q': ['Querer', 'Quinto'],
    'R': ['Radio', 'Rebanar', 'Regresar', 'Resumen'],
    'S': ['Senor', 'Sentar', 'Soltar', 'Soñar'],
    'T': ['Tener', 'Tienda', 'Tomar', 'Transformar'],
    'U': ['Usar', 'Unido', 'Untar', 'Urgente'],
    'V': ['Ver', 'Viejo', 'Valioso', 'Volar'],
    'W': ['Whisky'],
    'X': ['Xalapa'],
    'Y': ['Yucatan'],
    'Z': ['Zapato', 'Zanahoria', 'Zapote'],
};


const obtenerImagen = (palabra) => {
    let nombreLimpio = palabra.toLowerCase();
    let clave = `${nombreLimpio}.png`;
    if (IMAGENES_DICCIONARIO[clave]) return IMAGENES_DICCIONARIO[clave];
    
    let claveSinEnie = nombreLimpio.replace(/ñ/g, 'n') + '.png';
    if (IMAGENES_DICCIONARIO[claveSinEnie]) return IMAGENES_DICCIONARIO[claveSinEnie];

    return null;
};


const obtenerDescripcion = (palabra) => {
    let clave = palabra.toLowerCase();
    clave = clave.replace(/\s+/g, '');

    clave = clave.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return DESCRIPCIONES_DICCIONARIO[clave] || "Descripción no disponible por el momento.";
};

const ItemVocabulario = ({ palabra, imagenFuente, alPresionar }) => (
    <Pressable style={styles.contenedorItem} onPress={alPresionar}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {imagenFuente ? (
                <Image source={imagenFuente} style={styles.imagenPalabra} />
            ) : (
                <View style={styles.imagenPlaceholder} />
            )}
            <Text style={styles.textoPalabra}>{palabra}</Text>
        </View>
        <Text style={styles.flecha}>{'>'}</Text>
    </Pressable>
);

export default function Vocabulario({ navigation, route }) {
    const indiceInicial = route.params?.indiceLetra ?? 0;
    const [indiceLetra, setIndiceLetra] = useState(indiceInicial);
    const [selectedTab, setSelectedTab] = useState('home');
    
    useEffect(() => {
        if (route.params?.indiceLetra !== undefined) {
            setIndiceLetra(route.params.indiceLetra);
        }
    }, [route.params?.indiceLetra]);
    
    const letraActual = ABECEDARIO[indiceLetra];
    const palabrasActuales = VOCABULARIO_POR_LETRA[letraActual] || [];

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const irLetraAnterior = () => {
        if (indiceLetra > 0) setIndiceLetra(indiceLetra - 1);
    };

    const irLetraSiguiente = () => {
        if (indiceLetra < ABECEDARIO.length - 1) setIndiceLetra(indiceLetra + 1);
    };

    const manejarDetallePalabra = (palabra, imagen, descripcion) => {
        navigation.navigate('detalleVocabulario', { 
            palabra: palabra,
            imagen: imagen,
            descripcion: descripcion 
        });
    };

    return(
        <View style={styles.contenedorPrincipal}>
            <View style={styles.headerContainer}>
                <View style={styles.headerCard}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.botonAtras}>
                        <Text style={styles.textoBotonAtras}>←</Text>
                    </Pressable>
                    <Text style={styles.headerTitle}>Vocabulario - {letraActual}</Text>
                    <Image source={require('../assets/Logo.png')} style={styles.headerLogo} />
                </View>
            </View>

            <ScrollView style={styles.vistaDesplazableContenido} contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.navegacionLetra}>
                    <Pressable 
                        style={[styles.botonNavLetra, indiceLetra === 0 && styles.botonDeshabilitado]}
                        onPress={irLetraAnterior}
                        disabled={indiceLetra === 0}
                    >
                        <Text style={styles.textoNavLetra}>{'<'}</Text>
                    </Pressable>
                    <Text style={styles.letraActual}>{letraActual}</Text>
                    <Pressable 
                        style={[styles.botonNavLetra, indiceLetra === ABECEDARIO.length - 1 && styles.botonDeshabilitado]}
                        onPress={irLetraSiguiente}
                        disabled={indiceLetra === ABECEDARIO.length - 1}
                    >
                        <Text style={styles.textoNavLetra}>{'>'}</Text>
                    </Pressable>
                </View>

                <Text style={styles.tituloLista}>Diccionario de Señas</Text>

                <View style={styles.contenedorLista}>
                    {palabrasActuales.length > 0 ? (
                        palabrasActuales.map((palabra, indice) => {
                            const imgSource = obtenerImagen(palabra);
                            const descTexto = obtenerDescripcion(palabra);
                            
                            return (
                                <ItemVocabulario 
                                    key={indice} 
                                    palabra={palabra} 
                                    imagenFuente={imgSource}
                                    alPresionar={() => manejarDetallePalabra(palabra, imgSource, descTexto)}
                                />
                            );
                        })
                    ) : (
                        <View style={styles.sinPalabras}>
                            <Text style={styles.textoSinPalabras}>
                                No hay palabras disponibles para esta letra
                            </Text>
                        </View>
                    )}
                </View>

            </ScrollView>
            
            <BarraNavegacionInferior 
                selectedTab={selectedTab} 
                onTabChange={handleTabChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        backgroundColor: COLORES.grisClaro,
    },
    headerContainer: {
        paddingTop: 50, 
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    headerCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        paddingVertical: 15, 
        paddingHorizontal: 20,
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
        marginRight: 10 
    },
    textoBotonAtras: { 
        fontSize: 28, 
        color: '#000', 
        fontWeight: 'bold' 
    },
    headerTitle: { 
        fontSize: 20, 
        fontWeight: '600', 
        color: '#000' 
    },
    headerLogo: { 
        width: 40, 
        height: 40, 
        resizeMode: 'contain' 
    },
    vistaDesplazableContenido: { 
        flex: 1, 
        padding: 15 
    },
    scrollContent: { 
        paddingBottom: 100 
    },
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
    botonDeshabilitado: { 
        backgroundColor: '#94A3B8', 
        opacity: 0.5 
    },
    textoNavLetra: { 
        color: COLORES.blanco, 
        fontSize: 20, 
        fontWeight: 'bold' 
    },
    letraActual: { 
        color: COLORES.blanco, 
        fontSize: 36, 
        fontWeight: 'bold' 
    },
    tituloLista: { 
        fontSize: 16, 
        color: '#666', 
        marginBottom: 10, 
        fontWeight: '500' 
    },
    contenedorLista: {
        backgroundColor: COLORES.blanco,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        overflow: 'hidden'
    },
    contenedorItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10, 
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORES.grisClaro,
    },
    imagenPalabra: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 15,
        resizeMode: 'cover',
    },
    imagenPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 15,
        backgroundColor: '#eee',
    },
    textoPalabra: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
    },
    flecha: { 
        fontSize: 20, 
        color: COLORES.azulFuerte 
    },
    sinPalabras: { 
        padding: 30, 
        alignItems: 'center' 
    },
    textoSinPalabras: { 
        fontSize: 16, 
        color: '#999', 
        textAlign: 'center' 
    },
});