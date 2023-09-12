import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createComponent } from "@lit-labs/react";
import React from "react";
import styles from "./test.scss";

@customElement("test-element")
export class TestElement extends LitElement {

  static styles = styles;

  @property({ type: String }) 
  name = "world";

  render() {
    return html`
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
}

export const TestComponent = createComponent({
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