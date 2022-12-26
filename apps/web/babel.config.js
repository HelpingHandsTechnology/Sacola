module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['react-native-web', { commonjs: true }],
    ['nativewind/babel', { mode: 'transformOnly' }],
  ],
};
