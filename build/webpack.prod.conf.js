/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-04-29 10:07:16
 * LastEditTime : 2020-06-13 13:54:08
 * Description  : webpack production config
 */ 

const webpack = require("webpack")
const merge = require("webpack-merge")
const extractCss = require("mini-css-extract-plugin")
const optimizeCss = require("optimize-css-assets-webpack-plugin")
const uglifyJS = require("uglifyjs-webpack-plugin")
const glob = require("glob")
const PurgressWebpackPlugin = require("purgecss-webpack-plugin")

const baseConfig = require("./webpack.base.conf")
const config = require("./webpack.config")

const prodConfig = {
	output: {
		path: config.resolve("../dist"),
		filename: "js/[name].[chunkhash:4].js"
	},
	mode: "production",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					extractCss.loader,
					"css-loader",
					"postcss-loader"
				]
			},
			{
				test: /\.less$/,
				use: [
					extractCss.loader,
					"css-loader",
					"postcss-loader",
					"less-loader"
				]
			},
			{
				test: /\.scss$/,
				use: [
					extractCss.loader,
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
						esModule: false,
						limit: 1 * 1024,
						outputPath: "image",
						publicPath: "/image",
						name: "[name].[hash:4].[ext]"
					}
				}
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)??$/,
				loader: "url-loader",
				options: {
					limit: 10240,
					publicPath: "/fonts",
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
					publicPath: "/medias",
					outputPath: "medias",
					name: "[name].[hash:4].[ext]",
					esModule: false
				}
			}
		]
	},
	plugins: [
		new extractCss({
			filename: "style/[name].[contenthash:4].css"
		}),
		new webpack.IgnorePlugin(/\.\/locale/, /moment/),
		// new PurgressWebpackPlugin({
		// 	paths: glob.sync(config.resolve("../src/**/*"), { nodir: true })
		// }),
		new webpack.BannerPlugin(config.Copyright)
	],
	optimization: {
		minimizer: [
			new optimizeCss({
				cssProcessorOptions: {
					safe: true,
					autoprefixer: { disable: true },
					mergeLonghand: false,
					discardComments: {
						removeAll: true
					}
				},
				canPrint: true
			}),
			new uglifyJS({
				cache: true,
				sourceMap: false,
				parallel: true,
				extractComments: false,
				uglifyOptions: {
					compress: {
						unused: true,
						drop_debugger: true,
						drop_console: true
					},
					// output: {
					// 	comments: false,
					// 	beautify: false
					// }
				}
			})
		],
		splitChunks: {
			chunks: "all",   // 同步和异步模块都要做代码分割
			minSize: 30000,   // 模块大于30kb才做代码分割
			maxSize: 50000,  // 模块大于50kb进行二次分割
			minChunks: 2,   // 某个模块被引用一次就做代码分割(否则打包进去)
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: "chunk~",
			name: false,   // chunkName 是否添加文件名，添加了感觉名字太长了
			cacheGroups: {
				vender: {
					priority: 1,
					test: /\/node_modules\//,
					chunks: "initial",
					minSize: 0,
					minChunks: 2
				},
				common: {
					chunks: "initial",
					minSize: 0,
					minChunks: 2
				}
			}
		}
	}
}

config.hasRunDll()
	? Object.keys(config.VendorLibrary).forEach(vendorName => {
		prodConfig.plugins.push(
			new webpack.DllReferencePlugin({
				manifest: config.resolve(`../dist/manifest/${vendorName}_manifest.json`)
			})
		)
	})
	: config.noRunDll()

module.exports = merge(baseConfig, prodConfig)
