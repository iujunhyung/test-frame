'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');
var ElementBaseMixin = require('../../core/ElementBaseMixin.js');
var PropertyMeta = require('../../core/PropertyMeta.js');
var mobx = require('mobx');
var fastComponents = require('@microsoft/fast-components');

fastComponents.provideFASTDesignSystem().register(fastComponents.fastTextField(), fastComponents.fastTextArea(), fastComponents.fastNumberField(), fastComponents.fastCheckbox(), fastComponents.fastCombobox(), fastComponents.fastOption());
exports.InputTypes = void 0;
(function (InputTypes) {
    InputTypes[InputTypes["text"] = 0] = "text";
    InputTypes[InputTypes["email"] = 1] = "email";
    InputTypes[InputTypes["password"] = 2] = "password";
    InputTypes[InputTypes["tel"] = 3] = "tel";
    InputTypes[InputTypes["url"] = 4] = "url";
    InputTypes[InputTypes["checkbox"] = 5] = "checkbox";
    InputTypes[InputTypes["number"] = 6] = "number";
    InputTypes[InputTypes["date"] = 7] = "date";
    InputTypes[InputTypes["time"] = 8] = "time";
    InputTypes[InputTypes["datetime"] = 9] = "datetime";
})(exports.InputTypes || (exports.InputTypes = {}));
exports.UInput = class UInput extends ElementBaseMixin.ElementMixin(lit.LitElement) {
    constructor() {
        super(...arguments);
        this.type = exports.InputTypes.text;
        this.value = null;
        this.label = null;
        this.hint = null;
        this.required = false;
        this.context = null;
        this.path = null;
        this.skipUpdate = false; // context[path] = value; 값이 변경될 때 업데이트하지 않습니다.
        this.readonly = false;
        this.autoFocus = false;
        this.multiline = false;
        this.updatedAction = null;
        this.lastContext = null;
        this.lastPath = null;
    }
    updated(_changedProperties) {
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            yield this.updateComplete;
            if (this.context && this.path) {
                if (this.context == this.lastContext && this.path == this.lastPath)
                    return;
                this.lastContext = this.context;
                this.lastPath = this.path;
                this.autoWire(this.context, this.path);
            }
        });
    }
    autoWire(context, path) {
        var options = PropertyMeta.getPropertyMeta(context, path);
        if (options) {
            if (options.label) {
                this.label = options.label;
            }
            if (options.hint) {
                this.hint = options.hint;
            }
            if (options.required) {
                this.required = options.required;
            }
            if (options.type) {
                let typeName = options.type.name;
                if (typeName == "String") {
                    this.type = exports.InputTypes.text;
                }
                if (typeName == "Boolean") {
                    this.type = exports.InputTypes.checkbox;
                }
                if (typeName == "Number") {
                    this.type = exports.InputTypes.number;
                }
            }
            if (options.format) {
                let inputType = exports.InputTypes[options.format];
                if (inputType == undefined) {
                    throw `not suppreted ${options.format}`;
                }
                else {
                    this.type = inputType;
                }
            }
        }
        if (this.hint == null) {
            if (this.label) {
                this.hint = this.label;
            }
            else {
                this.hint = path;
            }
        }
        let v = context[path];
        this.value = v == undefined ? '' : v;
    }
    render() {
        return lit.html `
      ${this.renderInput()}
      ${this.renderError()}
    `;
    }
    renderInput() {
        if (this.type == exports.InputTypes.checkbox || this.type == exports.InputTypes[exports.InputTypes.checkbox]) {
            return this.renderCheckbox();
        }
        else if (this.type == exports.InputTypes.email || this.type == exports.InputTypes[exports.InputTypes.email]) {
            return this.renderText('email');
        }
        else if (this.type == exports.InputTypes.number || this.type == exports.InputTypes[exports.InputTypes.number]) {
            return this.renderNumber();
        }
        else if (this.type == exports.InputTypes.date || this.type == exports.InputTypes[exports.InputTypes.date]) {
            return lit.html `<input type="date">`;
        }
        else if (this.type == exports.InputTypes.time || this.type == exports.InputTypes[exports.InputTypes.time]) {
            return lit.html `<input type="time">`;
        }
        else if (this.type == exports.InputTypes.datetime || this.type == exports.InputTypes[exports.InputTypes.datetime]) {
            return lit.html `<input type="datetime-local">`;
        }
        else {
            let inputType = this.type;
            if (typeof this.type == "number") {
                inputType = exports.InputTypes[this.type];
            }
            if (this.multiline) {
                return this.renderTextArea(`${inputType}`);
            }
            else {
                return this.renderText(`${inputType}`);
            }
        }
    }
    renderError() {
        return lit.html ``;
    }
    renderText(type) {
        var _a;
        return lit.html `
    <fast-text-field @change=${(e) => {
            this.value = e.target.value.trim();
            this.onChange(this.value);
            e.cancelBubble = true;
        }}
      type=${type}
      .value=${this.value} 
      placeholder=${(_a = this.hint) !== null && _a !== void 0 ? _a : this.label} 
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}>
      ${this.label && this.required ? lit.html `<span style="color:red;">&#42;</span>` : lit.html ``}
      ${this.label}
    </fast-text-field>
    `;
    }
    renderTextArea(type) {
        var _a;
        return lit.html `
    <fast-text-area @change=${(e) => {
            this.value = e.target.value.trim();
            this.onChange(this.value);
            e.cancelBubble = true;
        }} 
      type=${type}
      .value=${this.value} 
      placeholder=${(_a = this.hint) !== null && _a !== void 0 ? _a : this.label}
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}>
      ${this.label && this.required ? lit.html `<span style="color:red;">&#42;</span>` : lit.html ``}
      ${this.label}
    </fast-text-area>
    `;
    }
    renderCheckbox() {
        return lit.html `
    <fast-checkbox @change=${(e) => {
            this.value = e.target.currentChecked;
            this.onChange(this.value);
            e.cancelBubble = true;
        }} 
      ?checked=${this.value}
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}
    >${this.label}</fast-checkbox>`;
    }
    renderNumber() {
        var _a;
        return lit.html `
    <fast-number-field @change=${(e) => {
            this.value = e.target.value !== null ? Number(e.target.value) : null;
            this.onChange(this.value);
            e.cancelBubble = true;
        }}
      .value=${this.value} 
      placeholder=${(_a = this.hint) !== null && _a !== void 0 ? _a : this.label} 
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}>
      ${this.label && this.required ? lit.html `<span style="color:red;">&#42;</span>` : lit.html ``}
      ${this.label}
    </fast-number-field>
    `;
    }
    onChange(value) {
        if (this.type == exports.InputTypes.number || this.type == exports.InputTypes[exports.InputTypes.number]) {
            if (value == '') {
                value = null;
            }
        }
        const event = new CustomEvent('change', { detail: { value: value } }); //, bubbles: true, composed: true, cancelable: true
        this.dispatchEvent(event);
        if (this.skipUpdate != true && this.context && this.path) {
            if (mobx.isObservableObject(this.context)) {
                mobx.runInAction(() => {
                    this.context[this.path] = value;
                });
            }
            else {
                this.context[this.path] = value;
            }
        }
        if (this.updatedAction && this.path) {
            this.updatedAction(this.path, value, this.context);
        }
    }
};
exports.UInput.styles = [
    lit.css `
    :host {
      display: block;
    }

    :host(:focus-within) {
      outline: none;
    }

    fast-text-field {
      display: block;
      margin: 2px 0px;
    }

    fast-text-area {
      display: block;
      margin: 2px 0px;
    }

    fast-number-field {
      display: block;
      margin: 2px 0px;      
    }
    
    fast-checkbox {
      margin: 4px 0px 4px 0px;
    }
    `
];
_tslib.__decorate([
    decorators_js.property({ type: exports.InputTypes }),
    _tslib.__metadata("design:type", Object)
], exports.UInput.prototype, "type", void 0);
_tslib.__decorate([
    decorators_js.property(),
    _tslib.__metadata("design:type", Object)
], exports.UInput.prototype, "value", void 0);
_tslib.__decorate([
    decorators_js.property({ type: String }),
    _tslib.__metadata("design:type", Object)
], exports.UInput.prototype, "label", void 0);
_tslib.__decorate([
    decorators_js.property({ type: String }),
    _tslib.__metadata("design:type", Object)
], exports.UInput.prototype, "hint", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Boolean }),
    _tslib.__metadata("design:type", Object)
], exports.UInput.prototype, "required", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Object }),
    _tslib.__metadata("design:type", Object)
], exports.UInput.prototype, "context", void 0);
_tslib.__decorate([
    decorators_js.property({ type: String }),
    _tslib.__metadata("design:type", Object)
], exports.UInput.prototype, "path", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Boolean, attribute: 'skip-update' }),
    _tslib.__metadata("design:type", Boolean)
], exports.UInput.prototype, "skipUpdate", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Boolean }),
    _tslib.__metadata("design:type", Boolean)
], exports.UInput.prototype, "readonly", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Boolean, attribute: 'auto-focus' }),
    _tslib.__metadata("design:type", Boolean)
], exports.UInput.prototype, "autoFocus", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Boolean, attribute: true }),
    _tslib.__metadata("design:type", Boolean)
], exports.UInput.prototype, "multiline", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Function }),
    _tslib.__metadata("design:type", Object)
], exports.UInput.prototype, "updatedAction", void 0);
exports.UInput = _tslib.__decorate([
    decorators_js.customElement('u-input')
], exports.UInput);
