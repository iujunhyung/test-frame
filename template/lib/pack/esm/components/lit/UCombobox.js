import { __decorate, __metadata } from '../../_virtual/_tslib.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ObjectHelper } from '../../extensions/Object.js';
import { provideFASTDesignSystem, fastCombobox } from '@microsoft/fast-components';

provideFASTDesignSystem().register(fastCombobox());
class ComboboxContext {
    constructor(context) {
        this.source = [];
        this.value = null;
        this.listType = false; // 키입력을 막고 선택만 가능하게 합니다. ! 구현필요
        ObjectHelper.cloneFrom(context, this);
    }
}
let UCombobox = class UCombobox extends LitElement {
    constructor() {
        super(...arguments);
        this.source = [];
        this.label = "";
        this.hint = null;
        this.dataContext = null;
        this.path = null;
    }
    onChangedContext() {
        if (this.context) {
            if (this.context.source) {
                this.source = this.context.source;
            }
            if (this.context.value) {
                this.value = this.context.value;
            }
        }
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('dataContext')) {
            if (this.dataContext && this.path) {
                let v = this.dataContext[this.path];
                if (v != null && v != undefined)
                    this.value = v;
                if (this.value != v) {
                    // this.value = undefined;
                    this.value = "Text";
                    // this.requestUpdate();          
                }
            }
        }
        else if (changedProperties.has('context')) {
            this.onChangedContext();
        }
    }
    getCurrentValue() {
        var _a;
        if (this.context) {
            if (this.context.valuePath && this.context.displayPath) {
                // @ts-ignore
                let item = (_a = this.context.source) === null || _a === void 0 ? void 0 : _a.find((item) => item[this.context.valuePath] == this.value);
                if (item) {
                    return item[this.context.displayPath];
                }
            }
        }
        return this.value;
    }
    render() {
        var _a, _b;
        return html `
    ${this.label ? html `<label class="label">${this.label}</label>` : null}
    <fast-combobox 
      autocomplete="both" 
      @change=${this.changeValue} 
      placeholder=${(_a = this.hint) !== null && _a !== void 0 ? _a : this.label} 
      value=${this.value} 
      current-value=${this.getCurrentValue()}>

      ${(_b = this.source) === null || _b === void 0 ? void 0 : _b.map((item) => {
            let value = this.context != null && this.context.valuePath ? item[this.context.valuePath] : item;
            let display = this.context != null && this.context.displayPath ? item[this.context.displayPath] : item;
            let selected = this.value == value;
            return html `<fast-option ?selected=${selected} value=${value} .dataContext=${item}>${display}</fast-option>`;
        })}
    </fast-combobox>`;
    }
    changeValue(e) {
        this.value = e.target.currentValue;
        let option = e.target.options[e.target.selectedIndex];
        let item = option['dataContext'];
        let value = option.value;
        if (this.context) {
            this.context.selectedItem = item;
            this.context.value = value;
        }
        if (this.dataContext && this.path) {
            this.dataContext[this.path] = value;
        }
        // ComboboxSelectedItemType
        this.dispatchEvent(new CustomEvent('changed', { detail: {
                text: e.target.currentValue,
                value: value
            }, bubbles: true, composed: true }));
    }
};
UCombobox.styles = [
    css `
    :host {
      display: block;
    }

    fast-combobox {
      min-width: 80px;
      width: 100%;
    }

    .label {
      display: block;
      padding: 4px 0;
    }
    `
];
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], UCombobox.prototype, "source", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", ComboboxContext)
], UCombobox.prototype, "context", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], UCombobox.prototype, "label", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], UCombobox.prototype, "hint", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], UCombobox.prototype, "value", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], UCombobox.prototype, "dataContext", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], UCombobox.prototype, "path", void 0);
UCombobox = __decorate([
    customElement('u-combobox')
], UCombobox);

export { ComboboxContext, UCombobox };
