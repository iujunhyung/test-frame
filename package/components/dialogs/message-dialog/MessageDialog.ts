import {css, html, LitElement} from 'lit'
import {customElement,query,property} from 'lit/decorators.js'

import type { IDialog } from '@iyu/types';

@customElement('message-dialog')
export class MessageDialog extends LitElement {
  
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

    #title {
      font-weight: initial;
      opacity: 0.6;
      font-size: large;
    }
    `
  ];

  @property() title: string = "";
  @property() message: string = "";
  @query("#dialog") dialog?: IDialog;
  
  resolve?: (value: boolean | PromiseLike<boolean>) => void;
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
          <label id="title">${this.title}</label>
          <pre>${this.message}</pre>
          <div class="row" style="justify-content: end">
            ${this.useNegative ? html`<fast-button @click=${this.cancel}>${this.negativeText}</fast-button>` : null}
            <fast-button @click=${this.ok}>${this.positiveText}</fast-button>
          </div>
        </div>
      </fast-dialog>
    `;
  }
  
  positiveText = "Ok";
  negativeText = "Cancel";
  useNegative = false;
  
  initOk() {
    this.positiveText = "Ok";
    this.negativeText = "Cancel";
    this.useNegative = false;
  }

  initOkCancel() {
    this.positiveText = "Ok";
    this.negativeText = "Cancel";
    this.useNegative = true;
  }

  initYesNo() {
    this.positiveText = "Yes";
    this.negativeText = "No";
    this.useNegative = true;
  }

  initCustom(positiveText: string, negativeText: string, useNegative?: boolean) {
    this.positiveText = positiveText;
    this.negativeText = negativeText;
    this.useNegative = useNegative ?? true;
  }
  
  ok() {
    this.close();

    if (this.resolve) {
      this.resolve(true);
    }
  }

  cancel() {
    this.close();

    if (this.reject) {
      this.reject('cancel');
    }
  }

  showAsync(title: string, message: string) : Promise<boolean> {
  
    this.title = title;
    this.message = message;
    
    this.visible();
    
    if (this.dialog) {
      document.removeEventListener("focusin", this.dialog.handleDocumentFocus);
    }
    
    return new Promise<boolean>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    }).catch((_error) => {
      return false;
    });
  }

  visible() {
    if (this.dialog) {
      this.dialog.show();
      // this.dialog.hidden = false;
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