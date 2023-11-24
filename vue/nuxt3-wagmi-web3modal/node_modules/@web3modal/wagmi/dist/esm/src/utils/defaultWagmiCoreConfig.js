import '@web3modal/polyfills';
import { configureChains, createConfig } from '@wagmi/core';
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet';
import { InjectedConnector } from '@wagmi/core/connectors/injected';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import { publicProvider } from '@wagmi/core/providers/public';
import { EIP6963Connector } from '../connectors/EIP6963Connector.js';
import { walletConnectProvider } from './provider.js';
export function defaultWagmiConfig({ projectId, chains, metadata }) {
    const { publicClient } = configureChains(chains, [
        walletConnectProvider({ projectId }),
        publicProvider()
    ]);
    return createConfig({
        autoConnect: true,
        connectors: [
            new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
            new EIP6963Connector({ chains }),
            new InjectedConnector({ chains, options: { shimDisconnect: true } }),
            new CoinbaseWalletConnector({ chains, options: { appName: metadata?.name ?? 'Unknown' } })
        ],
        publicClient
    });
}
//# sourceMappingURL=defaultWagmiCoreConfig.js.map