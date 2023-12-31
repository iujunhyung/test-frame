import { makeAutoObservable } from "mobx";

export interface IMenuItem {
  key: string;
  display: string;
  iconData?: string;
  iconSize?: number;
  path?: string;
  children?: IMenuItem[];  
}

// abstract class MenuItem implements IMenuItem {
//   key: string = "menu";
//   display: string = "menu";
//   iconData?: string = "M2.594,18.914l9,4H11.6a.974.974,0,0,0,.8,0h.008l9-4A1,1,0,0,0,22,18V6a1.04,1.04,0,0,0-.594-.914l-9-4a1,1,0,0,0-.812,0l-9,4A1.041,1.041,0,0,0,2,6V18A1,1,0,0,0,2.594,18.914ZM4,7.539l7,3.111v9.811L4,17.35ZM20,17.35l-7,3.111V10.65l7-3.111ZM12,3.094,18.538,6,12,8.906,5.462,6Z";
//   iconSize?: number = 24;
//   path: string = "/";
//   children?: IMenuItem[];
// }

export class MenuStore {
  
  mainMenuItems: IMenuItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setMainMenuItems(items: IMenuItem[]) {
    this.mainMenuItems = items;
  }
}
