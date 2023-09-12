// object 는 다른 라이브러리(monaco editor 등)에서 충돌 문제가 있어서
// prototype을 사용하지 않습니다.

export namespace ObjectHelper {
  export function cloneFrom(from: Object, to: Object) {
    if (from) {
      const propertyNames = Object.getOwnPropertyNames(from);
  
      for (const propertyName of propertyNames) {
        if (propertyName !== 'constructor') {
          to[propertyName] = from[propertyName];
        }
      }
    } else {
      // throw new Error('from is null or undefined');
    }
  };
}