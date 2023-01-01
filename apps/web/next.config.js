/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withTM = require('next-transpile-modules')(['fixtures', 'sacola-trpc', 'design', 'nativewind']);
const { withExpo } = require('@expo/next-adapter');
const withPlugins = require('next-compose-plugins');

const transform = withPlugins([withTM, [withExpo, {}]]);

module.exports = function (name, { defaultConfig }) {
  return transform(name, {
    ...defaultConfig,
    ...nextConfig,
  });
};
