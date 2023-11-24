var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { networkSvg } from '../../assets/svg/network.js';
import { networkLgSvg } from '../../assets/svg/networkLg.js';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiNetworkImage = class WuiNetworkImage extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'md';
        this.name = 'uknown';
        this.selected = false;
    }
    render() {
        const isLg = this.size === 'lg';
        this.style.cssText = `
      --local-stroke: ${this.selected ? 'var(--wui-color-accent-100)' : 'var(--wui-gray-glass-010)'};
      --local-path: ${isLg ? 'var(--wui-path-network-lg)' : 'var(--wui-path-network)'};
      --local-width: ${isLg ? '86px' : '48px'};
      --local-height: ${isLg ? '96px' : '54px'};
      --local-icon-size: ${isLg ? '42px' : '24px'};
    `;
        return html `${this.templateVisual()} ${isLg ? networkLgSvg : networkSvg}`;
    }
    templateVisual() {
        if (this.imageSrc) {
            return html `<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`;
        }
        return html `<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`;
    }
};
WuiNetworkImage.styles = [resetStyles, styles];
__decorate([
    property()
], WuiNetworkImage.prototype, "size", void 0);
__decorate([
    property()
], WuiNetworkImage.prototype, "name", void 0);
__decorate([
    property()
], WuiNetworkImage.prototype, "imageSrc", void 0);
__decorate([
    property({ type: Boolean })
], WuiNetworkImage.prototype, "selected", void 0);
WuiNetworkImage = __decorate([
    customElement('wui-network-image')
], WuiNetworkImage);
export { WuiNetworkImage };
//# sourceMappingURL=index.js.map