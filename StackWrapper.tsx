import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import AddExpense from './src/screens/AddExpenseScreen';
import AddIncome from './src/screens/AddIncome';
import { useDispatch } from 'react-redux';
import { loadInitialData } from './src/redux/slices/transactionSlice';
import EditTransactionScreen from './src/screens/EditTransactionScreen';
import LoginScreen from './src/screens/LoginScreen';
const Stack = createNativeStackNavigator();

const StackWrapper = () => {
      const dispatch = useDispatch();

  useEffect(() => {
    // Load the initial data from AsyncStorage into Redux
    dispatch(loadInitialData());
  }, [dispatch]);
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddExpense" component={AddExpense} />
      <Stack.Screen name="AddIncome" component={AddIncome} /> 
      <Stack.Screen name="EditTransaction" component={EditTransactionScreen} />

    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default StackWrapper

const styles = StyleSheet.create({})