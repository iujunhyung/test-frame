import React from 'react';

import './test.scss';

export const TestReactComponent = (props: { children?: React.ReactNode }) => {
    return (
        <>
            <div>TestComponent</div>
            {props.children}
        </>
    );
}