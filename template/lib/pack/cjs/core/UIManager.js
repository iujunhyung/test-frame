'use strict';

var _tslib = require('../_virtual/_tslib.js');

class UIManager {
    constructor() {
        this.isReady = false;
        this.busyStack = 0;
        //#endregion
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    initializeAsync() {
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => _tslib.__awaiter(this, void 0, void 0, function* () {
                while (this.isReady != true) {
                    yield new Promise((resolve) => {
                        console.log("waiting for ui manager to be ready");
                        setTimeout(resolve, 100);
                    });
                }
                resolve(true);
            }));
        });
    }
    ready() {
        this.isReady = this.pageBusyIndicator != null && this.messageBoxDialog != null;
    }
    setPageBusyIndicator(pageBusyIndicator) {
        this.pageBusyIndicator = pageBusyIndicator;
        this.updateBusyIndicator();
        this.ready();
    }
    setMessageDialog(messageBoxDialog) {
        this.messageBoxDialog = messageBoxDialog;
        this.ready();
    }
    showMessageAsync(title, message) {
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            if (this.messageBoxDialog == null) {
                yield this.initializeAsync();
            }
            if (this.messageBoxDialog) {
                this.messageBoxDialog.initOk();
                return this.messageBoxDialog.showAsync(title, message);
            }
            else {
                throw new Error("message box dialog is null");
            }
        });
    }
    showMessageOkCancelAsync(title, message) {
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            if (this.messageBoxDialog == null) {
                yield this.initializeAsync();
            }
            if (this.messageBoxDialog) {
                this.messageBoxDialog.initOkCancel();
                return this.messageBoxDialog.showAsync(title, message);
            }
            else {
                throw new Error("message box dialog is null");
            }
        });
    }
    showConfirmDialog(title, message) {
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            if (this.messageBoxDialog == null) {
                yield this.initializeAsync();
            }
            if (this.messageBoxDialog) {
                this.messageBoxDialog.initYesNo();
                return this.messageBoxDialog.showAsync(title, message);
            }
            else {
                throw new Error("message box dialog is null");
            }
        });
    }
    createInertElement(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstChild;
    }
    showInputDialogAsync(title, message, options) {
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            const html = `<input-dialog hidden></input-dialog>`;
            const element = this.createInertElement(html);
            document.body.appendChild(element);
            try {
                let dlg = element;
                let r = yield dlg.showAsync(title, message, options);
                return r;
            }
            catch (e) {
                return {
                    success: false,
                    value: null
                };
            }
            finally {
                document.body.removeChild(element);
            }
        });
    }
    showDialogAsync(content) {
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            const html = `<blank-dialog hidden></blank-dialog>`;
            const element = this.createInertElement(html);
            document.body.appendChild(element);
            try {
                let dlg = element;
                dlg.content = content;
                let r = yield dlg.showAsync();
                return r;
            }
            catch (e) {
                return {
                    success: false,
                    value: null
                };
            }
            finally {
                document.body.removeChild(element);
            }
        });
    }
    showContentDialogAsync(title, content, options) {
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            // # use this to create a dialog
            // let context = {
            //   name: "",
            //   template: "",
            //   emails: []
            // }
            // let el = this.getCreateWorkpageDialog(context);
            // let result = await uiManager.showContentDialogAsync('New Workspace', el);
            const html = `<content-dialog hidden></content-dialog>`;
            const element = this.createInertElement(html);
            document.body.appendChild(element);
            try {
                let dlg = element;
                dlg.content = content;
                if (options != null) {
                    if (options.okCancel) {
                        dlg.positiveText = "Ok";
                        dlg.negativeText = "Cancel";
                        dlg.useNegative = true;
                    }
                    else if (options.yesNo) {
                        dlg.positiveText = "Yes";
                        dlg.negativeText = "No";
                        dlg.useNegative = true;
                    }
                    if (options.hiddenButtons) {
                        dlg.hiddenButtons = options.hiddenButtons;
                    }
                    if (options.validationHandler) {
                        dlg.validationHandler = options.validationHandler;
                    }
                }
                let r = yield dlg.showAsync(title);
                return r;
            }
            catch (e) {
                return {
                    success: false,
                    value: null
                };
            }
            finally {
                document.body.removeChild(element);
            }
        });
    }
    showContextMenu(menuItems, e) {
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            const html = `<popup-menu hidden></popup-menu>`;
            const element = this.createInertElement(html);
            document.body.appendChild(element);
            try {
                let popupMenu = element;
                popupMenu.menuItems = menuItems;
                popupMenu.location = {
                    x: e.x,
                    y: e.y
                };
                let r = yield popupMenu.showAsync();
                return r;
            }
            catch (e) {
                return {
                    success: false,
                    value: null
                };
            }
            finally {
                document.body.removeChild(element);
            }
        });
    }
    //#region busy indicator
    busy() {
        // busy 스택에 추가
        this.busyStack++;
        this.updateBusyIndicator();
    }
    updateBusyIndicator() {
        if (this.pageBusyIndicator) {
            this.pageBusyIndicator.hidden = this.busyStack > 0 ? false : true;
        }
    }
    unbusy() {
        // busy 스택에서 제거, 0보다 작아지면 0으로 맞춤
        this.busyStack--;
        if (this.busyStack < 0) {
            this.busyStack = 0;
        }
        this.updateBusyIndicator();
    }
    invokeInBusy(action) {
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            this.busy();
            let result;
            try {
                result = yield action();
            }
            catch (e) {
                throw e;
            }
            finally {
                this.unbusy();
            }
            return result;
        });
    }
}
const uiManager = UIManager.Instance;

exports.uiManager = uiManager;
