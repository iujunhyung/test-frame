'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');

exports.UErrors = class UErrors extends lit.LitElement {
    constructor() {
        super(...arguments);
        this.errors = [];
        this.expanded = false;
    }
    render() {
        if (this.errors.length < 1)
            return lit.html ``;
        const subClass = this.expanded ? "expanded" : "";
        return lit.html `
      <div id="iyu-error-msg-container">
        <div id="iyu-error-main">
          ${this.renderErrorSVG()}
          <span id="first-error">${this.errors[0]}</span>

          ${this.errors.length > 1
            ? lit.html ` 
              <span id="error-expand-button" @click=${() => this.expanded = !this.expanded}>
                ...more[${this.errors.length - 1}]
              </span>`
            : lit.html ``}
        </div>
        <div id="iyu-error-sub" class=${subClass}>
          ${this.errors.slice(1).map((error) => lit.html ` <div class="expanded-error">&#9900; ${error}</div> `)}
        </div>
      </div>
    `;
    }
    renderErrorSVG() {
        return lit.html `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
        <defs></defs>
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
	      <path d="M 87 83.294 H 3 c -1.079 0 -2.075 -0.579 -2.608 -1.518 c -0.533 -0.938 -0.522 -2.089 0.03 -3.017 l 42 -70.588 C 42.963 7.263 43.942 6.706 45 6.706 s 2.037 0.557 2.578 1.466 l 42 70.588 c 0.552 0.928 0.563 2.079 0.029 3.017 C 89.074 82.715 88.079 83.294 87 83.294 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,188,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
	      <path d="M 45 63.666 c -1.888 0 -3.419 -1.53 -3.419 -3.419 V 32.693 c 0 -1.888 1.531 -3.419 3.419 -3.419 c 1.888 0 3.419 1.531 3.419 3.419 v 27.554 C 48.419 62.136 46.888 63.666 45 63.666 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(63,63,63); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
	      <path d="M 45 74.275 c -0.9 0 -1.778 -0.364 -2.416 -1.003 c -0.638 -0.638 -1.003 -1.516 -1.003 -2.416 c 0 -0.228 0.023 -0.444 0.068 -0.672 c 0.045 -0.216 0.102 -0.433 0.194 -0.638 c 0.08 -0.206 0.194 -0.4 0.319 -0.593 c 0.114 -0.183 0.262 -0.353 0.422 -0.513 c 0.16 -0.159 0.331 -0.296 0.512 -0.421 c 0.194 -0.126 0.388 -0.24 0.593 -0.319 c 0.205 -0.08 0.422 -0.148 0.638 -0.194 c 1.117 -0.228 2.291 0.137 3.089 0.934 c 0.638 0.639 1.003 1.516 1.003 2.416 s -0.365 1.778 -1.003 2.416 c -0.16 0.16 -0.331 0.308 -0.524 0.422 c -0.183 0.126 -0.376 0.239 -0.582 0.319 c -0.205 0.091 -0.421 0.148 -0.638 0.194 C 45.444 74.252 45.228 74.275 45 74.275 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(63,63,63); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        </g>
      </svg>
    `;
    }
};
exports.UErrors.styles = lit.css `
    #iyu-error-msg-container {
      display: block;
      width: auto;
      padding: 5px 10px 2px 10px;
      background-color: #ffdddd;
      border: 1px solid #ff0000;
      border-radius: 4px;
      color: #747474;
    }

    #iyu-error-main {
      display: flex;
      align-items: center;
      margin-bottom: 3px;
    }

    #iyu-error-main svg {
      margin-right: 5px;
    }

    #first-error {
      font-size: 14px;
    }

    #error-expand-button{
      margin-left: 5px;
      font-size: 14px;
      color: black;
      cursor: pointer;
      text-decoration: underline;
      user-select: none;
    }

    #error-expand-button:hover {
      color: #999; 
    }

    #error-expand-button:active {
      color: #333; 
    }

    #iyu-error-sub {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      //text-align: left;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s ease-in-out;
    }

    #iyu-error-sub.expanded {
      max-height: 500px;
    }

    .expanded-error {
      margin-bottom: 3px;
      font-size: 14px;
    }
  `;
_tslib.__decorate([
    decorators_js.property({ type: Array }),
    _tslib.__metadata("design:type", Array)
], exports.UErrors.prototype, "errors", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Boolean }),
    _tslib.__metadata("design:type", Boolean)
], exports.UErrors.prototype, "expanded", void 0);
exports.UErrors = _tslib.__decorate([
    decorators_js.customElement("u-errors")
], exports.UErrors);
