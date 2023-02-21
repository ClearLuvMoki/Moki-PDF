const webpackConfig = require('./webpack.common.js');
const {merge} = require('webpack-merge');
const path = require('path');
const {srcPath, rootPath} = require('./scripts/paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();


module.exports = smp.wrap(merge(webpackConfig, {
    entry: {
        main: path.join(srcPath, './index.tsx')
    },
    mode: 'development',
    target: ['web'],
    stats: 'errors-only',
    infrastructureLogging: {
        colors: true,
        level: 'error'
    },
    cache: {
        type: 'filesystem',
        cacheDirectory: path.resolve(rootPath, './node_modules/.cache/webpack')
    },
    devServer: {
        open: true,
        port: process.env.PORT || 9090,
        client: {
            progress: true,
            overlay: {
                errors: true
            }
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../resources/index.html'),
            filename: 'index.html'
        })
    ]
}));
