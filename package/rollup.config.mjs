import typescript from "rollup-plugin-typescript2";
import scss from "rollup-plugin-scss";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

/** @type {import('rollup').RollupOptions} */
export default {
  input: `src/Test.ts`,
  output: [
    {
      dir: `dist`,
      format: "esm"
    },
    // {
    //   file: `dist/Test.js`,
    //   format: "cjs",
    // },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    json(),
    // scss({
    //   output: "dist/styles.css"
    // }),
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
};