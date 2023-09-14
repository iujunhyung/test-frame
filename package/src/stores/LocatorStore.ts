import { makeAutoObservable, observable } from "mobx";
import { RouteExt } from "./MenuStore";

interface ILocation {
  path: string;
  display: string;
}

export class LocatorStore {
  /*
    window.addEventListener(LocatorStore.LOCATION_CHANGED_NAME, _ => {
      this.requestUpdate();
    });  
  */
  public static readonly LOCATION_CHANGED_NAME = "location-changed";  
  
  private static _instance: LocatorStore;

  public static get Instance()
  {
      return this._instance || (this._instance = new this());
  }

  basePath: string | undefined;
  routes?: {
    display?: string;
    path: string;
    name: string;
    children?: {
        path: string;
        name: string;
    }[];
  }[];
  
  @observable public router?: any;
  @observable public locations = observable.array<ILocation>();
  
  constructor() {
    makeAutoObservable(this);

    window.addEventListener('vaadin-router-location-changed', (ev) => this.onLocationChanged(ev));
  }

  onLocationChanged(_ev: Event): void {
    
    this.updateLocation();
    window.dispatchEvent(new CustomEvent(LocatorStore.LOCATION_CHANGED_NAME, {detail: locator.router?.location}));
  }

  updateLocation() {
    
    if (this.router == null || this.routes == null) return;

    let basePath = this.basePath ?? "/";
    let routes = this.routes;
    let router = this.router;
    let pathname = router.location.pathname;
    let pathLine = basePath.length > 1 ? pathname.right(basePath) : pathname;
    let paths = basePath.length > 1 ? pathLine.split('/') : pathLine.right("/", false).split('/');
    let path = basePath ?? '';
    let lastRoute: {
        path: string;
    };
    
    let locations = paths.map(( s:string ) => {
      
      let route = routes.find(x => x.name == s || x.path.right("/", false) == s)
      
      if (route == null && lastRoute != null) {
        route = routes.find(x => x.path.startsWith(`${lastRoute!.path}/${s}`));
        if (route == null) {
          route = routes.find(x => x.path.startsWith(`${lastRoute!.path}/:`));
        }
      }
      
      if (route == null) {
        return s;
      }
      
      if (route.children) {
        routes = route.children;
      }
      lastRoute = route;
      
      path += path.endsWith("/") ? s : `/${s}`;
      let display = route.display ?? route.name ?? s;
      return { path: path, display: display}  
    }).filter(x => x != null) as ILocation[];
    
    this.locations.replace(locations);
  }

  getLink(pathname: string): string | undefined {
  
    let path = pathname;
    if (this.basePath != null && this.basePath != "/" && path.startsWith(this.basePath)) {
      path = path.right(this.basePath);
    }
    
    return this.router?.urlForPath(path) 
      ?? (this.basePath ? `${this.basePath}${path}`: path);
  }

  initRouter(outlet: HTMLDivElement | undefined, basePath: string | undefined, routes: Array<RouteExt>, skipRender?: boolean|null) {
    
    if (basePath && basePath.endsWith("/") != true) {
      basePath += "/";
    }
    this.basePath = basePath;
    
    // @ts-ignore
    const router = new Router(outlet, {
      baseUrl: basePath,
    });
    this.router = router;
    
    this.setRoutes(routes, skipRender);
  }

  // @ts-ignore
  getUrl(params?: any) {
    return this.router?.location.getUrl(params);
  }

  getParams(name: string) {
    
    return this.router?.location.params[name];
  }

  setRoutes(routes: RouteExt[], skipRender?: boolean|null) {
    // @ts-ignore
    this.routes = routes;
    
    // @ts-ignore
    this.router?.setRoutes(routes as Route[], skipRender);    
  }

  getRoutes(): RouteExt[] {
    return this.routes ?? [];
  }

  go(path: string) {
    let rPath = this.basePath?.endsWith("/") && path.startsWith("/")
      ? this.basePath.slice(0, -1) + path
      : this.basePath + path;

    // @ts-ignore
    Router.go(rPath);
  }
}

export const locator = LocatorStore.Instance;
