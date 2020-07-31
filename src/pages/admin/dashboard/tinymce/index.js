/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : Please set LastEditors
 * Date         : 2020-05-27 20:13:44
 * LastEditTime : 2020-07-31 10:02:29
 * Description  : Please_add_description
 */

import "@/setting/index"
import "@/util/getMenu"
import "./index.scss"

import Notice from "@/util/message"
import articleAction from "@/api/articleAction"

// 引入tinymce
import TinyMce from "@/util/tinymce"
TinyMce.init(tinymce, "#mytextarea", {
	// 保存内容
	save_onsavecallback: function (e) {
		const content = tinymce.editors[0].getContent()
		articleAction.createArticle({ content })
			.then(res => {
				if (res.code == 200) {
					Notice.toast({
						icon: "success",
						heading: "消息提示",
						text: res.success,
						duration: 1000
					})
				} else {
					Notice.toast({
						icon: "error",
						heading: "错误提示",
						text: res.error,
						duration: 1200
					})
				}

			}).catch(error => {
				Notice.toast({
					icon: "error",
					heading: "错误提示",
					text: error
				})
			})
	},
	// 上传文件、图片、多媒体
	file_picker_callback: function (callback, value, meta) {
		if (meta.filetype === "file") {
			var filetype = ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4"
			switch (meta.filetype) {
				case "image":
					filetype = ".jpg, .jpeg, .png, .gif"
					upurl = "upimg.php"
					break
				case "media":
					filetype = ".mp3, .mp4"
					upurl = "upfile.php"
					break
				case "file":
				default:
			}
			const uploadFile = document.createElement("input")
			uploadFile.setAttribute("type", "file")
			document.body.appendChild(uploadFile)
			uploadFile.setAttribute("accept", filetype)
			uploadFile.click()
			uploadFile.onchange = function () {
				const file = this.files[0]
				var xhr, formData
				xhr = new XMLHttpRequest()
				xhr.withCredentials = false
				xhr.open("POST", "/api/upload/file")
				xhr.onload = function () {
					var json
					if (xhr.status != 200) {
						failure("HTTP Error: " + xhr.status)
						return
					}
					json = JSON.parse(xhr.responseText)
					console.log(json)
					if (!json || typeof json.location != "string") {
						failure("Invalid JSON: " + xhr.responseText)
						return
					}
					callback(json.location)
				}
				formData = new FormData()
				formData.append("file", file, file.name)
				xhr.send(formData)
			}
		}

		if (meta.filetype === "image") {
			const filetype = ".jpg, .jpeg, .png, .gif"
			const uploadFile = document.createElement("input")
			uploadFile.setAttribute("type", "file")
			document.body.appendChild(uploadFile)
			uploadFile.setAttribute("accept", filetype)
			uploadFile.click()
			uploadFile.onchange = function () {
				const file = this.files[0]
				var xhr, formData
				xhr = new XMLHttpRequest()
				xhr.withCredentials = false
				xhr.open("POST", "/api/upload/file")
				xhr.onload = function () {
					var json
					if (xhr.status != 200) {
						failure("HTTP Error: " + xhr.status)
						return
					}
					json = JSON.parse(xhr.responseText)
					console.log(json)
					if (!json || typeof json.location != "string") {
						failure("Invalid JSON: " + xhr.responseText)
						return
					}
					callback(json.location)
					// console.log(json)
					// window.tinymce.get("mytextarea").insertContent(`<img width='100%' src='${json.location}'>`)
				}
				formData = new FormData()
				formData.append("file", file, file.name)
				xhr.send(formData)
			}
			// window.tinymce.get("mytextarea").insertContent("<img width='100%' src='https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg'>")
		}
		if (meta.filetype === "media") {
			var filetype = ".mp3, .mp4"
			const uploadFile = document.createElement("input")
			uploadFile.setAttribute("type", "file")
			document.body.appendChild(uploadFile)
			uploadFile.setAttribute("accept", filetype)
			uploadFile.click()
			uploadFile.onchange = function () {
				const file = this.files[0]
				var xhr, formData
				xhr = new XMLHttpRequest()
				xhr.withCredentials = false
				xhr.open("POST", "/api/upload/video")
				xhr.onload = function () {
					var json
					if (xhr.status != 200) {
						failure("HTTP Error: " + xhr.status)
						return
					}
					json = JSON.parse(xhr.responseText)
					console.log(json)
					if (!json || typeof json.location != "string") {
						failure("Invalid JSON: " + xhr.responseText)
						return
					}
					callback(json.location)
				}
				formData = new FormData()
				formData.append("file", file, file.name)
				xhr.send(formData)
			}
		}
	},
	// aximgs插件上传图片回调
	images_upload_handler: function (blobInfo, succFun, failFun) {
		var xhr, formData
		var file = blobInfo.blob()//转化为易于理解的file对象
		xhr = new XMLHttpRequest()
		xhr.withCredentials = false
		xhr.open("POST", "/api/upload/img")
		xhr.onload = function () {
			var json
			if (xhr.status != 200) {
				failFun("HTTP Error: " + xhr.status)
				return
			}
			json = JSON.parse(xhr.responseText)
			if (!json || typeof json.location != "string") {
				failFun("Invalid JSON: " + xhr.responseText)
				return
			}
			succFun({
				url: json.location,
				min: json.min,
				max: json.max
			})
			// succFun(json.location)

		}
		formData = new FormData()
		formData.append("file", file, file.name)
		xhr.send(formData)
	},
})
