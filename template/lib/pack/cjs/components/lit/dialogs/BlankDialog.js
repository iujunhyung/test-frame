'use strict';

var _tslib = require('../../../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');

exports.BlankDialog = class BlankDialog extends lit.LitElement {
    constructor() {
        super(...arguments);
        this.content = null;
    }
    render() {
        return lit.html `
    <fast-dialog id="dialog" modal="true" hidden>
      ${this.content}
      <button id="close-button" @click=${this.cancel}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
      </button>
    </fast-dialog>
    `;
    }
    ok() {
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
    showAsync() {
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            yield this.updateComplete;
            this.visible();
            if (this.dialog) {
                document.removeEventListener("focusin", this.dialog.handleDocumentFocus);
            }
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
                if (this.content && this.content.loadPromise) {
                    this.content.loadPromise(resolve, reject);
                }
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
exports.BlankDialog.styles = [
    lit.css `
    :host {
      z-index: 999; 
      position: absolute;
    }
    
    fast-dialog {
      --dialog-height: auto;
      --dialog-width: auto;
    }

    #close-button {
      position: absolute;
      top: 12px;
      right: 12px;
      background: transparent;
      border: none;
      color: var(--fill-color);
      font-size: 1.5rem;
      padding: 0px 8px;
      cursor: pointer;
    }
    `
];
_tslib.__decorate([
    decorators_js.query("#dialog"),
    _tslib.__metadata("design:type", Object)
], exports.BlankDialog.prototype, "dialog", void 0);
_tslib.__decorate([
    decorators_js.property(),
    _tslib.__metadata("design:type", Object)
], exports.BlankDialog.prototype, "content", void 0);
exports.BlankDialog = _tslib.__decorate([
    decorators_js.customElement('blank-dialog')
], exports.BlankDialog);
