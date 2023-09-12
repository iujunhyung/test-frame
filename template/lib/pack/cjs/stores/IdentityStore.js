'use strict';

var _tslib = require('../_virtual/_tslib.js');
var mobx = require('mobx');
var axios = require('axios');

class IdentityStore {
    constructor() {
        this.email = null;
        this.name = null;
        this.phone = null;
        mobx.makeAutoObservable(this);
    }
    getClaimAsync(type) {
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            let r = yield axios.get(`/identity/claims?type=${type}`);
            if (r.status == 200) {
                return r.data;
            }
            else {
                return null;
            }
        });
    }
    UpdateAsync() {
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            this.email = yield this.getClaimAsync('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress');
            this.name = yield this.getClaimAsync('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname');
            this.phone = yield this.getClaimAsync('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone');
        });
    }
}
_tslib.__decorate([
    mobx.observable,
    _tslib.__metadata("design:type", Object)
], IdentityStore.prototype, "email", void 0);
_tslib.__decorate([
    mobx.observable,
    _tslib.__metadata("design:type", Object)
], IdentityStore.prototype, "name", void 0);
_tslib.__decorate([
    mobx.observable,
    _tslib.__metadata("design:type", Object)
], IdentityStore.prototype, "phone", void 0);
const identityStore = new IdentityStore();

exports.IdentityStore = IdentityStore;
exports.identityStore = identityStore;
