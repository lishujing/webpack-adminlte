/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-06-11 19:09:09
 * LastEditTime : 2020-06-11 19:39:32
 * Description  : 针对webpack模块化，让希望在全局访问到的函数挂在到window上
 */

export default class bindWindow {
	/**
  * @description: 将事件绑定到window上
  * @param {Array} 
  * @return: null
  */
	static add(...args) {
		args.forEach(func => {
			if (typeof func !== "function") return
			window[func.name] = func
		})
	}
}
