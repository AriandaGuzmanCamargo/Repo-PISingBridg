import { Text, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import BarraNavegacionInferior from '../components/BarraNavegacionInferior';

export default function Configuracion() {
    const [selectedTab, setSelectedTab] = useState('settings');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
      <View style={styles.container}>
        <View >
          <Text >Configuración</Text>
        </View>



        {/* Barra de navegación inferior */}
        <BarraNavegacionInferior selectedTab={selectedTab} onTabChange={handleTabChange} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});