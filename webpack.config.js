const path = require('path');

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
      }
    ],
  },
};