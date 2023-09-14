import { TestComponent } from '@iyu-web/dev/test';
import { TestReactComponent } from '@iyu-web/dev/test';
import { useState } from "react";

export default function ReactComponent() {
  const [name, setName] = useState("asss");

  return (
    <>
      <button onClick={() => setName("aaa")}>click</button>
      <TestComponent name={name} onTestEvent={(e) => console.log(e)}>
        <div>this is slot</div>
      </TestComponent>
      Reac
      <TestReactComponent />
    </>
  );
}