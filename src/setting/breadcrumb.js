/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-06-16 15:51:08
 * LastEditTime : 2020-06-17 19:41:33
 * Description  : 动态改变面包屑
 */

import routes from "@/route"

export default function breadcrumb() {
	const pageTitle = $("#page-title")
	const breadcrumbContent = $("#breadcrumb-content")
	let path = location.pathname

	const lastSprit = path.lastIndexOf("/")
	if (lastSprit != 0 && lastSprit >= path.length - 1) {
		path = path.slice(0, lastSprit)
	}

	let strContent = ""

	const app = routes.filter(item => item.path == path).length ? routes.filter(item => item.path == path)[0] : null

	if (app) {
		pageTitle.html(app.children[app.children.length - 1].title)
		app.children.forEach((item, index) => {
			if (!item.name.length) return
			if (item.isLink) {
				let path = ""
				for (let i = 0; i <= index; i++) {
					path += app.children[i].path
				}
				if (app.children.length == index + 1) {
					strContent += `<li class='breadcrumb-item'><span><i class="fas ${item.icon}"></i>${item.name}</span></li>`
				} else {
					strContent += `<li class='breadcrumb-item'><a href='${path}'><i class="fas ${item.icon}"></i>${item.name}</a></li>`
				}
			} else {
				strContent += `<li class='breadcrumb-item ban-cursor'><span><i class="fas ${item.icon}"></i>${item.name}</span></li>`
			}
		})
		breadcrumbContent.html(strContent)
	}

}



