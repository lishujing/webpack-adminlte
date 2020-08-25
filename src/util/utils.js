// 当前页面路径
export function currPath() {
	let path = ""
	let pathname = location.pathname
	let search = location.search
	if (!pathname) {
		path = ""
		return path
	}
	path += "redirect=" + pathname
	if (!search) {
		return path
	}
	return path += search
}


// 重定向路径
export function redirectPath() {
	let redirect
	let hasRedirect = location.search.indexOf("redirect") == 1
	hasRedirect
		? redirect = location.search.split("redirect=")[1]
		: redirect = "/"
	return redirect
}


// 路径某个参数
export function hrefParam(param) {
	if (isUndefined(param) || isNull(param)) {
		let params = location.search.slice(1)
		let paramArr = params.split("&")
		let result = {}
		paramArr.map(item => {
			if (item.split("=")[1] == undefined || item.split("=")[1] == "" || item.split("=")[1] == "undefined") {
				return
			}
			result[item.split("=")[0]] = item.split("=")[1]
		})
		return result
	}

	let isExsit = location.search.slice(1).indexOf(param) == -1
	if (isExsit) return false
	let targetIndex = location.search.slice(1).split("&").filter(item => item.includes(param))[0]
	let splitCell = targetIndex.split("=")
	if (splitCell[1] == undefined || splitCell[1] == "" || splitCell[1] == "undefined") return false
	return {
		value: splitCell[1]
	}
}



// 查看大图或者视频
export function viewBig(selector, type, url) {
	if ($ == undefined) {
		throw Error("view Big: jQuery is required!")
	}
	if (isUndefined(type) || isNull(type)) {
		throw Error("view Big: type param['image' or 'video'] is required!")
	}

	// 大图
	if (type == "image") {
		$(selector).on("click", e => {
			let imgSrc = $(e.target).attr("src")
			let viewImgHtml = `
				<div class="viewImgBox">
					<img class="img" src=${imgSrc}></img>
				</div>
			`
			$("body").append($(viewImgHtml))
			$(".viewImgBox").on("click", e => {
				e.preventDefault()
				$(".viewImgBox").fadeOut()
				setTimeout(() => $(".viewImgBox").remove(), 500)
			})
		})
	}
	// 视频
	if (type == "video") {
		$(selector).on("click", e => {
			let imgSrc = $(e.target).attr("src")
			let viewImgHtml = `
				<div class="viewImgBox">
					<video class="video" src=${url} controls="controls">老铁你的浏览器版本太低，请升级你的浏览器<a src='https://www.google.cn/chrome/' target='_blank'>https://www.google.cn/chrome/</a></video>
					<div class='video-loading-notice' id='videoNotice'>加载中...</div>
				</div>
			`
			$("body").append($(viewImgHtml))
			$(".viewImgBox video").on("progress", e => {
				console.log("loading,,,")
			})
			$(".viewImgBox video").on("loadeddata", e => {
				setTimeout(() => {
					$("#videoNotice").css("display", "none")
				}, 1000)
			})
			$(".viewImgBox").on("click", e => {
				e.preventDefault()
				$(".viewImgBox").fadeOut()
				setTimeout(() => $(".viewImgBox").remove(), 500)
			})
		})
	}
}

// 获取视频第一帧图片
export function videoFirstMeasure(url, targetElement, width = 100, height = 100) {
	return new Promise((resolve, reject) => {
		if (isUndefined(url)) {
			throw Error("videoFirstMeasure: video param is required!")
		}

		let canvas = document.createElement("canvas")
		if (!canvas.getContext) {
			throw Error("videoFirstMeasure for canvas: 老铁你的浏览器版本太旧无法运行canvas，请升级你的浏览器吧  👉👉👉 【https://www.google.cn/chrome/】")
		}
		let video = document.createElement("video")
		video.setAttribute("crossOrigin", "Anonymous")
		video.setAttribute("controls", "controls")
		video.setAttribute("autoplay", "autoplay")
		video.volume = 0
		video.setAttribute("src", url)
		video.onloadedmetadata = function () {

		}
		video.addEventListener("loadeddata", function () {
			canvas.width = video.videoWidth
			canvas.height = video.videoHeight
			let ctx = canvas.getContext("2d")
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
			let imgDataURL = canvas.toDataURL("image/png")
			resolve(imgDataURL)
		})
	}).catch(error => {
		throw Error("videoFirstMeasure: " + error)
	})
}



/**
 * @description: 判断是不是字符串
 * @param {Any}
 * @return: Boolean
 */
export function isString(param) {
	if (
		!isNull(param) &&
		!isUndefined(param) &&
		isType(param) == TYPE_DICT.$_STRING
	) {
		return true
	}
	return false
}


/**
 * @description: 类型字典
 * @return: Object
 */
export const TYPE_DICT = {
	$_NULL: "[object Null]",
	$_ARRAY: "[object Array]",
	$_STRING: "[object String]",
	$_NUMBER: "[object Number]",
	$_OBJECT: "[object Object]",
	$_BOOLEAN: "[object Boolean]",
	$_FUNCTION: "[object Function]",
	$_UNDEFINED: "[object Undefined]",
}



/**
 * @description: 判断是不是普通对象
 * @param {Any}
 * @return: Boolean
 */
export function isNormalObject(param) {
	if (
		!isNull(param) &&
		!isUndefined(param) &&
		isType(param) == TYPE_DICT.$_OBJECT
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
export function isArrayObject(param) {
	if (
		!isNull(param) &&
		!isUndefined(param) &&
		isType(param) == TYPE_DICT.$_ARRAY
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
export function isElementObject(dom) {
	if (!isNull(dom) && !isUndefined(dom) && typeof dom == "object")
		return dom instanceof HTMLElement
	return false
}


/**
 * @description: 判断是不是空对象
 * @param {Any}
 * @return: Boolean
 */
export function isEmpty(param) {
	if (isUndefined(param)) return false
	if (isNull(param)) return false
	if (isString(param) || isArrayObject(param))
		return param.length <= 0
	if (isNormalObject(param)) return Object.keys(param).length <= 0
	return false
}


/**
 * @description: 判断是不是Null
 * @param {Any}
 * @return: Boolean
 */
export function isNull(param) {
	return !param && typeof param != "undefined" && param != 0
}


/**
 * @description: 判断是不是Undefined
 * @param {Any}
 * @return: Boolean
 */
export function isUndefined(param) {
	return typeof param == "undefined"
}


/**
 * @description: 返回类型
 * @param {Any}
 * @return: 类型字符串
 */
export function isType(param) {
	return Object.prototype.toString.call(param)
}