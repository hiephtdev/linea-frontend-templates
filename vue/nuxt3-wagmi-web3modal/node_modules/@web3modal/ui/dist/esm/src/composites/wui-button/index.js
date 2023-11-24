var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-icon/index.js';
import '../../components/wui-loading-spinner/index.js';
import '../../components/wui-text/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiButton = class WuiButton extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'md';
        this.disabled = false;
        this.fullWidth = false;
        this.loading = false;
        this.variant = 'fill';
    }
    render() {
        this.style.cssText = `
    --local-width: ${this.fullWidth ? '100%' : 'auto'};
    --local-opacity-100: ${this.loading ? 0 : 1};
    --local-opacity-000: ${this.loading ? 1 : 0};`;
        const textVariant = this.size === 'md' ? 'paragraph-600' : 'small-600';
        return html `
      <button
        data-variant=${this.variant}
        data-size=${this.size}
        ?disabled=${this.disabled || this.loading}
        ontouchstart
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft"></slot>
        <wui-text variant=${textVariant} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `;
    }
    loadingTemplate() {
        if (this.loading) {
            return html `<wui-loading-spinner color="fg-300"></wui-loading-spinner>`;
        }
        return html ``;
    }
};
WuiButton.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiButton.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], WuiButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], WuiButton.prototype, "fullWidth", void 0);
__decorate([
    property({ type: Boolean })
], WuiButton.prototype, "loading", void 0);
__decorate([
    property()
], WuiButton.prototype, "variant", void 0);
WuiButton = __decorate([
    customElement('wui-button')
], WuiButton);
export { WuiButton };
//# sourceMappingURL=index.js.map