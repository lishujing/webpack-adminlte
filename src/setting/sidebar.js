/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-26 17:22:47
 * LastEditTime : 2020-05-31 11:30:18
 * Description  : 配置sidebar行为
 */ 

// 侧边栏行为控制
if (localStorage.getItem("sidebarCollapse") == 1) {
	$("body").addClass("sidebar-collapse")
	$(".fas.fa-bars").addClass("rotateBarIcon")
}
$("#toggleSideBar").on("click", e => {
	let isCollapse = $("body").hasClass("sidebar-collapse")
	isCollapse ?
		localStorage.setItem("sidebarCollapse", 0)
		: localStorage.setItem("sidebarCollapse", 1)
	$("body").hasClass("sidebar-closed") ?
		null
		:
		($(".fas.fa-bars").hasClass("rotateBarIcon") ?
			$(".fas.fa-bars").removeClass("rotateBarIcon")
			: $(".fas.fa-bars").addClass("rotateBarIcon"))
})
