const aux = require('./webpack.aux');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let mainDebugPage = new HtmlWebpackPlugin({
    template: './index.hbs',
    filename: 'index.html',
    pages: aux.getDebugPagesList(),
    chunks: []
});

module.exports = function (isCdn) {
    return {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer:{
        port: 3003,
        contentBase: './dist',
        inline: true
        },
        plugins: [mainDebugPage,...aux.getHtmlPlugins(isCdn)]
    };
};