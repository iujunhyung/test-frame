import { AuthorizeApiClient } from './AuthorizeApiClient.js';

class AccountsBase extends AuthorizeApiClient {
    login(request) {
        var _a;
        if (document.location.pathname.startsWith("/oauth/authorize")) {
            var url = `/oauth/authorize-user${document.location.search}`;
            return this.post(url, request);
        }
        else {
            let returnUrl = (_a = (new URLSearchParams(document.location.search)).get("returnUrl")) !== null && _a !== void 0 ? _a : "/app";
            var url = returnUrl
                ? `/accounts/login?returnUrl=${returnUrl}`
                : `/accounts/login`;
            return this.post(url, request);
        }
    }
    sendRegisterEmail(request) {
        return this.post("/accounts/send-register-email", request);
    }
    registerForEmail(request) {
        return this.post("/accounts/register-for-email", request);
    }
    forgotPassword(request) {
        return this.post("/accounts/forgot-password", request);
    }
    resetPassword(request) {
        return this.post("/accounts/reset-password", request);
    }
    loginWithGoogle() {
        var _a, _b;
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = (_b = (_a = urlParams.getCaseIgnore('returnUrl')) !== null && _a !== void 0 ? _a : urlParams.getCaseIgnore('redirect_uri')) !== null && _b !== void 0 ? _b : "/app";
        let url = this.buildUrl(`/accounts/external-login?provider=Google&returnUrl=${returnUrl}`);
        window.location.href = url;
    }
    loginWithMicrosoft() {
        var _a, _b;
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = (_b = (_a = urlParams.getCaseIgnore('returnUrl')) !== null && _a !== void 0 ? _a : urlParams.getCaseIgnore('redirect_uri')) !== null && _b !== void 0 ? _b : "/app";
        let url = this.buildUrl(`/accounts/external-login?provider=OpenIdConnect&returnUrl=${returnUrl}`);
        window.location.href = url;
    }
    acceptTerms(request) {
        return this.post("/accounts/accept-terms", request);
    }
}

export { AccountsBase };
