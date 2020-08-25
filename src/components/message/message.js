/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-29 14:19:37
 * LastEditTime : 2020-06-05 15:05:07
 * Description  : config notice
 */

"use strict"


import { isNormalObject, isString, isEmpty } from "../../util/utils.js"

var NoticeObj = {
	icon: "",
	message: "你好啊",
	title: ""
}

$.extend({
	Notice: {
		duration: 1200,
		success: (msg) => {
			if(isEmpty(msg)){
				throw Error("Sparklet Notice: message is required!")
			}

			return new Promise((resolve, reject, ctx = $.Notice) => {
				if(isString(msg)){
					NoticeObj.message = msg
					NoticeObj.icon = "/static/admin/img/chenggong.png"

					let NoticeTemplate = `
						<div class="sparklet-notice">
							<div class="sparklet-notice-box">
								<div class="sparklet-notice-icon">
									<img src=${NoticeObj.icon}>
								</div>
								<div class="sparklet-notice-message">
									${NoticeObj.message}
								</div>
							</div>
						</div>
					`
					$("body").append($(NoticeTemplate))
					setTimeout(() => {
						resolve(true)
						$(".sparklet-notice").fadeOut()
						setTimeout(() => $(".sparklet-notice").remove(), 500)
					}, ctx.duration)
					return
				}
				let { duration, title, message } = msg
				NoticeObj.message = message
				NoticeObj.icon = "/static/admin/img/chenggong.png"

				let NoticeTemplate = `
					<div class="sparklet-notice">
						<div class="sparklet-notice-box">
							<div class="sparklet-notice-icon">
								<img src=${NoticeObj.icon}>
							</div>
							<div class="sparklet-notice-message">
								${NoticeObj.message}
							</div>
						</div>
					</div>
				`
				$("body").append($(NoticeTemplate))
				if(duration == false){
					resolve(true)
					return
				}
				setTimeout(() => {
					resolve(true)
					$(".sparklet-notice").fadeOut()
					setTimeout(() => $(".sparklet-notice").remove(), 500)
				}, duration || ctx.duration)
			})
		},
		warning: msg => {
			if(isEmpty(msg)){
				throw Error("Sparklet Notice: message is required!")
			}

			return new Promise((resolve, reject, ctx = $.Notice) => {
				if(isString(msg)){
					NoticeObj.message = msg
					NoticeObj.icon = "/static/admin/img/jinggao.png"

					let NoticeTemplate = `
						<div class="sparklet-notice">
							<div class="sparklet-notice-box">
								<div class="sparklet-notice-icon">
									<img src=${NoticeObj.icon}>
								</div>
								<div class="sparklet-notice-message">
									${NoticeObj.message}
								</div>
							</div>
						</div>
					`
					$("body").append($(NoticeTemplate))
					setTimeout(() => {
						resolve(true)
						$(".sparklet-notice").fadeOut()
						setTimeout(() => $(".sparklet-notice").remove(), 500)
					}, ctx.duration)
					return
				}
				let { duration, title, message } = msg
				NoticeObj.message = message
				NoticeObj.icon = "/static/admin/img/jinggao.png"

				let NoticeTemplate = `
					<div class="sparklet-notice">
						<div class="sparklet-notice-box">
							<div class="sparklet-notice-icon">
								<img src=${NoticeObj.icon}>
							</div>
							<div class="sparklet-notice-message">
								${NoticeObj.message}
							</div>
						</div>
					</div>
				`
				$("body").append($(NoticeTemplate))
				if(duration == false){
					resolve(true)
					return
				}
				setTimeout(() => {
					resolve(true)
					$(".sparklet-notice").fadeOut()
					setTimeout(() => $(".sparklet-notice").remove(), 500)
				}, duration || ctx.duration)
			})
		},
		error: msg => {
			if(isEmpty(msg)){
				throw Error("Sparklet Notice: message is required!")
			}

			return new Promise((resolve, reject, ctx = $.Notice) => {
				if(isString(msg)){
					NoticeObj.message = msg
					NoticeObj.icon = "/static/admin/img/shibai.png"

					let NoticeTemplate = `
						<div class="sparklet-notice">
							<div class="sparklet-notice-box">
								<div class="sparklet-notice-icon">
									<img src=${NoticeObj.icon}>
								</div>
								<div class="sparklet-notice-message">
									${NoticeObj.message}
								</div>
							</div>
						</div>
					`
					$("body").append($(NoticeTemplate))
					setTimeout(() => {
						resolve(true)
						$(".sparklet-notice").fadeOut()
						setTimeout(() => $(".sparklet-notice").remove(), 500)
					}, ctx.duration)
					return
				}
				let { duration, title, message } = msg
				NoticeObj.message = message
				NoticeObj.icon = "/static/admin/img/shibai.png"

				let NoticeTemplate = `
					<div class="sparklet-notice">
						<div class="sparklet-notice-box">
							<div class="sparklet-notice-icon">
								<img src=${NoticeObj.icon}>
							</div>
							<div class="sparklet-notice-message">
								${NoticeObj.message}
							</div>
						</div>
					</div>
				`
				$("body").append($(NoticeTemplate))
				if(duration == false){
					resolve(true)
					return
				}
				setTimeout(() => {
					resolve(true)
					$(".sparklet-notice").fadeOut()
					setTimeout(() => $(".sparklet-notice").remove(), 500)
				}, duration || ctx.duration)
			})
		},
		fadeOut: () => {
			$(".sparklet-notice").fadeOut()
			setTimeout(() => $(".sparklet-notice").remove(), 500)
		}
	}
})


export default $.Notice
