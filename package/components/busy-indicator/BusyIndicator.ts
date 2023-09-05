import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

import { 
  fastProgressRing,
  provideFASTDesignSystem,
} from "@microsoft/fast-components";

provideFASTDesignSystem().register(
  fastProgressRing()
);

@customElement('busy-indicator')
export class BusyIndicator extends LitElement {

  static styles = [
    css`
    :host {
      z-index: 999;
    }
    `
  ];
  
  render() {
    return html`
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
}