import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, ScrollView, Image } from 'react-native';
import BarraNavegacionInferior from '../components/BarraNavegacionInferior';

const { width } = Dimensions.get('window');
const ANCHO = width * 0.9;

const COLORES = {
    azulFuerte: '#1F3A5F', 
    azulIntermedio: '#A2BCD6', 
    blanco: '#ffffff', 
    grisClaro: '#e4e4e4ff',
};

// Abecedario completo
const ABECEDARIO = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Vocabulario por letra
const VOCABULARIO_POR_LETRA = {
    'A': ['Agua', 'Abrir', 'Alto', 'Ayuda', 'Apetito', 'Amigo', 'Adiós'],
    'B': ['Bueno', 'Baño', 'Bebé', 'Beber', 'Beso', 'Blanco', 'Bonito'],
    'C': ['Casa', 'Comer', 'Calor', 'Caminar', 'Cansado', 'Carro', 'Cielo'],
    'D': ['Día', 'Dolor', 'Dormir', 'Dulce', 'Dinero', 'Diente', 'Derecha'],
    'E': ['Escuela', 'Enfermo', 'Esperar', 'Estudiar', 'Escribir', 'Escuchar', 'Estrella'],
    'F': ['Familia', 'Feliz', 'Frío', 'Fuego', 'Fácil', 'Feo', 'Fuerte'],
    'G': ['Gracias', 'Grande', 'Gato', 'Gustar', 'Gente', 'Guerra', 'Gobierno'],
    'H': ['Hola', 'Hermano', 'Hambre', 'Hablar', 'Hijo', 'Hermoso', 'Hombre'],
    'I': ['Iglesia', 'Importante', 'Igual', 'Idea', 'Idioma', 'Ir', 'Izquierda'],
    'J': ['Jugar', 'Joven', 'Junto', 'Justo', 'Jardín', 'Juego', 'Juntos'],
    'K': ['Kilo', 'Kilómetro'],
    'L': ['Luz', 'Lejos', 'Leer', 'Lento', 'Largo', 'Libro', 'Lindo'],
    'M': ['Mamá', 'Mañana', 'Más', 'Mejor', 'Menor', 'Mesa', 'Mucho'],
    'N': ['Niño', 'Noche', 'Nombre', 'Nuevo', 'Nunca', 'Negro', 'Nadie'],
    'Ñ': ['Año', 'Niño', 'Señor', 'Mañana'],
    'O': ['Otro', 'Oír', 'Ojo', 'Olvidar', 'Oro', 'Oscuro', 'Obra'],
    'P': ['Papá', 'Pequeño', 'Poder', 'Pedir', 'Pensar', 'Palabra', 'Perder'],
    'Q': ['Querer', 'Quedar', 'Quién', 'Qué', 'Quieto', 'Quitar', 'Queso'],
    'R': ['Rápido', 'Recordar', 'Rojo', 'Responder', 'Reír', 'Rico', 'Río'],
    'S': ['Salir', 'Saber', 'Sentir', 'Ser', 'Señor', 'Siempre', 'Solo'],
    'T': ['Tiempo', 'Tener', 'Trabajo', 'Triste', 'Todo', 'Tarde', 'Tierra'],
    'U': ['Último', 'Único', 'Usar', 'Útil', 'Uno', 'Unidos', 'Universidad'],
    'V': ['Ver', 'Verdad', 'Verde', 'Vestir', 'Vez', 'Viejo', 'Vivir'],
    'W': ['Water'],
    'X': ['Xilófono'],
    'Y': ['Yo', 'Ya'],
    'Z': ['Zapato', 'Zona', 'Zoológico'],
};


const ItemVocabulario = ({ palabra, alPresionar }) => (
    <Pressable style={styles.contenedorItem} onPress={alPresionar}>
        <Text style={styles.textoPalabra}>{palabra}</Text>
        <Text style={styles.flecha}>{'>'}</Text>
    </Pressable>
);

export default function vocabulario({ navigation, route }) {
    // Recibir el índice de letra desde los parámetros de navegación
    const indiceInicial = route.params?.indiceLetra ?? 0;
    const [indiceLetra, setIndiceLetra] = useState(indiceInicial);
    const [selectedTab, setSelectedTab] = useState('home');
    
    // Actualizar el índice si cambian los parámetros
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

    // Navegar a la letra anterior
    const irLetraAnterior = () => {
        if (indiceLetra > 0) {
            setIndiceLetra(indiceLetra - 1);
        }
    };

    // Navegar a la letra siguiente
    const irLetraSiguiente = () => {
        if (indiceLetra < ABECEDARIO.length - 1) {
            setIndiceLetra(indiceLetra + 1);
        }
    };

    const manejarDetallePalabra = (palabra) => {
        console.log(`Navegando al detalle de: ${palabra}`);
        navigation.navigate('detalleVocabulario', { palabra:palabra });
    };

    return(
        <View style={styles.contenedorPrincipal}>
            {/* Header tipo Diccionario */}
            <View style={styles.headerContainer}>
                <View style={styles.headerCard}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.botonAtras}>
                        <Text style={styles.textoBotonAtras}>←</Text>
                    </Pressable>
                    <Text style={styles.headerTitle}>Vocabulario - Letra {letraActual}</Text>
                    <Image source={require('../assets/Logo.png')} style={styles.headerLogo} />
                </View>
            </View>

          
            <ScrollView style={styles.vistaDesplazableContenido} contentContainerStyle={styles.scrollContent}>
                
              
                <View style={styles.navegacionLetra}>
                    <Pressable 
                        style={[
                            styles.botonNavLetra, 
                            indiceLetra === 0 && styles.botonDeshabilitado
                        ]}
                        onPress={irLetraAnterior}
                        disabled={indiceLetra === 0}
                    >
                        <Text style={styles.textoNavLetra}>{'<'}</Text>
                    </Pressable>
                    <Text style={styles.letraActual}>{letraActual}</Text>
                    <Pressable 
                        style={[
                            styles.botonNavLetra,
                            indiceLetra === ABECEDARIO.length - 1 && styles.botonDeshabilitado
                        ]}
                        onPress={irLetraSiguiente}
                        disabled={indiceLetra === ABECEDARIO.length - 1}
                    >
                        <Text style={styles.textoNavLetra}>{'>'}</Text>
                    </Pressable>
                </View>

                <Text style={styles.tituloLista}>Interfaz del vocabulario básico</Text>

               
                <View style={styles.contenedorLista}>
                    {palabrasActuales.length > 0 ? (
                        palabrasActuales.map((palabra, indice) => (
                            <ItemVocabulario 
                                key={indice} 
                                palabra={palabra} 
                                alPresionar={() => manejarDetallePalabra(palabra)}
                            />
                        ))
                    ) : (
                        <View style={styles.sinPalabras}>
                            <Text style={styles.textoSinPalabras}>
                                No hay palabras disponibles para esta letra
                            </Text>
                        </View>
                    )}
                </View>

            </ScrollView>
            
            {/* Barra de navegación inferior */}
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
        paddingVertical: 20,
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
        marginRight: 10,
    },
    textoBotonAtras: {
        fontSize: 28,
        color: '#000',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
    },
    headerLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    vistaDesplazableContenido: {
        flex: 1,
        padding: 15,
    },
    scrollContent: {
        paddingBottom: 100,
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
        opacity: 0.5,
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
    sinPalabras: {
        padding: 30,
        alignItems: 'center',
    },
    textoSinPalabras: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
});