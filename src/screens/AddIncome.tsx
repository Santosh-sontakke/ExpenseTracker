import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { TextInput, Button, RadioButton, HelperText, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { v5 as uuidv5 } from 'uuid';
import { useNavigation } from '@react-navigation/native';
import { addTransaction } from '../redux/slices/transactionSlice';
import { MY_NAMESPACE } from '../constants/constant';
import { DatePickerModal } from 'react-native-paper-dates';
import { appRoutes } from '../utils/routes/route';


const AddIncome = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Salary');
  const [error, setError] = useState(false);
  const [date, setDate] = useState(new Date()); // State for selected date
  const [showDatePicker, setShowDatePicker] = useState(false); // Control date picker visibility
  const {height} = useWindowDimensions()
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useLayoutEffect(()=>{
    navigation.setOptions({
      title:"",
    }
    )
  })

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
      date: date.toLocaleDateString('en-GB'), // Use toLocaleDateString with 'en-GB' for DD/MM/YYYY
      type: 'income',
    }));

    // Reset form and navigate back to HomeScreen
    setAmount('');
    setCategory('Salary');
    setError(false);
    navigation.navigate(appRoutes.HOMESCREEN);
  };

  return (
    <ScrollView>
      <View style={[styles.container,{height:height}]}>
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

        {/* Date Picker */}
        <Text style={styles.label}>Select Date</Text>
        <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={{marginTop:10}}>
          {date.toLocaleDateString('en-GB')} {/* Display formatted date */}
        </Button>

        <DatePickerModal
          mode="single"
          visible={showDatePicker}
          onDismiss={() => setShowDatePicker(false)}
          date={date}
          onConfirm={(params) => {
            setShowDatePicker(false);
            setDate(params.date);
          }}
          saveLabel="Save" // Optional
          label="Select date" // Optional
          animationType="fade" // Optional
        />

        {/* Add income button */}
        <Button mode="contained" onPress={handleAddIncome} style={styles.button}>
          Add Income
        </Button>
      </View>
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
    fontWeight: 'bold',
    marginTop: 16,

  },
  button: {
    marginTop: 32,
  },
});

export default AddIncome;
