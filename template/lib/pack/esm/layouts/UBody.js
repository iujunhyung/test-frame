import { __decorate, __metadata, __awaiter } from '../_virtual/_tslib.js';
import { css, LitElement, html } from 'lit';
import { query, property, customElement } from 'lit/decorators.js';
import '../components/lit/BusyIndicator.js';
import '../components/lit/dialogs/BlankDialog.js';
import '../components/lit/dialogs/ContentDialog.js';
import '../components/lit/dialogs/InputDialog.js';
import { MessageDialog } from '../components/lit/dialogs/MessageDialog.js';
import { uiManager } from '../core/UIManager.js';

let UBody = class UBody extends LitElement {
    connectedCallback() {
        const _super = Object.create(null, {
            connectedCallback: { get: () => super.connectedCallback }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.connectedCallback.call(this);
            yield this.updateComplete;
            if (this.busyIndicator) {
                uiManager.setPageBusyIndicator(this.busyIndicator);
            }
            if (this.messageDialog) {
                uiManager.setMessageDialog(this.messageDialog);
            }
        });
    }
    render() {
        return html `
      <slot></slot>
      <busy-indicator id="busy-indicator" hidden></busy-indicator>
      <message-dialog id="message-dialog" hidden></message-dialog>
    `;
    }
};
UBody.styles = [
    css `
      :host {
        height: 100%;
        width: 100%;
      }
    `
];
__decorate([
    query('#busy-indicator'),
    __metadata("design:type", HTMLElement)
], UBody.prototype, "busyIndicator", void 0);
__decorate([
    query('#message-dialog'),
    __metadata("design:type", MessageDialog)
], UBody.prototype, "messageDialog", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], UBody.prototype, "messageContext", void 0);
UBody = __decorate([
    customElement('u-body')
], UBody);

export { UBody };
