/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-06-09 14:30:01
 * LastEditTime : 2020-06-11 09:26:18
 * Description  : Date library
 */


/**
 * @description: CopyRight info
 * @param {type} 
 * @return: 
 */
class CopyRight {
	AUTHOR = "JackWei <wsm_1105@163.com>"
}


/**
 * @description: jeDate variables
 * @param {type} 
 * @return: 
 */
class Config extends CopyRight {
	CONFIG = {
		name: "en",
		theme: {
			bgcolor: "#00A680", pnColor: "#ddd", color: "#fff"
		},
		minDate: "1900-01-01 00:00:00",
		maxDate: "2200-12-31 23:59:59",
		format: "YYYY-MM-DD hh:mm:ss",
		// range: "",
		// isShow: true,
		// multiPane: true,
		//onClose: true,
		// position: [],
		// valiDate: [],
		// isinitVal: false,
		isToday: true,								//是否显示今天
		festival: true,    						//是否显示节日和农历日历
		fixed: true,									//是否静止定位，为true时定位在输入框，为false时居中定位
		//zIndex: 99999, 								//弹出层的层级高度
		//marks: null,                  //给日期做标注
		shortcut: [
			{ name: "一周", val: { DD: 7 } },
			{ name: "一个月", val: { DD: 30 } },
			{ name: "二个月", val: { MM: 2 } },
			{ name: "三个月", val: { MM: 3 } },
			{ name: "一年", val: { DD: 365 } }
		],
		clearfun: function (elem, val) { },         //清除日期后的回调, elem当前输入框ID, val当前选择的值
		donefun: function (obj) { console.log(obj) },                //点击确定后的回调,obj包含{ elem当前输入框ID, val当前选择的值, date当前的日期值}
		success: function (elem) { console.log(elem) }
	}

	static startTime = ""
	static endTime = ""

	constructor() {
		super()
	}
}


/**
 * @description: Encapsulation DatePicker component
 * @param {type} 
 * @return: 
 */
export default class DatePicker extends Config {
	static INSTANCE
	constructor(selector, option, callback) {
		super()
		this.selector = selector
		this.option = option
		this.callback = callback

		// 判断有没有依赖
		this.loadDependency(window)

		try {
			// 是否创建目标dom
			this.targetDom(this.selector)

			// 计算配置
			const realConfig = this.computedConfig(this.CONFIG, this.option)

			// 实例化jeDate
			const instance = jeDate(this.selector, realConfig)
			instance.$opts.donefun = value => {
				$(instance.$opts.double).val(value.val.split(instance.$opts.range)[1])
				this.callback && this.callback(this.DONEFUN(instance, value))
			}
			this.INSTANCE = instance

		} catch (error) {
			throw Error(error)
		}
	}

	/**
  * @description: 初始化date component
  * @param {object} 
  * @return: 
  */
	static init(selector, option, callback) {
		const datepicker = new DatePicker(selector, option, callback)
		return datepicker
	}


	/**
  * @description: 选中日期后回调
  * @param {any} 
  * @return: any
  */
	DONEFUN(instance, value){
		return {instance, value}
	}


	/**
  * @description: 获取目标dom元素
  * @param {string} // id、class、input
  * @return: 
  */
	targetDom(selector) {
		if (!selector) {
			throw Error("Date component must have a target dom!")
		}
		let dom, Index
		switch (selector.slice(0, 1)) {
			case "#":
				let virtualDom1 = document.getElementById(selector.slice(1))
				if (virtualDom1 == undefined || virtualDom1 == null) {
					throw Error("Date's target object has not created that having id attribute for " + selector)
				}
				dom = virtualDom1
				break
			case ".":
				if (this.option.classIndex == undefined || this.option.classIndex == null) {
					throw Error("You must apply a classIndex option for class selector!, like: 1 or 2 ...")
				}
				Index = this.option.classIndex
				let virtualDom2 = document.getElementsByClassName(selector.slice(1))[Index]
				if (virtualDom2 == undefined || virtualDom2 == null) {
					throw Error("Date's target object has not created that having class attribute for " + selector)
				}
				dom = virtualDom2
				break
			default:
				if (this.option.tagIndex == undefined || this.option.tagIndex == null) {
					throw Error("You must apply a tagIndex option for tag selector!, like: 1 or 2 ...")
				}
				Index = this.option.tagIndex
				let virtualDom3 = document.getElementsByTagName(selector)[Index]
				if (virtualDom3 == undefined || virtualDom3 == null) {
					throw Error("Date's target object has not created that having tag for " + selector)
				}
				dom = virtualDom3
				break
		}
		return dom
	}

	
	/**
  * @description: 计算date配置参数
  * @param {object, object} 
  * @return: 真实配置项
  */
	computedConfig(target, origin) {
		const toStr = Object.prototype.toString,
			arrStr = "[object Array]"
		for (let prop in origin) {
			if(prop == "donefun") this.DONEFUN = origin[prop]
			if(prop == "endTime") this.endTime = origin[prop]
			if (origin[prop] !== "null" && typeof origin[prop] == "object") {
				toStr.call(origin[prop]) == arrStr
					? (target[prop] ? null : target[prop] = [])
					: (target[prop] ? null : target[prop] = {})
				this.computedConfig(target[prop], origin[prop])
			} else {
				target[prop] = origin[prop]
			}
		}
		return target
	}


	/**
  * @description: 判断是否加载了jedate文件
  * @param {object} 
  * @return: 
  */
	loadDependency(window) {
		if (window.jeDate == undefined || window.jeDate == null) {
			throw Error("jeDate is not defined!")
		}
		console.log("Date Component has been initialized...")
	}
}
