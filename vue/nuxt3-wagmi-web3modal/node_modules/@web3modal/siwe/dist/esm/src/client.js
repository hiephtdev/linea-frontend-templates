import { ConstantsUtil } from './utils/ConstantsUtil.js';
export class Web3ModalSIWEClient {
    constructor(siweConfig) {
        const { enabled = true, nonceRefetchIntervalMs = ConstantsUtil.FIVE_MINUTES_IN_MS, sessionRefetchIntervalMs = ConstantsUtil.FIVE_MINUTES_IN_MS, signOutOnAccountChange = true, signOutOnDisconnect = true, signOutOnNetworkChange = true, ...siweConfigMethods } = siweConfig;
        this.options = {
            enabled,
            nonceRefetchIntervalMs,
            sessionRefetchIntervalMs,
            signOutOnDisconnect,
            signOutOnAccountChange,
            signOutOnNetworkChange
        };
        this.methods = siweConfigMethods;
    }
    async getNonce() {
        const nonce = await this.methods.getNonce();
        if (!nonce) {
            throw new Error('siweControllerClient:getNonce - nonce is undefined');
        }
        return nonce;
    }
    createMessage(args) {
        const message = this.methods.createMessage(args);
        if (!message) {
            throw new Error('siweControllerClient:createMessage - message is undefined');
        }
        return message;
    }
    async verifyMessage(args) {
        const isValid = await this.methods.verifyMessage(args);
        if (!isValid) {
            throw new Error('siweControllerClient:createMessage - message is not valid');
        }
        return isValid;
    }
    async getSession() {
        const session = await this.methods.getSession();
        if (!session) {
            throw new Error('siweControllerClient:getSession - session is undefined');
        }
        return session;
    }
    async signOut() {
        return this.methods.signOut();
    }
}
//# sourceMappingURL=client.js.map