

import {css, html, LitElement} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'

@customElement('u-popup')
export class UPopup extends LitElement {
  static styles = [
    css`
    :host {
      display: none;
    }
    `
  ];

  @property() anchorElement: HTMLElement | null = null;
  @property() viewportElement: HTMLElement | null = null;
  
  @state() isOpen = false;
  
  render() {

    this.ensureEvent();

    return html`<h1><slot></slot></h1>`;
  }

  constructor() {
    super();

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    
    this.removeEvents();
  }
  
  ensureEvent() {
    this.removeEvents();
    
    if (this.anchorElement) {
      this.anchorElement.addEventListener('click', this.open);
    }

    if (this.viewportElement) {
      this.viewportElement.addEventListener('click', this.close);
    }    
  }

  removeEvents() {
    if (this.anchorElement) {
      this.anchorElement.removeEventListener('click', this.open);
    }

    if (this.viewportElement) {
      this.viewportElement.removeEventListener('click', this.close);
    }    
  }

  open(e: MouseEvent) {
    if (this.anchorElement && this.isOpen != true) {

      this.isOpen = true;
      e.stopImmediatePropagation();

      this.dispatchEvent(new CustomEvent("on-opening", {bubbles: true, composed: true}));
      
      this.style.display = 'block';
      this.style.position = 'absolute';
      this.style.zIndex = '9999';
      
      const anchorRect = this.anchorElement.getBoundingClientRect();
      const popupRect = this.getBoundingClientRect();
      
      // top 위치 지정
      if (anchorRect.bottom + popupRect.height > window.innerHeight) {
        this.style.top = anchorRect.top - popupRect.height + 'px';
      } else {
        this.style.top = anchorRect.bottom + 'px';
      }
  
      // left 위치 지정
      if (anchorRect.right + popupRect.width > window.innerWidth) {
        this.style.left = anchorRect.left - popupRect.width + 'px';
      } else {
        this.style.left = anchorRect.right + 'px';
      }
  
    }
  }

  close() {
    if (this.isOpen) {
      this.isOpen = false;

      this.style.display = 'none';
    }
  }
}