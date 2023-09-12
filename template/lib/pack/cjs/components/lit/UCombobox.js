'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');
var Object$1 = require('../../extensions/Object.js');
var fastComponents = require('@microsoft/fast-components');

fastComponents.provideFASTDesignSystem().register(fastComponents.fastCombobox());
class ComboboxContext {
    constructor(context) {
        this.source = [];
        this.value = null;
        this.listType = false; // 키입력을 막고 선택만 가능하게 합니다. ! 구현필요
        Object$1.ObjectHelper.cloneFrom(context, this);
    }
}
exports.UCombobox = class UCombobox extends lit.LitElement {
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
        return lit.html `
    ${this.label ? lit.html `<label class="label">${this.label}</label>` : null}
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
            return lit.html `<fast-option ?selected=${selected} value=${value} .dataContext=${item}>${display}</fast-option>`;
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
exports.UCombobox.styles = [
    lit.css `
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
_tslib.__decorate([
    decorators_js.property({ type: Array }),
    _tslib.__metadata("design:type", Array)
], exports.UCombobox.prototype, "source", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Object }),
    _tslib.__metadata("design:type", ComboboxContext)
], exports.UCombobox.prototype, "context", void 0);
_tslib.__decorate([
    decorators_js.property({ type: String }),
    _tslib.__metadata("design:type", Object)
], exports.UCombobox.prototype, "label", void 0);
_tslib.__decorate([
    decorators_js.property({ type: String }),
    _tslib.__metadata("design:type", Object)
], exports.UCombobox.prototype, "hint", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Object }),
    _tslib.__metadata("design:type", Object)
], exports.UCombobox.prototype, "value", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Object }),
    _tslib.__metadata("design:type", Object)
], exports.UCombobox.prototype, "dataContext", void 0);
_tslib.__decorate([
    decorators_js.property({ type: String }),
    _tslib.__metadata("design:type", Object)
], exports.UCombobox.prototype, "path", void 0);
exports.UCombobox = _tslib.__decorate([
    decorators_js.customElement('u-combobox')
], exports.UCombobox);

exports.ComboboxContext = ComboboxContext;
