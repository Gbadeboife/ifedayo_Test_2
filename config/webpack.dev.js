const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');
const paths = require('./paths');
const path = require('path');

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',
  output: {
    path: path.normalize(paths.build),
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
  },
  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    contentBase: path.normalize(paths.build),
    index: '/',
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    host: 'test.manaknightdev.com',
    https: true,
    noInfo: true, //This turns off information regarding the bundle.  Set to false if you need to view the messages
  },

  module: {
    rules: [
      // CSS Modules (your own files)
      {
        test: /\.module\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: true, postcssOptions: { config: true } } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      // Global CSS (everything else, including node_modules)
      {
        test: /\.(css|scss)$/,
        exclude: /\.module\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: 'postcss-loader', options: { sourceMap: true, postcssOptions: { config: true } } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
});
