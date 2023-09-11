// @ts-check

import path from 'path';
import withTM from 'next-transpile-modules';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

console.log(__dirname);

const withTMConfig = withTM([
  "@iyu-web/dev"
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/",
  output: "standalone",
  outputFileTracing: true,
  experimental: {
    // outputFileTracingRoot: path.resolve(__dirname, "..", "package"),
    esmExternals: true, // ESM 외부 의존성 활성화
    externalDir: true, // 외부 디렉토리 활성화
    // typedRoutes: false, // 타입스크립트 라우터 활성화
    // instrumentationHook: false, // instrumentation 파일 활성화
  },
  
  // typescript: {
  //   tsconfigPath: path.resolve(__dirname, "tsconfig.json"),
  // },

  webpack: (config) => {
    // Resolve alias
    // config.resolve.alias["@iyu-web/prod"] = ["../package/dist"];
    // config.resolve.alias["@iyu-web/dev"] = ["../package/src"];

    config.resolve.plugins = [
      ...config.resolve.plugins,
      new TsConfigPathsPlugin(),
    ];

    return config;
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // }
  // transpilePackages: [
  // ],
};

module.exports = withTMConfig(nextConfig);