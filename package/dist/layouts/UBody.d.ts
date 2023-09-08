import { LitElement } from 'lit';
import '@src/components/BusyIndicator';
import '@src/components/dialogs';
import { MessageDialog } from '@src/components/lit/dialogs/MessageDialog';
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
