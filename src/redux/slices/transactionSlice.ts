import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { 
  loadTransactionsFromStorage, 
  saveTransactionsToStorage, 
  loadBalanceFromStorage, 
  saveBalanceToStorage 
} from '../../utils/storageUtils';

// Define the initial state
interface Transaction {
  id: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

interface TransactionState {
  transactions: Transaction[];
  balance: number;
}

const initialState: TransactionState = {
  transactions: [],
  balance: 0,
};

// Create a Redux slice
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      if (action.payload.type === 'income') {
        state.balance += action.payload.amount;
      } else {
        state.balance -= action.payload.amount;
      }

      // Persist data in AsyncStorage
      saveTransactionsToStorage(state.transactions);
      saveBalanceToStorage(state.balance);
    },
    editTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        const oldTransaction = state.transactions[index];

        // Update balance based on the type
        if (oldTransaction.type === 'income') {
          state.balance -= oldTransaction.amount; // Remove old income
        } else {
          state.balance += oldTransaction.amount; // Remove old expense
        }

        // Update the transaction
        state.transactions[index] = action.payload;

        // Adjust balance for new transaction
        if (action.payload.type === 'income') {
          state.balance += action.payload.amount;
        } else {
          state.balance -= action.payload.amount;
        }

        // Persist updated data in AsyncStorage
        saveTransactionsToStorage(state.transactions);
        saveBalanceToStorage(state.balance);
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload);
      if (index !== -1) {
        const removedTransaction = state.transactions[index];

        // Adjust balance based on the transaction type
        if (removedTransaction.type === 'income') {
          state.balance -= removedTransaction.amount;
        } else {
          state.balance += removedTransaction.amount;
        }

        // Remove the transaction
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

// Load data from AsyncStorage when app starts
export const loadInitialData = () => async (dispatch: AppDispatch) => {
  const transactions = await loadTransactionsFromStorage();
  const balance = await loadBalanceFromStorage();
  
  dispatch(setTransactions(transactions));
  dispatch(setBalance(balance));
};
