import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { TextInput, Button, RadioButton, HelperText, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { v5 as uuidv5 } from 'uuid';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { MY_NAMESPACE } from '../constants/constant';
import { addTransaction, editTransaction } from '../redux/slices/transactionSlice';

type TransactionScreenProps = {
  route: RouteProp<{ params?: { transaction?: any } }, 'params'>;
};

const AddExpense: React.FC<TransactionScreenProps> = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const transaction = route.params?.transaction;

  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('Groceries');
  const [newCategory, setNewCategory] = useState<string>(''); // For new category input
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [error, setError] = useState(false);
  const [categoryError, setCategoryError] = useState(false); // To handle category error

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount.toString());
      setCategory(transaction.category);
      setType(transaction.type);
    }
  }, [transaction]);

  const handleSaveTransaction = () => {
    if (amount === '' || isNaN(Number(amount))) {
      setError(true);
      return;
    }

    // If new category is provided, set it as the category
    const finalCategory = newCategory ? newCategory : category;
    if (!finalCategory) {
      setCategoryError(true);
      return;
    } else {
      setCategoryError(false);
    }

    const transactionData = {
      id: transaction ? transaction.id : uuidv5(new Date().getTime().toString(), MY_NAMESPACE),
      amount: parseFloat(amount),
      category: finalCategory,
      date: transaction ? transaction.date : new Date().toISOString().split('T')[0],
      type,
    };

    if (transaction) {
      dispatch(editTransaction(transactionData));
    } else {
      dispatch(addTransaction(transactionData));
    }

    // Reset form and navigate back to HomeScreen
    setAmount('');
    setCategory('Groceries');
    setNewCategory(''); // Reset new category input
    setError(false);
    navigation.navigate('HomeScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{transaction ? 'Edit Transaction' : 'Add New Transaction'}</Text>

      {/* Amount input */}
      <TextInput
        label="Amount (₹)"
        value={amount}
        onChangeText={text => setAmount(text)}
        keyboardType="numeric"
        style={styles.input}
        error={error}
      />
      <HelperText type="error" visible={error}>
        Please enter a valid amount.
      </HelperText>

      {/* Category selector */}
      <Text style={styles.label}>Select or Add Category</Text>
      <RadioButton.Group onValueChange={value => setCategory(value)} value={category}>
        <RadioButton.Item label="Groceries" value="Groceries" />
        <RadioButton.Item label="Rent" value="Rent" />
        <RadioButton.Item label="Entertainment" value="Entertainment" />
        <RadioButton.Item label="Utilities" value="Utilities" />
        <RadioButton.Item label="Others" value="Others" />
        <RadioButton.Item label="Add New Category" value="new" />
      </RadioButton.Group>

      {/* New Category Input */}
      {category === 'new' && (
        <TextInput
          label="New Category"
          value={newCategory}
          onChangeText={text => setNewCategory(text)}
          style={styles.input}
          error={categoryError}
        />
      )}
      <HelperText type="error" visible={categoryError}>
        Please enter a valid category.
      </HelperText>

      {/* Income/Expense selector */}
      <Text style={styles.label}>Type</Text>
      <RadioButton.Group onValueChange={value => setType(value as any)} value={type}>
        <RadioButton.Item label="Expense" value="expense" />
        <RadioButton.Item label="Income" value="income" />
      </RadioButton.Group>

      {/* Save transaction button */}
      <Button mode="contained" onPress={handleSaveTransaction} style={styles.button}>
        {transaction ? 'Save Changes' : 'Add Transaction'}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
  button: {
    marginTop: 32,
  },
});

export default AddExpense;
