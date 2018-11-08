// https://www.robinwieruch.de/minimal-react-webpack-babel-setup/


const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require('webpack');



module.exports = {
    entry: path.join(__dirname, "src", "index.jsx"),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
                exclude: [
                    path.join(__dirname, '../node_modules') // 由于node_modules都是编译过的文件，这里我们不让babel去处理其下面的js文件
                ]
            }, {
                test: /.jsx$/, //使用loader的目标文件。这里是.jsx
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    // options: {
                    //     modules: true,
                    //     localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    // }
                }]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: 'css-loader',
                    // options: {
                    //     modules: true,
                    //     localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    // } // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }],
                include: [
                    path.resolve(__dirname, "node_modules", "antd"),
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, "src", "index.html"),
            filename: path.join(__dirname, "dist", "index.html")
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 4954,
        contentBase: "./dist",
        historyApiFallback: true,
        hot: true
    }
}