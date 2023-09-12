'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');
var fastComponents = require('@microsoft/fast-components');

fastComponents.provideFASTDesignSystem().register(fastComponents.fastCard());
// import "@iyu-web/styles/global-tw.scss";
exports.UCards = class UCards extends lit.LitElement {
    constructor() {
        super();
        this.items = [];
        // [
        //   { title: "Title #1", description: "Description" },
        //   { title: "Title #2", description: "Description" },
        //   { title: "Title #3", description: "Description" },
        //   { title: "Title #4", description: "Description" },
        //   { title: "Title #5", description: "Description" },
        //   { title: "Title #6", description: "Description" },
        // ];
        this.selectedItem = null;
        this.useAdd = true;
        this.getCardElement = this.getCardElement.bind(this);
    }
    render() {
        return lit.html `
        <div class="flex flex-wrap gap-2">
          ${this.items.map(this.getCardElement)}
          ${this.useAdd ? this.getAddCardElement() : null}
        </div>`;
    }
    connectedCallback() {
        super.connectedCallback();
        this.onSelectedItem.bind(this);
    }
    getCardElement(item, index) {
        return lit.html `
    <fast-card index=${index} class="card hover:cursor-pointer" @click=${() => this.onSelectedItem(item)}>
      <div class="label p-2">
        <h3 class="text-lg font-bold">${item.title}</h3>
        ${this.getDescriptionElement(item)}
      </div>
    </fast-card>`;
    }
    getDescriptionElement(item) {
        return lit.html `<p class="text-sm font-light" style="color: #888">${item.description}</p>`;
    }
    getAddCardElement() {
        return lit.html `
    <fast-card class="card hover:cursor-pointer" style="background: #888" @click=${this.onAdd}>
      <div class="flex justify-center items-center h-full">
        <div class="ui-plus-01"></div>
      </div>
    </fast-card>`;
    }
    onSelectedItem(item) {
        this.selectedItem = item;
        this.dispatchEvent(new CustomEvent("changed", { detail: this.selectedItem }));
    }
    onAdd() {
        this.dispatchEvent(new CustomEvent("clickAdd"));
    }
};
exports.UCards.styles = [
    lit.css `
      .card {
        width: 300px; 
        height: 200px; 
        min-width: 300px;
        background: white url(https://picsum.photos/300/200) center/cover;
      }

      .label {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #222; 
        color: #eee;
      }

      .ui-plus-01 {
        position: relative;
        cursor: pointer;
        border: none;
        background-color: transparent;
        width: 30px;
        height: 30px;
      }
      .ui-plus-01:before,
      .ui-plus-01:after {
        content: "";
        height: 20%;
        width: 100%;
        background-color: var(--accent-color);
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -10%;
      }
      .ui-plus-01:before {
        transform: rotate(90deg);
      }
      .ui-plus-01:before {
        transition: transform 0.3s ease;
      }
      .ui-plus-01.is-active:before {
        transform: rotate(0);
      }
            
    `
];
_tslib.__decorate([
    decorators_js.property({ type: Array }),
    _tslib.__metadata("design:type", Array)
], exports.UCards.prototype, "items", void 0);
exports.UCards = _tslib.__decorate([
    decorators_js.customElement('u-cards'),
    _tslib.__metadata("design:paramtypes", [])
], exports.UCards);
