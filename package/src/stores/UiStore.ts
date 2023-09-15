import { makeAutoObservable } from "mobx";

import { DOM } from "@microsoft/fast-element";
import { baseLayerLuminance, StandardLuminance } from "@microsoft/fast-components";

export enum Themes {
  dark,
  light
}

export class UiStore {

  public theme: Themes
  
  constructor() {
    makeAutoObservable(this);
  
    this.theme = localStorage.theme == 'dark' ? Themes.dark : Themes.light;
  }
  
  init() {
    this.theme = localStorage.theme == 'dark' ? Themes.dark : Themes.light;
    this.updateTheme(this.theme == Themes.dark ? 'dark' : 'light');
  }

  toggleTheme(targetElement?: any) {
    const theme: 'dark' | 'light' = this.theme == Themes.dark ? 'light' : 'dark';
    this.updateTheme(theme, targetElement);
  }
  
  updateTheme(theme: 'dark' | 'light', targetElement?: any) {
    if (typeof theme == 'number') {
      this.theme = Themes.dark == theme ? Themes.dark : Themes.light;
    } else {
      this.theme = theme == 'dark' ? Themes.dark : Themes.light;
    }
    
    localStorage.theme = theme;
    
    if (theme == 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-dark-theme', "true");
      document.documentElement.setAttribute('data-prefers-color-scheme', "dark");
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.removeAttribute('data-dark-theme');
      document.documentElement.setAttribute('data-prefers-color-scheme', "light");
    }
    
    if (targetElement == null) {
      targetElement = window.document.body;
    }
    
    if (targetElement) {
      DOM.queueUpdate(() => {
        baseLayerLuminance.setValueFor(targetElement, theme == 'dark' ? StandardLuminance.DarkMode : StandardLuminance.LightMode);
      });
    }

    const appShell = document.querySelector("app-shell");
    if (appShell) {
      if (theme == 'dark') {
        appShell.classList.add('dark')
      } else {
        appShell.classList.remove('dark')
      }
    }
  }
}