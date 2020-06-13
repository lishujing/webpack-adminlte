/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-04-29 15:04:52
 * LastEditTime : 2020-06-13 14:24:43
 * Description  : mock server
 */

const path = require("path")
const express = require("express")
const app = new express()
const bodyParser = require("body-parser")
const openBrowser = require("open")

const LOCAL_IP = require("./util/getIPAddress")()

const port = 9999
app.listen(port, () => {
	console.log(`mock server is running on port [${port}]!`)
})

require("./http")(app)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static")))  // 添加静态服务

// 开发接口
app.use("/api", require("./router"))
app.use("/api", require("./authCode"))

// 打包后的静态服务
const NODE_ENV = process.argv.filter((v, i) => v.includes("NODE_ENV"))[0].slice(9) == "production" ? true : false
NODE_ENV ? (
	app.use(express.static(path.resolve(__dirname, "../dist"))) &&
	openBrowser(`http://${LOCAL_IP}:${port}`) &&
	console.log(`
	\n
App running at:
- Local:   http://localhost:${port}
- Network: http://${LOCAL_IP}:${port}\n`)
) : null
