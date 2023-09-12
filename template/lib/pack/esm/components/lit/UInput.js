import { __awaiter, __decorate, __metadata } from '../../_virtual/_tslib.js';
import { html, css, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ElementMixin } from '../../core/ElementBaseMixin.js';
import { getPropertyMeta } from '../../core/PropertyMeta.js';
import { isObservableObject, runInAction } from 'mobx';
import { provideFASTDesignSystem, fastTextField, fastTextArea, fastNumberField, fastCheckbox, fastCombobox, fastOption } from '@microsoft/fast-components';

provideFASTDesignSystem().register(fastTextField(), fastTextArea(), fastNumberField(), fastCheckbox(), fastCombobox(), fastOption());
var InputTypes;
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
})(InputTypes || (InputTypes = {}));
let UInput = class UInput extends ElementMixin(LitElement) {
    constructor() {
        super(...arguments);
        this.type = InputTypes.text;
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
        return __awaiter(this, void 0, void 0, function* () {
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
        var options = getPropertyMeta(context, path);
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
                    this.type = InputTypes.text;
                }
                if (typeName == "Boolean") {
                    this.type = InputTypes.checkbox;
                }
                if (typeName == "Number") {
                    this.type = InputTypes.number;
                }
            }
            if (options.format) {
                let inputType = InputTypes[options.format];
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
        return html `
      ${this.renderInput()}
      ${this.renderError()}
    `;
    }
    renderInput() {
        if (this.type == InputTypes.checkbox || this.type == InputTypes[InputTypes.checkbox]) {
            return this.renderCheckbox();
        }
        else if (this.type == InputTypes.email || this.type == InputTypes[InputTypes.email]) {
            return this.renderText('email');
        }
        else if (this.type == InputTypes.number || this.type == InputTypes[InputTypes.number]) {
            return this.renderNumber();
        }
        else if (this.type == InputTypes.date || this.type == InputTypes[InputTypes.date]) {
            return html `<input type="date">`;
        }
        else if (this.type == InputTypes.time || this.type == InputTypes[InputTypes.time]) {
            return html `<input type="time">`;
        }
        else if (this.type == InputTypes.datetime || this.type == InputTypes[InputTypes.datetime]) {
            return html `<input type="datetime-local">`;
        }
        else {
            let inputType = this.type;
            if (typeof this.type == "number") {
                inputType = InputTypes[this.type];
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
        return html ``;
    }
    renderText(type) {
        var _a;
        return html `
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
      ${this.label && this.required ? html `<span style="color:red;">&#42;</span>` : html ``}
      ${this.label}
    </fast-text-field>
    `;
    }
    renderTextArea(type) {
        var _a;
        return html `
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
      ${this.label && this.required ? html `<span style="color:red;">&#42;</span>` : html ``}
      ${this.label}
    </fast-text-area>
    `;
    }
    renderCheckbox() {
        return html `
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
        return html `
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
      ${this.label && this.required ? html `<span style="color:red;">&#42;</span>` : html ``}
      ${this.label}
    </fast-number-field>
    `;
    }
    onChange(value) {
        if (this.type == InputTypes.number || this.type == InputTypes[InputTypes.number]) {
            if (value == '') {
                value = null;
            }
        }
        const event = new CustomEvent('change', { detail: { value: value } }); //, bubbles: true, composed: true, cancelable: true
        this.dispatchEvent(event);
        if (this.skipUpdate != true && this.context && this.path) {
            if (isObservableObject(this.context)) {
                runInAction(() => {
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
UInput.styles = [
    css `
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
__decorate([
    property({ type: InputTypes }),
    __metadata("design:type", Object)
], UInput.prototype, "type", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], UInput.prototype, "value", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], UInput.prototype, "label", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], UInput.prototype, "hint", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], UInput.prototype, "required", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], UInput.prototype, "context", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], UInput.prototype, "path", void 0);
__decorate([
    property({ type: Boolean, attribute: 'skip-update' }),
    __metadata("design:type", Boolean)
], UInput.prototype, "skipUpdate", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Boolean)
], UInput.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean, attribute: 'auto-focus' }),
    __metadata("design:type", Boolean)
], UInput.prototype, "autoFocus", void 0);
__decorate([
    property({ type: Boolean, attribute: true }),
    __metadata("design:type", Boolean)
], UInput.prototype, "multiline", void 0);
__decorate([
    property({ type: Function }),
    __metadata("design:type", Object)
], UInput.prototype, "updatedAction", void 0);
UInput = __decorate([
    customElement('u-input')
], UInput);

export { InputTypes, UInput };
