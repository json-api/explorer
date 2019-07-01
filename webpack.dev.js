const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
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
          }
        ]
      }
    ]
  }
});

console.log('Env is ', process.env.NODE_ENV);
