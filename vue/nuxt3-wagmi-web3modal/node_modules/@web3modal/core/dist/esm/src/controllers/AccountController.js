import { subscribeKey as subKey } from 'valtio/utils';
import { proxy, subscribe as sub } from 'valtio/vanilla';
import { CoreHelperUtil } from '../utils/CoreHelperUtil.js';
const state = proxy({
    isConnected: false
});
export const AccountController = {
    state,
    subscribe(callback) {
        return sub(state, () => callback(state));
    },
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    setIsConnected(isConnected) {
        state.isConnected = isConnected;
    },
    setCaipAddress(caipAddress) {
        state.caipAddress = caipAddress;
        state.address = caipAddress ? CoreHelperUtil.getPlainAddress(caipAddress) : undefined;
    },
    setBalance(balance, balanceSymbol) {
        state.balance = balance;
        state.balanceSymbol = balanceSymbol;
    },
    setProfileName(profileName) {
        state.profileName = profileName;
    },
    setProfileImage(profileImage) {
        state.profileImage = profileImage;
    },
    setAddressExplorerUrl(explorerUrl) {
        state.addressExplorerUrl = explorerUrl;
    },
    resetAccount() {
        state.isConnected = false;
        state.caipAddress = undefined;
        state.address = undefined;
        state.balance = undefined;
        state.balanceSymbol = undefined;
        state.profileName = undefined;
        state.profileImage = undefined;
        state.addressExplorerUrl = undefined;
    }
};
//# sourceMappingURL=AccountController.js.map