/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-26 15:59:23
 * LastEditTime : 2020-06-13 14:34:44
 * Description  : 标记点中的侧边栏链接
 */

setTimeout(() => {
	const href = window.location.pathname
	const lastSprit = href.lastIndexOf("/")
	$(`a[href="${href}"]`).addClass("active")
	if ($(`a[href="${href}"]`).parent().parent().siblings("a")) {
		$(`a[href="${href}"]`).parent().parent().siblings("a").addClass("active")
		$(`a[href="${href}"]`).parent().parent().parent("li").addClass("menu-open")
	}
	if (lastSprit >= href.length - 1) {
		const perfectHref = href.slice(0, lastSprit)
		$(`a[href="${perfectHref}"]`).addClass("active")
		if ($(`a[href="${perfectHref}"]`).parent().parent().siblings("a")) {
			$(`a[href="${perfectHref}"]`).parent().parent().siblings("a").addClass("active")
			$(`a[href="${perfectHref}"]`).parent().parent().parent("li").addClass("menu-open")
		}
	}
}, 500)
