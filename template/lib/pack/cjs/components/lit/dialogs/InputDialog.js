'use strict';

var _tslib = require('../../../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');
var Validations = require('../../../helpers/Validations.js');

exports.InputDialog = class InputDialog extends lit.LitElement {
    constructor() {
        super(...arguments);
        this.title = "";
        this.message = "";
        this.format = "";
        this.value = "";
    }
    connectedCallback() {
        const _super = Object.create(null, {
            connectedCallback: { get: () => super.connectedCallback }
        });
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            _super.connectedCallback.call(this);
            yield this.updateComplete;
            if (this.dialog) {
                this.dialog.addEventListener("cancel", (_) => {
                    this.cancel();
                });
            }
        });
    }
    render() {
        return lit.html `
    <fast-dialog id="dialog" modal="true" hidden>
      <div style="padding: 10px; color: var(--neutral-foreground-rest); min-width: 400px">
        <h2>${this.title}</h2>
        <p>${this.message}</p>
        <u-input 
          @change=${(e) => this.value = e.detail.value} 
          value=${this.value} 
          label='' 
          type=${this.format} 
          auto-focus>
        </u-input>
        <div class="row" style="justify-content: end">
          <fast-button @click=${this.ok}>Ok</fast-button>
        </div>
      </div>
    </fast-dialog>
    `;
    }
    ok() {
        if (this.format == "email") {
            if (Validations.Validations.validateEmail(this.value) != true) {
                return;
            }
        }
        this.close();
        if (this.resolve) {
            this.resolve({
                success: true,
                value: this.value
            });
        }
    }
    cancel() {
        this.close();
        if (this.reject) {
            this.reject();
        }
    }
    showAsync(title, message, options) {
        var _a, _b;
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            yield this.updateComplete;
            this.title = title;
            this.message = message;
            this.format = (_a = options === null || options === void 0 ? void 0 : options.format) !== null && _a !== void 0 ? _a : "";
            this.value = (_b = options === null || options === void 0 ? void 0 : options.value) !== null && _b !== void 0 ? _b : "";
            this.visible();
            if (this.dialog) {
                document.removeEventListener("focusin", this.dialog.handleDocumentFocus);
            }
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            }).catch((_error) => {
                return { success: false, value: '' };
            });
        });
    }
    visible() {
        if (this.dialog) {
            this.dialog.show();
        }
        this.hidden = false;
    }
    close() {
        if (this.dialog) {
            this.dialog.hide();
        }
        this.hidden = true;
    }
};
exports.InputDialog.styles = [
    lit.css `
    :host {
      z-index: 999; 
      position: absolute;
    }
        
    fast-dialog {
      --dialog-height: auto;
      --dialog-width: auto;
    }

    .row {
      display: flex;
      justify-content: space-between;
    }    
    `
];
_tslib.__decorate([
    decorators_js.property(),
    _tslib.__metadata("design:type", String)
], exports.InputDialog.prototype, "title", void 0);
_tslib.__decorate([
    decorators_js.property(),
    _tslib.__metadata("design:type", String)
], exports.InputDialog.prototype, "message", void 0);
_tslib.__decorate([
    decorators_js.property(),
    _tslib.__metadata("design:type", String)
], exports.InputDialog.prototype, "format", void 0);
_tslib.__decorate([
    decorators_js.property(),
    _tslib.__metadata("design:type", String)
], exports.InputDialog.prototype, "value", void 0);
_tslib.__decorate([
    decorators_js.query("#dialog"),
    _tslib.__metadata("design:type", Object)
], exports.InputDialog.prototype, "dialog", void 0);
exports.InputDialog = _tslib.__decorate([
    decorators_js.customElement('input-dialog')
], exports.InputDialog);
