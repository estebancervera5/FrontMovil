import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios'; // Importa axios para manejar las solicitudes HTTP

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    if (!email || !username || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      const response = await axios.post('https://flask-t80g.onrender.com/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        Alert.alert('Éxito', 'Usuario registrado con éxito.');
        navigation.goBack(); // Regresa a la pantalla de inicio de sesión
      }
    } catch (error) {
      console.error('Error en el registro:', error.response ? error.response.data : error.message);

      if (error.response && error.response.data) {
        Alert.alert('Error', error.response.data.msg || 'Error al registrar el usuario');
      } else {
        Alert.alert('Error', 'Hubo un problema al conectarse con el servidor');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Phazon</Text>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#FFF"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
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
      <Button title="Registrar" color="#F15A29" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F4F4F',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F15A29',
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
    borderColor: '#D4A12D',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: '#FFF',
    backgroundColor: '#9E2A2F',
  },
});
