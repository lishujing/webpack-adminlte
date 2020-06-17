/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-04-29 10:06:24
 * LastEditTime : 2020-06-17 20:10:08
 * Description  : webpack utils
 */ 

const glob = require("glob")
const path = require("path")
const webpack = require("webpack")
const htmlWebpackPlugin = require("html-webpack-plugin")
const moment = require("moment")
const npmPackage = require("../package.json")


// configure Copyright Information
const Copyright = `
  @Author: ${npmPackage.config.Author || "the author"}
  @LastEditors: ${npmPackage.config.LastEditors || "the lastEditor"}
  @Date: ${npmPackage.config.date || moment().format("YYYY-MM-DD HH:mm:ss")}
  @LastEditTime: ${moment().format("YYYY-MM-DD HH:mm:ss")}
  @Description: ${npmPackage.config.description || "Please add your description"}
 `


// webpack devserver config
const PORT = process.env.port || process.env.npm_config_port || 9696



// add webpack vendor library to change your project volumn
const VendorLibrary = {
	// chart: ["chart.js"],
	// vue: ['vue', 'vuex', 'vue-router'],  // add some bootstrap library in project.
	// bootstrap: ['bootstrap'],  // you can add orther library for using.
	// jQuery: ['jquery'],
	// popper: ['popper.js']
}


// judge manifest has existed?
const ManifestLen = Object.keys(VendorLibrary).length
const realManifest = glob.sync(resolve("../dist/manifest") + "/*.json").length
/**
 * @description: 判断是否需要执行`npm run dll`
 * @param {type} 
 * @return: Boolean
 */
function hasRunDll() {
	if (ManifestLen == 0) return false
	if (ManifestLen !== realManifest) return false
	return true
}


// much pages html files
let htmlPluginArr = []

/**
 * @description: muchpages entries,back each page entry
 * @param {string} FilePath
 * @return: File Real Path
 */
function getEntry(entryPath) {
	let entry = {}

	glob.sync(path.resolve(__dirname, entryPath)).forEach((filePath) => {
		let entryName = filePath.match(/\/pages\/(.+)\/(.+).js/)[1]
		entry[entryName] = path.resolve(__dirname, filePath)

		let htmlPath = filePath.slice(0, filePath.lastIndexOf("/") + 1)
		htmlPluginArr.push(
			new htmlWebpackPlugin({
				template: path.resolve(__dirname, htmlPath, "index.html"),
				filename: entryName == "index" ? "index.html" : (entryName + "/index.html"),
				hash: false,
				title: "",
				chunks: [entryName, "common"],
				inject: true,
				cache: true,
				minify:
					process.env.NODE_ENV === "development"
						? false
						: {
							removeAttributeQuotes: true,
							collapseWhitespace: true,
						},
				publicPath: "./"
			})
		)
	})
	return entry
}


/**
 * @description: back file real path
 * @param {string} FilePath
 * @return: File Real Path
 */
function resolve(dir) {
	return path.join(__dirname, dir)
}


/**
 * @description: judge run dll script
 * @return:
 */
function noRunDll() {
	ManifestLen ? console.warn(
		"Please run `npm run dll` script to extract library to minimize bundle volume!\nAnd Your can look at package.json" +
		" for scripts and readme for guide.\nAnd now it's done\n"
	) : null
}


module.exports = {
	PORT,
	VendorLibrary,
	ManifestLen,
	htmlPluginArr,
	Copyright,
	resolve,
	noRunDll,
	getEntry,
	hasRunDll
}
