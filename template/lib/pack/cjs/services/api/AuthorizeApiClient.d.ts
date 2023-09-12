import { ApiClient, IStandardResponse } from "./ApiClient";
export type AuthToken = {
    accessToken: string;
    refreshToken: string;
    code: string;
    expires: number;
};
export declare abstract class AuthorizeApiClient extends ApiClient {
    protected accessToken: string | null;
    protected token: AuthToken | null;
    protected getAccessTokenAsync(): Promise<string | null>;
    protected getTokenAsync(): Promise<AuthToken | null>;
    private refreshTokenAsync;
    protected buildHeadersAsync(defaults?: any): Promise<any>;
    protected getIdentityAsync(): Promise<any>;
    retry(options: {
        refreshToken: boolean;
        retry?: number | undefined;
    }): boolean;
    protected get(address: string, options?: {
        refreshToken: boolean;
        retry?: number;
    }): Promise<IStandardResponse>;
    protected post(address: string, data?: any, options?: {
        refreshToken: boolean;
        retry?: number;
        headers?: {
            [key: string]: string;
        };
    }): Promise<IStandardResponse>;
    protected delete(address: string, options?: {
        refreshToken: boolean;
        retry?: number;
    }): Promise<IStandardResponse>;
}
