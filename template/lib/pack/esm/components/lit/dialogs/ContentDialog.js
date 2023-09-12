import { __decorate, __metadata, __awaiter } from '../../../_virtual/_tslib.js';
import { css, LitElement, html } from 'lit';
import { query, property, state, customElement } from 'lit/decorators.js';

let ContentDialog = class ContentDialog extends LitElement {
    constructor() {
        super(...arguments);
        this.title = '';
        this.content = null;
        this.positiveText = "Ok";
        this.negativeText = "Cancel";
        this.useNegative = false;
        this.hiddenButtons = false;
    }
    connectedCallback() {
        const _super = Object.create(null, {
            connectedCallback: { get: () => super.connectedCallback }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.connectedCallback.call(this);
            yield this.updateComplete;
            this.onCancel = this.onCancel.bind(this);
            if (this.dialog) {
                this.dialog.addEventListener("cancel", this.onCancel);
            }
        });
    }
    disconnectedCallback() {
        if (this.dialog) {
            this.dialog.removeEventListener("cancel", this.onCancel);
        }
    }
    onCancel() {
        this.cancel();
    }
    render() {
        var _a;
        return html `
    <fast-dialog id="dialog" modal="true" hidden>
      <div style="padding: 10px; color: var(--neutral-foreground-rest); min-width: 400px">
        <h2>${this.title}</h2>
        ${this.content}
        ${(_a = this.errors) === null || _a === void 0 ? void 0 : _a.map(p => html `<div class="row" style="color: var(--accent-foreground-rest)">${p}</div>`)}
        ${this.hiddenButtons ? null : html `
        <div class="row" style="justify-content: end; padding-top: 4px">
          ${this.useNegative ? html `<fast-button @click=${this.cancel}>${this.negativeText}</fast-button>` : null}
          <fast-button @click=${this.ok}>${this.positiveText}</fast-button>
        </div>
        `}
      </div>
    </fast-dialog>
    `;
    }
    ok() {
        if (this.validationHandler) {
            let errors = this.validationHandler();
            if (errors.length > 0) {
                this.errors = errors;
                return;
            }
        }
        this.close();
        if (this.resolve) {
            this.resolve({
                success: true,
                value: this.content
            });
        }
    }
    cancel() {
        this.close();
        if (this.reject) {
            this.reject();
        }
    }
    showAsync(title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateComplete;
            this.title = title;
            this.visible();
            if (this.dialog) {
                document.removeEventListener("focusin", this.dialog.handleDocumentFocus);
            }
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            }).catch((_error) => {
                return { success: false, value: null };
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
ContentDialog.styles = [
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
    `
];
__decorate([
    query("#dialog"),
    __metadata("design:type", Object)
], ContentDialog.prototype, "dialog", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], ContentDialog.prototype, "title", void 0);
__decorate([
    property({ attribute: false }),
    __metadata("design:type", Object)
], ContentDialog.prototype, "content", void 0);
__decorate([
    state(),
    __metadata("design:type", Array)
], ContentDialog.prototype, "errors", void 0);
ContentDialog = __decorate([
    customElement('content-dialog')
], ContentDialog);

export { ContentDialog };
