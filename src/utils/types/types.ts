export interface Transaction {
    id: string;
    category: string;
    amount: number;
    date: string;
    type: 'income' | 'expense';
}

export interface UserDataType {
    username: string,
    password: string
}


export const transactionType = {
    EXPENSE: "expense",
    INCOME: "income",
}

export const transactionCategory = {
    GROCERIES: "Groceries",
    RENT: "Rent",
    ENTERTAINMENT: "Entertainment",
    UTILITIES: "Utilities",
    OTHERS: "Others",
    ADD_CATEGORY: "Add new Category"
}