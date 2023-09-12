import { __decorate, __metadata } from '../_virtual/_tslib.js';
import { observable, makeAutoObservable } from 'mobx';
import { DOM } from '@microsoft/fast-element';
import { baseLayerLuminance, StandardLuminance } from '@microsoft/fast-components';

var Themes;
(function (Themes) {
    Themes[Themes["dark"] = 0] = "dark";
    Themes[Themes["light"] = 1] = "light";
})(Themes || (Themes = {}));
class UiStore {
    constructor() {
        makeAutoObservable(this);
        this.theme = localStorage.theme == 'dark' ? Themes.dark : Themes.light;
    }
    init() {
        this.theme = localStorage.theme == 'dark' ? Themes.dark : Themes.light;
        this.updateTheme(this.theme == Themes.dark ? 'dark' : 'light');
    }
    toggleTheme(targetElement) {
        let theme = this.theme == Themes.dark ? 'light' : 'dark';
        this.updateTheme(theme, targetElement);
    }
    updateTheme(theme, targetElement) {
        if (typeof theme == 'number') {
            this.theme = Themes.dark == theme ? Themes.dark : Themes.light;
        }
        else {
            this.theme = theme == 'dark' ? Themes.dark : Themes.light;
        }
        localStorage.theme = theme;
        if (theme == 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-dark-theme', "true");
            document.documentElement.setAttribute('data-prefers-color-scheme', "dark");
        }
        else {
            document.documentElement.classList.remove('dark');
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
        let appShell = document.querySelector("app-shell");
        if (appShell) {
            if (theme == 'dark') {
                appShell.classList.add('dark');
            }
            else {
                appShell.classList.remove('dark');
            }
        }
    }
}
__decorate([
    observable,
    __metadata("design:type", Number)
], UiStore.prototype, "theme", void 0);
const uiStore = new UiStore();

export { Themes, UiStore, uiStore };
