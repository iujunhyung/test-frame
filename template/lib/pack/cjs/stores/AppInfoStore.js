'use strict';

var _tslib = require('../_virtual/_tslib.js');
var mobx = require('mobx');

class AppInfoStore {
    constructor() {
        mobx.makeAutoObservable(this);
        this.title = "iyulab";
    }
}
_tslib.__decorate([
    mobx.observable,
    _tslib.__metadata("design:type", Object)
], AppInfoStore.prototype, "logo", void 0);
_tslib.__decorate([
    mobx.observable,
    _tslib.__metadata("design:type", Object)
], AppInfoStore.prototype, "title", void 0);
const appInfoStore = new AppInfoStore();

exports.AppInfoStore = AppInfoStore;
exports.appInfoStore = appInfoStore;
