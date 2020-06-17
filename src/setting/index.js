/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-26 15:53:29
 * LastEditTime : 2020-06-17 19:46:51
 * Description  : adminlte config
 */

import BackTop from "@/util/backtop"  // backtop plugin
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import "@/setting/themeToggle"  // toggle theme
import "@/setting/activeLink"   // tag sidebar link
import "@/setting/fullscreen"   // fullscreen
import "@/setting/sidebar"  // control sidebar
import "@/setting/globalEven"  // 全局事件
import lockscreen from "@/util/lockscreen"
import "@/setting/custom.scss"  // custom style(system level)
import "@/setting/breadcrumb"

// 设置返回顶部button
new BackTop({
	root: ".os-viewport",
	classIndex: 2,
	innerText: "TOP",
	fontSize: "18px",
	width: "40px",
	height: "40px",
	speed: 15,
	hidden: 200,
	right: "20px"
})


// 设置内容区域滚动条
$(function () {
	$(".content").overlayScrollbars({
		className: "os-theme-light os-host-transition os-host-scrollbar-horizontal-hidden",
		sizeAutoCapable: true,
		scrollbars: {
			visibility: "auto",
			clickScrolling: true,
			autoHide: "move",
			autoHideDelay: 1000,
			touchSupport: false
		}
	})
})


// 开启锁屏
lockscreen.control()

// 顶部进度条
NProgress.start()
window.onload = () => NProgress.done()
