
type Constructor<T> = new (...args: any[]) => T;

class DIContainer {

  private static instance: DIContainer;
  private services: Map<symbol,any> = new Map<symbol,any>();

  static getOrCreate() {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }
  
  // args : 생성자 인자 목록 튜플타입으로 전달해야하는 사항이 있음
  // ConstructorParameters로 전달불가
  register<T>( 
    type: Constructor<T>, 
    options?: { args?: ConstructorParameters<Constructor<T>>, multiton?: boolean }
  ) : [symbol, T] {

    const instance = new type(...(options?.args ?? []));
    const key = Symbol(type.name);
    
    if (options?.multiton) {
      this.services.set(key, instance);
    } else {
      if(this.services.size === 0){
        this.services.set(key, instance);
      } else {
        this.services.forEach((v) => {
          if (!(v instanceof type)){
            console.log(`${type.name} is registered`);
            this.services.set(key, instance);
          } else {
            console.warn(`${type.name} is already registered`);
          }
        });
      }
    }

    return [key, instance];
  }

  get<T>( 
    type: Constructor<T>, 
    key?: symbol
  ) : T {

    if (key) {
      const service = this.services.get(key);
      if (service) {
        return service;
      } else {
        throw new Error(`${type.name} not found`);
      }
    } else {
      for (const v of this.services.values()) {
        if (v instanceof type) {
          console.log(`${type.name} is found`);
          return v;
        }
      }
    }

    throw new Error(`${type.name} not found`);
  }
}

// 서비스 등록객체
export const DI = DIContainer.getOrCreate();

// 서비스 주입하는 데코레이터
export function inject<T>( type: Constructor<T> ) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: () => DI.get<T>(type)
    });
  }
}