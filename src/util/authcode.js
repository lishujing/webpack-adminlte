/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-29 10:39:23
 * LastEditTime : 2020-05-31 11:31:23
 * Description  : 验证码获取与刷新
 */ 

export function refreshAuthCode() {
	document.getElementById("curAuthCode").src = "/api/authcode?d" + Math.random() * 100
}

export function getAuthCodeCookie(codeName) {
	var name = codeName + "="
	var ca = document.cookie.split(";")
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i].trim()
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
	}
	return ""
}
