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
import Notice from "@/components/message/message"

articleAction.getArticle()
	.then(async res => {
		if(res.code == 200){
			Notice.success(res.success)
			$("#editor").html(res.data)
		}else{
			Notice.error(res.error)
		}
	}).catch(error => {
		Notice.error(error)
	})
