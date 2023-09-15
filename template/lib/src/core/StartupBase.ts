import { DI } from './DI';
import {
  AppInfoStore,
  MenuStore,
  LocatorStore,
  IMenuItem,
  RouteExt
} from '@iyu-web/stores';

export abstract class StartupBase {
  abstract title?: string;
  abstract logo?: string;
  abstract basePath?: string;

  abstract initMainMenuItems(): IMenuItem[];
  abstract initRoutes(): RouteExt[];

  init() {
    console.log("StartupBase.init()");
    const appInfo = DI.register<AppInfoStore>(AppInfoStore)[1];
    const menu = DI.register(MenuStore)[1];
    const locator = DI.register(LocatorStore)[1];

    // app-info
    appInfo.title = this.title ?? appInfo.title;
    appInfo.logo = this.logo ?? appInfo.logo;

    // menu
    menu.setMainMenuItems(this.initMainMenuItems());
    
    // locator
    const base = this.basePath ?? "/";
    locator.initRouter(base, this.initRoutes());
  }
}