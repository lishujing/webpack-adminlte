/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-29 13:44:09
 * LastEditTime : 2020-06-13 14:38:36
 * Description  : 判断是否登录
 */

const whiteList = ["/admin/login/", "/admin/register/", "/admin/forgot-password/", "/admin/login", "/admin/register", "/admin/forgot-password", "/lockscreen", "/lockscreen/"]
const href = location.pathname
const isLogin = localStorage.getItem("isLogin")
const isLock = localStorage.getItem("lockscreen")
if (isLogin == "true") {
	if (isLock == "true") {
		whiteList.includes(href) ? null : location.href = "/lockscreen"
	} else {
		whiteList.includes(href) ? location.href = "/" : null
	}
} else {
	!whiteList.includes(href) && (location.href = "/admin/login")
}
