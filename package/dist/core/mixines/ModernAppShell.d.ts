import { MobxLitElement } from '@adobe/lit-mobx';
import '@src/layouts/UBody';
import '@src/layouts/left-nav/LeftNav';
import '@src/layouts/top-bar/TopBar';
declare const ModernApp_base: (new (...args: any[]) => import("./AppShellMixin").IAppShell) & typeof MobxLitElement;
export declare class ModernApp extends ModernApp_base {
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
export {};
