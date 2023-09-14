import {
  appInfoStore,
  menuStore,
  locator,
} from '@iyu-web/stores';

export abstract class StartupBase {
  abstract title?: string;
  abstract logo?: string;
  abstract basePath?: string;

  init() {
    // app-info
    appInfoStore.title = this.title ?? appInfoStore.title;
    appInfoStore.logo = this.logo ?? appInfoStore.logo;

    // menu
    menuStore.setMainMenuItems(this.initMainMenuItems());
    
    // locator
    locator.basePath = this.basePath;
    locator.setRoutes(this.initRoutes());
  }

  abstract initMainMenuItems(): any[];
  abstract initRoutes(): any[];
}