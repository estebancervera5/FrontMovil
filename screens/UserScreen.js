import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

const UserScreen = () => {
  const [games, setGames] = useState([]); // Estado para almacenar los juegos del usuario
  const [token, setToken] = useState(''); // Estado para el token de autenticación

  // Función para cargar el token desde AsyncStorage
  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
    }
  };

  // Función para obtener los juegos del usuario
  const fetchUserGames = async () => {
    try {
      const response = await fetch('https://flask-t80g.onrender.com/my_games', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Agrega el token al encabezado
        },
      });

      const data = await response.json();

      if (response.ok) {
        setGames(data.games); // Actualiza los juegos
      } else {
        Alert.alert('Error', data.msg || 'No se pudieron obtener los juegos');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al obtener los juegos');
    }
  };

  // Función para borrar un juego
  const deleteGame = async (gameId) => {
    try {
      const response = await fetch(`https://flask-t80g.onrender.com/delete_game/${gameId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Agrega el token al encabezado
        },
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', data.msg || 'Juego eliminado');
        fetchUserGames(); // Refresca los juegos después de borrar
      } else {
        Alert.alert('Error', data.msg || 'No se pudo eliminar el juego');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al eliminar el juego');
    }
  };

  // Carga el token al montar el componente
  useEffect(() => {
    loadToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mi Perfil</Text>

      {/* Botón para refrescar */}
      <TouchableOpacity style={styles.refreshButton} onPress={fetchUserGames}>
        <Text style={styles.refreshText}>Refrescar Juegos</Text>
      </TouchableOpacity>

      <ScrollView style={styles.cardsContainer}>
        {games.map((game) => (
          <View key={game._id} style={styles.card}>
            <Text style={styles.cardTitle}>{game.gamename}</Text>
            <Text style={styles.cardText}>Plataforma: {game.platform}</Text>
            <Text style={styles.cardText}>Precio: ${game.price}</Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteGame(game._id)}
            >
              <Text style={styles.deleteButtonText}>Borrar</Text>
            </TouchableOpacity>
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
  refreshButton: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  refreshText: {
    color: '#fff',
    fontSize: 16,
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
  deleteButton: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default UserScreen;
