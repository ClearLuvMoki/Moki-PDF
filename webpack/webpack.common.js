const path = require("path");
const WebPackModule = require('./webpackBaseConfig/webpack.module');
const webpackPlugins = require('./webpackBaseConfig/webpack.plugins');
const TerserPlugin = require('terser-webpack-plugin');
const {
    srcPath,
} = require('./scripts/paths');

module.exports = {
    module: WebPackModule,
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minRemainingSize: 0,
            maxAsyncRequests: 30,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
        ],
    },
    resolve: {
        modules: [path.resolve(srcPath), '../node_modules'],
        alias: {
            '@/src': path.join(__dirname, '../../src/'),
        },
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: webpackPlugins,
};
