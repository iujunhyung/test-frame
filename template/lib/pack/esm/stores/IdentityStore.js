import { __decorate, __metadata, __awaiter } from '../_virtual/_tslib.js';
import { observable, makeAutoObservable } from 'mobx';
import axios from 'axios';

class IdentityStore {
    constructor() {
        this.email = null;
        this.name = null;
        this.phone = null;
        makeAutoObservable(this);
    }
    getClaimAsync(type) {
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
            this.email = yield this.getClaimAsync('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress');
            this.name = yield this.getClaimAsync('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname');
            this.phone = yield this.getClaimAsync('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone');
        });
    }
}
__decorate([
    observable,
    __metadata("design:type", Object)
], IdentityStore.prototype, "email", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], IdentityStore.prototype, "name", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], IdentityStore.prototype, "phone", void 0);
const identityStore = new IdentityStore();

export { IdentityStore, identityStore };
