/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : Please set LastEditors
 * Date         : 2020-05-18 17:08:32
 * LastEditTime : 2020-07-31 10:02:05
 * Description  : userinfo
 */ 

import "@/setting/index"
import "@/util/getMenu"

import articleAction from "@/api/articleAction"
import Notice from "@/util/message"
// import hljs from "highlight.js"
// import "highlight.js/styles/railscasts.css"
// import Prism from "prismjs"
// import "prismjs/themes/prism.css"

articleAction.getArticle()
	.then(async res => {
		if(res.code == 200){
			Notice.toast({
				icon: "success",
				heading: "消息提示",
				text: res.success
			})
			// const code = await Prism.highlight(res.data, Prism.languages.javascript, "javascript")
			$("#editor").html(res.data)
		}else{
			Notice.toast({
				icon: "error",
				heading: "错误提示",
				text: res.error
			})
		}
	}).catch(error => {
		Notice.toast({
			icon: "error",
			heading: "错误提示",
			text: error
		})
	})
