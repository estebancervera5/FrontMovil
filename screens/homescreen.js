import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explorar Juegos</Text>

      <ScrollView style={styles.cardsContainer}>
        {/* Card 1 */}
        <View style={styles.card}>
          <Image 
            source={require('./assets/hot.jpg')}  // Foto estática por ahora
            style={styles.cardImage} 
          />
          <Text style={styles.cardTitle}>Juego 1</Text>
          <Text style={styles.cardText}>Plataforma: PC</Text>
          <Text style={styles.cardText}>Descripción: Un juego de aventuras épicas.</Text>
          <Text style={styles.cardText}>Precio: $50</Text>
        </View>

        {/* Card 2 */}
        <View style={styles.card}>
          <Image 
            source={require('./assets/metorid.jpeg')}  // Foto estática por ahora
            style={styles.cardImage} 
          />
          <Text style={styles.cardTitle}>Juego 2</Text>
          <Text style={styles.cardText}>Plataforma: PS5</Text>
          <Text style={styles.cardText}>Descripción: Un juego de acción y disparos.</Text>
          <Text style={styles.cardText}>Precio: $40</Text>
        </View>

        {/* Card 3 */}
        <View style={styles.card}>
          <Image 
            source={require('./assets/son.jpeg')}  // Foto estática por ahora
            style={styles.cardImage} 
          />
          <Text style={styles.cardTitle}>Juego 3</Text>
          <Text style={styles.cardText}>Plataforma: Xbox</Text>
          <Text style={styles.cardText}>Descripción: Un juego de carreras y velocidad.</Text>
          <Text style={styles.cardText}>Precio: $60</Text>
        </View>
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
    backgroundColor: '#121212',  // Fondo oscuro
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4500',  // Naranja Samus
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
    borderColor: '#FF4500',  // Naranja Samus
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
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
    backgroundColor: '#FF4500',  // Naranja Samus
    padding: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
