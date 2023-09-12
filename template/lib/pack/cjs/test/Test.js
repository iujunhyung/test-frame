'use strict';

var _tslib = require('../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');
var react = require('@lit-labs/react');
var React = require('react');

// import styles from "./test.scss";
exports.TestElement = class TestElement extends lit.LitElement {
    constructor() {
        // static styles = styles;
        super(...arguments);
        this.name = "world";
    }
    render() {
        return lit.html `
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
_tslib.__decorate([
    decorators_js.property({ type: String }),
    _tslib.__metadata("design:type", Object)
], exports.TestElement.prototype, "name", void 0);
exports.TestElement = _tslib.__decorate([
    decorators_js.customElement("test-element")
], exports.TestElement);
const TestComponent = react.createComponent({
    tagName: "test-element",
    elementClass: exports.TestElement,
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

exports.TestComponent = TestComponent;
