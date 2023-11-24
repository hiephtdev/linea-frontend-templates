import { subscribeKey as subKey } from 'valtio/utils';
import { proxy, subscribe as sub } from 'valtio/vanilla';
const state = proxy({
    walletImages: {},
    networkImages: {},
    connectorImages: {},
    tokenImages: {}
});
export const AssetController = {
    state,
    subscribeNetworkImages(callback) {
        return sub(state.networkImages, () => callback(state.networkImages));
    },
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    setWalletImage(key, value) {
        state.walletImages[key] = value;
    },
    setNetworkImage(key, value) {
        state.networkImages[key] = value;
    },
    setConnectorImage(key, value) {
        state.connectorImages[key] = value;
    },
    setTokenImage(key, value) {
        state.tokenImages[key] = value;
    }
};
//# sourceMappingURL=AssetController.js.map