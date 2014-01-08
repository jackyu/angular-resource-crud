path = require('path');

module.exports = {
  server: {
    listener: 8080,
    distFolder: path.resolve(__dirname, '../client/src'),
    vendorFolder: path.resolve(__dirname, '../client/vendor'),
    staticUrl: '/static',
    vendorUrl: '/vendor'
  }
};