import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const IncomeExpenseChart = () => {
  const transactions = useSelector((state: any) => state.transactions.transactions);

  // Calculate total income and total expenses
  const income = transactions
    .filter((transaction: any) => transaction.type === 'income')
    .reduce((total: number, transaction: any) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction: any) => transaction.type === 'expense')
    .reduce((total: number, transaction: any) => total + transaction.amount, 0);

  // Prepare data for the chart
  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [income, expenses],
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Color for the Income bar
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={screenWidth - 32} // Adjust chart width
        height={220}
        yAxisLabel="₹"
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2, // Optional
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Bar color
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
          style: {
            borderRadius: 16,
          },
        }}
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
