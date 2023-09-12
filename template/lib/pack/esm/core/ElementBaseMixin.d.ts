import { LitElement } from "lit";
import { MobxLitElement } from '@adobe/lit-mobx';
import { CSSResultGroup } from 'lit';
type Constructor<T> = new (...args: any[]) => T;
export declare interface IElement {
    findContext(propertyName: string): void;
}
export declare const ElementMixin: <T extends Constructor<LitElement>>(superClass: T) => Constructor<IElement> & T;
declare const ElementBaseMixin_base: Constructor<IElement> & typeof MobxLitElement;
export declare abstract class ElementBaseMixin extends ElementBaseMixin_base {
    static styles: CSSResultGroup;
}
export {};
