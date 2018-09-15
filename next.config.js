const withTypescript = require('@zeit/next-typescript');
const path = require('path');

module.exports = withTypescript({
  useFileSystemPublicRoutes: false,
  webpack: function (config, { buildId, dev }) {
    const originalEntry = config.entry;

    config.resolve = {
      ...config.resolve,
      ...{
        alias: {
          ...config.resolve.alias,
          '@server': path.resolve(__dirname, 'production-server'),
          '@src': path.resolve(__dirname, 'client'),
        }
      },
    };

    return config
  }
});
