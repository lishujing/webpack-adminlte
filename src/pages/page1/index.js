/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-20 16:07:04
 * LastEditTime : 2020-06-15 09:24:10
 * Description  : Please_add_description
 */

import "@/config/isLogin"
import "@/setting/index"
import "@/util/getMenu"
import tableAction from "@/api/datatableAction"
import dataTable from "@/util/datatable"
import Notice from "@/util/message"

new dataTable("example1", {
	dom: "Bfrtip",
	buttons: [
		{
			extend: "copy",
			text: "复制"
		},
		{
			extend: "excel",
			text: "表格"
		},
		{
			extend: "pdf",
			text: "PDF"
		},
		{
			extend: "print",
			text: "打印当前页",
			autoPrint: false,
			exportOptions: {
				modifier: {
					page: "current",
					selected: true
				}
			},
			footer: false,
			header: true,
			format: {
				header: function (data, columnIdx) {
					console.log(data, columnIdx)
					return columnIdx + ": " + data
				}
			}
		},
		{
			extend: "print",
			text: "全部打印",
			autoPrint: true,
			exportOptions: {
				modifier: {
					page: "all"
				}
			}
		}
	],
	language: {
	}
})


const table2 = new dataTable("example2", {
	columns: [
		{
			data: "id",
			checkboxes: {
				"selectRow": true
			},
		},
		{
			title: "账号", data: "username",
			render: function (data, type, row, meta) {
				var mid_str = row.username.replace(/\s+/g, "空格转义abcd")
				var finHTML = " <span class='text-blue sp3' onclick=localSeach('" + row.id + "','" + mid_str + "')>" + row.username + "</span>"
				return finHTML
			}
		},
		{
			title: "级别", data: "level",
			render: function (data, type, row, meta) {
				switch (row.level) {
					case 0: return "<span>未注册</span>"
					case 1: return "<span>注册会员</span>"
					case 2: return "<span>VIP</span>"
					case 3: return "<span>总裁</span>"
					case 4: return "<span class='text-red text-bold'>股东</span>"
				}
			}
		},
		{ title: "积分", data: "points" },
		{ title: "联系方式", data: "mobile" },
		{ title: "ID", data: "id" },
		{
			title: "推荐人ID", data: "pid",
			render: function (data, type, row, meta) {
				if (row.pid == 0) {
					return "无"
				} else {
					return row.pid
				}
			}
		},
		{ title: "注册时间", data: "create_date" },
		{ title: "最后登录", data: "last_login_date" },
		{
			title: "操作", data: null, width: "10%",
			render: function (data, type, row, meta) {
				var finHTML = "<span class='text-blue sp3' onclick=user_edit()> 编辑</span> "
				return finHTML
			}
		}
	],
	stripeClasses: null,
	select: {
		style: "multi"
	},
	dom: "Bfrtip",
	buttons: [
		{
			extend: "copy",
			text: "<i class='fas fa-copy' title='复制'></i>"
		},
		{
			extend: "excel",
			text: "<i class='fas fa-file' title='导出表格'></i>"
		},
		{
			extend: "pdf",
			text: "<i class='fas fa-bus' title='导出PDF'></i>"
		},
		{
			extend: "print",
			text: "<i class='fas fa-print' title='打印'></i>",
			autoPrint: true,
			exportOptions: {
				modifier: {
					page: "current",
					selected: true
				}
			}
		}
	],
})


tableAction.table2().then(res => {
	table2.rows.add(res.data).draw()
	Notice.toast({
		heading: "消息提示",
		text: res.success,
	})
})



var data2 = table2.rows([".selected"]).data()[0]
console.log(data2)


