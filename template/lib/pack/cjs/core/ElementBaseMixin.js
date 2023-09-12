'use strict';

var _tslib = require('../_virtual/_tslib.js');
var litMobx = require('@adobe/lit-mobx');
var LitElement = require('../extensions/LitElement.js');

const ElementMixin = (superClass) => {
    var _a;
    class ElementClass extends superClass {
        updated(changedProperties) {
            const _super = Object.create(null, {
                updated: { get: () => super.updated }
            });
            return _tslib.__awaiter(this, void 0, void 0, function* () {
                _super.updated.call(this, changedProperties);
                yield this.updateComplete;
                if (this.isConnected != true)
                    return;
                for (let [propertyName] of changedProperties) {
                    const pName = `${propertyName.charAt(0).toUpperCase()}${propertyName.slice(1)}`;
                    const methodName = `onChanged${pName}`;
                    const method = Reflect.get(this, methodName);
                    if (typeof method === 'function') {
                        // @ts-ignore
                        method.call(this, this[propertyName]);
                    }
                }
            });
        }
        findContext(propertyName) {
            return LitElement.LitHelper.findContext(propertyName, this);
        }
    }
    ElementClass.styles = [
        // unsafeCSS(baseStyle),
        (_a = superClass.styles) !== null && _a !== void 0 ? _a : [],
    ];
    return ElementClass;
};
class ElementBaseMixin extends ElementMixin(litMobx.MobxLitElement) {
}
ElementBaseMixin.styles = [
    ElementMixin(litMobx.MobxLitElement).styles,
];

exports.ElementBaseMixin = ElementBaseMixin;
exports.ElementMixin = ElementMixin;
