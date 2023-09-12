'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');
var fastComponents = require('@microsoft/fast-components');

fastComponents.provideFASTDesignSystem().register(fastComponents.fastProgressRing());
exports.BusyIndicator = class BusyIndicator extends lit.LitElement {
    render() {
        return lit.html `
    <div style="
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: #2224;
      display: flex;
      align-items: center;
      justify-content: center;
      ">
        <fast-progress-ring indeterminate></fast-progress-ring>
      </div>`;
    }
};
exports.BusyIndicator.styles = [
    lit.css `
    :host {
      z-index: 999;
    }
    `
];
exports.BusyIndicator = _tslib.__decorate([
    decorators_js.customElement('busy-indicator')
], exports.BusyIndicator);
