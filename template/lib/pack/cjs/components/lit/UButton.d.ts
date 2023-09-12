import { LitElement } from 'lit';
import { RelayCommand } from '@iyu-web/services/patterns/RelayCommand';
import { ICommand } from '@iyu-web/services/patterns/ICommand';
declare const UButton_base: (new (...args: any[]) => import("@iyu-web/core/ObservableMixin").IObservable) & typeof LitElement;
export declare class UButton extends UButton_base {
    static styles: import("lit").CSSResult[];
    href: string | null;
    appearance: string | null;
    accent: boolean;
    disabled: Boolean;
    command: ICommand | undefined;
    commandParameter?: any;
    onChangedCommand(command?: RelayCommand): void;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    onClick(): void;
}
export {};
