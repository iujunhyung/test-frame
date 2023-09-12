import { LitElement } from 'lit';
export type ComboboxSelectedItemType = {
    text: string;
    value: any;
};
export interface IComboboxContext {
    source?: any[];
    value?: any;
    displayPath?: string;
    valuePath?: string;
}
export declare class ComboboxContext implements IComboboxContext {
    source: any[];
    value: any;
    selectedItem?: any;
    displayPath?: string;
    valuePath?: string;
    listType: boolean;
    constructor(context: IComboboxContext);
}
export declare class UCombobox extends LitElement {
    static styles: import("lit").CSSResult[];
    source: Array<any>;
    context?: ComboboxContext;
    label: string;
    hint: string | null;
    value: any;
    dataContext: any;
    path: string | null;
    onChangedContext(): void;
    protected updated(changedProperties: any): void;
    getCurrentValue(): any;
    render(): import("lit-html").TemplateResult<1>;
    changeValue(e: any): void;
}
