/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-26 17:01:23
 * LastEditTime : 2020-06-13 17:21:48
 * Description  : 用户注册
 */

import "@/setting/index"
import "@/assets/style/loginregister.scss"
import authorizeAPI from "@/api/authAction"
import { getAuthCodeCookie, refreshAuthCode } from "@/util/authcode"
import Notice from "@/util/message"
import Validate from "@/config/validateinput"

const valid = new Validate([
	{ id: "account", error: "账号不能为空", type: "string", typeError: "必须是字符串", min: 2, max: 6, lengthError: "长度在2-6之间" },
	{ id: "password", error: "密码不能为空", max: 10, min: 6, lengthError: "长度在6-10之间", type: "number", typeError: "必须是数字" },
	{ id: "confirmPwd", error: "确认密码不能为空", target: "password" },
	{ id: "authcode", error: "验证码不能为空" },
	{ submit: "register-btn" }
])
// 注册表单
valid.submit(() => {
	const authcode = $("#authcode").val()
	let realAuthCode = getAuthCodeCookie("authcode")
	if (realAuthCode !== authcode) {
		refreshAuthCode()
		valid.error({ id: "authcode", error: "验证码错误" })
		return false
	}
	authorizeAPI.register({ account: valid.data.account, password: valid.data.password }).then(res => {
		if (res.code == 200) {
			Notice.toast({
				heading: "消息提示",
				text: res.success,
				icon: "success",
				close: false
			}).then(() => location.href = "/admin/login")
		} else {
			refreshAuthCode()
			valid.error({ id: "account", error: res.error })
			Notice.toast({
				heading: "错误提示",
				text: res.error,
				icon: "error",
				duration: false
			})
		}
	})
	return false
})

// 刷新验证码
$("#curAuthCode").on("click", refreshAuthCode)
