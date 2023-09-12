import { css, html, LitElement } from 'lit'
import { customElement, query, property } from 'lit/decorators.js'

import '@iyu-web/components/lit/BusyIndicator';
import '@iyu-web/components/lit/dialogs';
import { uiManager } from '@iyu-web/core/UIManager';
import { MessageDialog } from '@iyu-web/components/lit/dialogs/MessageDialog';

export type MessageContext = {
  title: string;
  message: string;
  onOk: Function;
}

@customElement('u-body')
export class UBody extends LitElement {

  static styles = [
    css`
      :host {
        height: 100%;
        width: 100%;
      }
    `
  ];

  @query('#busy-indicator') busyIndicator?: HTMLElement
  @query('#message-dialog') messageDialog?: MessageDialog
  
  @property({type: Object})
  messageContext?: MessageContext;

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;

    if (this.busyIndicator) {
      uiManager.setPageBusyIndicator(this.busyIndicator);
    }

    if (this.messageDialog) {
      uiManager.setMessageDialog(this.messageDialog);
    }
  }
  
  render() {
    return html`
      <slot></slot>
      <busy-indicator id="busy-indicator" hidden></busy-indicator>
      <message-dialog id="message-dialog" hidden></message-dialog>
    `;
  }
}