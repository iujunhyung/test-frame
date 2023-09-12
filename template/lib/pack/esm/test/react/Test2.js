import React from 'react';

const TestReactComponent = (props) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null, "TestComponent"),
        props.children));
};

export { TestReactComponent };
