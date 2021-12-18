const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
/* check it out later */
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prod = {
  mode: 'production',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
  optimization: {
    moduleIds: 'deterministic',
  },
};

module.exports = merge(common, prod);
