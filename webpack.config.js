const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    library: 'reactWordcloud',
    filename: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
