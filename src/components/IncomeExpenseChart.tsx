import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { Dimensions } from 'react-native';
import { transactionType } from '../utils/types/types';

const screenWidth = Dimensions.get('window').width;

const IncomeExpenseChart = () => {
  const transactions = useSelector((state: any) => state.transactions.transactions);

  // Calculate total income and total expenses
  const income = useMemo(() => transactions
    .filter((transaction: any) => transaction.type === transactionType.INCOME)
    .reduce((total: number, transaction: any) => total + transaction.amount, 0), [transactions])

  const expenses = useMemo(() => transactions
    .filter((transaction: any) => transaction.type === transactionType.EXPENSE)
    .reduce((total: number, transaction: any) => total + transaction.amount, 0), [transactions])

  // Prepare data for the chart
  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [income, expenses], // Data for both income and expenses
      },
    ],
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={screenWidth - 20} // Adjust chart width
        height={500}
        yAxisLabel="₹"
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#b8a18c',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2, // Optional, number of decimal places
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Color for the bar
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
          style: {
            borderRadius: 16,
          },
          propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: '#e3e3e3',
            strokeDasharray: '5 5', // Customize the background line style
          },
          fillShadowGradient: `rgba(0, 128, 0, 1)`, // Green color for the fill of the bar
          fillShadowGradientOpacity: 1,
          barPercentage: 1, // Adjust bar width percentage
        }}
        fromZero={true} // Ensures the graph starts from 0
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
});

export default IncomeExpenseChart;
