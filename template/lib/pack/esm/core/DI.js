class Service {
    constructor() {
        this.key = Symbol();
    }
}
class DIContainer {
    constructor() {
        this.services = [];
    }
    static getOrCreate() {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer();
        }
        return DIContainer.instance;
    }
    get(key) {
        let service = this.services.find(n => n.key == key);
        if (service) {
            // console.debug(`get: ${service.key.toString()}`);
            return service.instance;
        }
        else {
            // console.debug(`get: ${key} not found`);
            return null;
        }
    }
    createInterface() {
        let service = new Service();
        this.services.push(service);
        // console.debug(`createInterface: ${service.key.toString()}`);
        return service.key;
    }
    register(key, instance) {
        let service = this.services.find(n => n.key == key);
        if (service) {
            service.instance = instance;
            // console.debug(`register: ${service.key.toString()}`);
        }
    }
}
const DI = DIContainer.getOrCreate();
function inject(key) {
    return function (target, propertyKey) {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return DI.get(key);
            }
        });
    };
}

export { DI, inject };
