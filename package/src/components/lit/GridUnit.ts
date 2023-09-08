import { LitElement, PropertyValueMap, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("grid-unit")
export class GridUnit extends LitElement {

  @property({ type: String }) key?: string;
  @property({ type: String }) orientation: "horizontal" | "vertical" = "horizontal";
  @property({ type: String }) init: string = "5:5"; // 초기비율
  
  @query('#item1') item1!: HTMLElement;
  @query('#item2') item2!: HTMLElement;

  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex-direction: var(--flex-direction, row);
      width: 100%;
      height: 100%;
    }

    #item1, #item2 {
      flex-grow: 1;
    }
  `;

  protected override async firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    super.firstUpdated(_changedProperties);

    await this.updateComplete;
    this.load();
  }
  
  protected override updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    super.updated(changedProperties);

    if(changedProperties.has('orientation')) {
      this.style.setProperty('--flex-direction', this.orientation === 'horizontal' ? 'row' : 'column');
    }
  }
  
  render() {
    return html`
      <div id="item1">
        <slot name="item1"></slot>
      </div>
      <x-splitter orientation=${this.orientation} @on-dragged=${this.onDragged}></x-splitter>
      <div id="item2">
        <slot name="item2"></slot>
      </div>
    `;
  }

  onDragged(e: CustomEvent) {
    if (e.detail) {
      let v: number = e.detail;
      this.resize(v);
    }
  }

  resize(v: number) {
    if (this.orientation === "horizontal") {
      let item1Width: number = this.item1.clientWidth;
      let item2Width: number = this.item2.clientWidth;
      let totalWidth: number = item1Width + item2Width;
      let item1WidthPercent: number = (item1Width + v) / totalWidth * 100;
      let item2WidthPercent: number = (item2Width - v) / totalWidth * 100;
      this.item1.style.width = `${item1WidthPercent}%`;
      this.item2.style.width = `${item2WidthPercent}%`; 
    } else {
      let item1Height: number = this.item1.clientHeight;
      let item2Height: number = this.item2.clientHeight;
      let totalHeight: number = item1Height + item2Height;
      let item1HeightPercent: number = (item1Height + v) / totalHeight * 100;
      let item2HeightPercent: number = (item2Height - v) / totalHeight * 100;
      this.item1.style.height = `${item1HeightPercent}%`;
      this.item2.style.height = `${item2HeightPercent}%`; 
    }
    
    this.save();
  }
  
  save() {
    if (this.key) {
      let sizeRatio: string;
      if (this.orientation === "horizontal") {
        sizeRatio = JSON.stringify({
          width1: this.item1.style.width,
          width2: this.item2.style.width
        });
      } else {
        sizeRatio = JSON.stringify({
          height1: this.item1.style.height,
          height2: this.item2.style.height
        });
      }
      localStorage.setItem(this.key, sizeRatio);
    }
  }

  load() {
    
    if (this.key) {
      let sizeRatio = localStorage.getItem(this.key);
      if (sizeRatio) {
        let parsedRatio = JSON.parse(sizeRatio);
        if (this.orientation === "horizontal") {
          this.item1.style.width = parsedRatio.width1;
          this.item2.style.width = parsedRatio.width2;
        } else {
          this.item1.style.height = parsedRatio.height1;
          this.item2.style.height = parsedRatio.height2;
        }

        return;
      }
    }

    if (this.init && this.init.includes(":")) {
      let parts = this.init.split(":");
      let left = parseFloat(parts[0]);
      let right = parseFloat(parts[1]);
      let total = left + right;
      
      if (left && right && total != 0) {
        left = (left / total) * 100;
        right = (right / total) * 100;

        if (this.orientation === "horizontal") {
          this.item1.style.width = `${left}%`;
          this.item2.style.width = `${right}%`;
        } else {
          this.item1.style.height = `${left}%`;
          this.item2.style.height = `${right}%`;
        }
      }
    }
  }
}
