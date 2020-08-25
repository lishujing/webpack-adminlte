/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-04-29 10:07:41
 * LastEditTime : 2020-06-22 11:01:42
 * Description  : webpack common config
 */ 

const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")

const config = require("./webpack.config")

module.exports = {
	entry: config.getEntry("../src/pages/**/index.js"),
	resolve: {
		modules: [config.resolve("../node_modules")],
		extensions: [".js", ".vue", ".json", ".css"],
		alias: {
			"@": config.resolve("../src"),
			"@pages": config.resolve("../src/pages")
		}
	},
	externals: {
		jquery: "jQuery",
		"popper.js": "popper.js",
		"chart.js": "Chart"
	},
	module: {
		noParse: /jQuery/,
		rules: [
			{
				test: /\.js$/,
				loader: "eslint-loader",
				enforce: "pre",
				include: [config.resolve("../src")], // 指定检查的目录
				options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
					formatter: require("eslint-friendly-formatter") // 指定错误报告的格式规范
				}
			},
			{
				test: /\.js$/,
				loader: "babel-loader?cacheDirectory=true",
				exclude: /node_modules/,
				include: config.resolve("../src")
			},
			{
				test: /\.vue$/,
				use: ["vue-loader"],
				include: config.resolve("../src"),
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		...config.htmlPluginArr,
		new VueLoaderPlugin(),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ["**/*", "!static", "!static/**", "!manifest", "!manifest/**", "!dll", "!dll/**"],
			cleanStaleWebpackAssets: true
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			jquery: "jquery",
			"window.$": "jquery",
			"window.jQuery": "jquery",
			"window.jquery": "jquery",
			Popper: ["popper"]
		})
	]
}
