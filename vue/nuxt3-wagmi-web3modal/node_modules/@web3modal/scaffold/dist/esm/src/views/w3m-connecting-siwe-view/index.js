var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CoreHelperUtil, OptionsController, RouterController } from '@web3modal/core';
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
let W3mConnectingSiweView = class W3mConnectingSiweView extends LitElement {
    constructor() {
        super(...arguments);
        this.dappUrl = OptionsController.state.metadata?.url;
        this.dappName = OptionsController.state.metadata?.name;
    }
    render() {
        return html `
      <wui-flex justifyContent="center" .padding=${['2xl', '0', 'xxl', '0']}>
        <w3m-connecting-siwe></w3m-connecting-siwe>
      </wui-flex>
      <wui-flex
        .padding=${['0', '4xl', 'l', '4xl']}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName ?? 'Dapp'} wants to connect to your wallet</wui-text
        >
      </wui-flex>
      ${this.urlTemplate()}
      <wui-flex
        .padding=${['0', '3xl', 'l', '3xl']}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and to continue</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${['l', 'xl', 'xl', 'xl']} gap="s" justifyContent="space-between">
        <wui-button size="md" ?fullwidth=${true} variant="shade" @click=${this.onCancel.bind(this)}>
          Cancel
        </wui-button>
        <wui-button size="md" ?fullwidth=${true} variant="fill" @click=${this.onSign.bind(this)}>
          Sign
        </wui-button>
      </wui-flex>
    `;
    }
    urlTemplate() {
        if (this.dappUrl) {
            return html `<wui-flex .padding=${['0', '0', 'l', '0']} justifyContent="center">
        <wui-button size="sm" variant="accentBg" @click=${this.onDappLink.bind(this)}>
          ${this.dappUrl}
          <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>`;
        }
        return null;
    }
    onDappLink() {
        if (this.dappUrl) {
            CoreHelperUtil.openHref(this.dappUrl, '_blank');
        }
    }
    onSign() {
    }
    onCancel() {
        RouterController.goBack();
    }
};
W3mConnectingSiweView = __decorate([
    customElement('w3m-connecting-siwe-view')
], W3mConnectingSiweView);
export { W3mConnectingSiweView };
//# sourceMappingURL=index.js.map