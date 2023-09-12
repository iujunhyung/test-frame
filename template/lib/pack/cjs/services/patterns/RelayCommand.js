'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var mobx = require('mobx');

class RelayCommand {
    constructor(x) {
        this.content = null;
        mobx.makeAutoObservable(this);
        this.content = x.content;
        this.execute = x.execute;
        this.canExecute = x.canExecute || (() => true);
    }
}
_tslib.__decorate([
    mobx.observable,
    _tslib.__metadata("design:type", Object)
], RelayCommand.prototype, "content", void 0);

exports.RelayCommand = RelayCommand;
