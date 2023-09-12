import { LitElement } from 'lit';
import type { IDialog } from './IDialog';
export declare class ContentDialog extends LitElement {
    static styles: import("lit").CSSResult[];
    dialog?: IDialog;
    title: string;
    content: null;
    resolve?: (value: {
        success: boolean;
        value: any;
    } | PromiseLike<{
        success: boolean;
        value: any;
    }>) => void;
    reject?: (reason?: any) => void;
    validationHandler?: () => string[];
    errors?: string[];
    positiveText: string;
    negativeText: string;
    useNegative: boolean;
    hiddenButtons: boolean;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    onCancel(): void;
    render(): import("lit-html").TemplateResult<1>;
    ok(): void;
    cancel(): void;
    showAsync(title: string): Promise<{
        success: boolean;
        value: any;
    }>;
    visible(): void;
    close(): void;
}
