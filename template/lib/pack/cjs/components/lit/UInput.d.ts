import { LitElement } from 'lit';
export declare enum InputTypes {
    text = 0,
    email = 1,
    password = 2,
    tel = 3,
    url = 4,
    checkbox = 5,
    number = 6,
    date = 7,
    time = 8,
    datetime = 9
}
declare const UInput_base: (new (...args: any[]) => import("@iyu-web/core/ElementBaseMixin").IElement) & typeof LitElement;
export declare class UInput extends UInput_base {
    static styles: import("lit").CSSResult[];
    type: InputTypes | string;
    value: any;
    label: string | null;
    hint: string | null;
    required: boolean;
    context: any;
    path: string | null;
    skipUpdate: boolean;
    readonly: boolean;
    autoFocus: boolean;
    multiline: boolean;
    updatedAction: ((path: string, value: any, context: any) => void) | null;
    private lastContext;
    private lastPath;
    protected updated(_changedProperties: any): Promise<void>;
    autoWire(context: any, path: string): void;
    render(): import("lit-html").TemplateResult<1>;
    renderInput(): import("lit-html").TemplateResult<1>;
    renderError(): import("lit-html").TemplateResult<1>;
    renderText(type?: string | null): import("lit-html").TemplateResult<1>;
    renderTextArea(type?: string | null): import("lit-html").TemplateResult<1>;
    renderCheckbox(): import("lit-html").TemplateResult<1>;
    renderNumber(): import("lit-html").TemplateResult<1>;
    onChange(value: any): void;
}
export {};
