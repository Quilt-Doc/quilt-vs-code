const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./app/index.js",
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        contentBase: "./dist",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: [
                    {
                        loader: "url-loader?limit=100000",
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./app/index.html",
            filename: "./index.html",
        }),
        new webpack.ProvidePlugin({
            React: "react",
            ReactDOM: "react-dom",
        }),
    ],
};
