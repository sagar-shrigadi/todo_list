const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            publicPath: '/',
        },
        hot: true,
        port: 8080,
        open: true,
        historyApiFallback: true,
        devMiddleware: {
            writeToDisk: true,
        },
    },
});