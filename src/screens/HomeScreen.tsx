import React, { useLayoutEffect, useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet, Animated, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import TransactionCard from '../components/TransactionCard';
import { RootState } from '../redux/store';
import { appRoutes } from '../utils/routes/route';
import { Transaction, transactionType } from '../utils/types/types';

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

  // State to manage filter type
  const [filterType, setFilterType] = useState<string>('all');

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current; // Fade animation for the entire screen
  const scaleAnim = useRef(new Animated.Value(1)).current; // Scale animation for the Add Expense button

  // Fade-in effect when the screen loads
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Add button press animation
  const handleAddExpensePress = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate(appRoutes.ADD_EXPENSE_SCREEN);
    });
  }, []);

  // Render each transaction as an animated card
  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TransactionCard transaction={item} />
  );

  // Use useLayoutEffect to customize the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <Button
            onPress={() => navigation.navigate(appRoutes.GRAPH_SCREEN)}
            mode="text"
            style={styles.headerButton}
          >
            Graph
          </Button>
          <Button
            onPress={() => navigation.navigate(appRoutes.ADD_INCOME_SCREEN)}
            mode="text"
            style={styles.headerButton}
          >
            Add Income
          </Button>
        </View>
      ),
      title: ""
    });
  }, [navigation]);

  // Filter transactions based on the selected type
  const filteredTransactions: Transaction[] = useMemo(() => transactions.filter(transaction => {
    if (filterType === 'all') return true; // Show all transactions
    return transaction.type === filterType; // Show only filtered type
  }), [filterType, transactions])

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.balanceText}>Balance: ₹{balance}</Text>

      {/* Filter Button */}
      <View style={styles.filterContainer}>
        <Button
          mode={filterType === 'all' ? 'contained' : 'text'}
          onPress={() => setFilterType('all')}
          style={styles.filterButton}
        >
          All
        </Button>
        <Button
          mode={filterType === transactionType.INCOME ? 'contained' : 'text'}
          onPress={() => setFilterType(transactionType.INCOME)}
          style={styles.filterButton}
        >
          Income
        </Button>
        <Button
          mode={filterType === transactionType.EXPENSE ? 'contained' : 'text'}
          onPress={() => setFilterType(transactionType.EXPENSE)}
          style={styles.filterButton}
        >
          Expense
        </Button>
      </View>

      {/* Transaction list */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        ListEmptyComponent={<Text style={styles.noTransactionText}>No transactions added yet</Text>}
      />

      {/* Animated Add Expense Button */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Button
          mode="contained"
          style={styles.addExpenseButton}
          onPress={handleAddExpensePress}
        >
          Add New Expense
        </Button>
      </Animated.View>
    </Animated.View>
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 5,
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
