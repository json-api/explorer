const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssCustomProperties = require('postcss-custom-properties');
const autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname + "/src",
  entry: "./index.js",

  output: {
    filename: "main.js",
    path: path.join(__dirname, 'dist')
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    inline: true,
    index: path.join(__dirname, 'index.html')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "react-hot-loader/webpack"
          },
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssCustomProperties(),
                autoprefixer
              ]
            }
          },
          'sass-loader'
        ],
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        }
      }
    ],
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]
};
