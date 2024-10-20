export interface Transaction {
    id: string;
    category: string;
    amount: number;
    date: string;
    type: 'income' | 'expense' | string;
}

export interface UserDataType {
    username: string,
    password: string
}