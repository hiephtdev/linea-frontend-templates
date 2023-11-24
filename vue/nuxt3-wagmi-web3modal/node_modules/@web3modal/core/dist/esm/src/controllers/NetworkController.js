import { subscribeKey as subKey } from 'valtio/utils';
import { proxy, ref } from 'valtio/vanilla';
import { PublicStateController } from './PublicStateController.js';
const state = proxy({
    supportsAllNetworks: true,
    isDefaultCaipNetwork: false
});
export const NetworkController = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    _getClient() {
        if (!state._client) {
            throw new Error('NetworkController client not set');
        }
        return state._client;
    },
    setClient(client) {
        state._client = ref(client);
    },
    setCaipNetwork(caipNetwork) {
        state.caipNetwork = caipNetwork;
        PublicStateController.set({ selectedNetworkId: caipNetwork?.id });
    },
    setDefaultCaipNetwork(caipNetwork) {
        state.caipNetwork = caipNetwork;
        PublicStateController.set({ selectedNetworkId: caipNetwork?.id });
        state.isDefaultCaipNetwork = true;
    },
    setRequestedCaipNetworks(requestedNetworks) {
        state.requestedCaipNetworks = requestedNetworks;
    },
    async getApprovedCaipNetworksData() {
        const data = await this._getClient().getApprovedCaipNetworksData();
        state.supportsAllNetworks = data.supportsAllNetworks;
        state.approvedCaipNetworkIds = data.approvedCaipNetworkIds;
    },
    async switchActiveNetwork(network) {
        await this._getClient().switchCaipNetwork(network);
        state.caipNetwork = network;
    },
    resetNetwork() {
        if (!state.isDefaultCaipNetwork) {
            state.caipNetwork = undefined;
        }
        state.approvedCaipNetworkIds = undefined;
        state.supportsAllNetworks = true;
    }
};
//# sourceMappingURL=NetworkController.js.map