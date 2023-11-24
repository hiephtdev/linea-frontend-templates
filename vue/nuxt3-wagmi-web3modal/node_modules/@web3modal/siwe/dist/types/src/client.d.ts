import type { SIWECreateMessageArgs, SIWEVerifyMessageArgs, SIWEControllerClient, SIWEConfig, SIWEClientMethods } from '@web3modal/core';
export declare class Web3ModalSIWEClient {
    options: SIWEControllerClient['options'];
    methods: SIWEClientMethods;
    constructor(siweConfig: SIWEConfig);
    getNonce(): Promise<string>;
    createMessage(args: SIWECreateMessageArgs): string;
    verifyMessage(args: SIWEVerifyMessageArgs): Promise<true>;
    getSession(): Promise<import("@web3modal/core").SIWESession>;
    signOut(): Promise<boolean>;
}
