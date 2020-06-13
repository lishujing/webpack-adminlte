/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-22 13:16:51
 * LastEditTime : 2020-06-11 09:21:13
 * Description  : backtop component
 */

export default class BackTop {
	constructor(option) {
		this.option = option
		this.innerText = option.innerText || "^"
		this.style = {
			"display": "none",
			"cursor": "pointer",
			"user-select": "none",
			"animation": option.animation || "fade 200ms",
			"z-index": option.zIndex || 9999999999,
			"width": option.width || "60px",
			"height": option.height || "40px",
			"line-height": option.lineHeight || "40px",
			"text-align": option.textAlign || "center",
			"position": option.position || "fixed",
			"right": option.right || "40px",
			"bottom": option.bottom || "70px",
			"background-color": option.backgroundColor || "rgba(0,0,0, .4)",
			"color": option.color || "#fff",
			"font-size": option.fontSize || "24px",
			"border-radius": option.borderRadius || "5px",
			"transition": option.transition || "all 0.3m"
		}
		this.root = option.root || document.body
		this.scrollDom = option.root || document
		this.css = Object.keys(this.style).reduce((prev, curr) => prev += curr + ":" + this.style[curr] + ";", "")
		this.speed = option.speed || 30
		this.hidden = option.hidden || 200
		this.backTopBtn = document.createElement("div")
		this.backTopBtn.innerText = this.innerText
		this.backTopBtn.setAttribute("style", this.css)
		this.backTopBtn.setAttribute("id", "backTop")

		// 异步添加button
		setTimeout(() => {
			let root
			if (this.isClass(this.option.root)) {
				root = this.option.root.slice(1)
				this.root = this.option.root = document.getElementsByClassName(root)[this.option.classIndex - 1]
				this.scrollDom = document.getElementsByClassName(root)[this.option.classIndex - 1]
			}else if(this.isId(this.option.root)){
				root = this.option.root.slice(1)
				this.root = this.option.root = document.getElementById(root)
			}
			if(!this.root) return
			this.root.appendChild(this.backTopBtn)
			this.backTopBtn.addEventListener("click", () => {
				this.toTop(this.speed)
			})
			this.scrollDom.addEventListener("scroll", () => {
				let pageY = 0
				if (this.option.root) {
					pageY = this.root.scrollTop
				} else {
					pageY = document.body.scrollTop || document.documentElement.scrollTop
				}
				if (pageY > this.hidden) {
					this.backTopBtn.style.display = "block"
				}
				else {
					this.backTopBtn.style.display = "none"
				}
			}, true)
		}, 2000)
	}
	// 返回顶部
	toTop(speed) {
		let curHeight = 0, pageY = 0, offsetY = 0
		const timer = setInterval(() => {

			if (!this.option.root) {
				pageY = document.body.scrollTop || document.documentElement.scrollTop
				offsetY = - pageY / speed
				document.body.scrollTop = document.documentElement.scrollTop = pageY + offsetY
				curHeight = document.body.scrollTop = document.documentElement.scrollTop
			} else {
				pageY = this.root.scrollTop
				offsetY = - pageY / speed
				this.root.scrollTop = pageY + offsetY
				curHeight = this.root.scrollTop
			}
			if (curHeight <= 0.1) {
				console.log("到底了...")
				clearInterval(timer)
				this.style.display = "none"
				this.backTopBtn.style.display = "none"
			}
		}, 10)
	}

	// 判断是不是class选择器
	isClass(root) {
		if(!root) return false
		return root.includes(".")
	}
	// 判断是不是id选择器
	isId(root) {
		if(!root) return false
		return root.includes("#")
	}
}
