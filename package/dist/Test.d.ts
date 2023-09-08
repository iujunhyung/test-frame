import { LitElement } from "lit";
import React from "react";
export declare class TestElement extends LitElement {
    name: string;
    render(): import("lit-html").TemplateResult<1>;
}
export declare const Testing: React.ComponentType<Omit<React.HTMLAttributes<TestElement>, "children"> & {} & {
    children?: (string | number | boolean | JSX.Element | React.ReactPortal | undefined) | (string | number | boolean | JSX.Element | React.ReactPortal | undefined)[];
} & Partial<Omit<TestElement, keyof HTMLElement>> & React.RefAttributes<TestElement>>;
