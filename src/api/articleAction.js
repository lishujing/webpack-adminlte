/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-06-08 14:42:30
 * LastEditTime : 2020-06-08 15:07:38
 * Description  : 文章获取api
 */ 

import http from "@/util/http"

export default {
	getArticle: () => {
		return http.get("/api/article")
	},
	createArticle: data => {
		return http.post("/api/article/add", data)
	}
}
