import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { createComponent } from '@lit-labs/react';
import React from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

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

export { TestComponent, TestElement };
