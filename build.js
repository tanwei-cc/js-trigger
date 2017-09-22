// https://github.com/shelljs/shelljs
require('shelljs/global')

var path = require('path')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./config/webpack.config')
var spinner = ora('building for production...')
var distDir = './dist';

env.NODE_ENV = 'production'

spinner.start()

rm('-rf', distDir)
mkdir('-p', distDir)

webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})