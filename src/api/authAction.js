/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-28 13:59:07
 * LastEditTime : 2020-06-05 10:34:30
 * Description  : 授权API<登录、注册...>
 */ 

import http from "@/util/http"

export default {
	test: param => {
		return http.get("/api/test")
	},
	login: data => {
		return http.post("/api/login", data)
		// return new http({
		// 	url: "/api/login",
		// 	type: "post",
		// 	data
		// })
	},
	register: data => {
		return http.post("/api/register", data)
	}
}
