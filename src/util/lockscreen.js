/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-06-03 10:57:13
 * LastEditTime : 2020-06-13 14:38:22
 * Description  : 添加锁屏监控
 */

export default class LockScreen {
	constructor() {
	}
	static control() {
		const whiteList = ["/admin/login/", "/admin/register/", "/admin/forgot-password/", "/lockscreen/", "/admin/login", "/admin/register", "/admin/forgot-password", "/lockscreen"]
		document.addEventListener("keyup", e => {
				if (e.key == "Enter" && e.shiftKey && e.ctrlKey) {
				const href = location.pathname
				if (!whiteList.includes(href)) {
					localStorage.setItem("lockscreen", true)
					localStorage.setItem("lockpwd", "admin")
					location.href = "/lockscreen"
				}
			}
		})
	}
}

