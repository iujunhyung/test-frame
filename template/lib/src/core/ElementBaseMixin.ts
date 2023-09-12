import { LitElement } from "lit";
import { MobxLitElement } from '@adobe/lit-mobx';
import { CSSResultGroup } from 'lit';
import { LitHelper } from '@iyu-web/extensions/LitElement';

// import baseStyle from '@iyu-web/styles/tailwind.scss';

type Constructor<T> = new (...args: any[]) => T;

export declare interface IElement {
  findContext(propertyName: string): void;
}

export const ElementMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  
  class ElementClass extends superClass implements IElement {

    static styles = [
      // unsafeCSS(baseStyle),
      (superClass as unknown as typeof LitElement).styles ?? [],
    ];

    async updated(changedProperties: Map<string, any>) {
      super.updated(changedProperties);
      await this.updateComplete;
      
      if (this.isConnected != true) return;
      
      for (let [propertyName] of changedProperties) {
        const pName = `${propertyName.charAt(0).toUpperCase()}${propertyName.slice(1)}`;
        const methodName = `onChanged${pName}`;
        const method = Reflect.get(this, methodName);
        if (typeof method === 'function') {
          // @ts-ignore
          method.call(this, this[propertyName]);
        }
      }
    }
    
    findContext(propertyName: string) {
      return LitHelper.findContext(propertyName, this);
    }
  }
  
  return ElementClass as Constructor<IElement> & T;
}

export abstract class ElementBaseMixin extends ElementMixin(MobxLitElement) {
  static styles: CSSResultGroup = [
    ElementMixin(MobxLitElement).styles as CSSResultGroup,
  ];
}