/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-06-03 11:17:08
 * LastEditTime : 2020-06-05 15:06:32
 * Description  : lockscreen
 */
import Notice from "@/util/message"

import "@/config/isLogin"
import "@/setting/index"
import Valid from "@/config/validateinput"

const valid = new Valid([
	{ id: "password", error: "请输入解锁密码" },
	{ submit: "lock-btn" }
])
valid.submit(data => {
	if (data.password == localStorage.getItem("lockpwd")) {
		Notice.toast({
			icon: "success",
			heading: "消息提示",
			text: "欢迎回来",
			duration: 1000
		}).then(() => {
			localStorage.lockscreen = false
			location.href = "/"
		})
	} else {
		valid.error({ id: "password", error: "密码错误" })
		Notice.toast({
			icon: "error",
			heading: "错误提示",
			text: "密码错误",
			duration: 3000
		})
	}
	return false
})
