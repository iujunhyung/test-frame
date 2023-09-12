// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // typescript: {
  //   tsconfigPath: path.resolve(__dirname, "tsconfig.json"),
  // },

  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // }

  // transpilePackages: [
  // ],

  // experimental: {
  //   externalDir: true, // 외부 디렉토리 활성화
  // },
};

export default nextConfig;