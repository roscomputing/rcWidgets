const merge = require('webpack-merge');
const aux = require('./webpack.aux');
const webpack = require('webpack');

const config = {
    entry: aux.getEntries(),
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        library: '[name]',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            { test: /\.hbs$/, loader: "handlebars-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff", options: {name: 'fonts/[hash].[ext]'} },
            { test: /\.ttf$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
            { test: /\.eot$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
            { test: /\.svg$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$/, loader: "file-loader", options: {name: 'images/[hash].[ext]'} },
            { test: /\.(html)$/, use: { loader: 'html-loader', options: { attrs: [':data-src'] } } },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                ],
            }
        ]
    }
};

module.exports = function(env) {
    let conf = merge(config, env.production ? require('./webpack.prod')() : require('./webpack.dev')(env.cdn));

    if (env.cdn) {
        conf.output.libraryTarget = 'var';
        conf.output.filename = '[name]-cdn.js'
    }

    return conf;
};