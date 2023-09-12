import { __decorate, __metadata } from '../_virtual/_tslib.js';
import { observable, makeAutoObservable } from 'mobx';

class AppInfoStore {
    constructor() {
        makeAutoObservable(this);
        this.title = "iyulab";
    }
}
__decorate([
    observable,
    __metadata("design:type", Object)
], AppInfoStore.prototype, "logo", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], AppInfoStore.prototype, "title", void 0);
const appInfoStore = new AppInfoStore();

export { AppInfoStore, appInfoStore };
