import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import usersData from '../constants/users.json';
import IncomeExpenseChart from '../components/IncomeExpenseChart';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    const user = usersData.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Navigate to the home screen if authentication is successful
      setUsername("")
      setPassword("")
      navigation.navigate('HomeScreen');
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
        <IncomeExpenseChart/>
      <Text style={styles.header}>Login</Text>

      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <HelperText type="error" visible={error}>
        Invalid username or password.
      </HelperText>
      
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 32,
  },
});

export default LoginScreen;
