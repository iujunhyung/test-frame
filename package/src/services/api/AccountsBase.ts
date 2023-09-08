import { AuthorizeApiClient } from "./AuthorizeApiClient";

export abstract class AccountsBase extends AuthorizeApiClient {
    
  login(request: { email: string; password: string; rememberMe: boolean; }) {

    if (document.location.pathname.startsWith("/oauth/authorize")) {
      var url = `/oauth/authorize-user${document.location.search}`;
      return this.post(url, request);      
    } else {
      let returnUrl = (new URLSearchParams(document.location.search)).get("returnUrl") ?? "/app";
      var url = returnUrl 
        ? `/accounts/login?returnUrl=${returnUrl}`
        : `/accounts/login`;
      return this.post(url, request);
    }
  }
  
  sendRegisterEmail(request: { email: string; }) {
    return this.post("/accounts/send-register-email", request);
  }

  registerForEmail(request: { email: string; code: string | undefined; password: string; confirmPassword: string; name: string; }) {
    return this.post("/accounts/register-for-email", request);
  }

  forgotPassword(request: { email: string; name: string; }) {
    return this.post("/accounts/forgot-password", request);
  }

  resetPassword(request: { userId: string; code: string; password: string; confirmPassword: string; }) {
    return this.post("/accounts/reset-password", request);
  }

  loginWithGoogle() {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.getCaseIgnore('returnUrl')
      ?? urlParams.getCaseIgnore('redirect_uri') 
      ?? "/app";

    let url = this.buildUrl(`/accounts/external-login?provider=Google&returnUrl=${returnUrl}`);
    window.location.href = url;
  }

  loginWithMicrosoft() {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.getCaseIgnore('returnUrl')
      ?? urlParams.getCaseIgnore('redirect_uri') 
      ?? "/app";
      
    let url = this.buildUrl(`/accounts/external-login?provider=OpenIdConnect&returnUrl=${returnUrl}`);
    window.location.href = url;
  }
  
  acceptTerms(request: { name: string, phone: string }) {
    return this.post("/accounts/accept-terms", request);
  }
}