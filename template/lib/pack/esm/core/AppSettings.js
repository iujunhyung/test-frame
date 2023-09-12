import { DI } from './DI.js';

const AppSettings = DI.createInterface();
/* Usage
// service-registration.ts
import { DI } from '@iyulab/lit/services';
import { AppSettings } from "@iyulab/lit/services";
import { DefaultAppSettings } from "./DefaultAppSettings";

DI.register(AppSettings, new DefaultAppSettings())
*/

export { AppSettings };
