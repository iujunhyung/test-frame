Array.prototype.last = function() {
  if (this.length === 0) {
    return undefined;
  }
  return this[this.length - 1];
};

Array.prototype.replaceBy = function(keySelector, newItem) {
  const itemIndex = this.findIndex(item => keySelector(item));
  if (itemIndex !== -1) {
      this.splice(itemIndex, 1, newItem);
      return true;
  } else {
    return false;
  }
};

Array.prototype.upsert = function(keySelector, item) {
  const itemIndex = this.findIndex(item => keySelector(item));
  if (itemIndex !== -1) {
    this.splice(itemIndex, 1, item);
  } else {
    this.push(item);
  }
};

Array.prototype.removeBy = function(keySelector) {
  const itemIndex = this.findIndex(item => keySelector(item));
  if (itemIndex !== -1) {
    this.splice(itemIndex, 1);
    return true;
  } else {
    return false;
  }
};

Array.prototype.remove = function(item) {
  const itemIndex = this.indexOf(item);
  if (itemIndex !== -1) {
    this.splice(itemIndex, 1);
    return true;
  } else {
    return false;
  }
};

Array.prototype.contains = function(item) {
  const itemIndex = this.indexOf(item);
  return itemIndex !== -1;
};

Array.prototype.sortBy = function (keyFn) {
  return this.slice().sort((a, b) => {
    const valueA = keyFn(a);
    const valueB = keyFn(b);
    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  });
};

Array.prototype.except = function (excepts: any[]) {
  if (excepts == null) return this;
  return this.filter(item => !excepts.includes(item));
}

Array.prototype.groupBy = function<T, TKey>(keySelector: (item: T) => TKey): Array<{ key: TKey, value: T[] }> {
  return this.reduce((acc: { key: TKey, value: T[] }[], item: T) => {
    const key = keySelector(item);
    const found = acc.find(group => group.key === key);
    if (found) {
      found.value.push(item);
    } else {
      acc.push({ key, value: [item] });
    }
    return acc;
  }, []);
}

export {}