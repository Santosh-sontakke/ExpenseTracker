import { StyleSheet, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import IncomeExpenseChart from '../components/IncomeExpenseChart'
import { Button, Text } from 'react-native-paper';
import { screenTitles } from '../utils/routes/route';

const GraphScreen = ({ navigation, route }) => {

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:screenTitles.GRAPH_SCREEN
        })
    })
    return (
        <View style={styles.container}>
            <IncomeExpenseChart />
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