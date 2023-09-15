import { makeAutoObservable } from "mobx";
import type { Router } from "@remix-run/router";
import { createBrowserRouter } from "react-router-dom";
import { RouteObject } from "react-router-dom";
import "@iyu-web/extensions/String";

export type RouteExt = RouteObject & {
  key: string;
  // display?: string;
}

export class LocatorStore {

  static readonly LOCATION_CHANGED_NAME = "location-changed";  
  
  basePath?: string;
  routes?: RouteExt[];
  router?: Router;
  
  constructor() {
    makeAutoObservable(this);
    window.addEventListener('route-changed', () => this.onLocationChanged());
  }

  onLocationChanged(): void {
    window.dispatchEvent(new CustomEvent(LocatorStore.LOCATION_CHANGED_NAME, {
      detail: this.router
    }));
  }

  initRouter(basePath: string, routes: Array<RouteExt>) {
    this.basePath = basePath;

    this.routes = routes.map((x:RouteExt) => {
      if(!x.path) throw new Error("path is required");

      if (x.path.startsWith("/")) {
        x.path = x.path.right("/", true);
      }

      if (x.path.endsWith("/")) {
        x.path = x.path.left("/", true);
      }

      return x;
    });

    this.router = createBrowserRouter([
      ...this.routes
    ], {
      basename: this.basePath,
    });
  }

  getRoutes(): RouteExt[] {
    return this.routes ?? [];
  }

  go(path: string) {
    this.router?.navigate(path);
  }
}
