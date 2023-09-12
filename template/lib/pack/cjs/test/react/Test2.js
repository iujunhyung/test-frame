'use strict';

var React = require('react');

const TestReactComponent = (props) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null, "TestComponent"),
        props.children));
};

exports.TestReactComponent = TestReactComponent;
