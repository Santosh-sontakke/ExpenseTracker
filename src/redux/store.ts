import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './slices/transactionSlice';

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});

// Define RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
