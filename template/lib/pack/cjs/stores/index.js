'use strict';

var AppInfoStore = require('./AppInfoStore.js');
var IdentityStore = require('./IdentityStore.js');
var UiStore = require('./UiStore.js');
var UserStore = require('./UserStore.js');



exports.AppInfoStore = AppInfoStore.AppInfoStore;
exports.appInfoStore = AppInfoStore.appInfoStore;
exports.IdentityStore = IdentityStore.IdentityStore;
exports.identityStore = IdentityStore.identityStore;
Object.defineProperty(exports, 'Themes', {
	enumerable: true,
	get: function () { return UiStore.Themes; }
});
exports.UiStore = UiStore.UiStore;
exports.uiStore = UiStore.uiStore;
exports.UserStore = UserStore.UserStore;
exports.userStore = UserStore.userStore;
