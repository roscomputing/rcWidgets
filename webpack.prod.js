const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function () {
    return {
        mode: 'production',
        module: { rules: [{
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'less-loader',
                ],
            }]
        },
        plugins: [new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })]
    };
};