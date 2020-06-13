/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-26 17:20:51
 * LastEditTime : 2020-06-10 09:22:50
 * Description  : 全屏显示
 */ 

// 全屏显示和退出全屏
let isFullscreen = false
$("#fullscreen").on("click", e => {
	isFullscreen ? exitFullScreen() : fullScreen(document.body)
})
// 退出全屏
function exitFullScreen() {
	if (!isFullscreen) return
	if (document.exitFullScreen) {
		document.exitFullScreen()
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen()
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen()
	} else if (element.msExitFullscreen) {
		element.msExitFullscreen()
	}
	$(".screen-control").removeClass("fa-compress-arrows-alt").addClass("fa-compress")
	isFullscreen = false
}
// 显示全屏
function fullScreen(ele) {
	if (isFullscreen) return
	if (ele.requestFullscreen) {
		ele.requestFullscreen()
	} else if (ele.mozRequestFullScreen) {
		ele.mozRequestFullScreen()
	} else if (ele.webkitRequestFullscreen) {
		ele.webkitRequestFullscreen()
	} else if (ele.msRequestFullscreen) {
		ele.msRequestFullscreen()
	}
	$(".screen-control").removeClass("fa-compress").addClass("fa-compress-arrows-alt")
	isFullscreen = true
}
