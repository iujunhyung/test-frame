'use strict';

var _tslib = require('../_virtual/_tslib.js');
var mobx = require('mobx');
var DI = require('../core/DI.js');
var AppSettings = require('../core/AppSettings.js');

class UserStore {
    get userId() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.claims) === null || _b === void 0 ? void 0 : _b.find((n) => n.type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")) === null || _c === void 0 ? void 0 : _c.value;
    }
    get userName() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.claims) === null || _b === void 0 ? void 0 : _b.find((n) => n.type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")) === null || _c === void 0 ? void 0 : _c.value;
    }
    get userEmail() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.claims) === null || _b === void 0 ? void 0 : _b.find((n) => n.type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")) === null || _c === void 0 ? void 0 : _c.value;
    }
    get userRoles() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.claims) === null || _b === void 0 ? void 0 : _b.filter((n) => n.type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")) === null || _c === void 0 ? void 0 : _c.map((n) => n.value);
    }
    get SID() {
        var _a, _b, _c;
        let endWith = "/identity/claims/sid";
        return (_c = (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.claims) === null || _b === void 0 ? void 0 : _b.find((n) => n.type.endsWith(endWith))) === null || _c === void 0 ? void 0 : _c.value;
    }
    get userClaims() {
        var _a;
        return (_a = this.user) === null || _a === void 0 ? void 0 : _a.claims;
    }
    constructor() {
        this.user = null;
        mobx.makeAutoObservable(this);
    }
    login(user) {
        this.user = user;
        console.debug('login user', user);
    }
    init() {
        let url = `/identity` + location.search;
        let option = null;
        if (this.appSettings) {
            let accessToken = this.appSettings.getAccessToken();
            let baseUrl = this.appSettings.getServiceURL();
            if (accessToken) {
                if (baseUrl) {
                    url = baseUrl + url;
                }
                option = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                };
            }
        }
        fetch(url, option)
            .then(response => {
            var _a;
            if ((_a = response.headers.get('content-type')) === null || _a === void 0 ? void 0 : _a.startsWith('application/json')) {
                return response.json();
            }
            else {
                return null;
            }
        })
            .then(user => {
            if (user == null) {
                console.debug('user is null');
            }
            else {
                this.login(user);
            }
        })
            .catch(error => {
            // 오류를 무시하고 아무것도 처리하지 않습니다.
            console.error(error);
        });
    }
}
_tslib.__decorate([
    DI.inject(AppSettings.AppSettings),
    _tslib.__metadata("design:type", Object)
], UserStore.prototype, "appSettings", void 0);
_tslib.__decorate([
    mobx.observable,
    _tslib.__metadata("design:type", Object)
], UserStore.prototype, "user", void 0);
_tslib.__decorate([
    mobx.action,
    _tslib.__metadata("design:type", Function),
    _tslib.__metadata("design:paramtypes", [Object]),
    _tslib.__metadata("design:returntype", void 0)
], UserStore.prototype, "login", null);
const userStore = new UserStore();

exports.UserStore = UserStore;
exports.userStore = userStore;
