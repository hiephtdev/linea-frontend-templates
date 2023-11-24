import type { Transaction } from '@web3modal/common';
type TransactionByYearMap = Record<number, Transaction[]>;
export interface TransactionsControllerState {
    transactions: Transaction[];
    transactionsByYear: TransactionByYearMap;
    loading: boolean;
    empty: boolean;
    next: string | undefined;
}
export declare const TransactionsController: {
    state: TransactionsControllerState;
    subscribe(callback: (newState: TransactionsControllerState) => void): () => void;
    fetchTransactions(accountAddress?: string): Promise<void>;
    groupTransactionsByYear(transactionsMap?: TransactionByYearMap, transactions?: Transaction[]): TransactionByYearMap;
    filterSpamTransactions(transactions: Transaction[]): Transaction[];
    resetTransactions(): void;
};
export {};
