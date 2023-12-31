import { css, html, LitElement } from 'lit'
import { customElement, property ,query } from 'lit/decorators.js'

import type { IDialog } from './IDialog';

@customElement('blank-dialog')
export class BlankDialog extends LitElement {
  
  static styles = [
    css`
    :host {
      z-index: 999; 
      position: absolute;
    }
    
    fast-dialog {
      --dialog-height: auto;
      --dialog-width: auto;
    }

    #close-button {
      position: absolute;
      top: 12px;
      right: 12px;
      background: transparent;
      border: none;
      color: var(--fill-color);
      font-size: 1.5rem;
      padding: 0px 8px;
      cursor: pointer;
    }
    `
  ];

  @query("#dialog") dialog?: IDialog;

  @property() content: any = null;
  
  resolve?: (value: {success: boolean, value: any} | PromiseLike<{success: boolean, value: any}>) => void;
  reject?: (reason?: any) => void;
  
  render() {
    return html`
    <fast-dialog id="dialog" modal="true" hidden>
      ${this.content}
      <button id="close-button" @click=${this.cancel}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
      </button>
    </fast-dialog>
    `;
  }

  ok() {
    this.close();

    if (this.resolve) {
      
      this.resolve({
        success: true,
        value: this.content
      });
    }
  }

  cancel() {
    this.close();

    if (this.reject) {
      this.reject();
    }
  }
  
  async showAsync() : Promise<{success: boolean, value: any}> {
  
    await this.updateComplete;
    
    this.visible();
    
    if (this.dialog) {
      document.removeEventListener("focusin", this.dialog.handleDocumentFocus);
    }
    
    return new Promise<{success: boolean, value: any}>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      if (this.content && this.content.loadPromise) {
        this.content.loadPromise(resolve, reject);
      }
    }).catch((_error) => {
      return { success: false, value: null };
    });
  }

  private visible() {
    if (this.dialog) {
      this.dialog.show();
    }

    this.hidden = false;
  }

  private close() {
    if (this.dialog) {
      this.dialog.hide();
    }
    
    this.hidden = true;
  }
}