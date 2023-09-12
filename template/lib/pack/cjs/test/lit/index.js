'use strict';

var Test = require('./Test.js');



exports.TestComponent = Test.TestComponent;
Object.defineProperty(exports, 'TestElement', {
	enumerable: true,
	get: function () { return Test.TestElement; }
});
