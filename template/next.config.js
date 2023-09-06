import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Resolve alias
    config.resolve.alias['@iyu'] = path.resolve(__dirname, 'iyu-web');
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
};

module.exports = nextConfig;