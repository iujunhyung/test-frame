import { LitElement } from 'lit';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare interface IObservable {
}

export const ObservableMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  
  class ObservableClass extends superClass {

    async updated(changedProperties: Map<string, any>) {
      super.updated(changedProperties);
      
      await this.updateComplete;
      
      if (this.isConnected != true) return;
      
      for (let [propertyName] of changedProperties) {
        const pName = `${propertyName.charAt(0).toUpperCase()}${propertyName.slice(1)}`;
        const methodName = `onChanged${pName}`;
        const method = Reflect.get(this, methodName);
        if (typeof method === 'function') {
          let oldValue = changedProperties.get(propertyName);
          let newValue = (<any>this)[propertyName];
          method.call(this, newValue, oldValue);
        }
      }
    }
  }
  
  return ObservableClass as Constructor<IObservable> & T;
}