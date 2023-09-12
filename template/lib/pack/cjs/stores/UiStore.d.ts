export declare enum Themes {
    dark = 0,
    light = 1
}
export declare class UiStore {
    theme: Themes;
    constructor();
    init(): void;
    toggleTheme(targetElement?: any): void;
    updateTheme(theme: 'dark' | 'light', targetElement?: any): void;
}
export declare const uiStore: UiStore;
