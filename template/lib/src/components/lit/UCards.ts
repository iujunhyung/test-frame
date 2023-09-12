import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { 
  fastCard,
  provideFASTDesignSystem,
} from "@microsoft/fast-components";

provideFASTDesignSystem().register(
  fastCard()
);

// import "@iyu-web/styles/global-tw.scss";

@customElement('u-cards')
export class UCards extends LitElement {
  static styles = [
    css`
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

  @property({type: Array})
  items: [] = [];
  // [
  //   { title: "Title #1", description: "Description" },
  //   { title: "Title #2", description: "Description" },
  //   { title: "Title #3", description: "Description" },
  //   { title: "Title #4", description: "Description" },
  //   { title: "Title #5", description: "Description" },
  //   { title: "Title #6", description: "Description" },
  // ];
  
  selectedItem?: any = null;
  
  useAdd: boolean = true;
  
  constructor() {
    super();
    this.getCardElement = this.getCardElement.bind(this);
  }

  render() {
    return html`
        <div class="flex flex-wrap gap-2">
          ${this.items.map(this.getCardElement)}
          ${this.useAdd ? this.getAddCardElement() : null}
        </div>`;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.onSelectedItem.bind(this);
  }
  
  private getCardElement(item: any, index: number) {
    return html`
    <fast-card index=${index} class="card hover:cursor-pointer" @click=${() => this.onSelectedItem(item)}>
      <div class="label p-2">
        <h3 class="text-lg font-bold">${item.title}</h3>
        ${this.getDescriptionElement(item)}
      </div>
    </fast-card>`;
  }

  private getDescriptionElement(item: any) {
    return html`<p class="text-sm font-light" style="color: #888">${item.description}</p>`;
  }

  private getAddCardElement() {
    return html`
    <fast-card class="card hover:cursor-pointer" style="background: #888" @click=${this.onAdd}>
      <div class="flex justify-center items-center h-full">
        <div class="ui-plus-01"></div>
      </div>
    </fast-card>`;    
  }

  onSelectedItem(item: any) {
    this.selectedItem = item;
    this.dispatchEvent(new CustomEvent("changed", {detail: this.selectedItem}));
  }

  private onAdd() {
    this.dispatchEvent(new CustomEvent("clickAdd"));
  }
}