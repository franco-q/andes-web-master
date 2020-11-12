const Webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-only',
  bail: true,
  output: {
    filename: 'js/main.js',
    chunkFilename: 'js/chunk.js'
  },
  plugins: [
    new Webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles/main.css', ignoreOrder: false })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.s?css/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader?sourceMap=true',
          'sass-loader'
        ]
      }
    ]
  }
})
