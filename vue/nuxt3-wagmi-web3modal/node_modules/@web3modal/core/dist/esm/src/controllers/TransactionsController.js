import { proxy, subscribe as sub } from 'valtio/vanilla';
import { BlockchainApiController } from './BlockchainApiController.js';
import { OptionsController } from './OptionsController.js';
import { EventsController } from './EventsController.js';
import { SnackController } from './SnackController.js';
const state = proxy({
    transactions: [],
    transactionsByYear: {},
    loading: false,
    empty: false,
    next: undefined
});
export const TransactionsController = {
    state,
    subscribe(callback) {
        return sub(state, () => callback(state));
    },
    async fetchTransactions(accountAddress) {
        const { projectId } = OptionsController.state;
        if (!projectId || !accountAddress) {
            throw new Error("Transactions can't be fetched without a projectId and an accountAddress");
        }
        state.loading = true;
        try {
            const response = await BlockchainApiController.fetchTransactions({
                account: accountAddress,
                projectId,
                cursor: state.next
            });
            const nonSpamTransactions = this.filterSpamTransactions(response.data);
            const filteredTransactions = [...state.transactions, ...nonSpamTransactions];
            state.loading = false;
            state.transactions = filteredTransactions;
            state.transactionsByYear = this.groupTransactionsByYear(state.transactionsByYear, nonSpamTransactions);
            state.empty = filteredTransactions.length === 0;
            state.next = response.next ? response.next : undefined;
        }
        catch (error) {
            EventsController.sendEvent({
                type: 'track',
                event: 'ERROR_FETCH_TRANSACTIONS',
                properties: {
                    address: accountAddress,
                    projectId,
                    cursor: state.next
                }
            });
            SnackController.showError('Failed to fetch transactions');
            state.loading = false;
            state.empty = true;
        }
    },
    groupTransactionsByYear(transactionsMap = {}, transactions = []) {
        const grouped = transactionsMap;
        transactions.forEach(transaction => {
            const year = new Date(transaction.metadata.minedAt).getFullYear();
            if (!grouped[year]) {
                grouped[year] = [];
            }
            grouped[year]?.push(transaction);
        });
        return grouped;
    },
    filterSpamTransactions(transactions) {
        return transactions.filter(transaction => {
            const isAllSpam = transaction.transfers.every(transfer => transfer.nft_info?.flags.is_spam === true);
            return !isAllSpam;
        });
    },
    resetTransactions() {
        state.transactions = [];
        state.transactionsByYear = {};
        state.loading = false;
        state.empty = false;
        state.next = undefined;
    }
};
//# sourceMappingURL=TransactionsController.js.map