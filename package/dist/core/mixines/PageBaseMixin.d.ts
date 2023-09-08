import { LitElement, CSSResultGroup, TemplateResult } from "lit";
import { MobxLitElement } from '@adobe/lit-mobx';
export declare class IPageBase {
}
export declare const PageMixin: <T extends Constructor<LitElement>>(superClass: T) => Constructor<IPageBase> & T;
declare const PageBaseMixin_base: Constructor<IPageBase> & typeof MobxLitElement;
export declare abstract class PageBaseMixin extends PageBaseMixin_base {
    static styles: CSSResultGroup;
    abstract pageTitle: string;
    abstract renderContent(): TemplateResult<1>;
    render(): TemplateResult<1>;
}
type Constructor<T> = new (...args: any[]) => T;
export {};
