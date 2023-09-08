import { LitElement } from "lit";
export declare class XSplitter extends LitElement {
    static styles: import("lit").CSSResult[];
    orientation: "horizontal" | "vertical";
    host: HTMLElement;
    thumb: HTMLElement;
    private isDragging;
    private initValue;
    connectedCallback(): Promise<void>;
    onMouseDown(e: MouseEvent): void;
    onMouseMove(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
    onKeyDown(e: KeyboardEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
