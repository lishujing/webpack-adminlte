/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-04-29 10:07:55
 * LastEditTime : 2020-05-31 11:13:31
 * Description  : extract dll config
 */ 

const webpack = require("webpack")

const config = require("./webpack.config")

module.exports = {
  mode: "production",
  entry: config.VendorLibrary,  // inject the vendors, you maybe add or remove the vendor to change it in
  // "webpack.config.js" file
  output: {
    filename: "[name].js",
    path: config.resolve("../dist/dll"),
    library: "[name]"
  },
  plugins: [
		new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new webpack.DllPlugin({
      name: "[name]",
      path: config.resolve("../dist/manifest/[name]_manifest.json")
    })
  ]
}
