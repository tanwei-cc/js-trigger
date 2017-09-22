var path = require('path');
var webpack = require('webpack');
var config = require('./base');

module.exports = {
    entry: {
        index: './src/index.js'
    },

    // Enable sourcemaps for debugging webpack's output.
    // devtool: 'cheap-module-source-map',

    output: {
        path: config.distDir,
        filename: '[name].js',
        libraryTarget: 'umd'
    },

    module: {
        loaders: [{ test: /\.js$/, loaders: ['babel-loader'] }]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};