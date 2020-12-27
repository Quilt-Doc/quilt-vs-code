const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");


module.exports = {
    entry: "./app/index.js",
    mode: "development",
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
        ],
    },
    plugins: [
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
