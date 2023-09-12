import { makeAutoObservable, observable } from "mobx";

export class AppInfoStore {

  @observable public logo: any;
  @observable public title: any;
  
  constructor() {
    makeAutoObservable(this);

    this.title = "iyulab";
  }
}

export const appInfoStore = new AppInfoStore();