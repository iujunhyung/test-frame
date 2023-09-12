import { __awaiter } from '../_virtual/_tslib.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { LitHelper } from '../extensions/LitElement.js';

const ElementMixin = (superClass) => {
    var _a;
    class ElementClass extends superClass {
        updated(changedProperties) {
            const _super = Object.create(null, {
                updated: { get: () => super.updated }
            });
            return __awaiter(this, void 0, void 0, function* () {
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
            return LitHelper.findContext(propertyName, this);
        }
    }
    ElementClass.styles = [
        // unsafeCSS(baseStyle),
        (_a = superClass.styles) !== null && _a !== void 0 ? _a : [],
    ];
    return ElementClass;
};
class ElementBaseMixin extends ElementMixin(MobxLitElement) {
}
ElementBaseMixin.styles = [
    ElementMixin(MobxLitElement).styles,
];

export { ElementBaseMixin, ElementMixin };
