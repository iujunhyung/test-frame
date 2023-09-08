declare class DIContainer {
    private static instance;
    static getOrCreate(): DIContainer;
    private services;
    get<T>(key: Symbol): T | null;
    createInterface<T>(): Symbol;
    register(key: Symbol, instance: any): void;
}
export declare const DI: DIContainer;
export declare function inject<T>(key: Symbol): (target: any, propertyKey: string) => void;
export {};
