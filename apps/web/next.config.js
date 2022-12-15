const withTM = require('next-transpile-modules')(['sacola-trpc', 'design']);

/**
 * @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', ...config.resolve.extensions];
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withTM(nextConfig);
