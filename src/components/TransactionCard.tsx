import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { deleteTransaction } from '../redux/slices/transactionSlice';
import { SvgXml } from 'react-native-svg';
import { Transaction } from '../utils/types/types';
import { appRoutes } from '../utils/routes/route';
import { deleteTransactionById } from '../services/firebaseService';
import { ExpenseIcon, IncomeIcon, DeleteIcon, PencilIcon } from '../assets';
import { transactionType } from '../constants/constant';


interface TransactionCardProps {
  transaction: {
    id: string;
    category: string;
    amount: number;
    date: string;
    type: 'income' | 'expense';
  };
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }: { transaction: Transaction }) => {
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
          onPress: onDelete
        }
      ]
    );
  };

  const onDelete = async () => {
    try {
      deleteTransactionById(transaction.id)
      dispatch(deleteTransaction(transaction.id));
    } catch (error) {
      Alert.alert("Error deleting Transaction")
    }
  };

  const handleEdit = () => {
    navigation.navigate(appRoutes.ADD_EXPENSE_SCREEN, { transaction });
  };
  return (
    <Card style={styles.card} >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          {transaction.type === transactionType.INCOME ? (
            <SvgXml xml={IncomeIcon} width={28} />
          ) : (
            <SvgXml xml={ExpenseIcon} width={28} />
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.category}>{transaction.category}</Text>
          <Text style={styles.date}>{transaction.date}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={[styles.amount, transaction.type === transactionType.INCOME ? styles.income : styles.expense]}>
            ₹{transaction.amount}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleEdit}>
            <SvgXml xml={PencilIcon} width={28} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <SvgXml xml={DeleteIcon} width={28} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
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
    alignItems: 'center'
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default TransactionCard;
