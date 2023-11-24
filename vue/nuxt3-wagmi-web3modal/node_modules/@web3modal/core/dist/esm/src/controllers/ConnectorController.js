import { subscribeKey as subKey } from 'valtio/utils';
import { proxy, ref } from 'valtio/vanilla';
const state = proxy({
    connectors: []
});
export const ConnectorController = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    setConnectors(connectors) {
        state.connectors = connectors.map(c => ref(c));
    },
    addConnector(connector) {
        state.connectors.push(ref(connector));
    },
    getConnectors() {
        return state.connectors;
    }
};
//# sourceMappingURL=ConnectorController.js.map