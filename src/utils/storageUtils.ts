import AsyncStorage from '@react-native-async-storage/async-storage';

// Save transactions to AsyncStorage
export const saveTransactionsToStorage = async (transactions: any) => {
  try {
    const jsonValue = JSON.stringify(transactions);
    await AsyncStorage.setItem('transactions', jsonValue);
  } catch (e) {
    console.error('Error saving transactions to AsyncStorage', e);
  }
};

// Load transactions from AsyncStorage
export const loadTransactionsFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('transactions');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading transactions from AsyncStorage', e);
    return [];
  }
};

// Save balance to AsyncStorage
export const saveBalanceToStorage = async (balance: number) => {
  try {
    await AsyncStorage.setItem('balance', balance.toString());
  } catch (e) {
    console.error('Error saving balance to AsyncStorage', e);
  }
};

// Load balance from AsyncStorage
export const loadBalanceFromStorage = async () => {
  try {
    const balance = await AsyncStorage.getItem('balance');
    return balance != null ? parseFloat(balance) : 0;
  } catch (e) {
    console.error('Error loading balance from AsyncStorage', e);
    return 0;
  }
};
