import { LitElement } from 'lit';
export interface IMenuItem {
    name: string;
    label: string;
    icon?: string;
}
export declare class PopupMenu extends LitElement {
    static styles: import("lit").CSSResult[];
    menu?: HTMLElement;
    menuItems: Array<IMenuItem>;
    location: {
        x: number;
        y: number;
    };
    selectedItem: IMenuItem | null;
    resolve?: (value: {
        success: boolean;
        value: any;
    } | PromiseLike<{
        success: boolean;
        value: any;
    }>) => void;
    reject?: (reason?: any) => void;
    constructor();
    onMouseUp(e: MouseEvent): void;
    render(): import("lit-html").TemplateResult<1>;
    onMenuItemClick(item: IMenuItem): void;
    ok(): void;
    cancel(): void;
    showAsync(): Promise<{
        success: boolean;
        value: any;
    }>;
    visible(): void;
    close(): void;
}
