import path from "path";
import glob from "glob";
import terser from "@rollup/plugin-terser";
import alias from '@rollup/plugin-alias';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import scss from "rollup-plugin-scss";
import postcss from "rollup-plugin-postcss";

// const customResolver = resolve({
//   extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss']
// });
// const projectRootDir = path.resolve(__dirname);

// const outputOptions = glob.sync("src/**/index.ts").map((entryFile) => {
//   const path = entryFile.replace("src/", "").replace("/index.ts", "");
//   return {
//     input: {
//       include: entryFile,
//       exclude: ["src/**/*.d.ts"],
//     },
//     output_esm: {
//       dir: `dist/esm/${path}`,
//       format: "esm",
//     },
//     output_cjs: {
//       dir: `dist/cjs/${path}`,
//       format: "cjs",
//     }
//   };
// });

/** @type {import('rollup').RollupOptions} */
export default {
  input: "src/Test.ts",
  output: [
    {
      file: "dist/Test.js",
      format: "esm",
    }
  ],
  plugins: [
    // alias({
    //   entries: [
    //     { find: "@src", replacement: path.resolve(projectRootDir, "src") },
    //     { find: "@css", replacement: path.resolve(projectRootDir, "src/styles") },
    //   ],
    //   customResolver
    // }),
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
  external: [
    'react',
    'react-dom',
    'lit',
    'lit/decorators.js',
    '@lit-labs/react',
    'mobx'
  ]
};