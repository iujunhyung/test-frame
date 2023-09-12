'use strict';

var lit = require('lit');

exports.LitHelper = void 0;
(function (LitHelper) {
    /// 상위노드를 검색하면서 해당속성명을 찾아서 가져옵니다.
    function findContext(propertyName, element) {
        // @ts-ignore
        let node = element !== null && element !== void 0 ? element : this;
        while (node) {
            if (node[propertyName]) {
                return node[propertyName];
            }
            let shadowNode = node;
            while (shadowNode && shadowNode.shadowRoot) {
                shadowNode = shadowNode.shadowRoot;
                if (shadowNode[propertyName]) {
                    return shadowNode[propertyName];
                }
            }
            node = node.parentNode || node.host;
        }
    }
    LitHelper.findContext = findContext;
    function aware(element) {
        // element 에 findContext 함수를 추가
        let el = element;
        if (el.__proto__.findContext != true) {
            el.__proto__.findContext = findContext;
        }
    }
    LitHelper.aware = aware;
})(exports.LitHelper || (exports.LitHelper = {}));
lit.LitElement.prototype.findContext = exports.LitHelper.findContext;
