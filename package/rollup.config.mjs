import { glob } from "glob";

import terser from "@rollup/plugin-terser";
import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import scss from "rollup-plugin-scss";
import postcss from "rollup-plugin-postcss";
import { litScss } from 'rollup-plugin-scss-lit'

const entryPoints = glob.sync([
  "src/**/index.ts",
  "src/**/index.tsx",
]);
console.log(entryPoints);

const dependencies = Object.keys(require('./package.json').dependencies);
console.log(dependencies);

/** @type {import('rollup').RollupOptions} */
const rollup = {
  input: entryPoints,
  output: [
    {
      dir: "dist/esm",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src"
    },
    {
      dir: "dist/cjs",
      format: "cjs",
      preserveModules: true,
      preserveModulesRoot: "src"
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    json(),
    // litScss({
    //   minify: process.env.NODE_ENV === 'production',
    //   options: { loadPaths: ['node_modules'] }
    // }),
    // babel({
    //   exclude: "node_modules/**",
    //   presets: ["@babel/preset-react"],
    // }),
    // scss(),
    // postcss({
    //   loaders: ["sass"],
    //   use: [
    //     ["sass",{
    //       includePaths: ['src/styles']
    //     }]
    //   ],
    //   plugins: [require("tailwindcss")],
    // }),
    // terser({
    //   compress: false, // 압축설정
    //   mangle: false, // 변수 이름 난독화
    //   output: {
    //     comments: false, // 빌드시 모든 주석 제거
    //   }
    // }),
  ],

  external: [
    "lit/decorators.js",
    "@microsoft/fast-element",
    ...dependencies // 모든 의존성 패키지 명시
  ]
};

export default rollup;