const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
/* check it out later */
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const dev = {
  mode: 'development',
  entry: {
    app: [
      'webpack-hot-middleware/client',
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
};

module.exports = merge(common, dev);
