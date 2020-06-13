/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-27 20:13:44
 * LastEditTime : 2020-06-10 19:23:25
 * Description  : Please_add_description
 */

import "@/config/isLogin"
import "@/setting/index"
import "@/util/getMenu"
import "./index.scss"

import Notice from "@/util/message"
import articleAction from "@/api/articleAction"

// 引入tinymce
import "@/util/tinymce"
// window.tinymce.plugins = ["code", "lists", "advlist", "image", "link", "table", "help", "autosave"]


tinymce.init({
	selector: "#mytextarea",
	language: "zh_CN",
	plugins: "print save preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave bdmap indent2em autoresize lineheight formatpainter axupimgs",
	toolbar: "code save undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
                     styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
                     table media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs",
	height: 650, //编辑器高度
	min_height: 400,
	/*content_css: [ //可设置编辑区内容展示的css，谨慎使用
			"/static/reset.css",
			"/static/ax.css",
			"/static/css.css",
	],*/
	fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
	font_formats: "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif",
	link_list: [
		{ title: "预置链接1", value: "http://www.tinymce.com" },
		{ title: "预置链接2", value: "http://tinymce.ax-z.cn" }
	],
	save_enablewhendirty: false,
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
	image_list: [

	],
	image_class_list: [
		{ title: "None", value: "" },
		{ title: "Some class", value: "class-name" }
	],
	//importcss_append: true,
	//自定义文件选择器的回调内容
	file_picker_type: "image file media",
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
			console.log("image")
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
	//为内容模板插件提供预置模板
	templates: [
		{ title: "模板1", description: "介绍文字1", content: "模板内容" },
		{ title: "模板2", description: "介绍文字2", content: "<div class='mceTmpl'><span class='cdate'>CDATE</span>，<span class='mdate'>MDATE</span>，我的内容</div>" }
	],
	//content_security_policy: "script-src *;",
	extended_valid_elements: "script[src]",
	//
	template_cdate_format: "[CDATE: %m/%d/%Y : %H:%M:%S]",
	template_mdate_format: "[MDATE: %m/%d/%Y : %H:%M:%S]",
	autosave_ask_before_unload: false,
	toolbar_mode: "wrap",
	images_upload_base_path: "",   //  上传多张图片回调后的基本路径
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
	icons: "ax-color",

})
