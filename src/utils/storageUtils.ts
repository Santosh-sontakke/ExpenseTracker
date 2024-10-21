import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from './firebaseConfig';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { Transaction } from './types/types';
import firestore from '@react-native-firebase/firestore';
import { firebaseCollection, sharedPrefrence } from '../constants/constant';
// Save transactions to AsyncStorage
export const saveTransactionsToStorage = async (transactions: any) => {
  try {
    const jsonValue = JSON.stringify(transactions);
    await AsyncStorage.setItem(sharedPrefrence.TXN ,jsonValue);
  } catch (e) {
    console.error('Error saving transactions to AsyncStorage', e);
  }
};

// Load transactions from AsyncStorage
export const loadTransactionsFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(sharedPrefrence.TXN);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading transactions from AsyncStorage', e);
    return [];
  }
};

export const loadTransactionsFromFirebase = async () => {
  const transactions: Transaction[] = [];
  const snapshot = await firestore().collection(firebaseCollection.TXN).get();
  snapshot.forEach(doc => {
    transactions.push({ id: doc.id, ...doc.data() });
  });
  return transactions;
};



// Save balance to cache and Firestore
export const saveBalanceToStorage = async (balance: number) => {
  try {
    // Save to cache
    await AsyncStorage.setItem('balance', balance.toString());

    // Save to Firebase Firestore
    const balanceRef = ref(database, 'balance/user_balance');
    await set(balanceRef, { balance });
  } catch (e) {
    console.error('Error saving balance to AsyncStorage and Firebase', e);
  }
};

// Load balance from AsyncStorage
export const loadBalanceFromStorage = async (updateBalance) => {
  try {
    const balanceFromStorage = await AsyncStorage.getItem('balance');
    if (balanceFromStorage != null) {
      updateBalance(parseFloat(balanceFromStorage));
      return; // Exit if we found a balance in storage
    }
  } catch (e) {
    console.error('Error loading balance from AsyncStorage', e);
  }

  //If balance wasn't found in AsyncStorage, load from Firebase
  loadBalanceFromFirebase(updateBalance);
};

export const loadTransactions = async () => {
  // load from AsyncStorage
  const cachedTransactions = await loadTransactionsFromStorage();
  
  // Check if transactions are found
  if (cachedTransactions.length > 0) {
    return cachedTransactions; // Return cached transactions
  }

  // not found, load from Firebase
  const transactionsFromFirebase = await loadTransactionsFromFirebase();

  // loaded transactions in AsyncStorage
  await AsyncStorage.setItem(sharedPrefrence.TXN, JSON.stringify(transactionsFromFirebase));

  return transactionsFromFirebase; 
};



export const loadBalanceFromFirebase = (callback) => {
  const db = getDatabase();
  const balanceRef = ref(db, '/balance/user_balance'); // Adjust the path according to your database structure

  onValue(balanceRef, (snapshot) => {
    const balanceObj = snapshot.val();
    if (balanceObj !== null) {
      callback(balanceObj.balance); // Call the provided callback with the balance
    } else {
      callback(0); // Return 0 if no balance found
    }
  }, {
    onlyOnce: true // To read data only once instead
  });
};

