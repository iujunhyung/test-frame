import { __decorate, __metadata } from '../../_virtual/_tslib.js';
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { createComponent } from '@lit-labs/react';
import React from 'react';
import styles from './test.scss.js';

let TestElement = class TestElement extends LitElement {
    constructor() {
        super(...arguments);
        this.name = "world";
    }
    render() {
        return html `
    <div>
      <div>${this.name}</div>
      <div><slot></slot></div>
      <div>
        <button @click=${this.eventSource}>This is test button</button>
      </div>
    </div>`;
    }
    eventSource() {
        this.dispatchEvent(new CustomEvent("testEvent", {
            bubbles: true,
            composed: true,
            detail: {
                message: "This is test event",
            }
        }));
    }
};
TestElement.styles = styles;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], TestElement.prototype, "name", void 0);
TestElement = __decorate([
    customElement("test-element")
], TestElement);
const TestComponent = createComponent({
    tagName: "test-element",
    elementClass: TestElement,
    react: React,
    events: {
        "onTestEvent": "testEvent",
    }
});
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'test-element': {
//         name?: string;
//         testEvent?: (event: CustomEvent) => void;
//       };
//     }
//   }
// }

export { TestComponent, TestElement };
