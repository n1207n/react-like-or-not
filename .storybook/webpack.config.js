// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');

// load the default config generator.
var genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

module.exports = function(config, env) {
  var config = genDefaultConfig(config, env);

  // Extend it as you need.
  config.module.loaders = [
    {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel']},
    {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
    {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
    {test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
    {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
    {test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=[name].[ext]'},
    {test: /\.ico$/, loader: 'file?name=[name].[ext]'},
    {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']},
    {test: /\.json$/, loader: "json"}
  ];

  return config;
};
