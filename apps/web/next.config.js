const withTM = require('next-transpile-modules')(['@sacola/trpc']);

/**
 * @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withTM(nextConfig);
