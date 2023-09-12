'use strict';

var Test = require('./Test.js');
require('react');



exports.TestComponent = Test.TestComponent;
Object.defineProperty(exports, 'TestElement', {
	enumerable: true,
	get: function () { return Test.TestElement; }
});
