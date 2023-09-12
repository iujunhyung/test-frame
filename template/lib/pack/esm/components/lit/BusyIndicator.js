import { __decorate } from '../../_virtual/_tslib.js';
import { css, LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { provideFASTDesignSystem, fastProgressRing } from '@microsoft/fast-components';

provideFASTDesignSystem().register(fastProgressRing());
let BusyIndicator = class BusyIndicator extends LitElement {
    render() {
        return html `
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
BusyIndicator.styles = [
    css `
    :host {
      z-index: 999;
    }
    `
];
BusyIndicator = __decorate([
    customElement('busy-indicator')
], BusyIndicator);

export { BusyIndicator };
