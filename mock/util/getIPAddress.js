/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-30 16:46:25
 * LastEditTime : 2020-05-31 11:07:26
 * Description  : 获取本机IP
 */

module.exports = () => {
	var interfaces = require("os").networkInterfaces()
	for (var devName in interfaces) {
		var iface = interfaces[devName]
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i]
			if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
				return alias.address
			}
		}
	}
}
