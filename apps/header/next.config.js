const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { withNx } = require('@nrwl/next/plugins/with-nx');
const path = require('node:path');

module.exports = withNx({
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'header',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './index': './pages/index.tsx',
        },
      })
    );
    return config;
  },
});
