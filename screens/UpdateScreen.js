import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateScreen = () => {
  const [gameName, setGameName] = useState('');
  const [platform, setPlatform] = useState('');
  const [price, setPrice] = useState('');
  const [token, setToken] = useState('');

  // Cargar el token almacenado en AsyncStorage
  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  // Función para subir un juego
  const handleSubmit = async () => {
    try {
      const response = await fetch('https://flask-t80g.onrender.com/rgame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gamename: gameName,
          platform: platform,
          price: price,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', data.msg);
        setGameName('');
        setPlatform('');
        setPrice('');
      } else {
        Alert.alert('Error', data.msg || 'No se pudo subir el juego');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Subir Juego</Text>

      <TextInput
        style={styles.input}
        placeholder="Título del Juego"
        value={gameName}
        onChangeText={setGameName}
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Plataforma"
        value={platform}
        onChangeText={setPlatform}
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Subir Juego</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo oscuro
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4500', // Naranja Samus
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#FF4500', // Naranja Samus
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default UpdateScreen;
