import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton, HelperText, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { v5 as uuidv5 } from 'uuid';
import { useNavigation } from '@react-navigation/native';
import { addTransaction } from '../redux/slices/transactionSlice';
import { MY_NAMESPACE } from '../constants/constant';

// Type for navigation
type AddIncomeScreenProp = {
  navigate: (screen: string) => void;
};

const AddIncome = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Salary');
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation<AddIncomeScreenProp>();

  const handleAddIncome = () => {
    if (amount === '' || isNaN(Number(amount))) {
      setError(true);
      return;
    }

    // Dispatch the addTransaction action with the new income details
    dispatch(addTransaction({
      id: uuidv5(new Date().getTime().toString(), MY_NAMESPACE),
      amount: parseFloat(amount),
      category: category as any,
      date: new Date().toISOString().split('T')[0],
      type: 'income',
    }));

    // Reset form and navigate back to HomeScreen
    setAmount('');
    setCategory('Salary');
    setError(false);
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Income</Text>

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
      <Text style={styles.label}>Category</Text>
      <RadioButton.Group onValueChange={value => setCategory(value)} value={category}>
        <RadioButton.Item label="Salary" value="Salary" />
        <RadioButton.Item label="Freelancing" value="Freelancing" />
        <RadioButton.Item label="Investments" value="Investments" />
        <RadioButton.Item label="Others" value="Others" />
      </RadioButton.Group>

      {/* Add income button */}
      <Button mode="contained" onPress={handleAddIncome} style={styles.button}>
        Add Income
      </Button>
    </View>
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

export default AddIncome;
