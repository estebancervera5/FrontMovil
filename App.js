import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, TextInput, View, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para almacenar el token
import axios from 'axios'; // Importa Axios
import TabNavigator from './MainTabNavigator'; // Importa tu TabNavigator
import RegisterScreen from './RegisterScreen'; // Tu pantalla de registro

const Stack = createStackNavigator(); // Crear el Stack Navigator

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
  
    try {
      const response = await axios.post('https://flask-t80g.onrender.com/login', {
        email,
        password,
      });
  
      console.log('Respuesta de la API:', response.data); // Para depuración
  
      if (response.status === 200) {
        const { access_token } = response.data;
  
        if (access_token) {
          // Guardar el token en AsyncStorage
          await AsyncStorage.setItem('access_token', access_token);
          setIsLoggedIn(true);
          Alert.alert('Éxito', 'Inicio de sesión exitoso');
        } else {
          Alert.alert('Error', 'Usuario o Contraseña incorrecta');
        }
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.response ? error.response.data : error.message);
  
      if (error.response && error.response.data) {
        Alert.alert('Error', error.response.data.msg || 'Credenciales incorrectas');
      } else {
        Alert.alert('Error', 'Hubo un problema al conectarse con el servidor');
      }
    }
  };
  
  const fetchUserData = async (token) => {
    try {
      const response = await axios.post(
        'https://flask-t80g.onrender.com/datos',
        { username: email }, // Aquí se envía el username como cuerpo
        {
          headers: {
            Authorization: `Bearer ${token}`, // Encabezado de autorización
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Usuario encontrado', `Datos: ${JSON.stringify(response.data.Usuario)}`);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        Alert.alert('Error', error.response.data.msg || 'Usuario no encontrado');
      } else {
        Alert.alert('Error', 'Hubo un problema al conectarse con el servidor');
      }
      console.error(error);
    }
  };

  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {({ navigation }) => (
              <View style={styles.container}>
                <Text style={styles.header}>Phazon</Text>
                <Image source={require('./assets/logo.png')} style={styles.logo} />
                <TextInput
                  placeholder="Correo Electrónico"
                  placeholderTextColor="#FFF"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
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
                <Button
                  title="Registrarse"
                  color="#F15A29"
                  onPress={() => navigation.navigate('Register')} // Navegar a la pantalla de registro
                />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Register"
            component={RegisterScreen} // La pantalla de registro
            options={{ headerTitle: 'Registro' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // Si está logueado, muestra el TabNavigator
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
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
