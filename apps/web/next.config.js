/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const { withExpo } = require('@expo/next-adapter');
const withTM = require('next-transpile-modules')([
  'fixtures',
  'sacola-trpc',
  'design',
  'nativewind',
  'react-native',
  'react-native-web',
  'moti',
  '@motify/core',
  '@motify/components',
]);
const withPlugins = require('next-compose-plugins');

const transform = withPlugins([withTM, [withExpo, {}]]);

module.exports = function (name, { defaultConfig }) {
  return transform(name, {
    ...defaultConfig,
    ...nextConfig,
  });
};
