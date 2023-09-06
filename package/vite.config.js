import { resolve } from 'path'
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import glob from "fast-glob";

let entry = {};
glob.sync(['src/**/**/*.ts']).map(path => {
  let name = path.replace('src/', '').replace('index.ts', '').replace('.ts', '');
  if (name.length < 1) {
    name = "main";
  }
  entry[name] = resolve(__dirname, path);
});

export default () => {
  
  return defineConfig({
    resolve: {
      alias: {
        '@src': resolve(__dirname, 'src'),
        '~@css': resolve(__dirname, 'src', 'styles'),
      },
    },
    publicDir: resolve(__dirname, 'public'),
    build: {
      outDir: 'dist',
      name: "iyulab",
      lib: {
        entry: entry,
        formats: ['es']
      },
      rollupOptions: {
        output: {
          entryFileNames: (e) => {
            // console.log(e);
            if (e.name == 'main') {
              return `${e.name}.js`;
            } else if (e.name.endsWith("/")) {
              return `${e.name}/index.js`
            } else {
              return `${e.name}.js`
            }
          }
        },
        // external: [
        //   /^lit/,
        //   /^reflect-metadata/,
        //   /^@microsoft\/fast-(element|components)/
        // ],
      }
    },
    css: {
      modules: {
        // generateScopedName: "[hash:base64:10]",
        localsConvention: "camelCase"
      }
    },
    plugins: [
      dts({
        // insertTypesEntry: true
      })
    ]
  })
}