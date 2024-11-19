import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/homescreen'; // Tu pantalla principal
import UpdateScreen from './screens/UpdateScreen'; // Tu pantalla de subida de juegos
import UserScreen from './screens/UserScreen'; // Pantalla de perfil de usuario
import SearchScreen from './screens/SearchScreen'; // Pantalla de búsqueda
import { Ionicons } from '@expo/vector-icons'; // Para usar el icono de la lupa

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#FF4500' }, // Naranja similar a Samus
        tabBarActiveTintColor: '#FFD700', // Dorado para el icono activo
        tabBarInactiveTintColor: '#FFFFFF', // Blanco para iconos inactivos
        headerStyle: { backgroundColor: '#FF4500' }, // Header en naranja
        headerTitleStyle: { color: '#FFFFFF' }, // Título del header en blanco
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerTitle: 'Phazon', // Título de la pantalla de inicio
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
          headerTitle: 'Buscar Juegos', // Título para la pantalla de búsqueda
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UpdateScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
          headerTitle: 'Subir Juego', // Título para la pantalla de subir juegos
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerTitle: 'Perfil', // Título para la pantalla de perfil
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;