export declare class IdentityStore {
    email: string | null;
    name: string | null;
    phone: string | null;
    constructor();
    getClaimAsync(type: string): Promise<any>;
    UpdateAsync(): Promise<void>;
}
export declare const identityStore: IdentityStore;
