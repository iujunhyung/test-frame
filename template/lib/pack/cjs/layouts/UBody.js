'use strict';

var _tslib = require('../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');
require('../components/lit/BusyIndicator.js');
require('../components/lit/dialogs/BlankDialog.js');
require('../components/lit/dialogs/ContentDialog.js');
require('../components/lit/dialogs/InputDialog.js');
var MessageDialog = require('../components/lit/dialogs/MessageDialog.js');
var UIManager = require('../core/UIManager.js');

exports.UBody = class UBody extends lit.LitElement {
    connectedCallback() {
        const _super = Object.create(null, {
            connectedCallback: { get: () => super.connectedCallback }
        });
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            _super.connectedCallback.call(this);
            yield this.updateComplete;
            if (this.busyIndicator) {
                UIManager.uiManager.setPageBusyIndicator(this.busyIndicator);
            }
            if (this.messageDialog) {
                UIManager.uiManager.setMessageDialog(this.messageDialog);
            }
        });
    }
    render() {
        return lit.html `
      <slot></slot>
      <busy-indicator id="busy-indicator" hidden></busy-indicator>
      <message-dialog id="message-dialog" hidden></message-dialog>
    `;
    }
};
exports.UBody.styles = [
    lit.css `
      :host {
        height: 100%;
        width: 100%;
      }
    `
];
_tslib.__decorate([
    decorators_js.query('#busy-indicator'),
    _tslib.__metadata("design:type", HTMLElement)
], exports.UBody.prototype, "busyIndicator", void 0);
_tslib.__decorate([
    decorators_js.query('#message-dialog'),
    _tslib.__metadata("design:type", MessageDialog.MessageDialog)
], exports.UBody.prototype, "messageDialog", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Object }),
    _tslib.__metadata("design:type", Object)
], exports.UBody.prototype, "messageContext", void 0);
exports.UBody = _tslib.__decorate([
    decorators_js.customElement('u-body')
], exports.UBody);
