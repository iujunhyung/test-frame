import { glob } from "glob";
import path from "path";

import terser from "@rollup/plugin-terser";
import { babel } from "@rollup/plugin-babel";
import multi from "@rollup/plugin-multi-entry";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import scss from "rollup-plugin-scss";
import sass from 'rollup-plugin-sass';
import postcss from "rollup-plugin-postcss";
import { litScss } from 'rollup-plugin-scss-lit'

const entryPoints = glob.sync("src/**/index.ts");
console.log(`\r\n 엔트리 포인트 목록 \r\n`);
console.log(entryPoints);

const dependencies = Object.keys(require('./package.json').dependencies);
console.log(`\r\n 의존성 패키지 목록 \r\n`);
console.log(dependencies);

/** @type {import('rollup').RollupOptions} */
const rollup = {
  input: entryPoints,

  // 빌드시 생성되는 파일 설정
  // cjs와 esm으로 빌드
  // preserveModules: src폴더의 구조를 유지하면서 빌드
  output: [
    {
      dir: "dist/esm",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    {
      dir: "dist/cjs",
      format: "cjs",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
  ],

  plugins: [
    // 패턴으로 불러온 파일을 한번에 빌드
    // output.preserveModules의 설정에 따라서 빌드
    // multi({
    //   preserveModules: true,
    // }),

    // node_modules의 모듈을 불러와 같이 빌드 해줌
    resolve(),
    
    // CommonJS 모듈을 ES6로 변환
    commonjs(),

    // typescript 지원
    typescript({
      tsconfig: path.resolve(__dirname, "tsconfig.json")
    }),
    
    // json 파일을 불러와서 사용할 수 있게 해줌
    json(),

    // lit-element에서 가져온 scss를 js로 변환
    // 다른 scss플러그인과 충돌하므로 path지정
    litScss({
      include: ['src/test/lit/**/*.scss'],
      exclude: ['node_modules/**/*'],
      // options: { loadPaths: ['node_modules'] },
      minify: true,
      plugins: [
      ],
    }),
    
    // 기본 scss설정(litScss와 충돌하므로 따로path 지정)
    scss({
      include: ['src/test/react/**/*.scss'],
    }),
    
    // 기본 postcss설정
    // postcss({
    //   include: ['src/test/react/**/*.scss'],
    //   extract: true,
    // }),

    // 빌드시 코드 설정
    // terser({
    //   compress: true, // 코드 압축
    //   mangle: true, // 변수 이름 난독화
    //   output: {
    //     comments: true, // 모든 주석 제거
    //   }
    // }),

    // 브라우저 호환성을 위한 babel 설정
    // babel({
    //   exclude: 'node_modules/**/*.(ts|tsx|js|jsx)',
    //   include: 'src/**/*.(ts|tsx|js|jsx)',
    //   extensions: ['.ts', '.tsx', '.js', '.jsx', '.es', '.es6', '.mjs'],
    //   babelHelpers: 'bundled',
    //   presets: [ "@babel/preset-env", "@babel/preset-typescript" ],
    // }),

  ],

  // 같이 빌드하지 않을 패키지 설정
  external: [
    "lit/decorators.js",
    "@microsoft/fast-element",
    ...dependencies // 모든 의존성 패키지
  ]

};

export default rollup;