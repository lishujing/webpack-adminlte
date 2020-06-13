/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-04-29 10:06:50
 * LastEditTime : 2020-06-11 15:24:13
 * Description  : webpack development config
 */

const webpack = require("webpack")
const merge = require("webpack-merge")

const baseConfig = require("./webpack.base.conf")
const config = require("./webpack.config")

module.exports = merge(baseConfig, {
	output: {
		path: config.resolve("../dist"),
		filename: "js/[name].[hash:4].js"
	},
	mode: "development",
	devServer: {
		host: "0.0.0.0",
		disableHostCheck: true,
		useLocalIp: true, 
		port: config.PORT,
		hot: true,
		open: true,
		historyApiFallback: true,
		contentBase: config.resolve("../dist"),
		compress: true,
		overlay: {
			warnings: false,
			errors: true
		},
		proxy: {
			"/api": {
				target: "http://localhost:9999",
			},
			"/mock": {
				target: "http://localhost:9999",
				pathRewrite: {
					"^/mock": ""
				}
			}
		},
		before: app => { }
	},
	devtool: "#cheap-module-eval-source-map",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader"
				]
			},
			{
				test: /\.less$/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					"less-loader"
				]
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					"sass-loader"
				]
			},
			{
				test: /(png|jpe?g|webp|gif)$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 200 * 1024,
						outputPath: "image",
						name: "[name].[hash:4].[ext]",
						esModule: false
					}
				}
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)??$/,
				loader: "url-loader",
				options: {
					limit: 10240,
					outputPath: "fonts",
					name: "[name].[hash:4].[ext]",
					esModule: false
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: 51200,
					outputPath: "medias",
					name: "[name].[hash:4].[ext]",
					esModule: false
				}
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
})



