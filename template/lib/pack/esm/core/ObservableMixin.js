import { __awaiter } from '../_virtual/_tslib.js';

const ObservableMixin = (superClass) => {
    class ObservableClass extends superClass {
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
                        let oldValue = changedProperties.get(propertyName);
                        let newValue = this[propertyName];
                        method.call(this, newValue, oldValue);
                    }
                }
            });
        }
    }
    return ObservableClass;
};

export { ObservableMixin };
