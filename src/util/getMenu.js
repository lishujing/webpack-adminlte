/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-29 14:56:37
 * LastEditTime : 2020-06-11 13:47:21
 * Description  : 根据权限动态初始化菜单
 */ 
 
import menuAction from "@/api/menuAction"

const role = JSON.parse(localStorage.getItem("userInfo")).role
menuAction.menuList({role})
	.then(res => {
		$(".mt-2").html(res.success)
	})


