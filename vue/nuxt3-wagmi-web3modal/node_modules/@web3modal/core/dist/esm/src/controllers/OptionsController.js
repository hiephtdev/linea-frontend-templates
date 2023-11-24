import { subscribeKey as subKey } from 'valtio/utils';
import { proxy } from 'valtio/vanilla';
const state = proxy({
    projectId: '',
    sdkType: 'w3m',
    sdkVersion: 'html-wagmi-undefined'
});
export const OptionsController = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    setProjectId(projectId) {
        state.projectId = projectId;
    },
    setIncludeWalletIds(includeWalletIds) {
        state.includeWalletIds = includeWalletIds;
    },
    setExcludeWalletIds(excludeWalletIds) {
        state.excludeWalletIds = excludeWalletIds;
    },
    setFeaturedWalletIds(featuredWalletIds) {
        state.featuredWalletIds = featuredWalletIds;
    },
    setTokens(tokens) {
        state.tokens = tokens;
    },
    setTermsConditionsUrl(termsConditionsUrl) {
        state.termsConditionsUrl = termsConditionsUrl;
    },
    setPrivacyPolicyUrl(privacyPolicyUrl) {
        state.privacyPolicyUrl = privacyPolicyUrl;
    },
    setCustomWallets(customWallets) {
        state.customWallets = customWallets;
    },
    setEnableAnalytics(enableAnalytics) {
        state.enableAnalytics = enableAnalytics;
    },
    setSdkVersion(sdkVersion) {
        state.sdkVersion = sdkVersion;
    },
    setMetadata(metadata) {
        state.metadata = metadata;
    }
};
//# sourceMappingURL=OptionsController.js.map