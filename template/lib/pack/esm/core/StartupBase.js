import { appInfoStore } from '../stores/AppInfoStore.js';

class StartupBase {
    init() {
        // app-info
        appInfoStore.title = this.title;
    }
}

export { StartupBase };
