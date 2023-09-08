import "reflect-metadata";
export interface PropertyMetaData<_ = unknown, TypeHint = unknown> {
    required?: boolean;
    label?: string;
    hint?: string;
    format?: string;
    type?: TypeHint;
    minLength?: number;
    maxLength?: number;
    regex?: RegExp;
}
export declare function propertyMeta<T = unknown, TypeHint = unknown>(metadata: PropertyMetaData<T, TypeHint>): (target: Object, propertyKey: string | symbol) => void;
export declare function getPropertyMeta(target: Object, propertyKey: string | symbol): PropertyMetaData | undefined;
