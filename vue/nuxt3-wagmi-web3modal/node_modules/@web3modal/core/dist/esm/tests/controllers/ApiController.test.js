import { describe, expect, it } from 'vitest';
import { ApiController } from '../../index.js';
describe('ApiController', () => {
    it('should have valid default state', () => {
        expect(ApiController.state).toEqual({
            page: 1,
            count: 0,
            featured: [],
            recommended: [],
            wallets: [],
            search: []
        });
    });
});
//# sourceMappingURL=ApiController.test.js.map