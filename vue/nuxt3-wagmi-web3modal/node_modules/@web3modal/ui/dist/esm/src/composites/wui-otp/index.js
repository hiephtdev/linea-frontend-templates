var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import '../../layout/wui-flex/index.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { UiHelperUtil } from '../../utils/UiHelperUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-input-numeric/index.js';
import { WuiInputNumeric } from '../wui-input-numeric/index.js';
import styles from './styles.js';
let WuiOtp = class WuiOtp extends LitElement {
    constructor() {
        super(...arguments);
        this.length = 6;
        this.numerics = [];
        this.handleKeyDown = (e, index) => {
            const inputElement = e.target;
            const input = this.getInputElement(inputElement);
            const keyArr = ['ArrowLeft', 'ArrowRight', 'Shift', 'Delete'];
            if (!input) {
                return;
            }
            if (keyArr.includes(e.key)) {
                e.preventDefault();
            }
            const currentCaretPos = input.selectionStart;
            switch (e.key) {
                case 'ArrowLeft':
                    if (currentCaretPos) {
                        input.setSelectionRange(currentCaretPos + 1, currentCaretPos + 1);
                    }
                    this.focusInputField('prev', index);
                    break;
                case 'ArrowRight':
                    this.focusInputField('next', index);
                    break;
                case 'Shift':
                    this.focusInputField('next', index);
                    break;
                case 'Delete':
                    if (input.value === '') {
                        this.focusInputField('prev', index);
                    }
                    else {
                        input.value = '';
                    }
                    break;
                case 'Backspace':
                    if (input.value === '') {
                        this.focusInputField('prev', index);
                    }
                    else {
                        input.value = '';
                    }
                    break;
                default:
            }
        };
        this.focusInputField = (dir, index) => {
            if (dir === 'next') {
                const nextIndex = index + 1;
                const numeric = this.numerics[nextIndex < this.length ? nextIndex : index];
                const input = numeric ? this.getInputElement(numeric) : undefined;
                if (input) {
                    input.focus();
                }
            }
            if (dir === 'prev') {
                const nextIndex = index - 1;
                const numeric = this.numerics[nextIndex > -1 ? nextIndex : index];
                const input = numeric ? this.getInputElement(numeric) : undefined;
                if (input) {
                    input.focus();
                }
            }
        };
    }
    firstUpdated() {
        const numericElements = this.shadowRoot?.querySelectorAll('wui-input-numeric');
        if (numericElements) {
            this.numerics = Array.from(numericElements);
        }
    }
    render() {
        return html `
      <wui-flex gap="xxs">
        ${[...Array(this.length)].map((_, index) => html `
            <wui-input-numeric
              @input=${(e) => this.handleInput(e, index)}
              @keydown=${(e) => this.handleKeyDown(e, index)}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `;
    }
    handleInput(e, index) {
        const inputElement = e.target;
        const input = this.getInputElement(inputElement);
        if (input) {
            const inputValue = input.value;
            if (e.inputType === 'insertFromPaste') {
                this.handlePaste(input, inputValue, index);
            }
            else {
                const isValid = UiHelperUtil.isNumber(inputValue);
                if (isValid && e.data) {
                    input.value = e.data;
                    this.focusInputField('next', index);
                }
                else {
                    input.value = '';
                }
            }
        }
    }
    handlePaste(input, inputValue, index) {
        const value = inputValue[0];
        const isValid = value && UiHelperUtil.isNumber(value);
        if (isValid) {
            input.value = value;
            const inputString = inputValue.substring(1);
            if (index + 1 < this.length && inputString.length) {
                const nextNumeric = this.numerics[index + 1];
                const nextInput = nextNumeric ? this.getInputElement(nextNumeric) : undefined;
                if (nextInput) {
                    this.handlePaste(nextInput, inputString, index + 1);
                }
            }
            else {
                this.focusInputField('next', index);
            }
        }
        else {
            input.value = '';
        }
    }
    getInputElement(el) {
        if (el.shadowRoot?.querySelector('input')) {
            return el.shadowRoot.querySelector('input');
        }
        return null;
    }
};
WuiOtp.styles = [resetStyles, styles];
__decorate([
    property({ type: Number })
], WuiOtp.prototype, "length", void 0);
WuiOtp = __decorate([
    customElement('wui-otp')
], WuiOtp);
export { WuiOtp };
//# sourceMappingURL=index.js.map