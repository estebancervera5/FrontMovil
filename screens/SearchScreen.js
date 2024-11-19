import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
  const [searchType, setSearchType] = useState('game'); // Estado para el tipo de búsqueda (juego, plataforma, usuario)
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Búsqueda de Juegos</Text>

      {/* Filtros de búsqueda */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, searchType === 'game' && styles.activeFilter]}
          onPress={() => setSearchType('game')}
        >
          <Text style={styles.filterText}>Juego</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, searchType === 'platform' && styles.activeFilter]}
          onPress={() => setSearchType('platform')}
        >
          <Text style={styles.filterText}>Plataforma</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, searchType === 'user' && styles.activeFilter]}
          onPress={() => setSearchType('user')}
        >
          <Text style={styles.filterText}>Usuario</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder={`Buscar por ${searchType}...`}
        value={searchQuery}
        onChangeText={handleSearchChange}
        placeholderTextColor="#aaa"
      />

      {/* Resultados de búsqueda (simulados por ahora) */}
      <ScrollView style={styles.resultsContainer}>
        <Text style={styles.resultsText}>Resultados para: "{searchQuery}"</Text>
        {/* Aquí agregarías la lógica para mostrar los resultados dependiendo del tipo de búsqueda */}
        <View style={styles.card}>
          <Text style={styles.cardText}>Ejemplo de {searchType} 1</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Ejemplo de {searchType} 2</Text>
        </View>
      </ScrollView>

      {/* Icono de búsqueda (opcional, podría hacer la búsqueda) */}
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
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    borderWidth: 2,
    borderColor: '#FF4500', // Naranja Samus
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#FF4500',
  },
  filterText: {
    fontSize: 16,
    color: '#fff',
  },
  searchInput: {
    height: 50,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 18,
    marginBottom: 20,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsText: {
    fontSize: 18,
    color: '#FF4500', // Naranja Samus
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FF4500', // Naranja Samus
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
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

export default SearchScreen;

