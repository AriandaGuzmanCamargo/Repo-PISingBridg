import { Text, StyleSheet, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import BarraNavegacionInferior from '../components/BarraNavegacionInferior'

export default function Dashboard({ navigation }) {
    const [selectedTab, setSelectedTab] = useState('home');
    
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        if (tab === 'profile') {
        } else if (tab === 'settings') {
        }
    };
    
    return (
        <View style={styles.container}>
            <View>
                <Text >Dashboard </Text>
            </View>
            
            {/* Barra de navegación inferior */}
            <BarraNavegacionInferior 
                selectedTab={selectedTab} 
                onTabChange={handleTabChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
})