import { InputDialogOptions, MessageDialog } from "@src/components/lit/dialogs";
import { IMenuItem } from "@src/components/lit/PopupMenu";
declare class UIManager {
    private static _instance;
    static get Instance(): UIManager;
    pageBusyIndicator?: HTMLElement;
    messageBoxDialog?: MessageDialog;
    isReady: boolean;
    private busyStack;
    initializeAsync(): Promise<boolean>;
    private ready;
    setPageBusyIndicator(pageBusyIndicator: HTMLElement): void;
    setMessageDialog(messageBoxDialog: MessageDialog): void;
    showMessageAsync(title: string, message: string): Promise<boolean>;
    showMessageOkCancelAsync(title: string, message: string): Promise<boolean>;
    showConfirmDialog(title: string, message: string): Promise<boolean>;
    createInertElement(html: string): Element;
    showInputDialogAsync(title: string, message: string, options?: InputDialogOptions): Promise<{
        success: boolean;
        value: string;
    } | {
        success: boolean;
        value: null;
    }>;
    showDialogAsync(content: any): Promise<{
        success: boolean;
        value: any;
    }>;
    showContentDialogAsync(title: string, content: any, options?: {
        okCancel?: boolean;
        yesNo?: boolean;
        hiddenButtons?: boolean;
        validationHandler?: () => string[];
    }): Promise<{
        success: boolean;
        value: any;
    }>;
    showContextMenu(menuItems: Array<IMenuItem>, e: MouseEvent): Promise<{
        success: boolean;
        value: any;
    }>;
    busy(): void;
    updateBusyIndicator(): void;
    unbusy(): void;
    invokeInBusy<T>(action: () => Promise<T>): Promise<T>;
}
export declare const uiManager: UIManager;
export {};
