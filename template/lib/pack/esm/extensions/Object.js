// object 는 다른 라이브러리(monaco editor 등)에서 충돌 문제가 있어서
// prototype을 사용하지 않습니다.
var ObjectHelper;
(function (ObjectHelper) {
    function cloneFrom(from, to) {
        if (from) {
            const propertyNames = Object.getOwnPropertyNames(from);
            for (const propertyName of propertyNames) {
                if (propertyName !== 'constructor') {
                    to[propertyName] = from[propertyName];
                }
            }
        }
    }
    ObjectHelper.cloneFrom = cloneFrom;
})(ObjectHelper || (ObjectHelper = {}));

export { ObjectHelper };
