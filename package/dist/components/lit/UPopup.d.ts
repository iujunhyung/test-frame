import { LitElement } from 'lit';
export declare class UPopup extends LitElement {
    static styles: import("lit").CSSResult[];
    anchorElement: HTMLElement | null;
    viewportElement: HTMLElement | null;
    isOpen: boolean;
    render(): import("lit-html").TemplateResult<1>;
    constructor();
    disconnectedCallback(): void;
    ensureEvent(): void;
    removeEvents(): void;
    open(e: MouseEvent): void;
    close(): void;
}
