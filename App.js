import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import MainTabNavigator from './MainTabNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Phazon</Text>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <TextInput
          placeholder="Usuario"
          placeholderTextColor="#FFF"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#FFF"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Iniciar Sesión" color="#F15A29" onPress={handleLogin} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F4F4F', // Fondo metálico gris oscuro
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F15A29', // Naranja similar al traje de Samus
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#D4A12D', // Color dorado metálico para los bordes
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: '#FFF',
    backgroundColor: '#9E2A2F', // Rojo metálico como fondo del input
  },
});
