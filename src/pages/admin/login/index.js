/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : Please set LastEditors
 * Date         : 2020-05-18 17:08:32
 * LastEditTime : 2020-07-31 10:02:36
 * Description  : Please_add_description
 */

import "@/setting/index"
import "@/assets/style/loginregister.scss"
import authorizeAPI from "@/api/authAction"
import { getAuthCodeCookie, refreshAuthCode } from "@/util/authcode"
import Notice from "@/components/message/message"
import Validate from "@/config/validateinput"
import { redirectPath } from "@/util/utils"

const valid = new Validate([
	{ id: "account", error: "账号不能为空" },
	{ id: "password", error: "密码不能为空" },
	{ id: "authcode", error: "验证码不能为空" },
	{ submit: "login-btn" }
])

// 提交登录表单
valid.submit(() => {
	const authcode = $("#authcode").val()
	let realAuthCode = getAuthCodeCookie("authcode")
	if (realAuthCode !== authcode) {
		refreshAuthCode()
		valid.error({ id: "authcode", error: "验证码错误" })
		return false
	}
	authorizeAPI.login({ account: valid.data.account, password: valid.data.password }).then(res => {
		if (res.code == 200) {
			Notice.success(res.success).then(() => {
				localStorage.setItem("userInfo", JSON.stringify(res.data))
				localStorage.setItem("isLogin", true)
				localStorage.lockscreen = false
				location.href = redirectPath()
			})

		} else {
			refreshAuthCode()
			valid.error([
				{ id: "account", error: res.error },
				{ id: "password", error: res.error },
			])
			Notice.error(res.error)
		}
	}).catch(error => console.log(error))
	return false
})

// 刷新验证码
$("#curAuthCode").on("click", refreshAuthCode)
