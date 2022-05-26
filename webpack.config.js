const path = require('path');

module.exports = {
  output: {
    filename: 'webpack.config.js',
  },
  module: {
    rules: [{ test: /\.pdf$/, use: 'raw-loader' }],
  },
}