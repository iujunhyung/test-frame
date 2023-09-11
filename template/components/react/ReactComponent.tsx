// "use client"

import { TestComponent } from '@iyu-web/dev/Test';
// import { LitComponentReact } from "../lit/LitComponent";
// import "../lit/LitComponent";
import { useState } from 'react';

export default function ReactComponent() {
  
  const [name, setName] = useState("asss");

  return (
    <>
      <button onClick={() => setName("hello")}>click</button>
      <TestComponent name={name} onTestEvent={(e) => console.log(e)}>
        <div>this is slot</div>
      </TestComponent>
      {/* <test-element name={name} testEvent={() => console.log("eeee")}></test-element> */}
      {/* <LitComponentReact word="asss" order={(e:any)=>console.log(e.detail)}/> */}
    </>
  );
}