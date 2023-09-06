function getQueryParameter(key: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

Location.prototype.getQueryParameter = getQueryParameter;

export {}