import { __decorate, __metadata } from '../../_virtual/_tslib.js';
import { observable, makeAutoObservable } from 'mobx';

class RelayCommand {
    constructor(x) {
        this.content = null;
        makeAutoObservable(this);
        this.content = x.content;
        this.execute = x.execute;
        this.canExecute = x.canExecute || (() => true);
    }
}
__decorate([
    observable,
    __metadata("design:type", Object)
], RelayCommand.prototype, "content", void 0);

export { RelayCommand };
