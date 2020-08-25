/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-06-04 16:37:14
 * LastEditTime : 2020-06-09 16:21:09
 * Description  : configure datatable
 */

export default class dataTable {
	/**
  * @description: 初始化datatable
  * @param {String, Object, Array} 必填，可选，可选
  * @return: datatable context
  */
	constructor(id, option, remove) {
		if (id == undefined || id == null || typeof id !== "string") throw Error("datatable plugin first param must be a table ID!")
		try {
			option = option || {}
			this.initConfig = {
				paging: true,
				searching: true,
				ordering: true,
				info: true,
				autoWidth: false,
				responsive: true,
				lengthMenu: [10, 20, 50, 100],
				lengthChange: true,
				language: {
					processing: "",
					lengthMenu: "每页显示 _MENU_ 项",
					search: "",
					searchPlaceholder: "搜索",
					zeroRecords: "没有匹配结果",
					// "info": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
					info: "共 _TOTAL_ 项",
					infoEmpty: "共 0 项",
					// infoFiltered: "(由 _MAX_ 项结果过滤)",
					infoFiltered: "",
					infoPostFix: "",
					url: "",
					emptyTable: "没有数据",
					loadingRecords: "载入中...",
					infoThousands: "50",
					paginate: {
						first: "首页",
						previous: "上页",
						next: "下页",
						last: "末页"
					},
					aria: {
						sortAscending: ": 以升序排列此列",
						sortDescending: ": 以降序排列此列"
					}
				}
			}

			// 过滤掉用户不想要的参数
			if (remove != undefined || remove != null) {
				this.initConfig = this.paramDelete(this.initConfig, remove)
			}

			// 参数合并
			this.param = this.paramClone(this.initConfig, option)

			return this.initTable(id, this.param)
		} catch (error) {
			throw Error("Error:" + error)
		}
	}

	/**
  * @description: init datatable
  * @param {string, object} 
  * @return: table context
  */
	initTable(id, config) {
		return $(`#${id}`).DataTable(config)
	}

	/**
  * @description: custom param to datatable param
  * @param {object, object} 
  * @return: datatable Object param
  */
	paramClone(target, origin) {
		const arrStr = "[object Array]",
					toStr = Object.prototype.toString
		for (let key in origin) {
			if (origin[key] !== "null" && typeof origin[key] == "object") {
				toStr.call(origin[key]) == arrStr
					? (target[key] ? null : target[key] = [])
					: (target[key] ? null : target[key] = {})
				this.paramClone(target[key], origin[key])
			} else {
				target[key] = origin[key]
			}
		}
		return target
	}

	/**
  * @description: delete some param that user don't needed
  * @param {object, array} 
  * @return: datatable Object param
  */
	paramDelete(target, origin) {
		const objStr = "[object Object]",
					toStr = Object.prototype.toString
		Object.keys(target).forEach(key => {
			if(origin.includes(key)){
				delete target[key]
			}else{
				if (target[key] !== "null" && toStr.call(target[key]) == objStr){
					this.paramDelete(target[key], origin)
				}
			} 
		})
		return target
	}
}
