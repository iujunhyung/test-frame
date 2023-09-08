export declare enum Breakpoint {
    Tablet,
    Small,
    Medium,
    Large
}
export declare class LayoutStore {
    documentWidth: number;
    leftNavExpanded: boolean;
    constructor();
    onWindowResized(ev: UIEvent): void;
    toggleNavSize: () => void;
    isLeftNavCollapsed(): boolean;
}
export declare const layoutStore: LayoutStore;
