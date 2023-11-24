var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ApiController, EventsController, ModalController, SnackController, ThemeController } from '@web3modal/core';
import { UiHelperUtil, customElement, initializeTheming } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import styles from './styles.js';
const SCROLL_LOCK = 'scroll-lock';
let W3mModal = class W3mModal extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.abortController = undefined;
        this.open = ModalController.state.open;
        this.initializeTheming();
        ApiController.prefetch();
        this.unsubscribe.push(ModalController.subscribeKey('open', val => (val ? this.onOpen() : this.onClose())));
        EventsController.sendEvent({ type: 'track', event: 'MODAL_LOADED' });
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        this.onRemoveKeyboardListener();
    }
    render() {
        return this.open
            ? html `
          <wui-flex @click=${this.onOverlayClick.bind(this)}>
            <wui-card role="alertdialog" aria-modal="true" tabindex="0">
              <w3m-header></w3m-header>
              <w3m-router></w3m-router>
              <w3m-snackbar></w3m-snackbar>
            </wui-card>
          </wui-flex>
        `
            : null;
    }
    onOverlayClick(event) {
        if (event.target === event.currentTarget) {
            ModalController.close();
        }
    }
    initializeTheming() {
        const { themeVariables, themeMode } = ThemeController.state;
        const defaultThemeMode = UiHelperUtil.getColorTheme(themeMode);
        initializeTheming(themeVariables, defaultThemeMode);
    }
    async onClose() {
        this.onScrollUnlock();
        await this.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 200,
            easing: 'ease',
            fill: 'forwards'
        }).finished;
        SnackController.hide();
        this.open = false;
        this.onRemoveKeyboardListener();
    }
    async onOpen() {
        this.onScrollLock();
        this.open = true;
        await this.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 200,
            easing: 'ease',
            fill: 'forwards',
            delay: 300
        }).finished;
        this.onAddKeyboardListener();
    }
    onScrollLock() {
        const styleTag = document.createElement('style');
        styleTag.dataset['w3m'] = SCROLL_LOCK;
        styleTag.textContent = `
      html, body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `;
        document.head.appendChild(styleTag);
    }
    onScrollUnlock() {
        const styleTag = document.head.querySelector(`style[data-w3m="${SCROLL_LOCK}"]`);
        if (styleTag) {
            styleTag.remove();
        }
    }
    onAddKeyboardListener() {
        this.abortController = new AbortController();
        const card = this.shadowRoot?.querySelector('wui-card');
        card?.focus();
        window.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                ModalController.close();
            }
            else if (event.key === 'Tab') {
                const { tagName } = event.target;
                if (tagName && !tagName.includes('W3M-') && !tagName.includes('WUI-')) {
                    card?.focus();
                }
            }
        }, this.abortController);
    }
    onRemoveKeyboardListener() {
        this.abortController?.abort();
        this.abortController = undefined;
    }
};
W3mModal.styles = styles;
__decorate([
    state()
], W3mModal.prototype, "open", void 0);
W3mModal = __decorate([
    customElement('w3m-modal')
], W3mModal);
export { W3mModal };
//# sourceMappingURL=index.js.map