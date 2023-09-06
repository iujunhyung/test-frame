export namespace UrlHelpers {
  export function getUrlParams(url?: string): { [key: string]: string } {
    if (url == null) {
      url = document.location.href;
    }
    const searchParams = new URLSearchParams(url.split('?')[1]);
    const params: { [key: string]: string } = {};
  
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
  
    return params;
  }
}