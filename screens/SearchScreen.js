import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

const HomeScreen = () => {
  const [feed, setFeed] = useState([]); // Estado para almacenar los datos del feed
  const [searchQuery, setSearchQuery] = useState(''); // Estado para almacenar la consulta de búsqueda
  const [token, setToken] = useState(''); // Estado para almacenar el token

  // Función para obtener el token desde AsyncStorage
  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
    }
  };

  // Función para realizar la búsqueda de juegos
  const fetchSearchResults = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Por favor ingrese un término de búsqueda');
      return;
    }

    try {
      const response = await fetch('https://flask-t80g.onrender.com/search_game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gamename: searchQuery }), // Enviar gamename en el cuerpo de la solicitud
      });

      const data = await response.json();

      if (response.ok) {
        setFeed(data.Resultados); // Guardar los resultados de búsqueda en el estado
      } else {
        Alert.alert('Error', data.msg || 'No se pudieron obtener los resultados');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al obtener los resultados');
    }
  };

  // Llamar a la función al montar el componente para cargar el token
  React.useEffect(() => {
    loadToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buscar Juego</Text>

      {/* Campo de texto para la búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Busca un juego"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Botón de búsqueda */}
      <TouchableOpacity style={styles.searchButton} onPress={fetchSearchResults}>
        <Ionicons name="search" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Resultados de la búsqueda */}
      <ScrollView style={styles.cardsContainer}>
        {feed.map((game, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{game.gamename || 'Nombre no disponible'}</Text>
            <Text style={styles.cardText}>Plataforma: {game.platform || 'No especificado'}</Text>
            <Text style={styles.cardText}>Precio: ${game.price != null ? game.price : 'No especificado'}</Text>
            <Text style={styles.cardText}>Contacto: {game.email || 'Correo no disponible'}</Text>
          </View>
        ))}
      </ScrollView>
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
  searchInput: {
    height: 40,
    borderColor: '#FF4500',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#fff',
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#FF4500', // Naranja Samus
    padding: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default HomeScreen;
