'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');

exports.UPopup = class UPopup extends lit.LitElement {
    render() {
        this.ensureEvent();
        return lit.html `<h1><slot></slot></h1>`;
    }
    constructor() {
        super();
        this.anchorElement = null;
        this.viewportElement = null;
        this.isOpen = false;
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEvents();
    }
    ensureEvent() {
        this.removeEvents();
        if (this.anchorElement) {
            this.anchorElement.addEventListener('click', this.open);
        }
        if (this.viewportElement) {
            this.viewportElement.addEventListener('click', this.close);
        }
    }
    removeEvents() {
        if (this.anchorElement) {
            this.anchorElement.removeEventListener('click', this.open);
        }
        if (this.viewportElement) {
            this.viewportElement.removeEventListener('click', this.close);
        }
    }
    open(e) {
        if (this.anchorElement && this.isOpen != true) {
            this.isOpen = true;
            e.stopImmediatePropagation();
            this.dispatchEvent(new CustomEvent("on-opening", { bubbles: true, composed: true }));
            this.style.display = 'block';
            this.style.position = 'absolute';
            this.style.zIndex = '9999';
            const anchorRect = this.anchorElement.getBoundingClientRect();
            const popupRect = this.getBoundingClientRect();
            // top 위치 지정
            if (anchorRect.bottom + popupRect.height > window.innerHeight) {
                this.style.top = anchorRect.top - popupRect.height + 'px';
            }
            else {
                this.style.top = anchorRect.bottom + 'px';
            }
            // left 위치 지정
            if (anchorRect.right + popupRect.width > window.innerWidth) {
                this.style.left = anchorRect.left - popupRect.width + 'px';
            }
            else {
                this.style.left = anchorRect.right + 'px';
            }
        }
    }
    close() {
        if (this.isOpen) {
            this.isOpen = false;
            this.style.display = 'none';
        }
    }
};
exports.UPopup.styles = [
    lit.css `
    :host {
      display: none;
    }
    `
];
_tslib.__decorate([
    decorators_js.property({ type: Object }),
    _tslib.__metadata("design:type", Object)
], exports.UPopup.prototype, "anchorElement", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Object }),
    _tslib.__metadata("design:type", Object)
], exports.UPopup.prototype, "viewportElement", void 0);
_tslib.__decorate([
    decorators_js.state(),
    _tslib.__metadata("design:type", Object)
], exports.UPopup.prototype, "isOpen", void 0);
exports.UPopup = _tslib.__decorate([
    decorators_js.customElement('u-popup'),
    _tslib.__metadata("design:paramtypes", [])
], exports.UPopup);
