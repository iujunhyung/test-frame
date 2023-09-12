'use strict';

var _tslib = require('../_virtual/_tslib.js');
var mobx = require('mobx');
var fastElement = require('@microsoft/fast-element');
var fastComponents = require('@microsoft/fast-components');

exports.Themes = void 0;
(function (Themes) {
    Themes[Themes["dark"] = 0] = "dark";
    Themes[Themes["light"] = 1] = "light";
})(exports.Themes || (exports.Themes = {}));
class UiStore {
    constructor() {
        mobx.makeAutoObservable(this);
        this.theme = localStorage.theme == 'dark' ? exports.Themes.dark : exports.Themes.light;
    }
    init() {
        this.theme = localStorage.theme == 'dark' ? exports.Themes.dark : exports.Themes.light;
        this.updateTheme(this.theme == exports.Themes.dark ? 'dark' : 'light');
    }
    toggleTheme(targetElement) {
        let theme = this.theme == exports.Themes.dark ? 'light' : 'dark';
        this.updateTheme(theme, targetElement);
    }
    updateTheme(theme, targetElement) {
        if (typeof theme == 'number') {
            this.theme = exports.Themes.dark == theme ? exports.Themes.dark : exports.Themes.light;
        }
        else {
            this.theme = theme == 'dark' ? exports.Themes.dark : exports.Themes.light;
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
            fastElement.DOM.queueUpdate(() => {
                fastComponents.baseLayerLuminance.setValueFor(targetElement, theme == 'dark' ? fastComponents.StandardLuminance.DarkMode : fastComponents.StandardLuminance.LightMode);
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
_tslib.__decorate([
    mobx.observable,
    _tslib.__metadata("design:type", Number)
], UiStore.prototype, "theme", void 0);
const uiStore = new UiStore();

exports.UiStore = UiStore;
exports.uiStore = uiStore;
