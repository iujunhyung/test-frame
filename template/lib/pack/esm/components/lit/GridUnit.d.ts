import { LitElement, PropertyValueMap } from "lit";
export declare class GridUnit extends LitElement {
    key?: string;
    orientation: "horizontal" | "vertical";
    init: string;
    item1: HTMLElement;
    item2: HTMLElement;
    static styles: import("lit").CSSResult;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void>;
    protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
    onDragged(e: CustomEvent): void;
    resize(v: number): void;
    save(): void;
    load(): void;
}
