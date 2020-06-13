/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-06-03 09:25:08
 * LastEditTime : 2020-06-10 19:29:45
 * Description  : 封装视频上传
 */

const fs = require("fs")
const path = require("path")
const formidable = require("formidable")
const formatTime = require("silly-datetime")

/* 图片上传 */
module.exports = (req, res) => {
	let form = new formidable.IncomingForm()
	form.encoding = "utf-8"
	form.uploadDir = path.join(__dirname, "../static/video")
	form.keepExtensions = true
	form.maxFieldsSize = 50 * 1024 * 1024
	form.parse(req, (err, fields, files) => {
		let file = files.file
		/* 如果出错，则拦截 */
		if (err) {
			return res.status(500).json({ code: "500", error: "服务器内部错误" })
		}
		if (file.size > form.maxFieldsSize) {
			fs.unlink(file.path)
			return res.status(200).json({ code: "412", error: "图片不能超过5M" })
		}

		/* 拼接新的文件名 */
		let fileName = file.name
		let newPath = form.uploadDir + "/" + fileName

		fs.rename(file.path, newPath, (err) => {
			if (err) {
				return res.status(200).json({ code: 412, "error": "视频上传失败" })
			} else {
				return res.send({ 
					"code": 200, 
					"success": "视频上传成功", 
					location: "http://localhost:9999/video/" + fileName
				})
			}
		})
	})
}
