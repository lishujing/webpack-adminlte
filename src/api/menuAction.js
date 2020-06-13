/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-29 14:59:27
 * LastEditTime : 2020-06-05 10:34:56
 * Description  : 动态请求菜单
 */ 

import http from "@/util/http"

export default {
	menuList: data => {
		return http.post("/api/menulist", data)
	}
}
