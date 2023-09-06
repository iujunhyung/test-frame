import { appInfoStore } from '@src/stores/AppInfoStore';

export abstract class StartupBase {
  abstract title: string;
  abstract basePath: string;

  init(): void {
    // app-info
    appInfoStore.title = this.title;
  }
}