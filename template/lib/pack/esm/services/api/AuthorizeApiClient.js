import { __awaiter } from '../../_virtual/_tslib.js';
import { ApiClient } from './ApiClient.js';

class AuthorizeApiClient extends ApiClient {
    constructor() {
        super(...arguments);
        this.accessToken = null;
        this.token = null;
    }
    getAccessTokenAsync() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.accessToken == null) {
                this.accessToken = localStorage.getItem('accessToken');
            }
            if (this.accessToken == null && ((_a = this.token) === null || _a === void 0 ? void 0 : _a.accessToken) != null) {
                this.accessToken = this.token.accessToken;
            }
            return this.accessToken;
        });
    }
    getTokenAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.get("/identity/token", {
                refreshToken: false
            });
            if (res.success) {
                let token = res.value;
                return token;
            }
            else {
                return null;
            }
        });
    }
    refreshTokenAsync() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            localStorage.removeItem('accessToken');
            let res = yield this.get('/identity/token', {
                refreshToken: false
            });
            if (res.success) {
                this.token = res.value;
                this.accessToken = (_b = (_a = this.token) === null || _a === void 0 ? void 0 : _a.accessToken) !== null && _b !== void 0 ? _b : null;
                return this.accessToken != null;
            }
            if (this.token && this.token.refreshToken && this.token.code) {
                let res = yield this.post('/identity/refresh-token', {
                    // deviceId: getDeviceId(),
                    token: this.token.refreshToken,
                    code: this.token.code
                }, {
                    refreshToken: false
                });
                if (res.success) {
                    this.token = res.value;
                    this.accessToken = (_d = (_c = this.token) === null || _c === void 0 ? void 0 : _c.accessToken) !== null && _d !== void 0 ? _d : null;
                    return this.accessToken != null;
                }
            }
            let url = '/accounts/login?returnUrl=' + encodeURIComponent(location.pathname + location.search);
            location.href = url;
            return false;
        });
    }
    buildHeadersAsync(defaults) {
        const _super = Object.create(null, {
            buildHeadersAsync: { get: () => super.buildHeadersAsync }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let headers = yield _super.buildHeadersAsync.call(this, defaults);
            let accessToken = yield this.getAccessTokenAsync();
            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
            }
            return headers;
        });
    }
    getIdentityAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.get("/identity", {
                refreshToken: false
            });
            if (res.success) {
                let identity = res.value;
                return identity;
            }
            else {
                return null;
            }
        });
    }
    retry(options) {
        if (options.refreshToken) {
            if (options.retry == null) {
                options.retry = 1;
            }
            options.retry -= 1;
            return options.retry >= 0;
        }
        else {
            return false;
        }
    }
    get(address, options = { refreshToken: true, retry: 1 }) {
        const _super = Object.create(null, {
            get: { get: () => super.get }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield _super.get.call(this, address);
            if (res.status == 401 && this.retry(options)) { // Unauthorized
                let success = yield this.refreshTokenAsync();
                if (success) {
                    return this.get(address, options);
                }
                else {
                    return res;
                }
            }
            else {
                return res;
            }
        });
    }
    post(address, data, options = { refreshToken: true, retry: 1 }) {
        const _super = Object.create(null, {
            post: { get: () => super.post }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield _super.post.call(this, address, data, options);
            if (res.status == 401 && this.retry(options)) { // Unauthorized
                let success = yield this.refreshTokenAsync();
                if (success) {
                    return this.post(address, data, options);
                }
                else {
                    return res;
                }
            }
            else {
                return res;
            }
        });
    }
    delete(address, options = { refreshToken: true, retry: 1 }) {
        const _super = Object.create(null, {
            delete: { get: () => super.delete }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield _super.delete.call(this, address);
            if (res.status == 401 && this.retry(options)) { // Unauthorized
                let success = yield this.refreshTokenAsync();
                if (success) {
                    return this.delete(address, options);
                }
                else {
                    return res;
                }
            }
            else {
                return res;
            }
        });
    }
}

export { AuthorizeApiClient };
