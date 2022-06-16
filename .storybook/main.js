const path = require('path');

module.exports = {
  stories: ['../stories'],
  addons: [
    'storybook-addon-themes',
    '@storybook/addon-docs',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-interactions',
  ],
  webpackFinal: async (config) => {
    config.resolve.modules.push(path.resolve(__dirname, '../src/components/index.ts'));

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: path.resolve(__dirname, '..'),
      use: [
        {
          loader: 'babel-loader',
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            tsconfigPath: path.resolve(__dirname, '..', 'tsconfig.json'),
          },
        },
      ],
    });
    config.resolve.alias['src$'] = path.resolve(
      __dirname,
      '../src/components/index.ts',
    );
    config.resolve.alias['react-native$'] = require.resolve('react-native-web');
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};