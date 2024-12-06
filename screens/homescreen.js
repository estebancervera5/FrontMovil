import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

const HomeScreen = () => {
  const [feed, setFeed] = useState([]); // Estado para almacenar los datos del feed
  const [token, setToken] = useState(''); // Estado para almacenar el token

  // Función para obtener el token desde AsyncStorage
  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
    }
  };

  // Función para obtener los datos del feed
  const fetchFeed = async () => {
    try {
      const response = await fetch('https://flask-t80g.onrender.com/my_feed', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Reemplaza con el token del usuario autenticado
        },
      });

      const data = await response.json();

      if (response.ok) {
        setFeed(data.feed); // Guardar el feed en el estado
      } else {
        Alert.alert('Error', data.msg || 'No se pudo obtener el feed');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al obtener el feed');
    }
  };

  // Llamar a la función al montar el componente y cuando el token cambie
  useEffect(() => {
    loadToken();
  }, []);

  useEffect(() => {
    if (token) {
      fetchFeed();
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explorar Juegos</Text>

      <ScrollView style={styles.cardsContainer}>
        {feed.map((game) => (
          <View key={game._id} style={styles.card}>
            <Text style={styles.cardTitle}>{game.gamename || 'Nombre no disponible'}</Text>
            <Text style={styles.cardText}>Plataforma: {game.platform || 'No especificado'}</Text>
            <Text style={styles.cardText}>Precio: ${game.price != null ? game.price : 'No especificado'}</Text>
            <Text style={styles.cardText}>Contacto: {game.email || 'Correo no disponible'}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Botón de búsqueda */}
      <TouchableOpacity style={styles.searchButton}>
        <Ionicons name="search" size={30} color="#fff" />
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
  cardsContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FF4500', // Naranja Samus
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  searchButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF4500', // Naranja Samus
    padding: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
