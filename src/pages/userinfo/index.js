/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-18 17:08:32
 * LastEditTime : 2020-06-10 18:45:16
 * Description  : userinfo
 */ 

import "@/config/isLogin"
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
