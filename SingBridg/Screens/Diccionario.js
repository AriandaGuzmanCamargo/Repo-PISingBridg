import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, FlatList, Pressable } from 'react-native';
import BarraNavegacionInferior from '../components/BarraNavegacionInferior';

const data = [
    { id: '1', letter: 'A', img: require('../assets/A.jpg') }, 
    { id: '2', letter: 'B', img: require('../assets/B.jpg') },
    { id: '3', letter: 'C', img: require('../assets/C.jpg') },
    { id: '4', letter: 'D', img: require('../assets/D.jpg') },
    { id: '5', letter: 'E', img: require('../assets/E.jpg') },
    { id: '6', letter: 'F', img: require('../assets/F.jpg') },
    { id: '7', letter: 'G', img: require('../assets/G.jpg') },
    { id: '8', letter: 'H', img: require('../assets/H.jpg') },
    { id: '9', letter: 'I', img: require('../assets/I.jpg') },
    { id: '10', letter: 'J', img: require('../assets/J.jpg') },
    { id: '11', letter: 'K', img: require('../assets/K.jpg') },
    { id: '12', letter: 'L', img: require('../assets/L.jpg') },
    { id: '13', letter: 'M', img: require('../assets/M.jpg') },
    { id: '14', letter: 'N', img: require('../assets/N.jpg') },
    { id: '15', letter: 'Ñ', img: require('../assets/N2.jpg') },
    { id: '16', letter: 'O', img: require('../assets/O.jpg') },
    { id: '17', letter: 'P', img: require('../assets/P.jpg') },
    { id: '18', letter: 'Q', img: require('../assets/Q.jpg') },
    { id: '19', letter: 'R', img: require('../assets/R.jpg') },
    { id: '20', letter: 'S', img: require('../assets/S.jpg') },
    { id: '21', letter: 'T', img: require('../assets/T.jpg') },
    { id: '22', letter: 'U', img: require('../assets/U.jpg') },
    { id: '23', letter: 'V', img: require('../assets/V.jpg') },
    { id: '24', letter: 'W', img: require('../assets/W.jpg') },
    { id: '25', letter: 'X', img: require('../assets/X.jpg') },
    { id: '26', letter: 'Y', img: require('../assets/Y.jpg') },
    { id: '27', letter: 'Z', img: require('../assets/Z.jpg') },
];

export default function Diccionario({ navigation }) {

    const [selectedTab, setSelectedTab] = useState('home');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        if (tab === 'settings') {
            navigation.navigate('Configuracion');
        } else if (tab === 'profile') {
            navigation.navigate('EdicionPerfil');
        }
    };

    // Función para navegar al vocabulario con la letra seleccionada
    const irAVocabulario = (letra) => {
        // Encontrar el índice de la letra en el abecedario
        const ABECEDARIO = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        const indice = ABECEDARIO.indexOf(letra);
        
        // Navegar a vocabulario con el índice de la letra
        navigation.navigate('vocabulario', { indiceLetra: indice >= 0 ? indice : 0 });
    };

    const renderItem = ({ item }) => (
        <Pressable style={styles.itemContainer} onPress={() => irAVocabulario(item.letter)}>
            <View style={styles.imageWrapper}>
                <Image source={item.img} style={styles.signImage} />
            </View>
            <View style={styles.letterContainer}>
                <Text style={styles.letterText}>{item.letter}</Text>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerCard}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.botonAtras}>
                        <Text style={styles.textoBotonAtras}>←</Text>
                    </Pressable>
                    <Text style={styles.headerTitle}>Diccionario</Text>
                    <Image source={require('../assets/Logo.png')} style={styles.headerLogo} />
                </View>
            </View>

            <View style={styles.gridContainer}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={4} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={styles.columnWrapper}
                />
            </View>

            <BarraNavegacionInferior 
                selectedTab={selectedTab} 
                onTabChange={handleTabChange} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5', 
    },
    headerContainer: {
        paddingTop: 50, 
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    headerCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        paddingVertical: 15,
        paddingHorizontal: 20,
        position: 'relative', 
        elevation: 3, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    botonAtras: {
        padding: 5,
    },
    textoBotonAtras: {
        fontSize: 28,
        color: '#000',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontFamily: 'Times New Roman',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333333',
        flex: 1,
        textAlign: 'center',
    },
    headerLogo: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        position: 'absolute',
        right: 15, 
    },
    gridContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    listContent: {
        paddingBottom: 100, 
    },
    columnWrapper: {
        justifyContent: 'flex-start', 
    },
    itemContainer: {
        alignItems: 'center',
        width: '25%', 
        marginBottom: 20,
    },
    imageWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30, 
        backgroundColor: '#D9D9D9', 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -10, 
        zIndex: 1,
        overflow: 'hidden',
    },
    signImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    letterContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 2,
        paddingHorizontal: 0, 
        width: 50, 
        borderRadius: 10,
        elevation: 2,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    letterText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});