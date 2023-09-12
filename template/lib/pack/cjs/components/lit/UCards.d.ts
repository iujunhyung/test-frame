import { LitElement } from 'lit';
export declare class UCards extends LitElement {
    static styles: import("lit").CSSResult[];
    items: [];
    selectedItem?: any;
    useAdd: boolean;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    private getCardElement;
    private getDescriptionElement;
    private getAddCardElement;
    onSelectedItem(item: any): void;
    private onAdd;
}
