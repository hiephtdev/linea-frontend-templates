import { connect, disconnect, fetchBalance, fetchEnsAvatar, fetchEnsName, getAccount, getNetwork, switchNetwork, watchAccount, watchNetwork } from '@wagmi/core';
import { mainnet } from '@wagmi/core/chains';
import { Web3ModalScaffold } from '@web3modal/scaffold';
import { ConstantsUtil, PresetsUtil, HelpersUtil } from '@web3modal/utils';
import { getCaipDefaultChain } from './utils/helpers.js';
import { WALLET_CHOICE_KEY } from './utils/constants.js';
export class Web3Modal extends Web3ModalScaffold {
    constructor(options) {
        const { wagmiConfig, siweConfig, chains, defaultChain, tokens, _sdkVersion, ...w3mOptions } = options;
        if (!wagmiConfig) {
            throw new Error('web3modal:constructor - wagmiConfig is undefined');
        }
        if (!w3mOptions.projectId) {
            throw new Error('web3modal:constructor - projectId is undefined');
        }
        if (!wagmiConfig.connectors.find(c => c.id === ConstantsUtil.WALLET_CONNECT_CONNECTOR_ID)) {
            throw new Error('web3modal:constructor - WalletConnectConnector is required');
        }
        const networkControllerClient = {
            switchCaipNetwork: async (caipNetwork) => {
                const chainId = HelpersUtil.caipNetworkIdToNumber(caipNetwork?.id);
                if (chainId) {
                    await switchNetwork({ chainId });
                }
            },
            async getApprovedCaipNetworksData() {
                const walletChoice = localStorage.getItem(WALLET_CHOICE_KEY);
                if (walletChoice?.includes(ConstantsUtil.WALLET_CONNECT_CONNECTOR_ID)) {
                    const connector = wagmiConfig.connectors.find(c => c.id === ConstantsUtil.WALLET_CONNECT_CONNECTOR_ID);
                    if (!connector) {
                        throw new Error('networkControllerClient:getApprovedCaipNetworks - connector is undefined');
                    }
                    const provider = await connector.getProvider();
                    const ns = provider.signer?.session?.namespaces;
                    const nsMethods = ns?.[ConstantsUtil.EIP155]?.methods;
                    const nsChains = ns?.[ConstantsUtil.EIP155]?.chains;
                    return {
                        supportsAllNetworks: nsMethods?.includes(ConstantsUtil.ADD_CHAIN_METHOD),
                        approvedCaipNetworkIds: nsChains
                    };
                }
                return { approvedCaipNetworkIds: undefined, supportsAllNetworks: true };
            }
        };
        const connectionControllerClient = {
            connectWalletConnect: async (onUri) => {
                const connector = wagmiConfig.connectors.find(c => c.id === ConstantsUtil.WALLET_CONNECT_CONNECTOR_ID);
                if (!connector) {
                    throw new Error('connectionControllerClient:getWalletConnectUri - connector is undefined');
                }
                connector.on('message', event => {
                    if (event.type === 'display_uri') {
                        onUri(event.data);
                        connector.removeAllListeners();
                    }
                });
                const chainId = HelpersUtil.caipNetworkIdToNumber(this.getCaipNetwork()?.id);
                await connect({ connector, chainId });
            },
            connectExternal: async ({ id, provider, info }) => {
                const connector = wagmiConfig.connectors.find(c => c.id === id);
                if (!connector) {
                    throw new Error('connectionControllerClient:connectExternal - connector is undefined');
                }
                if (provider && info && connector.id === ConstantsUtil.EIP6963_CONNECTOR_ID) {
                    connector.setEip6963Wallet?.({ provider, info });
                }
                const chainId = HelpersUtil.caipNetworkIdToNumber(this.getCaipNetwork()?.id);
                await connect({ connector, chainId });
            },
            checkInstalled: ids => {
                const eip6963Connectors = this.getConnectors().filter(c => c.type === 'ANNOUNCED');
                const injectedConnector = this.getConnectors().find(c => c.type === 'INJECTED');
                if (!ids) {
                    return Boolean(window.ethereum);
                }
                if (eip6963Connectors.length) {
                    const installed = ids.some(id => eip6963Connectors.some(c => c.info?.rdns === id));
                    if (installed) {
                        return true;
                    }
                }
                if (injectedConnector) {
                    if (!window?.ethereum) {
                        return false;
                    }
                    return ids.some(id => Boolean(window.ethereum?.[String(id)]));
                }
                return false;
            },
            disconnect
        };
        super({
            networkControllerClient,
            connectionControllerClient,
            siweControllerClient: siweConfig,
            defaultChain: getCaipDefaultChain(defaultChain),
            tokens: HelpersUtil.getCaipTokens(tokens),
            _sdkVersion: _sdkVersion ?? `html-wagmi-${ConstantsUtil.VERSION}`,
            ...w3mOptions
        });
        this.hasSyncedConnectedAccount = false;
        this.options = undefined;
        this.options = options;
        this.syncRequestedNetworks(chains);
        this.syncConnectors(wagmiConfig);
        this.listenConnectors(wagmiConfig);
        watchAccount(() => this.syncAccount());
        watchNetwork(() => this.syncNetwork());
    }
    getState() {
        const state = super.getState();
        return {
            ...state,
            selectedNetworkId: HelpersUtil.caipNetworkIdToNumber(state.selectedNetworkId)
        };
    }
    subscribeState(callback) {
        return super.subscribeState(state => callback({
            ...state,
            selectedNetworkId: HelpersUtil.caipNetworkIdToNumber(state.selectedNetworkId)
        }));
    }
    syncRequestedNetworks(chains) {
        const requestedCaipNetworks = chains?.map(chain => ({
            id: `${ConstantsUtil.EIP155}:${chain.id}`,
            name: chain.name,
            imageId: PresetsUtil.EIP155NetworkImageIds[chain.id],
            imageUrl: this.options?.chainImages?.[chain.id]
        }));
        this.setRequestedCaipNetworks(requestedCaipNetworks ?? []);
    }
    async syncAccount() {
        const { address, isConnected } = getAccount();
        const { chain } = getNetwork();
        this.resetAccount();
        if (isConnected && address && chain) {
            const caipAddress = `${ConstantsUtil.EIP155}:${chain.id}:${address}`;
            this.setIsConnected(isConnected);
            this.setCaipAddress(caipAddress);
            await Promise.all([
                this.syncProfile(address),
                this.syncBalance(address, chain),
                this.getApprovedCaipNetworksData()
            ]);
            this.hasSyncedConnectedAccount = true;
        }
        else if (!isConnected && this.hasSyncedConnectedAccount) {
            this.resetWcConnection();
            this.resetNetwork();
        }
    }
    async syncNetwork() {
        const { address, isConnected } = getAccount();
        const { chain } = getNetwork();
        if (chain) {
            const chainId = String(chain.id);
            const caipChainId = `${ConstantsUtil.EIP155}:${chainId}`;
            this.setCaipNetwork({
                id: caipChainId,
                name: chain.name,
                imageId: PresetsUtil.EIP155NetworkImageIds[chain.id],
                imageUrl: this.options?.chainImages?.[chain.id]
            });
            if (isConnected && address) {
                const caipAddress = `${ConstantsUtil.EIP155}:${chain.id}:${address}`;
                this.setCaipAddress(caipAddress);
                if (chain.blockExplorers?.default?.url) {
                    const url = `${chain.blockExplorers.default.url}/address/${address}`;
                    this.setAddressExplorerUrl(url);
                }
                else {
                    this.setAddressExplorerUrl(undefined);
                }
                if (this.hasSyncedConnectedAccount) {
                    await this.syncBalance(address, chain);
                }
            }
        }
    }
    async syncProfile(address) {
        try {
            const { name, avatar } = await this.fetchIdentity({
                caipChainId: `${ConstantsUtil.EIP155}:${mainnet.id}`,
                address
            });
            this.setProfileName(name);
            this.setProfileImage(avatar);
        }
        catch {
            const profileName = await fetchEnsName({ address, chainId: mainnet.id });
            if (profileName) {
                this.setProfileName(profileName);
                const profileImage = await fetchEnsAvatar({ name: profileName, chainId: mainnet.id });
                if (profileImage) {
                    this.setProfileImage(profileImage);
                }
            }
        }
    }
    async syncBalance(address, chain) {
        const balance = await fetchBalance({
            address,
            chainId: chain.id,
            token: this.options?.tokens?.[chain.id]?.address
        });
        this.setBalance(balance.formatted, balance.symbol);
    }
    syncConnectors(wagmiConfig) {
        const w3mConnectors = [];
        wagmiConfig.connectors.forEach(({ id, name }) => {
            if (id !== ConstantsUtil.EIP6963_CONNECTOR_ID) {
                w3mConnectors.push({
                    id,
                    explorerId: PresetsUtil.ConnectorExplorerIds[id],
                    imageId: PresetsUtil.ConnectorImageIds[id],
                    imageUrl: this.options?.connectorImages?.[id],
                    name: PresetsUtil.ConnectorNamesMap[id] ?? name,
                    type: PresetsUtil.ConnectorTypesMap[id] ?? 'EXTERNAL'
                });
            }
        });
        this.setConnectors(w3mConnectors);
    }
    eip6963EventHandler(connector, event) {
        if (event.detail) {
            const { info, provider } = event.detail;
            const connectors = this.getConnectors();
            const existingConnector = connectors.find(c => c.name === info.name);
            if (!existingConnector) {
                this.addConnector({
                    id: ConstantsUtil.EIP6963_CONNECTOR_ID,
                    type: 'ANNOUNCED',
                    imageUrl: info.icon ?? this.options?.connectorImages?.[ConstantsUtil.EIP6963_CONNECTOR_ID],
                    name: info.name,
                    provider,
                    info
                });
                connector.isAuthorized({ info, provider });
            }
        }
    }
    listenConnectors(wagmiConfig) {
        const connector = wagmiConfig.connectors.find(c => c.id === ConstantsUtil.EIP6963_CONNECTOR_ID);
        if (typeof window !== 'undefined' && connector) {
            const handler = this.eip6963EventHandler.bind(this, connector);
            window.addEventListener(ConstantsUtil.EIP6963_ANNOUNCE_EVENT, handler);
            window.dispatchEvent(new Event(ConstantsUtil.EIP6963_REQUEST_EVENT));
        }
    }
}
//# sourceMappingURL=client.js.map