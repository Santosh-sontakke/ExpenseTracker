import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import AddExpense from './src/screens/AddExpenseScreen';
import AddIncome from './src/screens/AddIncome';
import { useDispatch } from 'react-redux';
import { loadInitialData } from './src/redux/slices/transactionSlice';
import LoginScreen from './src/screens/LoginScreen';
import GraphScreen from './src/screens/GraphScreen';
import { appRoutes } from './src/utils/routes/route';
const Stack = createNativeStackNavigator();

const StackWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load the initial data from AsyncStorage into Redux
    dispatch(loadInitialData());
  }, [dispatch]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={appRoutes.LOGIN_SCREEN}>
        <Stack.Screen name={appRoutes.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={appRoutes.HOMESCREEN} component={HomeScreen} />
        <Stack.Screen name={appRoutes.ADD_EXPENSE_SCREEN} component={AddExpense} />
        <Stack.Screen name={appRoutes.ADD_INCOME_SCREEN} component={AddIncome} />
        <Stack.Screen name={appRoutes.GRAPH_SCREEN} component={GraphScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackWrapper

const styles = StyleSheet.create({})