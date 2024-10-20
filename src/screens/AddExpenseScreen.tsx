import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Animated } from 'react-native';
import { TextInput, Button, RadioButton, HelperText, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { v5 as uuidv5 } from 'uuid';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { addTransaction, editTransaction } from '../redux/slices/transactionSlice';
import { MY_NAMESPACE } from '../constants/constant';
import { DatePickerModal } from 'react-native-paper-dates';
import { en, registerTranslation } from 'react-native-paper-dates';
import { screenTitles } from '../utils/routes/route';
import {Transaction, transactionCategory, transactionType } from '../utils/types/types';

// Register English translations for the date picker
registerTranslation('en', en);

type TransactionScreenProps = {
  route: RouteProp<{ params?: { transaction?: any } }, 'params'>;
};

const AddExpense: React.FC<TransactionScreenProps> = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const transaction:Transaction = route.params?.transaction;

  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>(transactionCategory.GROCERIES);
  const [newCategory, setNewCategory] = useState<string>(''); // For new category input
  const [type, setType] = useState<string>(transactionType.EXPENSE);
  const [error, setError] = useState(false);
  const [categoryError, setCategoryError] = useState(false); // To handle category error
  const [date, setDate] = useState<Date | undefined>(new Date()); // Date state
  const [open, setOpen] = useState(false); // Date picker state

  useLayoutEffect(()=>{
    navigation.setOptions({
      title:screenTitles.ADD_EXPENSE_SCREEN
    }
    )
  })

  // Animated values
  const opacity = useRef(new Animated.Value(0)).current; // Initial opacity for fade-in
  const translateY = useRef(new Animated.Value(30)).current; // Initial Y translation for slide-up
  const buttonScale = useRef(new Animated.Value(1)).current; // Button scale for pulse effect
  const parseDateString = (dateString: string) => {
    const [day, month, year] = dateString.split('/').map(Number); // Split and convert to numbers
    return new Date(year, month - 1, day); // Month is 0-based in JS Date
  };
  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount.toString());
      setCategory(transaction.category);
      setType(transaction.type);
      if (transaction.date) {
        const parsedDate = parseDateString(transaction.date);
        if (!isNaN(parsedDate.getTime())) {
          setDate(parsedDate); // Set parsed date if valid
        } else {
          setDate(new Date());
          throw Error("Invalid date format, using current date");
           // Fallback to current date if parsing fails
        }
      }
      // setDate(new Date(transaction.date)); // Initialize the date from the transaction
    }

    // Animate the form appearance (fade-in + slide-up)
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Looping button pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 1.05,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [transaction]);

  const handleSaveTransaction = () => {
    if (amount === '' || isNaN(Number(amount))) {
      setError(true);
      return;
    }

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
      date: date ? date.toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'), // Use local date format (dd/mm/yyyy)
      type,
    };

    if (transaction) {
      dispatch(editTransaction(transactionData as Transaction));
    } else {
      dispatch(addTransaction(transactionData as Transaction));
    }

    // Reset form and navigate back to HomeScreen
    setAmount('');
    setCategory(transactionCategory.GROCERIES);
    setNewCategory('');
    setError(false);
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Animated.Text style={[styles.header, { opacity, transform: [{ translateY }] }]}>
          {transaction ? 'Edit Transaction' : 'Add New Transaction'}
        </Animated.Text>

        {/* Animated amount input */}
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
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
        </Animated.View>

        {/* Animated category selector */}
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          <Text style={styles.label}>Select or Add Category</Text>
          <RadioButton.Group onValueChange={value => setCategory(value)} value={category}>
            <RadioButton.Item label={transactionCategory.GROCERIES} value={transactionCategory.GROCERIES} />
            <RadioButton.Item label={transactionCategory.RENT} value={transactionCategory.RENT}/>
            <RadioButton.Item label={transactionCategory.ENTERTAINMENT} value={transactionCategory.ENTERTAINMENT} />
            <RadioButton.Item label={transactionCategory.UTILITIES} value={transactionCategory.UTILITIES} />
            <RadioButton.Item label={transactionCategory.OTHERS} value={transactionCategory.OTHERS} />
            <RadioButton.Item label={transactionCategory.ADD_CATEGORY} value="new" />
          </RadioButton.Group>

          {category === 'new' && (
            <TextInput
              label="New Category"
              value={newCategory}
              onChangeText={text => setNewCategory(text)}
              error={categoryError}
            />
          )}
          <HelperText type="error" visible={categoryError}>
            Please enter a valid category.
          </HelperText>
        </Animated.View>

        {/* Animated income/expense selector */}
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          <Text style={styles.label}>Type</Text>
          <RadioButton.Group onValueChange={value => setType(value as any)} value={type}>
            <RadioButton.Item label="Expense" value="expense" />
            <RadioButton.Item label="Income" value="income" />
          </RadioButton.Group>
        </Animated.View>

        {/* Animated date picker button */}
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          <Button onPress={() => setOpen(true)} mode="outlined" style={{ marginTop: 16 }}>
            {date ? date.toLocaleDateString('en-GB') : 'Select Date'}
          </Button>
          <DatePickerModal
            mode="single"
            visible={open}
            onDismiss={() => setOpen(false)}
            date={date}
            onConfirm={(params) => {
              setOpen(false);
              setDate(params.date);
            }}
          />
        </Animated.View>

        {/* Animated save transaction button with pulse effect */}
        <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonScale }] }]}>
          <Button mode="contained" onPress={handleSaveTransaction} style={styles.button}>
            {transaction ? 'Save Changes' : 'Add Transaction'}
          </Button>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
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
    color:'black'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  button: {
    width: '95%',
  },
});

export default AddExpense;
