import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createComponent } from "@lit-labs/react";
import React from "react";

@customElement("lit-dev-element")
export class LitDevElement extends LitElement {
  @property({ type: String }) 
  word: string = "Lit";

  render() {
    return html`
      <h1>${this.word}</h1>
      <button @click=${this.getOrder}>Get Order</button>
    `;
  }

  getOrder() {
    this.word = "Lit";
    this.dispatchEvent(new CustomEvent("order", { detail: { word: this.word } }));
  }
}

export const LitComponentReact = createComponent({
  tagName: "lit-dev-element",
  elementClass: LitDevElement,
  react: React,
  events: {
    onOrder: "order"
  }
});

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lit-dev-element': {
        word?: string;
      };
    }
  }
}