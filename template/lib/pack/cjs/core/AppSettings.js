'use strict';

var DI = require('./DI.js');

const AppSettings = DI.DI.createInterface();
/* Usage
// service-registration.ts
import { DI } from '@iyulab/lit/services';
import { AppSettings } from "@iyulab/lit/services";
import { DefaultAppSettings } from "./DefaultAppSettings";

DI.register(AppSettings, new DefaultAppSettings())
*/

exports.AppSettings = AppSettings;
