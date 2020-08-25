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
		title: "首页数据",
		icon: "fa-home",
		children: [
			{
				path: "admin",
				isLink: false,
				children: [
					{
						path: "/dashboard",
						isLink: false,
						name: "仪表盘",
						icon: "fa-tachometer-alt",
						children: [
							{
								path: "/table",
								isLink: true,
								name: "表格",
								icon: "fa-table",
								title: "表格示例",
							},
							{
								path: "/date",
								isLink: true,
								name: "日期",
								icon: "fa-clock",
								title: "日期组件",
							},
							{
								path: "/tinymce",
								isLink: true,
								name: "富文本",
								icon: "fa-file",
								title: "富文本示例",
							},
						]
					},
				]
			},
			{
				path: "userinfo",
				isLink: true,
				name: "会员",
				icon: "fa-crown",
				title: "会员信息",
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
					title: item.title || "",
					isLink: item.isLink,
					icon: item.icon
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
				title: item.title || "",
				isLink: item.isLink,
				icon: item.icon
			})
			arr.push(ok)
		}
	})
}


// 导出计算路由
export default arr

