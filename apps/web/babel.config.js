/**
 *  Refs
 * https://github.com/zerve-app/zerve/blob/main/apps/zoo-web/babel.config.js,
 * https://github.com/nandorojo/solito/blob/master/example-monorepos/blank/apps/next/.babelrc.json]
 */
module.exports = {
  presets: ['next/babel', ['babel-preset-expo', { jsxRuntime: 'automatic' }]],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['react-native-web', { commonjs: true }],
    ['nativewind/babel', { mode: 'transformOnly' }],
    'react-native-reanimated/plugin',
  ],
};
