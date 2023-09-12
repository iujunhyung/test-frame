export declare namespace Validations {
    function validateEmail(value: string): boolean;
    function validateTel(value: string): boolean;
    function validatePath(obj: any, path: string): string[];
    function validate(obj: any, ...paths: string[]): string[];
    function validateObj(obj: any): string[];
}
