import '@web3modal/polyfills';
import type { Chain } from '@wagmi/core';
export interface ConfigOptions {
    metadata?: {
        name?: string;
        description?: string;
        url?: string;
        icons?: string[];
        verifyUrl?: string;
    };
    projectId: string;
    chains: Chain[];
}
export declare function defaultWagmiConfig({ projectId, chains, metadata }: ConfigOptions): import("@wagmi/core").Config<import("@wagmi/core/index-e744bbc2.js").P<import("viem").FallbackTransport>, import("@wagmi/core/index-e744bbc2.js").W>;
