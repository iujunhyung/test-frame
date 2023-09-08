import { LitElement } from 'lit';
type Constructor<T = {}> = new (...args: any[]) => T;
export declare interface IAppShell {
    toggleTheme(): void;
    busy(): void;
    unbusy(): void;
    invokeInBusy<T>(action: () => Promise<T>): Promise<T>;
}
export declare const AppShellMixin: <T extends Constructor<LitElement>>(superClass: T) => Constructor<IAppShell> & T;
export {};
