/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-26 10:16:42
 * LastEditTime : 2020-06-04 15:07:41
 * Description  : 夜间模式和白天模式切换
 */ 

import Theme from "@/setting/theme"
const theme = new Theme()

const styleTag = document.createElement("style")
styleTag.rel = "stylesheet"
// styleTag.type = "text/css"
document.getElementsByTagName("body")[0].appendChild(styleTag)

/**
 * 	webModel:
 * 			-1: dark
 * 			 0:	auto
 * 			 1: light
 */
localStorage.getItem("webModel") || localStorage.setItem("webModel", 1)
const webModel = localStorage.getItem("webModel") || 1


if (webModel == 1) {
	styleTag.innerHTML = theme.lightStyle
	theme.light()
	$("#curModel").text("白天")
} else {
	styleTag.innerHTML = theme.darkStyle
	theme.dark()
	$("#curModel").text("夜晚")
}

let lastText = $("#curModel").text()
// 主题切换
$("#modelList").on("click", e => {
	let model = e.target.innerText
	if(lastText == model) return
	$("#curModel").text(model)
	if (model == "夜晚") {
		styleTag.innerHTML = theme.darkStyle
		theme.dark()
		localStorage.webModel = -1
	} else if (model == "白天") {
		styleTag.innerHTML = theme.lightStyle
		theme.light()
		localStorage.webModel = 1
	}
	lastText = model
})
