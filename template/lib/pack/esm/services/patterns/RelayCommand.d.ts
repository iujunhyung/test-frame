import { ICommand } from "./ICommand";
export declare class RelayCommand implements ICommand {
    content: any;
    execute: (parameter?: any) => void;
    canExecute: (parameter?: any) => boolean;
    constructor(x: {
        content: any;
        execute: (parameter?: any) => void;
        canExecute?: (parameter?: any) => boolean;
    });
}
