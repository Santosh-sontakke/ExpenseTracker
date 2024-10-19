import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { deleteTransaction } from '../redux/slices/transactionSlice';

interface TransactionCardProps {
  transaction: {
    id: string;
    category: string;
    amount: number;
    date: string;
    type: 'income' | 'expense';
  };
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Handle delete transaction
  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteTransaction(transaction.id)),
        },
      ]
    );
  };

  // Navigate to edit screen with transaction data
  const handleEdit = () => {
    navigation.navigate('AddExpense', { transaction });
  };

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        {/* Icon based on transaction type */}
        <View style={styles.iconContainer}>
          {transaction.type === 'income' ? (
            <Icon name="cash-plus" size={30} color="green" />
          ) : (
            <Icon name="cash-minus" size={30} color="red" />
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.category}>{transaction.category}</Text>
          <Text style={styles.date}>{transaction.date}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={[styles.amount, transaction.type === 'income' ? styles.income : styles.expense]}>
            ₹{transaction.amount}
          </Text>
        </View>

        {/* Edit and Delete Icons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleEdit}>
            <Icon name="pencil" size={24} color="#007bff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Icon name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  income: {
    color: 'green',
  },
  expense: {
    color: 'red',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginLeft: 16,
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default TransactionCard;
