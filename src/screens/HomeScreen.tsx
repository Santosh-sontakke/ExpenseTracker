import React, { useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../store';
import TransactionCard from '../components/TransactionCard';

// Define the type for the navigation stack
type RootStackParamList = {
  AddExpense: undefined;
  AddIncome: undefined;
};

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'AddExpense'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenProp>();

  // Get data from Redux store
  const { transactions, balance } = useSelector((state: RootState) => state.transactions);

  // Render each expense as a card
  const renderTransaction = ({ item }: any) => (
    // <Card style={styles.card}>
    //   <Card.Content>
    //     <Title>{item.category}</Title>
    //     <Paragraph>{item.type === 'income' ? `Income: ₹${item.amount}` : `Expense: ₹${item.amount}`}</Paragraph>
    //     <Paragraph>Date: {item.date}</Paragraph>
    //   </Card.Content>
    // </Card>
    <TransactionCard transaction={item} />
  );

  // Use useLayoutEffect to customize the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('AddIncome')}
          mode="text"
          style={styles.headerButton}
        >
          Add Income
        </Button>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Balance: ₹{balance}</Text>

      {/* Transaction list */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        ListEmptyComponent={<Text style={styles.noTransactionText}>No transactions added yet</Text>}
      />

      {/* Add new expense button at the bottom */}
      <Button
        mode="contained"
        style={styles.addExpenseButton}
        onPress={() => navigation.navigate('AddExpense')}
      >
        Add New Expense
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
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 12,
  },
  noTransactionText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 18,
  },
  headerButton: {
    marginHorizontal: 8,
  },
  addExpenseButton: {
    marginTop: 'auto',
    marginBottom: 16,
  },
});

export default HomeScreen;
