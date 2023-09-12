'use strict';

var AppInfoStore = require('../stores/AppInfoStore.js');

class StartupBase {
    init() {
        // app-info
        AppInfoStore.appInfoStore.title = this.title;
    }
}

exports.StartupBase = StartupBase;
