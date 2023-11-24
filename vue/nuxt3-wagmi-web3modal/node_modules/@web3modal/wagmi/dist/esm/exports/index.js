import { Web3Modal } from '../src/client.js';
import { ConstantsUtil } from '@web3modal/utils';
export { EIP6963Connector } from '../src/connectors/EIP6963Connector.js';
export { defaultWagmiConfig } from '../src/utils/defaultWagmiCoreConfig.js';
export { walletConnectProvider } from '../src/utils/provider.js';
export function createWeb3Modal(options) {
    return new Web3Modal({ ...options, _sdkVersion: `html-wagmi-${ConstantsUtil.VERSION}` });
}
//# sourceMappingURL=index.js.map