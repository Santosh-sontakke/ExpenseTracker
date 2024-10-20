import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import IncomeExpenseChart from '../components/IncomeExpenseChart'
import { Button, Text } from 'react-native-paper';

const GraphScreen = ({ navigation, route }) => {
    const [showGraph, setShowGraph] = useState<boolean>(false);

    return (
        <View style={styles.container}><IncomeExpenseChart />
            <Text style={styles.header}>Income vs Expense</Text>
            <Button mode="contained" onPress={navigation.goBack} style={styles.button}>
                Go Back
            </Button>
        </View>

    )
}

export default GraphScreen

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    button: {
        marginTop: 32,
    },
    container: {
        padding: 10
    }
})