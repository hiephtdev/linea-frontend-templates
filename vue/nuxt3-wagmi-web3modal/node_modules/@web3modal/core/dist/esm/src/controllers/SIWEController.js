import { subscribeKey as subKey } from 'valtio/utils';
import { proxy, ref, subscribe as sub } from 'valtio/vanilla';
const state = proxy({
    status: 'uninitialized'
});
export const SIWEController = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    subscribe(callback) {
        return sub(state, () => callback(state));
    },
    _getClient() {
        if (!state._client) {
            throw new Error('SIWEController client not set');
        }
        return state._client;
    },
    setSIWEClient(client) {
        state._client = ref(client);
        state.status = 'ready';
    },
    setNonce(nonce) {
        state.nonce = nonce;
    },
    setStatus(status) {
        state.status = status;
    },
    setMessage(message) {
        state.message = message;
    },
    setSession(session) {
        state.session = session;
    }
};
//# sourceMappingURL=SIWEController.js.map