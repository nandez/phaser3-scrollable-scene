"use strict";

const webpack = require("webpack");
const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

let cleanOptions = {
    root: `${__dirname}`,
    exclude: [],
    verbose: true,
    dry: false
};

let optimizeOptions = {
    include: /\.min\.js$/,
    parallel: true,
    sourceMap: false,
    uglifyOptions: {
        compress: true,
        ie8: false,
        ecma: 5,
        output: {
            comments: false
        },
        warnings: false
    },
    warningsFilter: src => false
};

module.exports = {
    mode: "production",
    context: `${__dirname}/src/`,
    entry: {
        "phaser3-scrollable-scene-plugin": "./plugin.js",
        "phaser3-scrollable-scene-plugin.min": "./plugin.js"
    },
    output: {
        path: `${__dirname}/dist/`,
        filename: "[name].js",
        library: "Phaser3ScrollableScenePlugin",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    optimization: {
        minimize: true,
        minimizer: [new UglifyJSPlugin(optimizeOptions)]
    },
    plugins: [
        new CleanWebpackPlugin(["dist/*"], cleanOptions)
    ]
};
