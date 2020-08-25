/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : Please set LastEditors
 * Date         : 2020-05-26 15:53:29
 * LastEditTime : 2020-07-31 10:19:30
 * Description  : adminlte config
 */

import BackTop from "@/components/backtop/backtop"  // backtop plugin
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import "@/setting/themeToggle"  // toggle theme
import "@/setting/activeLink"   // tag sidebar link
import fullscreen from "@/setting/fullscreen"   // fullscreen
import "@/setting/sidebar"  // control sidebar
import "@/style/custom.scss"  // custom style(system level)
import breadcrumb from "./breadcrumb"
import { logout, loadingEnd } from "@/setting/globalEven"  // 全局事件

// 设置返回顶部button
new BackTop({
	root: ".os-viewport",
	classIndex: 2,
	icon: true,
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


// 顶部进度条
NProgress.start()

// 面包屑
breadcrumb()

// 全屏
fullscreen()


window.onload = () => {
	NProgress.done()

	logout()

	loadingEnd()
}
