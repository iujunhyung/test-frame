import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createComponent } from "@lit-labs/react";
import React from "react";
import dynamic from 'next/dynamic';

@customElement("test-element")
export class TestElement extends LitElement {
  @property({ type: String }) 
  name = "world";

  render() {
    return html`<div>${this.name}<slot></slot></div>`;
  }
}

const reactCom = createComponent({
  tagName: "test-element",
  elementClass: TestElement,
  react: React,
});

export const Testing = dynamic(() => Promise.resolve(reactCom), {
  ssr: false,
});

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'test-element': { name?: string };
//     }
//   }
// }