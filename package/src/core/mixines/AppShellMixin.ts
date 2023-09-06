import { LitElement } from 'lit';

import { uiStore } from '@src/stores/UiStore';
import { userStore } from '@src/stores/UserStore';
import { uiManager } from '@src/core/UIManager';

import { ElementMixin } from './ElementBaseMixin';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare interface IAppShell {
  toggleTheme(): void;
  busy(): void;
  unbusy(): void;
  invokeInBusy<T>(action: () => Promise<T>): Promise<T>;
}

document.__Debug__ = import.meta.env.MODE === 'development';
if (document.__Debug__) {
  console.debug('Debug mode enabled.');
}

export const AppShellMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class AppShellClass extends ElementMixin(superClass) {
    
    constructor(...args: any[]) {
      super(...args);

      // busy 호출
      this.busy();
    }

    override async connectedCallback() {
      super.connectedCallback();

      uiStore.init();
      userStore.init();

      await this.updateComplete;

      // 낮은 우선순위로 unbusy 호출
      requestIdleCallback(() => {
        this.unbusy();
      });
    }
    
    toggleTheme() {
      uiStore.toggleTheme();
    }
    
    busy() {
      uiManager.busy();
    }

    unbusy() {
      uiManager.unbusy();
    }
    
    invokeInBusy<T>(action: () => Promise<T>) {
      return uiManager.invokeInBusy(action);
    }
  };
  
  return AppShellClass as Constructor<IAppShell> & T;
}