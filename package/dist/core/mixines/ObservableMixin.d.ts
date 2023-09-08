import { LitElement } from 'lit';
type Constructor<T = {}> = new (...args: any[]) => T;
export declare interface IObservable {
}
export declare const ObservableMixin: <T extends Constructor<LitElement>>(superClass: T) => Constructor<IObservable> & T;
export {};
