import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { editTransaction } from '../redux/slices/transactionSlice';

interface EditTransactionScreenProps {
  route: RouteProp<{ params: { transaction: any } }, 'params'>;
}

const EditTransactionScreen: React.FC<EditTransactionScreenProps> = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { transaction } = route.params;

  const [amount, setAmount] = useState<string>(transaction.amount.toString());
  const [category, setCategory] = useState<string>(transaction.category);
  const [date, setDate] = useState<string>(transaction.date);
  const [type, setType] = useState<'income' | 'expense'>(transaction.type);

  const handleSave = () => {
    const updatedTransaction = {
      ...transaction,
      amount: parseFloat(amount),
      category,
      date,
      type,
    };

    dispatch(editTransaction(updatedTransaction));
    navigation.goBack(); // Navigate back after saving
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Transaction</Text>
      
      <Text>Amount (₹):</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      
      <Text>Category:</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
      
      <Text>Date:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />
      
      <Text>Type:</Text>
      <View style={styles.buttonContainer}>
        <Button title="Income" onPress={() => setType('income')} />
        <Button title="Expense" onPress={() => setType('expense')} />
      </View>

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default EditTransactionScreen;
