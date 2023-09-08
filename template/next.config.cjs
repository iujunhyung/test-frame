// @ts-check

import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Resolve alias
    config.resolve.alias['@iyu-web'] = path.resolve(__dirname, '../package/dist');
    config.resolve.alias['@src'] = path.resolve(__dirname, '../package/src');
    return config;
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // }
  experimental: {
    typedRoutes: false, // 타입스크립트 라우터 활성화
    instrumentationHook: false, // instrumentation 파일 활성화
  }
};

module.exports = nextConfig;