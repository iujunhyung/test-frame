
URLSearchParams.prototype.getCaseIgnore = function(key: string): string | null {    
  const params = new URLSearchParams(window.location.search);
  for (const [name, value] of params) {
    if (name.toLowerCase() == key.toLowerCase()) {
      return value;
    }
  }
  return null;
}

export {}