import { makeAutoObservable, observable } from "mobx";

export interface RouteExt{
  display?: string;
}

export interface IMenuItem {
  iconData: string | undefined;
  iconSize: number | undefined;
  name: string;
  display: string | undefined;
  href: string | undefined;
  children: Array<IMenuItem> | undefined;
  action: Function | undefined;
}

abstract class MenuItemBase implements IMenuItem {
  iconData: string | undefined;
  iconSize: number | undefined;
  name: string;
  display: string | undefined;
  href: string | undefined;
  children: IMenuItem[] | undefined;
  action: Function | undefined;

  constructor(name: string) {
    this.name = name;
  }
}

export class Separator extends MenuItemBase {

  constructor() {
    super("-");
  }
}

export class MenuItem extends MenuItemBase {
  
  constructor(name: string, init?: Partial<IMenuItem>) {
    super(name);

    Object.assign(this, init);
  }

  getIconData() {
    return this.iconData ?? "M2.594,18.914l9,4H11.6a.974.974,0,0,0,.8,0h.008l9-4A1,1,0,0,0,22,18V6a1.04,1.04,0,0,0-.594-.914l-9-4a1,1,0,0,0-.812,0l-9,4A1.041,1.041,0,0,0,2,6V18A1,1,0,0,0,2.594,18.914ZM4,7.539l7,3.111v9.811L4,17.35ZM20,17.35l-7,3.111V10.65l7-3.111ZM12,3.094,18.538,6,12,8.906,5.462,6Z";
  }

  getIconSize() {
    return this.iconSize ?? ((this.iconData == null) ? '24' : undefined);
  }  

  getDisplay() {
    return this.display ?? this.name;
  }

  getKey() {
    return this.name.toLowerCase().replace('#','').replace(' ', '-');
  }

  getHref() {
    return this.href ?? this.getKey();
  }
}

export class MenuStore {
  
  basePath: string = "/";

  @observable public mainMenuItems = observable.array<IMenuItem>();
  render: any;

  constructor() {
    makeAutoObservable(this);
  }

  setMainMenuItems(menuItems: Array<IMenuItem>) {
    this.mainMenuItems.replace(menuItems);
  }

  resolveURL(p: MenuItem, parent?: MenuItem) {
  
    if (p.action) return "javascript:void(0);";
    
    const url = p.getHref();
    if (url.includes("//")) {
      return url;

    } else {
      let middle = parent?.getKey();
      
      let base = this.basePath;
      if (base.endsWith("/")) {
        base = base.left("/", true);
      }

      return middle
        ? `${base}/${middle}/${url}`.replace("//", "/")
        : `${base}/${url}`.replace("//", "/");
    }
  }

  resolveRoutes() {

    let routes = this.mainMenuItems.filter(x => x instanceof MenuItem).map(x => ({
      name: x.name,
      path: `/${(<MenuItem>x).getKey()}`,
      render: this.render
    }));
    
    return routes;
  }  
}

export const menuStore = new MenuStore();
