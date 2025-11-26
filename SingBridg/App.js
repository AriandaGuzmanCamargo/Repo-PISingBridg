import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from './Screens/inicio';
import Login from './Screens/login';
import Dashboard from './Screens/dashboard';
import Registro from './Screens/registro';
import Configuracion from './Screens/configuracion';
import EdicionPerfil from './Screens/EdicionPerfil';
import Diccionario from './Screens/Diccionario';

const Stack = createNativeStackNavigator();

export default function App() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
