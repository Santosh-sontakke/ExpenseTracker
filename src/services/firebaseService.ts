import firestore from '@react-native-firebase/firestore';
import { Transaction } from '../utils/types/types';
import { firebaseCollection } from '../constants/constant';

export const updateTransactionById = async (transactionId: string, updatedData: Transaction) => {
    const transactionsCollection = firestore().collection(firebaseCollection.TXN);

    const querySnapshot = await transactionsCollection
        .where('id', '==', transactionId) // Query on id base
        .get();

    if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
            const documentId = doc.id; // This is the Firestoreid

            // Updateing
            try {
                await transactionsCollection.doc(documentId).update(updatedData);
            } catch (error) {
                throw Error('Unable to Edit transaction')
            }
        });
    } else {
        throw Error('transaction not found')
    }
};


export const deleteTransactionById = async (transactionId: string) => {
    const transactionsCollection = firestore().collection(firebaseCollection.TXN);
    const querySnapshot = await transactionsCollection
        .where('id', '==', transactionId) // Query based on the 'id' field
        .get();

    // Checking if txnid exist
    if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
            const documentId = doc.id; // This is the FirestoreID
            // Delete the document
            try {
                await transactionsCollection.doc(documentId).delete();
            } catch (error) {
                console.error('Error deleting transaction:', error);
                throw Error('Error deleting transaction')
            }
        });
    } else {
        throw Error('transaction not found')
    }
};

