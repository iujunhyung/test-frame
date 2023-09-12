import { AppSettings } from "@iyu-web/core/AppSettings";
export declare class UserStore {
    appSettings?: AppSettings;
    user?: any;
    get userId(): any;
    get userName(): any;
    get userEmail(): any;
    get userRoles(): any;
    get SID(): any;
    get userClaims(): any;
    constructor();
    login(user: any): void;
    init(): void;
}
export declare const userStore: UserStore;
