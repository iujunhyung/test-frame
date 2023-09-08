import { LitElement } from 'lit';
import type { IDialog } from './IDialog';
export declare class BlankDialog extends LitElement {
    static styles: import("lit").CSSResult[];
    dialog?: IDialog;
    content: any;
    resolve?: (value: {
        success: boolean;
        value: any;
    } | PromiseLike<{
        success: boolean;
        value: any;
    }>) => void;
    reject?: (reason?: any) => void;
    render(): import("lit-html").TemplateResult<1>;
    ok(): void;
    cancel(): void;
    showAsync(): Promise<{
        success: boolean;
        value: any;
    }>;
    private visible;
    private close;
}
