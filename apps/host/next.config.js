const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { withNx } = require('@nrwl/next/plugins/with-nx');
const path = require('node:path');

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';

  return {
    header: `header@${process.env.STACKS_PUBLIC_HEADER_URL}/_next/static/${location}/remoteEntry.js`,
  };
};
module.exports = withNx({
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
    scrollRestoration: true,
  },
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes(options.isServer),
      })
    );

    return config;
  },
});
