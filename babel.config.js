module.exports = {
    presets: [
      'module:metro-react-native-babel-preset',
      '@babel/preset-react',
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
        },
      ],
    ],
    plugins: [
      '@babel/plugin-transform-flow-strip-types',
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
    ],
  };
  