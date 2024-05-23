const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const environment = process.env.NODE_ENV || "prod";
const isProd = environment === "prod";

const vendors = [
    "rbush"
];

const webpackConfig = {
    mode: "none",
    entry: {
        "leaflet.canvas-markers": "./src/_full.js",
        "leaflet.canvas-markers.standalone": "./src/_standalone.js",
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".js"]
    },
    optimization: {
	minimize: true,
	minimizer: [
	    new TerserPlugin({
		test: /\.js(\?.*)?$/i,
		terserOptions: {
		    sourceMap: !isProd
		}
	    })
	],
    },
    module: {
        rules: [
            {
                test: /rbush.js/,
                use: "script-loader"
            }
        ]
    }
};

module.exports = webpackConfig;
