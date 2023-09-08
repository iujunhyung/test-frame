"use client"

import { Testing } from '../../../package/dist/Test';
import { LitComponentReact } from "../lit/LitComponent";

export default function ReactComponent() {
  
  return (
    <>
      <Testing name='sss'></Testing>
      <LitComponentReact word="asss" onOrder={(e:any)=>console.log(e.detail)}/>
    </>
  );
}