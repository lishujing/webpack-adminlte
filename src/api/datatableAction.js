/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-06-05 10:06:15
 * LastEditTime : 2020-06-05 10:42:14
 * Description  : 请求表格数据
 */ 

import http from "@/util/http"

export default {
	table1: data => {
		return http.get("/api/table1")
	},
	table2: data => {
		return http.ajax({
			url: "/api/table2"
		})
		// return http.get("/api/table2")
	}
}
