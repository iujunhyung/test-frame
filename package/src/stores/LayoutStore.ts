import { action, makeAutoObservable, observable } from "mobx";
import variables from '@css/variables.scss';

const tabletScreen = parseInt(/tabletScreen:\s*(.*);/.exec(variables)![1]!, 10);
const smallScreen = parseInt(/smallScreen:\s*(.*);/.exec(variables)![1]!, 10);
const mediumScreen = parseInt(/mediumScreen:\s*(.*);/.exec(variables)![1]!, 10);
const largeScreen = parseInt(/largeScreen:\s*(.*);/.exec(variables)![1]!, 10);

export enum Breakpoint {
  Tablet = tabletScreen,
  Small = smallScreen,
  Medium = mediumScreen,
  Large = largeScreen,
}

export class LayoutStore {

  @observable public documentWidth = document.documentElement.scrollWidth;
  @observable public leftNavExpanded = window.innerWidth >= Breakpoint.Medium;

  constructor() {
    makeAutoObservable(this);
    window.addEventListener("resize", (ev) => this.onWindowResized(ev));
  }

  onWindowResized(ev: UIEvent) {
    if (ev.currentTarget) {
      const windowTarget = ev.currentTarget as Window;
      this.documentWidth = document.documentElement.scrollWidth;
      if (this.leftNavExpanded && windowTarget.innerWidth < Breakpoint.Medium) {
        this.toggleNavSize();
      } else if (!this.leftNavExpanded && windowTarget.innerWidth >= Breakpoint.Medium) {
        this.toggleNavSize();
      }
    }
  }

  @action
  public toggleNavSize = () => {
    this.leftNavExpanded = !this.leftNavExpanded;
    // globalUIStore.setIsNavBarOpen(this.leftNavExpanded);
    // console.debug(`leftNavExpanded - ${this.leftNavExpanded}`);
  };

  public isLeftNavCollapsed() {
    return window.innerWidth < Breakpoint.Medium;
  }
}

export const layoutStore = new LayoutStore();
