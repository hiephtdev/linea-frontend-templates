import { CoreHelperUtil } from '@web3modal/scaffold';
import { ConstantsUtil } from '@web3modal/utils';
const RPC_URL = CoreHelperUtil.getBlockchainApiUrl();
export function walletConnectProvider({ projectId }) {
    return function provider(chain) {
        const supported = [
            1,
            5,
            11155111,
            10,
            420,
            42161,
            421613,
            137,
            80001,
            42220,
            1313161554,
            1313161555,
            56,
            97,
            43114,
            43113,
            100,
            8453,
            84531,
            7777777,
            999,
            324,
            280
        ];
        if (!supported.includes(chain.id)) {
            return null;
        }
        const baseHttpUrl = `${RPC_URL}/v1/?chainId=${ConstantsUtil.EIP155}:${chain.id}&projectId=${projectId}`;
        return {
            chain: {
                ...chain,
                rpcUrls: {
                    ...chain.rpcUrls,
                    default: { http: [baseHttpUrl] }
                }
            },
            rpcUrls: {
                http: [baseHttpUrl]
            }
        };
    };
}
//# sourceMappingURL=provider.js.map