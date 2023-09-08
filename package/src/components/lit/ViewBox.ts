import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('view-box')
export class ViewBox extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .container {
      transform-origin: top left;
    }
  `;

  private resizeObserver: ResizeObserver;
  private mutationObserver: MutationObserver;

  constructor() {
    super();
    this.resizeObserver = new ResizeObserver(() => this.adjustScale());
    this.mutationObserver = new MutationObserver(() => this.adjustScale());
  }

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();
    super.disconnectedCallback();
  }

  firstUpdated() {
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      this.mutationObserver.observe(slot, { childList: true });
    }
    this.adjustScale();
  }

  private adjustScale() {
    const container = this.shadowRoot?.querySelector('.container') as HTMLElement;
    if (container) {
      const originalTransform = container.style.transform;
      container.style.transform = 'scale(1)';

      const rect = container.getBoundingClientRect();
      
      container.style.transform = originalTransform;

      const scaleX = this.clientWidth / rect.width;
      const scaleY = this.clientHeight / rect.height;
      const scale = Math.min(scaleX, scaleY);

      container.style.transform = `scale(${scale})`;
    }
}


  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}