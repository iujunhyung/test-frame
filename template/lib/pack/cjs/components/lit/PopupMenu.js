'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');

exports.PopupMenu = class PopupMenu extends lit.LitElement {
    constructor() {
        super();
        this.menuItems = [];
        this.location = { x: 0, y: 0 };
        this.selectedItem = null;
        this.onMouseUp = this.onMouseUp.bind(this);
        this.addEventListener('mouseup', this.onMouseUp);
    }
    onMouseUp(e) {
        let r = this.menu.isCursorInElement(e);
        if (r)
            return;
        this.cancel();
    }
    render() {
        return lit.html `
    <fast-menu id="menu" style="left: ${this.location.x}px; top: ${this.location.y}px">
      ${this.menuItems.map((item) => lit.html `
        <fast-menu-item @click="${() => this.onMenuItemClick(item)}" .value="${item.name}">
          ${item.label}
        </fast-menu-item>
      `)}
    </fast-menu>`;
    }
    onMenuItemClick(item) {
        this.selectedItem = item;
        this.ok();
    }
    ok() {
        if (this.selectedItem && this.resolve) {
            this.resolve({
                success: true,
                value: this.selectedItem.name
            });
        }
        else {
            this.cancel();
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
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            }).catch((_error) => {
                return { success: false, value: null };
            });
        });
    }
    visible() {
        // if (this.menu) {
        //   this.menu.show();
        // }
        this.hidden = false;
    }
    close() {
        // if (this.menu) {
        //   this.menu.hide();
        // }
        this.hidden = true;
    }
};
exports.PopupMenu.styles = [
    lit.css `
    :host {
      background: transparent;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
    }
    
    #menu {
      position: absolute;
    }
    `
];
_tslib.__decorate([
    decorators_js.query("#menu"),
    _tslib.__metadata("design:type", HTMLElement)
], exports.PopupMenu.prototype, "menu", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Array }),
    _tslib.__metadata("design:type", Array)
], exports.PopupMenu.prototype, "menuItems", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Object }),
    _tslib.__metadata("design:type", Object)
], exports.PopupMenu.prototype, "location", void 0);
exports.PopupMenu = _tslib.__decorate([
    decorators_js.customElement('popup-menu'),
    _tslib.__metadata("design:paramtypes", [])
], exports.PopupMenu);
