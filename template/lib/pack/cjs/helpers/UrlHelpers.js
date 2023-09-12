'use strict';

exports.UrlHelpers = void 0;
(function (UrlHelpers) {
    function getUrlParams(url) {
        if (url == null) {
            url = document.location.href;
        }
        const searchParams = new URLSearchParams(url.split('?')[1]);
        const params = {};
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        return params;
    }
    UrlHelpers.getUrlParams = getUrlParams;
})(exports.UrlHelpers || (exports.UrlHelpers = {}));
