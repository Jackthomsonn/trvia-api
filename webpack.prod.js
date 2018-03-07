const common = require('./webpack.common.js')
const merge = require('webpack-merge')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { AutomateRelease } = require('./node_modules/automate-release-webpack-plugin/build')

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin(),
    new AutomateRelease()
  ]
});