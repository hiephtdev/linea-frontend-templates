import type { ConnectionControllerClient, SIWEControllerClient, EventsControllerState, NetworkControllerClient, NetworkControllerState, OptionsControllerState, PublicStateControllerState, ThemeControllerState, ThemeMode, ThemeVariables, SIWEControllerClientState } from '@web3modal/core';
import { AccountController, BlockchainApiController, ConnectionController, ConnectorController, NetworkController, SIWEController } from '@web3modal/core';
export interface LibraryOptions {
    projectId: OptionsControllerState['projectId'];
    themeMode?: ThemeMode;
    themeVariables?: ThemeVariables;
    includeWalletIds?: OptionsControllerState['includeWalletIds'];
    excludeWalletIds?: OptionsControllerState['excludeWalletIds'];
    featuredWalletIds?: OptionsControllerState['featuredWalletIds'];
    defaultChain?: NetworkControllerState['caipNetwork'];
    tokens?: OptionsControllerState['tokens'];
    termsConditionsUrl?: OptionsControllerState['termsConditionsUrl'];
    privacyPolicyUrl?: OptionsControllerState['privacyPolicyUrl'];
    customWallets?: OptionsControllerState['customWallets'];
    enableAnalytics?: OptionsControllerState['enableAnalytics'];
    metadata?: OptionsControllerState['metadata'];
    _sdkVersion: OptionsControllerState['sdkVersion'];
}
export interface ScaffoldOptions extends LibraryOptions {
    networkControllerClient: NetworkControllerClient;
    connectionControllerClient: ConnectionControllerClient;
    siweControllerClient?: SIWEControllerClient;
}
export interface OpenOptions {
    view: 'Account' | 'Connect' | 'Networks';
}
export declare class Web3ModalScaffold {
    private initPromise?;
    constructor(options: ScaffoldOptions);
    open(options?: OpenOptions): Promise<void>;
    close(): Promise<void>;
    getThemeMode(): ThemeMode;
    getThemeVariables(): ThemeVariables;
    setThemeMode(themeMode: ThemeControllerState['themeMode']): void;
    setThemeVariables(themeVariables: ThemeControllerState['themeVariables']): void;
    subscribeTheme(callback: (newState: ThemeControllerState) => void): () => void;
    getState(): {
        open: boolean;
        selectedNetworkId?: `${string}:${string}` | undefined;
    };
    subscribeState(callback: (newState: PublicStateControllerState) => void): () => void;
    getEvent(): {
        timestamp: number;
        data: import("@web3modal/core").Event;
    };
    subscribeEvents(callback: (newEvent: EventsControllerState) => void): () => void;
    protected setIsConnected: (typeof AccountController)['setIsConnected'];
    protected setCaipAddress: (typeof AccountController)['setCaipAddress'];
    protected setBalance: (typeof AccountController)['setBalance'];
    protected setProfileName: (typeof AccountController)['setProfileName'];
    protected setProfileImage: (typeof AccountController)['setProfileImage'];
    protected resetAccount: (typeof AccountController)['resetAccount'];
    protected setCaipNetwork: (typeof NetworkController)['setCaipNetwork'];
    protected getCaipNetwork: () => import("@web3modal/core").CaipNetwork | undefined;
    protected setRequestedCaipNetworks: (typeof NetworkController)['setRequestedCaipNetworks'];
    protected getApprovedCaipNetworksData: (typeof NetworkController)['getApprovedCaipNetworksData'];
    protected resetNetwork: (typeof NetworkController)['resetNetwork'];
    protected setConnectors: (typeof ConnectorController)['setConnectors'];
    protected addConnector: (typeof ConnectorController)['addConnector'];
    protected getConnectors: (typeof ConnectorController)['getConnectors'];
    protected resetWcConnection: (typeof ConnectionController)['resetWcConnection'];
    protected fetchIdentity: (typeof BlockchainApiController)['fetchIdentity'];
    protected setAddressExplorerUrl: (typeof AccountController)['setAddressExplorerUrl'];
    protected setSIWENonce: (typeof SIWEController)['setNonce'];
    protected setSIWESession: (typeof SIWEController)['setSession'];
    protected setSIWEStatus: (typeof SIWEController)['setStatus'];
    protected setSIWEMessage: (typeof SIWEController)['setMessage'];
    subscribeSIWEState(callback: (newState: SIWEControllerClientState) => void): () => void;
    protected getSIWENonce: () => string | undefined;
    protected getSIWESession: () => import("@web3modal/core").SIWESession | undefined;
    protected getSIWEStatus: () => "error" | "success" | "ready" | "loading" | "uninitialized" | "rejected";
    protected getSIWEMessage: () => string | undefined;
    private initControllers;
    private initOrContinue;
}
