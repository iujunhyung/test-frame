import { LitElement } from 'lit';
import '@iyu-web/components/lit/BusyIndicator';
import '@iyu-web/components/lit/dialogs';
import { MessageDialog } from '@iyu-web/components/lit/dialogs/MessageDialog';
export type MessageContext = {
    title: string;
    message: string;
    onOk: Function;
};
export declare class UBody extends LitElement {
    static styles: import("lit").CSSResult[];
    busyIndicator?: HTMLElement;
    messageDialog?: MessageDialog;
    messageContext?: MessageContext;
    connectedCallback(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
