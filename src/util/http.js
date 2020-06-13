/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-28 11:27:38
 * LastEditTime : 2020-06-12 10:20:43
 * Description  : Encapsulation ajax
 */

export default class Http {
	constructor() { }

	/**
  * @description: ajax方法
  * @param {object} ajax请求参数
  * @return: pending
  */
	static ajax(option) {
		return new Promise((resolve, reject) => {
			if(option == null || option == undefined || typeof option !== "object"){
				reject("HTTP Ajax: param must be a object.")
			}
			try {
				$.ajax({
					url: option.url,
					type: option.type || "get",
					data: option.data || "",
					dataType: option.dataType || "json",
					accepts: { "json": "application/json" },
					async: option.async || true,
					success: res => {
						resolve(res)
					},
					error: error => {
						reject(JSON.parse(error.responseText))
					}
				})
			} catch (error) {
				reject(JSON.parse(error.responseText))
			}
		})
	}


	/**
  * @description: get请求静态方法, ajax:get
  * @param {string, object} 地址、参数 
  * @return: pending
  */
	static get(url, data, option) {
		return new Promise((resolve, reject) => {
			if(url == null || url == undefined || typeof url !== "string"){
				reject("HTTP(GET): URL must be a string.")
			}
			option = option || {}
			try {
				$.get({
					url: url,
					data: data || "",
					dataType: option.dataType || "json",
					accepts: { "json": "application/json" },
					async: option.async || true,
					success: res => {
						resolve(res)
					},
					error: error => {
						reject(JSON.parse(error.responseText))
					}
				})
			} catch (error) {
				reject(JSON.parse(error.responseText))
			}
		})
	}

	/**
  * @description: post请求静态方法, ajax:post
  * @param {string, object} 地址、参数 
  * @return: pending
  */
	static post(url, data, option) {
		return new Promise((resolve, reject) => {
			if(url == null || url == undefined || typeof url !== "string"){
				reject("HTTP(POST): URL must be a string.")
			}
			option = option || {}
			try {
				$.post({
					url: url,
					data: data || "",
					dataType: option.dataType || "json",
					accepts: { "json": "application/json" },
					async: option.async || true,
					success: res => {
						resolve(res)
					},
					error: error => {
						reject(JSON.parse(error.responseText))
					}
				})
			} catch (error) {
				reject(JSON.parse(error.responseText))
			}
		})
	}
}
