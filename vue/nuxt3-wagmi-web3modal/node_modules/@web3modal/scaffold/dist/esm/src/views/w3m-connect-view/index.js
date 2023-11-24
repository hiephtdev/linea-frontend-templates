var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ApiController, AssetUtil, ConnectionController, ConnectorController, CoreHelperUtil, EventsController, OptionsController, RouterController, StorageUtil } from '@web3modal/core';
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './styles.js';
let W3mConnectView = class W3mConnectView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.connectors = ConnectorController.state.connectors;
        this.unsubscribe.push(ConnectorController.subscribeKey('connectors', val => (this.connectors = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return html `
      <wui-flex flexDirection="column" padding="s" gap="xs">
        ${this.walletConnectConnectorTemplate()} ${this.recentTemplate()}
        ${this.announcedTemplate()} ${this.injectedTemplate()} ${this.featuredTemplate()}
        ${this.customTemplate()} ${this.recommendedTemplate()} ${this.connectorsTemplate()}
        ${this.allWalletsTemplate()}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
    }
    walletConnectConnectorTemplate() {
        if (CoreHelperUtil.isMobile()) {
            return null;
        }
        const connector = this.connectors.find(c => c.type === 'WALLET_CONNECT');
        if (!connector) {
            return null;
        }
        return html `
      <wui-list-wallet
        imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
        name=${connector.name ?? 'Unknown'}
        @click=${() => this.onConnector(connector)}
        tagLabel="qr code"
        tagVariant="main"
      >
      </wui-list-wallet>
    `;
    }
    customTemplate() {
        const { customWallets } = OptionsController.state;
        if (!customWallets?.length) {
            return null;
        }
        const wallets = this.filterOutDuplicateWallets(customWallets);
        return wallets.map(wallet => html `
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
          name=${wallet.name ?? 'Unknown'}
          @click=${() => this.onConnectWallet(wallet)}
        >
        </wui-list-wallet>
      `);
    }
    featuredTemplate() {
        const { featured } = ApiController.state;
        if (!featured.length) {
            return null;
        }
        const wallets = this.filterOutDuplicateWallets(featured);
        return wallets.map(wallet => html `
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
          name=${wallet.name ?? 'Unknown'}
          @click=${() => this.onConnectWallet(wallet)}
        >
        </wui-list-wallet>
      `);
    }
    recentTemplate() {
        const recent = StorageUtil.getRecentWallets();
        return recent.map(wallet => html `
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
          name=${wallet.name ?? 'Unknown'}
          @click=${() => this.onConnectWallet(wallet)}
          tagLabel="recent"
          tagVariant="shade"
        >
        </wui-list-wallet>
      `);
    }
    announcedTemplate() {
        return this.connectors.map(connector => {
            if (connector.type !== 'ANNOUNCED') {
                return null;
            }
            return html `
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
          name=${connector.name ?? 'Unknown'}
          @click=${() => this.onConnector(connector)}
          tagLabel="installed"
          tagVariant="success"
        >
        </wui-list-wallet>
      `;
        });
    }
    injectedTemplate() {
        const announced = this.connectors.find(c => c.type === 'ANNOUNCED');
        return this.connectors.map(connector => {
            if (connector.type !== 'INJECTED') {
                return null;
            }
            if (!ConnectionController.checkInstalled()) {
                return null;
            }
            return html `
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
          name=${connector.name ?? 'Unknown'}
          @click=${() => this.onConnector(connector)}
          tagLabel=${ifDefined(announced ? undefined : 'installed')}
          tagVariant=${ifDefined(announced ? undefined : 'success')}
        >
        </wui-list-wallet>
      `;
        });
    }
    connectorsTemplate() {
        return this.connectors.map(connector => {
            if (['WALLET_CONNECT', 'INJECTED', 'ANNOUNCED'].includes(connector.type)) {
                return null;
            }
            return html `
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
          name=${connector.name ?? 'Unknown'}
          @click=${() => this.onConnector(connector)}
        >
        </wui-list-wallet>
      `;
        });
    }
    allWalletsTemplate() {
        const roundedCount = Math.floor(ApiController.state.count / 10) * 10;
        return html `
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${`${roundedCount}+`}
        tagVariant="shade"
      ></wui-list-wallet>
    `;
    }
    recommendedTemplate() {
        const { recommended } = ApiController.state;
        const { customWallets, featuredWalletIds } = OptionsController.state;
        const { connectors } = ConnectorController.state;
        const recent = StorageUtil.getRecentWallets();
        const eip6963 = connectors.filter(c => c.type === 'ANNOUNCED');
        if (featuredWalletIds || customWallets || !recommended.length) {
            return null;
        }
        const overrideLength = eip6963.length + recent.length;
        const maxRecommended = Math.max(0, 2 - overrideLength);
        const wallets = this.filterOutDuplicateWallets(recommended).slice(0, maxRecommended);
        return wallets.map(wallet => html `
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
          name=${wallet?.name ?? 'Unknown'}
          @click=${() => this.onConnectWallet(wallet)}
        >
        </wui-list-wallet>
      `);
    }
    onConnector(connector) {
        if (connector.type === 'WALLET_CONNECT') {
            if (CoreHelperUtil.isMobile()) {
                RouterController.push('AllWallets');
            }
            else {
                RouterController.push('ConnectingWalletConnect');
            }
        }
        else {
            RouterController.push('ConnectingExternal', { connector });
        }
    }
    filterOutDuplicateWallets(wallets) {
        const { connectors } = ConnectorController.state;
        const recent = StorageUtil.getRecentWallets();
        const recentIds = recent.map(wallet => wallet.id);
        const rdnsIds = connectors.map(c => c.info?.rdns).filter(Boolean);
        const filtered = wallets.filter(wallet => !recentIds.includes(wallet.id) && !rdnsIds.includes(wallet.rdns ?? undefined));
        return filtered;
    }
    onAllWallets() {
        EventsController.sendEvent({ type: 'track', event: 'CLICK_ALL_WALLETS' });
        RouterController.push('AllWallets');
    }
    onConnectWallet(wallet) {
        RouterController.push('ConnectingWalletConnect', { wallet });
    }
};
W3mConnectView.styles = styles;
__decorate([
    state()
], W3mConnectView.prototype, "connectors", void 0);
W3mConnectView = __decorate([
    customElement('w3m-connect-view')
], W3mConnectView);
export { W3mConnectView };
//# sourceMappingURL=index.js.map