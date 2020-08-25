/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-29 15:10:27
 * LastEditTime : 2020-06-13 14:10:46
 * Description  : 全局公共的事件
 */ 

//  退出
export function logout() {
	$("#logout").on("click", e => {
		location.href = "/admin/login"
	})
}


// 加载完毕
export function loadingEnd(){
	let loadingDom = document.getElementById("Loading")
	loadingDom ? document.body.removeChild(document.getElementById("Loading")) : ""
}
