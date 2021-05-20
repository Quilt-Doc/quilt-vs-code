/*"@babel/core": "^7.11.1",
"@babel/preset-env": "^7.11.0",
"@babel/preset-react": "^7.10.4",
"@babel/preset-typescript": "^7.10.4",

"babel-loader": "^8.1.0",
"babel-preset-env": "^1.7.0",
"babel-preset-es2015": "^6.24.1",

"html-loader": "^1.1.0",
"html-webpack-plugin": "^4.3.0",

"webpack": "^4.44.1",
"webpack-cli": "^3.3.12",
"webpack-dev-server": "^3.11.0",
*/

/*
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./app/index.js",
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        contentBase: "./dist",
        hot: true,
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
};*/
