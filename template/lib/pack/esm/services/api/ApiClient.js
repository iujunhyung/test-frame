import { __awaiter } from '../../_virtual/_tslib.js';

class ApiClient {
    success(status) {
        return status >= 200 && status < 300;
    }
    // private isRedirect(status: number) {
    //   return status >= 300 && status < 400;
    // }
    isClientError(status) {
        return status >= 400 && status < 500;
    }
    // private isServerError(status: number) {
    //   return status >= 500;
    // }
    asText(v) {
        if (typeof v == 'object') {
            return JSON.stringify(v);
        }
        else {
            return `${v}`;
        }
    }
    onResponseAsync(res) {
        return __awaiter(this, void 0, void 0, function* () {
            let contentType = res.headers.get('content-type');
            if (contentType == "text/html") {
                // 리다이렉트 되었음
                document.location.href = res.url;
                return { success: true, status: res.status, value: null };
            }
            else if (this.success(res.status)) {
                if (contentType == null || contentType.indexOf('json') > 0) {
                    let resJson = yield res.json();
                    if (resJson.key == "Redirect") {
                        document.location.href = resJson.value;
                        return { success: true, status: res.status, value: null };
                    }
                    else {
                        return { success: true, status: res.status, value: resJson };
                    }
                }
                else if (contentType.startsWith("text/plain")) {
                    let text = yield res.text();
                    return { success: true, status: res.status, value: text };
                }
                else {
                    return { success: false, status: res.status };
                }
            }
            else if (this.isClientError(res.status)) {
                if (contentType === null || contentType === void 0 ? void 0 : contentType.indexOf('json')) {
                    return { success: false, status: res.status, value: yield res.json() };
                }
                else {
                    return { success: false, status: res.status };
                }
            }
            else //if (this.isServerError(res.status)) {
             if (contentType === null || contentType === void 0 ? void 0 : contentType.indexOf('json')) {
                return { success: false, status: res.status, value: yield res.json() };
            }
            else {
                return { success: false, status: res.status };
            }
        });
    }
    buildUrl(url) {
        if (url.startsWith("http")) {
            return url;
        }
        else {
            let host = this.host;
            if (host.length < 1 || host == "/") {
                return new URL(url, document.location.origin).href;
            }
            else {
                let address;
                if (host.endsWith("/") || url.startsWith("/")) {
                    address = host + url;
                }
                else {
                    address = `${host}/${url}`;
                }
                if (window.location.search && address.includes('?') != true) {
                    address += window.location.search;
                }
                return address;
            }
        }
    }
    buildHeadersAsync(defaults) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = defaults !== null && defaults !== void 0 ? defaults : {};
            return headers;
        });
    }
    get(address) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.buildUrl(address);
            let headers = yield this.buildHeadersAsync();
            let r = yield fetch(url, {
                method: 'GET',
                headers: headers,
                redirect: 'follow' // Redirect 를 허용
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                return yield this.onResponseAsync(res);
            }))
                .catch(reason => {
                throw reason;
            });
            return r;
        });
    }
    post(address, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.buildUrl(address);
            let headers = yield this.buildHeadersAsync({
                'Content-Type': 'application/json'
            });
            if (options && options.headers) {
                for (let key in options.headers) {
                    let header = options.headers[key];
                    if (typeof header === 'function')
                        continue;
                    headers[key] = header;
                }
            }
            let jsonBody = JSON.stringify(data);
            console.debug(`Req|POST ${address} ${jsonBody}`);
            let r = yield fetch(url, {
                method: 'POST',
                headers: headers,
                body: jsonBody,
                redirect: 'follow' // Redirect 를 허용
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                let r = yield this.onResponseAsync(res);
                console.debug(`Res|POST ${address} ${this.asText(r.value)}`);
                return r;
            }))
                .catch(reason => {
                throw reason;
            });
            return r;
        });
    }
    delete(address) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.buildUrl(address);
            let headers = yield this.buildHeadersAsync();
            let r = yield fetch(url, {
                method: 'DELETE',
                headers: headers
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                return yield this.onResponseAsync(res);
            }))
                .catch(reason => {
                throw reason;
            });
            return r;
        });
    }
}

export { ApiClient };
