/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : Please set LastEditors
 * Date         : 2020-05-20 16:17:02
 * LastEditTime : 2020-07-31 10:02:21
 * Description  : Please_add_description
 */

import "@/setting/index"
import "@/util/getMenu"
import Notice from "@/util/message"

import DatePicker from "@/util/date"

let start, end

DatePicker.init("#rili", {
	format: "YYYY-MM-DD hh:mm:ss",
	shortcut: false
}, ({instance, value}) => {
	start = value.val
	console.log(instance)
})

DatePicker.init("#rili1", {
	format: "YYYY-MM-DD hh:mm:ss",
	shortcut: false
}, ({value}) => {
	end = value.val
})
	
DatePicker.init("#test", {shortcut: false})


$("#query").on("click", e => {
	if(!start){
		Notice.toast({
			icon: "warning",
			heading: "警告提示",
			text: "请选择开始日期"
		})
	}else if(!end){
		Notice.toast({
			icon: "warning",
			heading: "警告提示",
			text: "请选择结束日期"
		})
	}else{
		const startTime = new Date(start),
					endTime = new Date(end)
		console.log(startTime.getTime(), endTime.getTime())
	}
})
