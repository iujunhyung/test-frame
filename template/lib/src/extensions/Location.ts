
Location.prototype.getQueryParameter = (key: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

export {}