
String.prototype.left = function(search: string, last: boolean = false): string {  
  const s = String(this).toString();
  
  return last
    ? s.substring(0, s.lastIndexOf(search))
    : s.substring(0, s.indexOf(search));
}

String.prototype.right = function(search: string, last: boolean = true): string {  
  const s = String(this).toString();
  return last
    ? s.substring(s.lastIndexOf(search) + search.length)
    : s.substring(s.indexOf(search) + search.length);
}

export {}