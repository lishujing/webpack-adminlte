/*
 *					admin system
 * File Name    : backtop.js
 * Create On    : 2020-06-28 20:00:17
 * Create By    : Jack Wei<wsm_1105@163.com>
 * Copyright (c) 2017-2020 JackWei<https://github.com/1046224544/webpack-adminlte> All rights reserved.
 */ 

/**
 * @description: BackTop Base Config
 * @param {Null}
 */
class BackTopConfig {
	TYPE_DICT = {
		$_NULL: "[object Null]",
		$_ARRAY: "[object Array]",
		$_STRING: "[object String]",
		$_NUMBER: "[object Number]",
		$_OBJECT: "[object Object]",
		$_BOOLEAN: "[object Boolean]",
		$_FUNCTION: "[object Function]",
		$_UNDEFINED: "[object Undefined]",
	}

	// 文字模式默认配置
	defaultOutConf = {
		"cursor": "pointer",
		"user-select": "none",
		"position": "fixed",
		"right": "40px",
		"bottom": "70px",
		"border-radius": "50%",
		"background-color": "rgba(0,0,0, .4)",
		"text": "TOP",
		"text-align": "center",
		"font-size": "12px",
		"font-weight": "800",
		"color": "#fff",
		"width": "40px",
		"height": "40px",
		"padding": "12px 13px",
		"box-sizing": "border-box",
		"overflow": "hidden",
		"display": "none",
		"z-index": 999999999999
	}

	// 图标模式默认配置
	defaultIconConf = {
		"background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAoCAYAAACWwljjAAAABGdBTUEAALGPC/xhBQAAAbtJREFUWAntmMtKw0AUhhMvS5cuxILgQlRUpIggIoKIIoigG1eC+AA+jo+i6FIXBfeuXIgoeKVeitVWJX5HWhhDksnUpp3FDPyZk3Nm5nycmZKkXhAEOXSA3lG7muTeRzmfy6HneUvIhnYkQK+Q9NhAA0Opg0vBEhjBKHiyb8iGMyQMOYuK41BcBSypAL+MYXSKjtFAW7EAGEO3qN4uMQbbAkXiSfRQJ1H6a+yhlkKRcAoVFYiweYNjtCVQJJpBz2GCiPt7fBOZQpFgDpUikse5HgnkM4Fi4QX0Fpc5wf9EbLqpUCy4jMoJSXWhFwbMNgWKhVbRhy5jirhs9fy/oFhgHVVTJEs7RLZ8sSEoJm6iz7SZDMbJ+/OKERQTttCXQRLToRUmrKWCYuA2+jbN0MB4OQobYShfdTCgn/sL1K36M7TLrN3n+758aPy2rrpR6+/od5E8tf/A1uLS9aId5T7J3CNYihkQ4D9PiMdMC7mp4rjB9kjFjZp8BlnVHJBuO1yFXIV0FdDF3RlyFdJVQBdv5AxVdIsq8apiZ2PyYO1EVykesGfZEESsCkweyR8MUW+V8uJ1gkYipmpdP1pm2aJVPEGzAAAAAElFTkSuQmCC)",
		"background-repeat": "no-repeat",
		"background-size": "100% 100%",
		"width": "14px",
		"height": "16px"
	}


	// 鼠标悬空默认配置
	defaultHoverConf = {
		"transition": "background-color 400ms",
		"box-shadow": "0 2px 2px #aaa",
		"background-color": "rgba(0,0,0,.65) !important"
	}
	
}

/**
 * @description: BackTop Utils
 * @param {Null}
 */
class BackTopUtil extends BackTopConfig {
	constructor() {
		super()
	}

  /**
   * @description: 判断是不是 "ID" 选择器
   * @param {String}
   * @return: Boolean
   */
	isIdSelector(root) {
		if (!this.isNull(root) && !this.isUndefined(root) && this.isString(root)) {
			return root.indexOf("#") > -1 && root.indexOf("#") == 0
		}
		return false
	}

  /**
   * @description: 判断是不是 "Class" 选择器
   * @param {String}
   * @return: Boolean
   */
	isClassSelector(root) {
		if (!this.isNull(root) && !this.isUndefined(root) && this.isString(root)) {
			return root.indexOf(".") > -1 && root.indexOf(".") == 0
		}
		return false
	}

  /**
   * @description: 判断是不是字符串
   * @param {Any}
   * @return: Boolean
   */
	isString(param) {
		if (
			!this.isNull(param) &&
			!this.isUndefined(param) &&
			this.isType(param) == this.TYPE_DICT.$_STRING
		) {
			return true
		}
		return false
	}

  /**
   * @description: 判断是不是普通对象
   * @param {Any}
   * @return: Boolean
   */
	isNormalObject(param) {
		if (
			!this.isNull(param) &&
			!this.isUndefined(param) &&
			this.isType(param) == this.TYPE_DICT.$_OBJECT
		) {
			return true
		}
		return false
	}

  /**
   * @description: 判断是不是数组对象
   * @param {Any}
   * @return: Boolean
   */
	isArrayObject(param) {
		if (
			!this.isNull(param) &&
			!this.isUndefined(param) &&
			this.isType(param) == this.TYPE_DICT.$_ARRAY
		) {
			return true
		}
		return false
	}

  /**
   * @description: 判断是不是dom对象
   * @param {object}
   * @return: Boolean
   */
	isElementObject(dom) {
		if (!this.isNull(dom) && !this.isUndefined(dom) && typeof dom == "object")
			return dom instanceof HTMLElement
		return false
	}

  /**
   * @description: 判断是不是空对象
   * @param {Any}
   * @return: Boolean
   */
	isEmpty(param) {
		if (this.isUndefined(param)) return false
		if (this.isNull(param)) return false
		if (this.isString(param) || this.isArrayObject(param))
			return param.length <= 0
		if (this.isNormalObject(param)) return Object.keys(param).length <= 0
		return false
	}

  /**
   * @description: 判断是不是Null
   * @param {Any}
   * @return: Boolean
   */
	isNull(param) {
		return !param && typeof param != "undefined" && param != 0
	}

  /**
   * @description: 判断是不是Undefined
   * @param {Any}
   * @return: Boolean
   */
	isUndefined(param) {
		return typeof param == "undefined"
	}

  /**
   * @description: 返回类型
   * @param {Any}
   * @return: 类型字符串
   */
	isType(param) {
		return Object.prototype.toString.call(param)
	}

  /**
   * @description: 字符串拷贝
   * @param {String}
   * @return: 字符串
   */
	stringClone(str) {
		if (!this.isNull(str) && !this.isUndefined(str) && this.isString(str))
			return JSON.parse(JSON.stringify(str))
		throw Error(str + " is not string type")
	}

	/**
   * @description: perfectDom
   * @param {dom}
   * @return: 修改dom
   */
	perDom(dom) {
		if (dom == document) return document.body
		return dom
	}
}

/**
 * @description: BackTop Class
 * @param {Null}
 * @return: BackTop instance
 */
export default class BackTop extends BackTopUtil {
	constructor(option) {
		super()

		this.option = option
		this.option.style = this.option.style || {}
		this.option.innerStyle = this.option.innerStyle || {}
		this.option.hoverStyle = this.option.hoverStyle || {}
		this.option.hidden = this.option.hidden || 120   // 默认120显示/隐藏
		this.option.speed = this.option.speed || 10      // 默认速度10
		this.root = "" 																	 // target element
		this.dom = "" 																	 // 优化后的dom
		this.backTopBtn = ""   													 // backtop button dom
		this.style = ""  																 // transfer out style

		this.backTopBtn = document.createElement("div")
		this.backTopBtn.setAttribute("id", "backTop")
		this.backTopBtn.setAttribute("title", "返回顶部")

		// 添加鼠标悬停效果
		this.hoverStyleDom = document.createElement("style")
		let computedHoverStyle = this.mergeStyle(this.option.hoverStyle, this.defaultHoverConf)
		this.hoverStyle = `
			#backTop:hover{
				${computedHoverStyle}
			}
		`
		this.hoverStyleDom.innerHTML = this.hoverStyle   // 
		

		
		// icon model
		this.iconModel = this.isNull(this.option.icon) || this.isUndefined(this.option.icon) || this.isEmpty(this.option.icon) || this.option.icon
		if (this.iconModel) {
			this.innerStyle = this.mergeStyle(this.option.innerStyle, this.defaultIconConf)
			this.IconDom = document.createElement("div")
			this.IconDom.setAttribute("style", this.innerStyle)
			this.backTopBtn.appendChild(this.IconDom)

			this.style = this.mergeStyle(this.option.style, this.defaultOutConf)
			this.backTopBtn.setAttribute("style", this.style)
		} else {
			// text model
			this.style = this.mergeStyle(this.option.style, this.defaultOutConf)
			this.backTopBtn.innerHTML = this.option.style.text || this.defaultOutConf.text
			this.backTopBtn.setAttribute("style", this.style)
		}




		// init
		this.iteraQueryTargetDom(this.option.root).then((dom) => {
			// dom append target element
			this.perDom(dom).appendChild(this.backTopBtn)
			// append hover style to target element
			this.perDom(dom).appendChild(this.hoverStyleDom)
			this.dom = dom
			

			let pageY = 0
			// bind scroll event
			this.addEvent(dom, "scroll", () => {
				pageY = dom.documentElement ? dom.documentElement.scrollTop : dom.scrollTop
				if (pageY > this.option.hidden) {
					this.backTopBtn.style.display = "block"
				} else {
					this.backTopBtn.style.display = "none"
				}
			})

			// bind click event
			this.addEvent(this.backTopBtn, "click", () => {
				this.toTop(this.option.speed)
			})
		})
	}

	/**
   * @description: merge out style
   * @param {dom} HTMLElement
   * @return: distance
   */
	mergeStyle(customStyle, defaultConf){
		if(customStyle){
			Object.keys(customStyle).forEach(item => {
				defaultConf[item] = customStyle[item]
			})
		}
		
		return Object.keys(defaultConf).reduce((prev, curr) => prev += curr + ":" + defaultConf[curr] + ";", "")
	}
	


	/**
   * @description: the top distance 
   * @param {dom} HTMLElement
   * @return: distance
   */
	topDistance(dom){
		return dom.scrollTop || dom.documentElement.scrollTop
	}



  /**
   * @description: dom event add
   * @param {dom} HTMLElement
   * @param {type} string
   * @param {callback} function
   * @return:
   */
	addEvent(dom, type, callback) {
		if (dom.addEventListener) {
			dom.addEventListener(type, callback, true)
		} else if (dom.attachEvent) {
			dom.attachEvent("on" + type, callback)
		} else {
			dom["on" + type] = callback
		}
	}

  /**
   * @description: back top function
   * @param {number}
   * @return:
   */
	toTop(speed) {
		let curHeight = 0,
			pageY = 0,
			offsetY = 0,
			prevY = this.dom.documentElement ? this.dom.documentElement.scrollTop : this.dom.scrollTop
		const timer = setInterval(() => {
			pageY = this.dom.documentElement ? this.dom.documentElement.scrollTop : this.dom.scrollTop
			if(pageY > prevY){
				clearInterval(timer)
				return
			}
			prevY = pageY
			offsetY = - pageY / (100 / speed)
			this.dom.documentElement ? this.dom.documentElement.scrollTop = offsetY + pageY : this.dom.scrollTop = offsetY + pageY
			curHeight = this.dom.documentElement ? this.dom.documentElement.scrollTop : this.dom.scrollTop
			if (curHeight <= 0.1) {
				console.log("It's at the top...")
				clearInterval(timer)
				this.backTopBtn.style.display = "none"
			}
		}, 10)
	}

  /**
   * @description: async get BackTop target dom
   * @param {String}
   * @return: Promise
   */
	iteraQueryTargetDom(target) {
		return new Promise((resolve, reject) => {
			// default root value
			if (
				this.isNull(target) ||
				this.isUndefined(target) ||
				this.isEmpty(target)
			) {
				resolve(document)
				return
			}

			// is document/window Node?
			if(target == document || target == document.body || target == window) {
				resolve(document)
				return
			}

			// 中间元素
			let middleElem
			let queryInterval = setInterval(() => {
				// Class
				if (this.isClassSelector(target)) {
					middleElem = this.stringClone(target).slice(1)
					this.option.classIndex - 1 >= 0
						? (this.root = document.getElementsByClassName(middleElem)[
							this.option.classIndex - 1
						])
						: (this.root = document.getElementsByClassName(middleElem)[0])
				}
				// ID
				if (this.isIdSelector(target)) {
					middleElem = this.stringClone(target).slice(1)
					this.root = document.getElementById(middleElem)
				}
				console.log("Getting the target element.")
				// target elem is existed?
				if (
					!this.isNull(this.root) &&
					!this.isUndefined(this.root) &&
					this.isElementObject(this.root)
				) {
					console.log("Intercepted the target element.")
					clearInterval(queryInterval)
					resolve(this.root)
					return
				}
			}, 50)
		})
	}
}
