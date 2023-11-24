import { AccountController, BlockchainApiController, ConnectionController, ConnectorController, CoreHelperUtil, EventsController, ModalController, NetworkController, OptionsController, PublicStateController, ThemeController, SIWEController } from '@web3modal/core';
import { setColorTheme, setThemeVariables } from '@web3modal/ui';
let isInitialized = false;
export class Web3ModalScaffold {
    constructor(options) {
        this.initPromise = undefined;
        this.setIsConnected = isConnected => {
            AccountController.setIsConnected(isConnected);
        };
        this.setCaipAddress = caipAddress => {
            AccountController.setCaipAddress(caipAddress);
        };
        this.setBalance = (balance, balanceSymbol) => {
            AccountController.setBalance(balance, balanceSymbol);
        };
        this.setProfileName = profileName => {
            AccountController.setProfileName(profileName);
        };
        this.setProfileImage = profileImage => {
            AccountController.setProfileImage(profileImage);
        };
        this.resetAccount = () => {
            AccountController.resetAccount();
        };
        this.setCaipNetwork = caipNetwork => {
            NetworkController.setCaipNetwork(caipNetwork);
        };
        this.getCaipNetwork = () => NetworkController.state.caipNetwork;
        this.setRequestedCaipNetworks = requestedCaipNetworks => {
            NetworkController.setRequestedCaipNetworks(requestedCaipNetworks);
        };
        this.getApprovedCaipNetworksData = () => NetworkController.getApprovedCaipNetworksData();
        this.resetNetwork = () => {
            NetworkController.resetNetwork();
        };
        this.setConnectors = connectors => {
            ConnectorController.setConnectors(connectors);
        };
        this.addConnector = connector => {
            ConnectorController.addConnector(connector);
        };
        this.getConnectors = () => ConnectorController.getConnectors();
        this.resetWcConnection = () => {
            ConnectionController.resetWcConnection();
        };
        this.fetchIdentity = request => BlockchainApiController.fetchIdentity(request);
        this.setAddressExplorerUrl = addressExplorerUrl => {
            AccountController.setAddressExplorerUrl(addressExplorerUrl);
        };
        this.setSIWENonce = nonce => {
            SIWEController.setNonce(nonce);
        };
        this.setSIWESession = session => {
            SIWEController.setSession(session);
        };
        this.setSIWEStatus = status => {
            SIWEController.setStatus(status);
        };
        this.setSIWEMessage = message => {
            SIWEController.setMessage(message);
        };
        this.getSIWENonce = () => SIWEController.state.nonce;
        this.getSIWESession = () => SIWEController.state.session;
        this.getSIWEStatus = () => SIWEController.state.status;
        this.getSIWEMessage = () => SIWEController.state.message;
        this.initControllers(options);
        this.initOrContinue();
    }
    async open(options) {
        await this.initOrContinue();
        ModalController.open(options);
    }
    async close() {
        await this.initOrContinue();
        ModalController.close();
    }
    getThemeMode() {
        return ThemeController.state.themeMode;
    }
    getThemeVariables() {
        return ThemeController.state.themeVariables;
    }
    setThemeMode(themeMode) {
        ThemeController.setThemeMode(themeMode);
        setColorTheme(ThemeController.state.themeMode);
    }
    setThemeVariables(themeVariables) {
        ThemeController.setThemeVariables(themeVariables);
        setThemeVariables(ThemeController.state.themeVariables);
    }
    subscribeTheme(callback) {
        return ThemeController.subscribe(callback);
    }
    getState() {
        return { ...PublicStateController.state };
    }
    subscribeState(callback) {
        return PublicStateController.subscribe(callback);
    }
    getEvent() {
        return { ...EventsController.state };
    }
    subscribeEvents(callback) {
        return EventsController.subscribe(callback);
    }
    subscribeSIWEState(callback) {
        return SIWEController.subscribe(callback);
    }
    initControllers(options) {
        NetworkController.setClient(options.networkControllerClient);
        NetworkController.setDefaultCaipNetwork(options.defaultChain);
        OptionsController.setProjectId(options.projectId);
        OptionsController.setIncludeWalletIds(options.includeWalletIds);
        OptionsController.setExcludeWalletIds(options.excludeWalletIds);
        OptionsController.setFeaturedWalletIds(options.featuredWalletIds);
        OptionsController.setTokens(options.tokens);
        OptionsController.setTermsConditionsUrl(options.termsConditionsUrl);
        OptionsController.setPrivacyPolicyUrl(options.privacyPolicyUrl);
        OptionsController.setCustomWallets(options.customWallets);
        OptionsController.setEnableAnalytics(options.enableAnalytics);
        OptionsController.setSdkVersion(options._sdkVersion);
        ConnectionController.setClient(options.connectionControllerClient);
        if (options.siweControllerClient) {
            SIWEController.setSIWEClient(options.siweControllerClient);
        }
        if (options.metadata) {
            OptionsController.setMetadata(options.metadata);
        }
        if (options.themeMode) {
            ThemeController.setThemeMode(options.themeMode);
        }
        if (options.themeVariables) {
            ThemeController.setThemeVariables(options.themeVariables);
        }
    }
    async initOrContinue() {
        if (!this.initPromise && !isInitialized && CoreHelperUtil.isClient()) {
            isInitialized = true;
            this.initPromise = new Promise(async (resolve) => {
                await Promise.all([import('@web3modal/ui'), import('./modal/w3m-modal/index.js')]);
                const modal = document.createElement('w3m-modal');
                document.body.insertAdjacentElement('beforeend', modal);
                resolve();
            });
        }
        return this.initPromise;
    }
}
//# sourceMappingURL=client.js.map