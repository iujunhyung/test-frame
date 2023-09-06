export interface IStandardResponse {
  success: boolean,
  status: number,
  value?: any
}

export abstract class ApiClient {
  
  protected abstract host: string;
  
  private success(status : number) {
    return status >= 200 && status < 300;
  }

  // private isRedirect(status: number) {
  //   return status >= 300 && status < 400;
  // }

  private isClientError(status: number) {
    return status >= 400 && status < 500;
  }

  // private isServerError(status: number) {
  //   return status >= 500;
  // }

  
  private asText(v: any) {
    if (typeof v == 'object') {
      return JSON.stringify(v);
    } else {
      return `${v}`;
    }
  }
  
  private async onResponseAsync(res: Response) {
    let contentType = res.headers.get('content-type');
    if (contentType == "text/html") {
      // 리다이렉트 되었음
      document.location.href = res.url;
      return { success: true, status: res.status, value: null };
    } else if (this.success(res.status)) {
      if (contentType == null || contentType.indexOf('json') > 0) {
        let resJson = await res.json();
        if (resJson.key == "Redirect") {
          document.location.href = resJson.value;
          return { success: true, status: res.status, value: null };
        } else {
          return { success: true, status: res.status, value: resJson };
        }
      } else if (contentType.startsWith("text/plain")) {
        let text = await res.text();
        return { success: true, status: res.status, value: text };
      } else {
        return { success: false, status: res.status };
      }
    } else if (this.isClientError(res.status)) {
      if (contentType?.indexOf('json')) {
        return { success: false, status: res.status, value: await res.json() };
      } else {
        return { success: false, status: res.status };
      }
    } else //if (this.isServerError(res.status)) {
      if (contentType?.indexOf('json')) {
        return { success: false, status: res.status, value: await res.json() };
      } else {
        return { success: false, status: res.status };
      }
  }
  
  protected buildUrl(url : string): string {

    if (url.startsWith("http")) {
      return url;
    } else {
      let host = this.host;
      if (host.length < 1 || host == "/") {
        return new URL(url, document.location.origin).href;
      } else {
        
        let address: string;
        if (host.endsWith("/") || url.startsWith("/")) {
          address = host + url;
        } else {
          address = `${host}/${url}`;
        }
        
        if (window.location.search && address.includes('?') != true) {
          address += window.location.search;
        }
        return address;
      }
    }
  }
  
  protected async buildHeadersAsync(defaults?: any) {
    let headers: any = defaults ?? {};
    return headers;
  }
  
  protected async get(address : string) : Promise<IStandardResponse> {
    
    let url = this.buildUrl(address);
    let headers = await this.buildHeadersAsync();
    let r: IStandardResponse = await fetch(url, {
      method: 'GET',
      headers: headers,
      redirect: 'follow' // Redirect 를 허용
    })
    .then(async res => {
      return await this.onResponseAsync(res);
    })
    .catch(reason => {
      throw reason;
    });
    
    return r;
  }

  protected async post(address: string, data?: any, options?: { 
    headers?: {[key: string]: string; }
  }): Promise<IStandardResponse> {

    let url = this.buildUrl(address);
    let headers = await this.buildHeadersAsync({
      'Content-Type': 'application/json'
    });

    if (options && options.headers) {
      for (let key in options.headers) {
        let header = options.headers[key];
        if (typeof header === 'function') continue;
        headers[key] = header;
      }
    }

    let jsonBody = JSON.stringify(data);
    console.debug(`Req|POST ${address} ${jsonBody}`);
    
    let r: IStandardResponse = await fetch(url, {
      method: 'POST',
      headers: headers,
      body:  jsonBody,
      redirect: 'follow' // Redirect 를 허용
    })
    .then(async res => {
      let r = await this.onResponseAsync(res);
      console.debug(`Res|POST ${address} ${this.asText(r.value)}`);
      return r;
    })
    .catch(reason => {
      throw reason;
    });
    
    return r;
  }
  
  protected async delete(address : string) : Promise<IStandardResponse> {
    let url = this.buildUrl(address);
    
    let headers = await this.buildHeadersAsync();
    let r: IStandardResponse = await fetch(url, {
      method: 'DELETE',
      headers: headers
    })
    .then(async res => {
      return await this.onResponseAsync(res);
    })
    .catch(reason => {
      throw reason;
    });
    
    return r;
  }

}