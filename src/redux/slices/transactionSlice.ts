import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store, { AppDispatch } from '../store';
import { 
  saveTransactionsToStorage, 
  loadBalanceFromStorage, 
  saveBalanceToStorage, 
  loadTransactions
} from '../../utils/storageUtils';
import { Transaction } from '../../utils/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { transactionType } from '../../constants/constant';


interface TransactionState {
  transactions: Transaction[];
  balance: number;
}

const initialState: TransactionState = {
  transactions: [],
  balance: 0,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      if (action.payload.type === transactionType.INCOME) {
        state.balance += action.payload.amount;
      } else {
        state.balance -= action.payload.amount;
      }

      saveTransactionsToStorage(state.transactions);
      saveBalanceToStorage(state.balance);
    },
    editTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        const oldTransaction = state.transactions[index];

        // Update balance based on the type like expense/ income
        if (oldTransaction.type === transactionType.INCOME) {
          state.balance -= oldTransaction.amount; // Remove old income
        } else {
          state.balance += oldTransaction.amount; // Remove old expense
        }

        state.transactions[index] = action.payload;

        // Adjust balance for new transaction
        if (action.payload.type === transactionType.INCOME) {
          state.balance += action.payload.amount;
        } else {
          state.balance -= action.payload.amount;
        }

        // put updated data in cache
        saveTransactionsToStorage(state.transactions);
        saveBalanceToStorage(state.balance);
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload);
      if (index !== -1) {
        const removedTransaction = state.transactions[index];

        // adjust balance based on the transaction type
        if (removedTransaction.type === transactionType.INCOME) {
          state.balance -= removedTransaction.amount;
        } else {
          state.balance += removedTransaction.amount;
        }

        // remove the transaction
        state.transactions.splice(index, 1);

        // Persist updated data in AsyncStorage
        saveTransactionsToStorage(state.transactions);
        saveBalanceToStorage(state.balance);
      }
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
});

export const { addTransaction, editTransaction, deleteTransaction, setTransactions, setBalance } = transactionsSlice.actions;

export default transactionsSlice.reducer;

const updateBalance =async (balance: number)=>{
  console.log('BALANCE',balance)
  store.dispatch(setBalance(balance));
  await AsyncStorage.setItem('balance', balance.toString());


}
// get data from AsyncStorage when app starts
export const loadInitialData = () => async (dispatch: AppDispatch) => {
  const transactions = await loadTransactions();
  await loadBalanceFromStorage(updateBalance);
  dispatch(setTransactions(transactions));
};
