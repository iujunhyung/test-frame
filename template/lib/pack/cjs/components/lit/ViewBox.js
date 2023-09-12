'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');

exports.ViewBox = class ViewBox extends lit.LitElement {
    constructor() {
        super();
        this.resizeObserver = new ResizeObserver(() => this.adjustScale());
        this.mutationObserver = new MutationObserver(() => this.adjustScale());
    }
    connectedCallback() {
        super.connectedCallback();
        this.resizeObserver.observe(this);
    }
    disconnectedCallback() {
        this.mutationObserver.disconnect();
        this.resizeObserver.disconnect();
        super.disconnectedCallback();
    }
    firstUpdated() {
        var _a;
        const slot = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot');
        if (slot) {
            this.mutationObserver.observe(slot, { childList: true });
        }
        this.adjustScale();
    }
    adjustScale() {
        var _a;
        const container = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.container');
        if (container) {
            const originalTransform = container.style.transform;
            container.style.transform = 'scale(1)';
            const rect = container.getBoundingClientRect();
            container.style.transform = originalTransform;
            const scaleX = this.clientWidth / rect.width;
            const scaleY = this.clientHeight / rect.height;
            const scale = Math.min(scaleX, scaleY);
            container.style.transform = `scale(${scale})`;
        }
    }
    render() {
        return lit.html `
      <div class="container">
        <slot></slot>
      </div>
    `;
    }
};
exports.ViewBox.styles = lit.css `
    :host {
      display: block;
      position: relative;
    }

    .container {
      transform-origin: top left;
    }
  `;
exports.ViewBox = _tslib.__decorate([
    decorators_js.customElement('view-box'),
    _tslib.__metadata("design:paramtypes", [])
], exports.ViewBox);
