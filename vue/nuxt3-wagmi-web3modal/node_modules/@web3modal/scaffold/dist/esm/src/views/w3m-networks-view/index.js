var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AccountController, AssetUtil, EventsController, NetworkController, RouterController } from '@web3modal/core';
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
let W3mNetworksView = class W3mNetworksView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.caipNetwork = NetworkController.state.caipNetwork;
        this.unsubscribe.push(NetworkController.subscribeKey('caipNetwork', val => (this.caipNetwork = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return html `
      <wui-grid padding="s" gridTemplateColumns="repeat(4, 1fr)" rowGap="l" columnGap="xs">
        ${this.networksTemplate()}
      </wui-grid>

      <wui-separator></wui-separator>

      <wui-flex padding="s" flexDirection="column" gap="m" alignItems="center">
        <wui-text variant="small-500" color="fg-300" align="center">
          Your connected wallet may not support some of the networks available for this dApp
        </wui-text>
        <wui-link @click=${this.onNetworkHelp.bind(this)}>
          <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
          What is a network
        </wui-link>
      </wui-flex>
    `;
    }
    onNetworkHelp() {
        EventsController.sendEvent({ type: 'track', event: 'CLICK_NETWORK_HELP' });
        RouterController.push('WhatIsANetwork');
    }
    networksTemplate() {
        const { approvedCaipNetworkIds, requestedCaipNetworks, supportsAllNetworks } = NetworkController.state;
        const approvedIds = approvedCaipNetworkIds;
        const requested = requestedCaipNetworks;
        if (approvedIds?.length) {
            requested?.sort((a, b) => approvedIds.indexOf(b.id) - approvedIds.indexOf(a.id));
        }
        return requested?.map(network => html `
        <wui-card-select
          .selected=${this.caipNetwork?.id === network.id}
          imageSrc=${ifDefined(AssetUtil.getNetworkImage(network))}
          type="network"
          name=${network.name ?? network.id}
          @click=${() => this.onSwitchNetwork(network)}
          .disabled=${!supportsAllNetworks && !approvedIds?.includes(network.id)}
        ></wui-card-select>
      `);
    }
    async onSwitchNetwork(network) {
        const { isConnected } = AccountController.state;
        const { approvedCaipNetworkIds, supportsAllNetworks, caipNetwork } = NetworkController.state;
        if (isConnected && caipNetwork?.id !== network.id) {
            if (approvedCaipNetworkIds?.includes(network.id)) {
                await NetworkController.switchActiveNetwork(network);
            }
            else if (supportsAllNetworks) {
                RouterController.push('SwitchNetwork', { network });
            }
        }
        else if (!isConnected) {
            NetworkController.setCaipNetwork(network);
            RouterController.push('Connect');
        }
    }
};
__decorate([
    state()
], W3mNetworksView.prototype, "caipNetwork", void 0);
W3mNetworksView = __decorate([
    customElement('w3m-networks-view')
], W3mNetworksView);
export { W3mNetworksView };
//# sourceMappingURL=index.js.map