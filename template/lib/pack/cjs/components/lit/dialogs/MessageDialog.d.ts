import { LitElement } from 'lit';
import type { IDialog } from './IDialog';
export declare class MessageDialog extends LitElement {
    static styles: import("lit").CSSResult[];
    title: string;
    message: string;
    dialog?: IDialog;
    resolve?: (value: boolean | PromiseLike<boolean>) => void;
    reject?: (reason?: any) => void;
    connectedCallback(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
    positiveText: string;
    negativeText: string;
    useNegative: boolean;
    initOk(): void;
    initOkCancel(): void;
    initYesNo(): void;
    initCustom(positiveText: string, negativeText: string, useNegative?: boolean): void;
    ok(): void;
    cancel(): void;
    showAsync(title: string, message: string): Promise<boolean>;
    visible(): void;
    close(): void;
}
