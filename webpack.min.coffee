
webpack = require('webpack')
config = require('./webpack.config')
fs = require('fs')

module.exports =
  entry:
    main: [ './src/demo/main.jsx' ]
  output:
    path: 'build/'
    filename: '[name].[chunkhash].js'
    publicPath: './build/'
  resolve: config.resolve
  module: config.module
  plugins: [
    new webpack.optimize.UglifyJsPlugin sourceMap: false
    ->
      @plugin 'done', (stats) ->
        content = JSON.stringify(stats.toJson().assetsByChunkName, null, 2)
        fs.writeFileSync 'build/assets.json', content
  ]
