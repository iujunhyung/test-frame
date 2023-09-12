import { LitElement } from "lit";
export declare class UErrors extends LitElement {
    errors: string[];
    expanded: boolean;
    render(): import("lit-html").TemplateResult<1>;
    private renderErrorSVG;
    static styles: import("lit").CSSResult;
}
