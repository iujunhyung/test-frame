import { LitElement } from "lit";
export declare class TestElement extends LitElement {
    name: string;
    render(): import("lit-html").TemplateResult<1>;
    eventSource(): void;
}
export declare const TestComponent: import("@lit-labs/react").ReactWebComponent<TestElement, {
    onTestEvent: string;
}>;