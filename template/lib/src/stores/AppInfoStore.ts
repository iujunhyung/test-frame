import { makeAutoObservable } from "mobx";

class AppInfoStore {
  static instance: AppInfoStore;

  logo: string = "iyulab";;
  title: string = "/logo.png";
  
  static getInstance() {
    if (!AppInfoStore.instance) {
      AppInfoStore.instance = new AppInfoStore();
    }
    return AppInfoStore.instance;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const appInfoStore =  AppInfoStore.getInstance();