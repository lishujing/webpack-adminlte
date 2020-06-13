/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-06-01 10:28:23
 * LastEditTime : 2020-06-03 14:03:09
 * Description  : 验证表单登录注册等等的合法性
 */

export default class Validate {
	constructor(param) {
		this.data = {}
		this.option = param

		// 初始化时进行`blur`事件绑定
		this.blur(this.option)

		// 储存错误
		this.errorCount = []
	}
	// 报错提示
	error(option) {
		const isArr = Object.prototype.toString.call(option)
		isArr == "[object Array]" ?
			option.forEach(v => {
				$(`#${v.id}-error`).text(`${v.error}`).css("display", "block")
			})
			: $(`#${option.id}-error`).text(`${option.error}`).css("display", "block")
	}

	submit(callback) {
		this.option.forEach(valid => {
			if (valid.submit) {
				$(`#${valid.submit}`).on("click", e => {
					e.preventDefault()
					this.errorCount = []
					this.option.forEach(valid => {
						if (valid.submit) return
						if ($(`#${valid.id}`).val()) {
							$(`#${valid.id}-error`).css("display", "none")
						} else {
							$(`#${valid.id}-error`).text(`${valid.error}`).css("display", "block")
							this.errorCount.push(false)
							return
						}

						if (valid.target) {
							const target = this.option.filter(v => v.id == valid.target)[0]
							if (!$(`#${target.id}`).val()) {
								$(`#${target.id}-error`).text(`${target.error}`).css("display", "block")
							} else {
								$(`#${target.id}`).val() == $(`#${valid.id}`).val()
									? $(`#${valid.id}-error`).css("display", "none")
									: ($(`#${valid.id}-error`).text("两次密码不一致").css("display", "block") && (this.errorCount.push(false)))
							}
						}

						if (valid.min && !valid.max) {
							if ($(`#${valid.id}`).val().length) {
								if ($(`#${valid.id}`).val().length >= valid.min) {
									$(`#${valid.id}-error`).css("display", "none")
								} else {
									$(`#${valid.id}-error`).text(valid.lengthError).css("display", "block")
									this.errorCount.push(false)
									return
								}
							}
						}

						if (valid.max && !valid.min) {
							if ($(`#${valid.id}`).val().length) {
								if ($(`#${valid.id}`).val().length <= valid.max) {
									$(`#${valid.id}-error`).css("display", "none")
								} else {
									$(`#${valid.id}-error`).text(valid.lengthError).css("display", "block")
									this.errorCount.push(false)
									return
								}
							}
						}

						if (valid.max && valid.min) {
							if ($(`#${valid.id}`).val()) {
								if ($(`#${valid.id}`).val().length > valid.max || $(`#${valid.id}`).val().length < valid.min) {
									$(`#${valid.id}-error`).text(valid.lengthError).css("display", "block")
									this.errorCount.push(false)
									return
								} else {
									$(`#${valid.id}-error`).css("display", "none")
								}
							}
						}

						if (valid.type) {
							if (!$(`#${valid.id}`).val()) {
								$(`#${valid.id}-error`).text(`${valid.error}`).css("display", "block")
							} else {
								switch (valid.type) {
									case "string":
									case "String":
										if (this.isNumber($(`#${valid.id}`).val())) {
											$(`#${valid.id}-error`).text(valid.typeError).css("display", "block")
											this.errorCount.push(false)
										} else {
											$(`#${valid.id}-error`).css("display", "none")
										}
										break
									case "number":
									case "Number":
										if (this.isNumber($(`#${valid.id}`).val())) {
											$(`#${valid.id}-error`).css("display", "none")
										} else {
											$(`#${valid.id}-error`).text(valid.typeError).css("display", "block")
											this.errorCount.push(false)
										}
										break
								}
							}
						}

						this.data[`${valid.id}`] = $(`#${valid.id}`).val()
					})
					if (this.errorCount.length == 0) callback(this.data)
					return false
				})
			}
		})
	}

	// blur事件注册
	blur(option) {
		option.forEach(valid => {
			$(`#${valid.id}`).blur(e => {
				e.preventDefault()
				if (valid.target) {
					const target = option.filter(v => v.id == valid.target)[0]
					if (!$(`#${valid.id}`).val()) {
						$(`#${valid.id}-error`).text(`${valid.error}`).css("display", "block")
						return
					} else if ($(`#${valid.id}`).val() != $(`#${target.id}`).val()) {
						$(`#${valid.id}-error`).text("两次密码不一致").css("display", "block")
						return
					} else {
						$(`#${valid.id}-error`).css("display", "none")
					}
				}
				if (valid.min && !valid.max) {
					if (!$(`#${valid.id}`).val()) {
						$(`#${valid.id}-error`).text(`${valid.error}`).css("display", "block")
						return
					} else if ($(`#${valid.id}`).val().length < valid.min) {
						$(`#${valid.id}-error`).text(valid.lengthError).css("display", "block")
						return
					} else {
						$(`#${valid.id}-error`).css("display", "none")
					}
				}
				if (valid.max && !valid.min) {
					if (!$(`#${valid.id}`).val()) {
						$(`#${valid.id}-error`).text(`${valid.error}`).css("display", "block")
						return
					} else if ($(`#${valid.id}`).val().length > valid.max) {
						$(`#${valid.id}-error`).text(valid.lengthError).css("display", "block")
						return
					} else {
						$(`#${valid.id}-error`).css("display", "none")
					}
				}
				if (valid.max && valid.min) {
					if (!$(`#${valid.id}`).val()) {
						$(`#${valid.id}-error`).text(`${valid.error}`).css("display", "block")
						return
					} else if ($(`#${valid.id}`).val().length > valid.max || $(`#${valid.id}`).val().length < valid.min) {
						$(`#${valid.id}-error`).text(valid.lengthError).css("display", "block")
						return
					} else {
						$(`#${valid.id}-error`).css("display", "none")
					}
				}
				if (valid.type) {
					if (!$(`#${valid.id}`).val()) {
						$(`#${valid.id}-error`).text(`${valid.error}`).css("display", "block")
					} else {
						switch (valid.type) {
							case "string":
							case "String":
								this.isNumber($(`#${valid.id}`).val())
									? $(`#${valid.id}-error`).text(valid.typeError).css("display", "block")
									: $(`#${valid.id}-error`).css("display", "none")
								break
							case "number":
							case "Number":
								this.isNumber($(`#${valid.id}`).val())
									? $(`#${valid.id}-error`).css("display", "none")
									: $(`#${valid.id}-error`).text(valid.typeError).css("display", "block")
								break
						}
					}
				} else {
					$(`#${valid.id}`).val().length
						? $(`#${valid.id}-error`).css("display", "none")
						: $(`#${valid.id}-error`).text(`${valid.error}`).css("display", "block")
				}
			})
		})
	}

	// 验证是否为空
	isEntry(valid) {
		if ($(`#${valid.id}`).val()) {
			$(`#${valid.id}-error`).css("display", "none")
		} else {
			$(`#${valid.id}-error`).text(`${valid.error}`).css("display", "block")
			this.errorCount.push(false)
			return
		}
	}


	isNumber(param) {
		for (let i = 0; i < param.length; i++) {
			if (isNaN(parseInt(param[i]))) {
				return false
			}
		}
		return true
	}
}
