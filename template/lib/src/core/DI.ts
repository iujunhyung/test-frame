class Service<T> {
  key: Symbol;
  instance?: T;

  constructor() {
    this.key = Symbol();
  }
}

class DIContainer {
  private static instance: DIContainer;
  
  static getOrCreate() {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }

    return DIContainer.instance;
  }

  private services: Service<any>[] = [];

  get<T>(key: Symbol): T | null {
    let service = this.services.find(n => n.key == key);
    if (service) {
      // console.debug(`get: ${service.key.toString()}`);
      return service.instance;
    } else {
      // console.debug(`get: ${key} not found`);
      return null;
    }
  }
  
  createInterface<T>() {
    let service = new Service<T>();
    this.services.push(service);
    
    // console.debug(`createInterface: ${service.key.toString()}`);
    return service.key;
  }

  register(key: Symbol, instance: any) {
    let service = this.services.find(n => n.key == key);
    if (service) {
      service.instance = instance;
      // console.debug(`register: ${service.key.toString()}`);
    } else {
      // console.debug(`register: ${key} not found`);
    }
  }
}

export const DI = DIContainer.getOrCreate();

export function inject<T>(key: Symbol) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return DI.get<T>(key);
      }
    });
  }
}
