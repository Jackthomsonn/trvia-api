const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  entry: './index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  output: {
    filename: 'trvia-api.js',
    path: path.resolve(__dirname, 'build')
  },
  target: 'node',
  externals: [nodeExternals()]
};