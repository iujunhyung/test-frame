import { DI } from './DI';

// interface 이름(AppSettings) const 이름(AppSettings)은 같도록 의도되었습니다.
export interface AppSettings {
  getServiceURL(): string | null;
  getAccessToken(): string | null;
}

export const AppSettings = DI.createInterface<AppSettings>();

/* Usage 
// service-registration.ts
import { DI } from '@iyulab/lit/services';
import { AppSettings } from "@iyulab/lit/services";
import { DefaultAppSettings } from "./DefaultAppSettings";

DI.register(AppSettings, new DefaultAppSettings())
*/