import { ApiClient, IStandardResponse } from "./ApiClient";

export type AuthToken = {
  accessToken: string,
  refreshToken: string;
  code: string;
  expires: number // minutes
};

export abstract class AuthorizeApiClient extends ApiClient {
  
  protected accessToken: string | null = null;
  protected token: AuthToken | null = null;
  
  protected async getAccessTokenAsync() {
    
    if (this.accessToken == null) {
      this.accessToken = localStorage.getItem('accessToken');
    }
    if (this.accessToken == null && this.token?.accessToken != null) {
      this.accessToken = this.token.accessToken;
    }    
    
    return this.accessToken;
  }

  protected async getTokenAsync() {
    let res = await this.get("/identity/token", {
      refreshToken: false
    });
    if (res.success) {
      let token: AuthToken = res.value;
      return token;
    } else {
      return null;
    }
  }  

  private async refreshTokenAsync() {
    
    localStorage.removeItem('accessToken');

    let res = await this.get('/identity/token', {
      refreshToken: false
    });
    if (res.success) {
      this.token = res.value;
      this.accessToken = this.token?.accessToken ?? null;
      return this.accessToken != null;
    } 
    
    if (this.token && this.token.refreshToken && this.token.code) {
      let res = await this.post('/identity/refresh-token', {
        // deviceId: getDeviceId(),
        token: this.token.refreshToken,
        code: this.token.code
      }, {
        refreshToken: false
      });
      if (res.success) {
        this.token = res.value;
        this.accessToken = this.token?.accessToken ?? null;
        return this.accessToken != null;
      }
    }
    
    let url = '/accounts/login?returnUrl=' + encodeURIComponent(location.pathname + location.search);
    location.href = url;
    
    return false;
  }  
  
  protected override async buildHeadersAsync(defaults?: any) {
    let headers = await super.buildHeadersAsync(defaults);

    let accessToken = await this.getAccessTokenAsync();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return headers;    
  }
  
  protected async getIdentityAsync() {
    let res = await this.get("/identity", {
      refreshToken: false
    });
    if (res.success) {
      let identity = res.value;
      return identity;
    } else {
      return null;
    }
  }

  retry(options: { refreshToken: boolean, retry?: number | undefined; }) {
    if (options.refreshToken) {
      if (options.retry == null) {
        options.retry = 1;
      }
      options.retry -= 1;
      return options.retry >= 0;
    } else {
      return false;
    }
  }
  
  protected override async get(address: string, options: { refreshToken: boolean, retry?: number } = { refreshToken: true, retry: 1 }): Promise<IStandardResponse> {
    let res = await super.get(address);
    if (res.status == 401 && this.retry(options)) { // Unauthorized
      let success = await this.refreshTokenAsync();
      if (success) {
        return this.get(address, options);
      } else {
        return res;
      }
    } else {
      return res;
    }      
  }
  
  protected override async post(
    address: string, 
    data?: any, 
    options: { 
      refreshToken: boolean, 
      retry?: number 
      headers?: {[key: string]: string; }
    } = { refreshToken: true, retry: 1 }): Promise<IStandardResponse> {

    let res = await super.post(address, data, options);
    if (res.status == 401 && this.retry(options)) { // Unauthorized
      let success = await this.refreshTokenAsync();
      if (success) {
        return this.post(address, data, options);
      } else {
        return res;
      }
    } else {
      return res;
    }    
  }

  protected override async delete(address: string, options: { refreshToken: boolean, retry?: number } = { refreshToken: true, retry: 1 }): Promise<IStandardResponse> {
    let res = await super.delete(address);
    if (res.status == 401 && this.retry(options)) { // Unauthorized
      let success = await this.refreshTokenAsync();
      if (success) {
        return this.delete(address, options);
      } else {
        return res;
      }
    } else {
      return res;
    }      
  }
}
