import { __decorate, __metadata, __awaiter } from '../../../_virtual/_tslib.js';
import { css, LitElement, html } from 'lit';
import { property, query, customElement } from 'lit/decorators.js';

let MessageDialog = class MessageDialog extends LitElement {
    constructor() {
        super(...arguments);
        this.title = "";
        this.message = "";
        this.positiveText = "Ok";
        this.negativeText = "Cancel";
        this.useNegative = false;
    }
    connectedCallback() {
        const _super = Object.create(null, {
            connectedCallback: { get: () => super.connectedCallback }
        });
        return __awaiter(this, void 0, void 0, function* () {
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
        return html `
    <fast-dialog id="dialog" modal="true" hidden>
        <div style="padding: 10px; color: var(--neutral-foreground-rest); min-width: 400px">
          <label id="title">${this.title}</label>
          <pre>${this.message}</pre>
          <div class="row" style="justify-content: end">
            ${this.useNegative ? html `<fast-button @click=${this.cancel}>${this.negativeText}</fast-button>` : null}
            <fast-button @click=${this.ok}>${this.positiveText}</fast-button>
          </div>
        </div>
      </fast-dialog>
    `;
    }
    initOk() {
        this.positiveText = "Ok";
        this.negativeText = "Cancel";
        this.useNegative = false;
    }
    initOkCancel() {
        this.positiveText = "Ok";
        this.negativeText = "Cancel";
        this.useNegative = true;
    }
    initYesNo() {
        this.positiveText = "Yes";
        this.negativeText = "No";
        this.useNegative = true;
    }
    initCustom(positiveText, negativeText, useNegative) {
        this.positiveText = positiveText;
        this.negativeText = negativeText;
        this.useNegative = useNegative !== null && useNegative !== void 0 ? useNegative : true;
    }
    ok() {
        this.close();
        if (this.resolve) {
            this.resolve(true);
        }
    }
    cancel() {
        this.close();
        if (this.reject) {
            this.reject('cancel');
        }
    }
    showAsync(title, message) {
        this.title = title;
        this.message = message;
        this.visible();
        if (this.dialog) {
            document.removeEventListener("focusin", this.dialog.handleDocumentFocus);
        }
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        }).catch((_error) => {
            return false;
        });
    }
    visible() {
        if (this.dialog) {
            this.dialog.show();
            // this.dialog.hidden = false;
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
MessageDialog.styles = [
    css `
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
    
    fast-button {
      min-width: 80px;
      margin: 0px 4px;
    }

    #title {
      font-weight: initial;
      opacity: 0.6;
      font-size: large;
    }
    `
];
__decorate([
    property(),
    __metadata("design:type", String)
], MessageDialog.prototype, "title", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], MessageDialog.prototype, "message", void 0);
__decorate([
    query("#dialog"),
    __metadata("design:type", Object)
], MessageDialog.prototype, "dialog", void 0);
MessageDialog = __decorate([
    customElement('message-dialog')
], MessageDialog);

export { MessageDialog };
