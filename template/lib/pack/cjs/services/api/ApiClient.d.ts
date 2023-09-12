export interface IStandardResponse {
    success: boolean;
    status: number;
    value?: any;
}
export declare abstract class ApiClient {
    protected abstract host: string;
    private success;
    private isClientError;
    private asText;
    private onResponseAsync;
    protected buildUrl(url: string): string;
    protected buildHeadersAsync(defaults?: any): Promise<any>;
    protected get(address: string): Promise<IStandardResponse>;
    protected post(address: string, data?: any, options?: {
        headers?: {
            [key: string]: string;
        };
    }): Promise<IStandardResponse>;
    protected delete(address: string): Promise<IStandardResponse>;
}
