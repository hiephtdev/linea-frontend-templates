import { describe, expect, it } from 'vitest';
import { TransactionsController } from '../../index.js';
describe('TransactionsController', () => {
    it('should have valid default state', () => {
        expect(TransactionsController.state).toEqual({
            transactions: [],
            transactionsByYear: {},
            loading: false,
            empty: false,
            next: undefined
        });
    });
});
//# sourceMappingURL=TransactionsController.test.js.map