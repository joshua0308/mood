const path = require('path');
const webpack = require('webpack');

console.log(`NODE_ENV is ${process.env.NODE_ENV}`);

module.exports = {
  entry: './client/index.js',
  // entry: path.join(__dirname, '/client/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  devServer: {
    // public
    port: 8080,
    publicPath: '/build/',
    proxy: {
      '/api/posts': 'http://localhost:3000'
    }
  }
};
