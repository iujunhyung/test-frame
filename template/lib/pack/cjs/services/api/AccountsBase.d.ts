import { AuthorizeApiClient } from "./AuthorizeApiClient";
export declare abstract class AccountsBase extends AuthorizeApiClient {
    login(request: {
        email: string;
        password: string;
        rememberMe: boolean;
    }): Promise<import("./ApiClient").IStandardResponse>;
    sendRegisterEmail(request: {
        email: string;
    }): Promise<import("./ApiClient").IStandardResponse>;
    registerForEmail(request: {
        email: string;
        code: string | undefined;
        password: string;
        confirmPassword: string;
        name: string;
    }): Promise<import("./ApiClient").IStandardResponse>;
    forgotPassword(request: {
        email: string;
        name: string;
    }): Promise<import("./ApiClient").IStandardResponse>;
    resetPassword(request: {
        userId: string;
        code: string;
        password: string;
        confirmPassword: string;
    }): Promise<import("./ApiClient").IStandardResponse>;
    loginWithGoogle(): void;
    loginWithMicrosoft(): void;
    acceptTerms(request: {
        name: string;
        phone: string;
    }): Promise<import("./ApiClient").IStandardResponse>;
}
