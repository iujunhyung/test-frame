
import { Validations } from '@iyu/helpers';
import type { IDialog } from '@iyu/types';
import {css, html, LitElement} from 'lit'
import {customElement,query,property} from 'lit/decorators.js'

export type InputDialogOptions = {
  format?: string;
  value?: string;
}

@customElement('input-dialog')
export class InputDialog extends LitElement {
  
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
    `
  ];

  @property() title: string = "";
  @property() message: string = "";
  @property() format?: string = "";
  @property() value: string = "";
  @query("#dialog") dialog?: IDialog;
  
  resolve?: (value: {success: boolean, value: string} | PromiseLike<{success: boolean, value: string}>) => void;
  reject?: (reason?: any) => void;
  
  override async connectedCallback() {
    super.connectedCallback();

    await this.updateComplete;

    if (this.dialog) {
      
      this.dialog.addEventListener("cancel", (_) => {
        this.cancel();
      })
    }
  }

  render() {
    return html`
    <fast-dialog id="dialog" modal="true" hidden>
      <div style="padding: 10px; color: var(--neutral-foreground-rest); min-width: 400px">
        <h2>${this.title}</h2>
        <p>${this.message}</p>
        <u-input @change=${(e: any) => this.value = e.detail.value} value=${this.value} label='' type=${this.format} auto-focus></u-input>
        <div class="row" style="justify-content: end">
          <fast-button @click=${this.ok}>Ok</fast-button>
        </div>
      </div>
    </fast-dialog>
    `;
  }

  ok() {
    if (this.format == "email") {
      if (Validations.validateEmail(this.value) != true) {
        return;
      }
    }

    this.close();

    if (this.resolve) {
      this.resolve({
        success: true,
        value: this.value
      });
    }
  }

  cancel() {
    this.close();

    if (this.reject) {
      this.reject();
    }
  }
  
  async showAsync(title: string, message: string, options?: InputDialogOptions) : Promise<{success: boolean, value: string}> {
  
    await this.updateComplete;

    this.title = title;
    this.message = message;
    this.format = options?.format;
    this.value = options?.value ?? "";
    
    this.visible();
    
    if (this.dialog) {
      document.removeEventListener("focusin", this.dialog.handleDocumentFocus);
    }
    
    return new Promise<{success: boolean, value: string}>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    }).catch((_error) => {
      return { success: false, value: '' };
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

declare global {
  interface HTMLElementTagNameMap {
    'input-dialog': InputDialog
  }
}