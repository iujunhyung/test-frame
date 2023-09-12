import { __decorate, __metadata, __awaiter } from '../../_virtual/_tslib.js';
import { css, LitElement, html } from 'lit';
import { query, property, customElement } from 'lit/decorators.js';

let PopupMenu = class PopupMenu extends LitElement {
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
        return html `
    <fast-menu id="menu" style="left: ${this.location.x}px; top: ${this.location.y}px">
      ${this.menuItems.map((item) => html `
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
        return __awaiter(this, void 0, void 0, function* () {
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
PopupMenu.styles = [
    css `
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
__decorate([
    query("#menu"),
    __metadata("design:type", HTMLElement)
], PopupMenu.prototype, "menu", void 0);
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], PopupMenu.prototype, "menuItems", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], PopupMenu.prototype, "location", void 0);
PopupMenu = __decorate([
    customElement('popup-menu'),
    __metadata("design:paramtypes", [])
], PopupMenu);

export { PopupMenu };
