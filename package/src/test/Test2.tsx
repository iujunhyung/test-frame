import React from 'react';

// import './test.scss';

export default function TestReactComponent( props: {children: React.ReactNode} ) {
    return (
        <>
            <div>TestComponent</div>
            {props.children}
        </>
    );
}