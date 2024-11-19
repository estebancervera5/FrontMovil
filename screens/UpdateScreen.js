import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UpdateScreen = () => {
  const [gameTitle, setGameTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  
  const handleSubmit = () => {
    // Lógica para subir el juego
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Subir Juego</Text>
      
      {/* Selección de foto */}
      <TouchableOpacity style={styles.imagePicker}>
        <Ionicons name="image" size={50} color="#FF4500" />
        <Text style={styles.imageText}>Seleccionar Foto</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Título del Juego"
        value={gameTitle}
        onChangeText={setGameTitle}
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
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
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

      <TextInput
        style={styles.input}
        placeholder="Número de Contacto"
        value={contactNumber}
        onChangeText={setContactNumber}
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Subir Juego</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4500', // Naranja Samus
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#222',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF4500', // Naranja Samus
  },
  imageText: {
    color: '#FF4500',
    marginTop: 10,
    fontSize: 18,
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
    backgroundColor: '#FF4500',
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
