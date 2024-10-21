import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import usersData from '../constants/users.json';
import { appRoutes } from '../utils/routes/route';
import { UserDataType } from '../utils/types/types';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);


  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null
    })
  })
  // Animated values
  const opacity = useRef(new Animated.Value(0)).current; // Initial opacity value for fade-in
  const translateY = useRef(new Animated.Value(30)).current; // Initial Y translation for sliding up
  const buttonScale = useRef(new Animated.Value(1)).current; // Initial scale for button pulse effect

  useEffect(() => {
    // Fade in and slide up animation for the form elements
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Looping pulse animation for the login button
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 1.05,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleLogin = () => {
    const user:UserDataType | undefined = usersData.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Clear inputs and navigate to the home screen
      setUsername('');
      setPassword('');
      navigation.navigate(appRoutes.HOMESCREEN);
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Animation */}
      <Animated.Text style={[styles.header, { opacity, transform: [{ translateY }] }]}>
        Login
      </Animated.Text>

      {/* Input fields with opacity and translation animation */}
      <Animated.View style={{ opacity, transform: [{ translateY }] }}>
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
      </Animated.View>

      {/* Login Button with pulse animation */}
      <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonScale }] }]}>
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>
      </Animated.View>
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
  buttonContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
});

export default LoginScreen;
