import { css, html, LitElement } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import type { IDialog } from './IDialog';

@customElement('content-dialog')
export class ContentDialog extends LitElement {
  
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

    .row {
      display: flex;
      justify-content: space-between;
    }
    
    fast-button {
      min-width: 80px;
      margin: 0px 4px;
    }    
    `
  ];

  @query("#dialog") dialog?: IDialog;

  @property({type: String}) title: string = '';
  @property({attribute: false}) content = null;
  
  resolve?: (value: {success: boolean, value: any} | PromiseLike<{success: boolean, value: any}>) => void;
  reject?: (reason?: any) => void;
  
  validationHandler?: () => string[];
  
  @state() errors?: string[];

  positiveText = "Ok";
  negativeText = "Cancel";
  useNegative = false;
  hiddenButtons = false;
  
  override async connectedCallback() {
    super.connectedCallback();

    await this.updateComplete;

    this.onCancel = this.onCancel.bind(this);
    if (this.dialog) {
      this.dialog.addEventListener("cancel", this.onCancel);
    }
  }

  override disconnectedCallback() {
    if (this.dialog) {
      this.dialog.removeEventListener("cancel", this.onCancel);
    }
  }

  onCancel() {
    this.cancel();
  }

  render() {
    return html`
    <fast-dialog id="dialog" modal="true" hidden>
      <div style="padding: 10px; color: var(--neutral-foreground-rest); min-width: 400px">
        <h2>${this.title}</h2>
        ${this.content}
        ${this.errors?.map(p => html`<div class="row" style="color: var(--accent-foreground-rest)">${p}</div>`)}
        ${this.hiddenButtons ? null : html`
        <div class="row" style="justify-content: end; padding-top: 4px">
          ${this.useNegative ? html`<fast-button @click=${this.cancel}>${this.negativeText}</fast-button>` : null}
          <fast-button @click=${this.ok}>${this.positiveText}</fast-button>
        </div>
        `}
      </div>
    </fast-dialog>
    `;
  }

  ok() {
    
    if (this.validationHandler) {
      let errors = this.validationHandler();
      if (errors.length > 0) {
        this.errors = errors;
        return;
      }
    }

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
  
  async showAsync(title: string) : Promise<{success: boolean, value: any}> {
  
    await this.updateComplete;

    this.title = title;
    this.visible();
    
    if (this.dialog) {
      document.removeEventListener("focusin", this.dialog.handleDocumentFocus);
    }
    
    return new Promise<{success: boolean, value: any}>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    }).catch((_error) => {
      return { success: false, value: null };
    });
  }

  visible() {
    if (this.dialog) {
      this.dialog.show();
    }

    this.hidden = false;
  }

  close() {
    if (this.dialog) {
      this.dialog.hide();
    }
    
    this.hidden = true;
  }
}