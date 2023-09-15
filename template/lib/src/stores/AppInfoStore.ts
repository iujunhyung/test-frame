import { makeAutoObservable } from "mobx";

export class AppInfoStore {

  logo: string = "iyulab";
  title: string = "/logo.png";

  constructor(logo?: string, title?: string) {
    makeAutoObservable(this);
    this.logo = logo ?? this.logo;
    this.title = title ?? this.title;
  }
}