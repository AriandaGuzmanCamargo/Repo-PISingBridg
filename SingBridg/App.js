import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { initDatabase } from './database/database';

import Inicio from './Screens/inicio';
import Login from './Screens/login';
import Dashboard from './Screens/dashboard';
import Registro from './Screens/registro';
import Configuracion from './Screens/configuracion';
import EdicionPerfil from './Screens/EdicionPerfil';
import Diccionario from './Screens/Diccionario';
import vocabulario from './Screens/vocabulario';
import DetalleLetra from './Screens/DetalleLetra';
import DetalleVocabulario from './Screens/detalleVocabulario';
import Traductor from './Screens/traductor.js';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInicializada, setDbInicializada] = useState(false);

  useEffect(() => {
    // Inicializar la base de datos al cargar la app
    initDatabase()
      .then(() => {
        console.log('✅ Base de datos inicializada correctamente');
        setDbInicializada(true);
      })
      .catch(error => {
        console.error('❌ Error al inicializar la base de datos:', error);
        setDbInicializada(true); // Continuar aunque haya error
      });
  }, []);

  // Mostrar pantalla de carga mientras se inicializa la BD
  if (!dbInicializada) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#004A93" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Configuracion" component={Configuracion} />
        <Stack.Screen name="EdicionPerfil" component={EdicionPerfil} />
        <Stack.Screen name="Diccionario" component={Diccionario} />
        <Stack.Screen name="vocabulario" component={vocabulario} />
        <Stack.Screen name="DetalleLetra" component={DetalleLetra} />
        <Stack.Screen name="detalleVocabulario" component={DetalleVocabulario} />
        <Stack.Screen name="traductor" component={Traductor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});
