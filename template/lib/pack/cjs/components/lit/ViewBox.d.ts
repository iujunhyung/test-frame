import { LitElement } from 'lit';
export declare class ViewBox extends LitElement {
    static styles: import("lit").CSSResult;
    private resizeObserver;
    private mutationObserver;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    private adjustScale;
    render(): import("lit-html").TemplateResult<1>;
}
