'use strict';

var Test = require('./lit/Test.js');
var Test2 = require('./react/Test2.js');



exports.TestComponent = Test.TestComponent;
Object.defineProperty(exports, 'TestElement', {
	enumerable: true,
	get: function () { return Test.TestElement; }
});
exports.TestReactComponent = Test2.TestReactComponent;
