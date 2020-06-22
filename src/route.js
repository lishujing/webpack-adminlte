/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-06-16 16:30:30
 * LastEditTime : 2020-06-18 10:22:52
 * Description  : 系统路由(二级路径不能以"/"开头，每个路由的最后一项"isLink===false")
 */

// 系统路由对应pages
const routes = [
	{
		path: "/",
		isLink: true,
		name: "后台首页",
		children: [
			{
				path: "admin",
				isLink: false,
				children: [
					{
						path: "/dashboard",
						isLink: false,
						name: "仪表盘",
						children: [
							{
								path: "/table",
								isLink: false,
								name: "表格示例",
							},
							{
								path: "/date",
								isLink: false,
								name: "日期组件",
							},
							{
								path: "/tinymce",
								isLink: false,
								name: "富文本示例",
							},
						]
					},
				]
			},
			{
				path: "userinfo",
				isLink: false,
				name: "用户信息",
			}
		]
	}
]

// 计算路由目标对象
let arr = []

// 路由中间件参数
let middleParam = {
	path: "",
	children: []
}

perfectRoute(middleParam, routes)
// 计算路由
function perfectRoute(obj, routes) {
	routes.forEach(item => {
		let ok = JSON.parse(JSON.stringify(obj))
		if (item.children && item.children.length) {
			let calc = {
				path: ok.path + item.path,
				children: ok.children.push({
					name: item.name || "",
					path: item.path,
					isLink: item.isLink
				}) && ok.children
			}
			// 是路径添加进去
			if (item.isLink) {
				arr.push(calc)
			}
			// 递归
			perfectRoute(calc, item.children)
		} else {
			// 底路径
			ok.path += item.path
			ok.children.push({
				name: item.name,
				path: item.path,
				isLink: item.isLink
			})
			arr.push(ok)
		}
	})
}


// 导出计算路由
export default arr

