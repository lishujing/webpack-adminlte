/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-06-02 10:45:21
 * LastEditTime : 2020-06-16 15:02:26
 * Description  : 简化富文本编辑器tinymc(HTML必须引入tinymce)
 */

class tinymceConfig {
	systemConfig = {
		baseURL: "/static/admin/vendor/tinymce",
		suffix: ""
	}

	baseConfig = {
		language: "zh_CN",
		branding: false,   // 技术支持
		draggable_modal: false,   // 拖动模态框
		elementpath: false,
		// fixed_toolbar_container: "",    // 指定工具栏在某个容器的顶部
		resize: true,   // 允许调整菜单大小
		statusbar: true,  //  底部状态栏
		menubar: false,   // 顶部菜单栏
		plugins: "print save preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave bdmap indent2em autoresize lineheight formatpainter axupimgs",
		toolbar: "styleselect fontselect fontsizeselect  forecolor backcolor bold italic underline  alignleft aligncenter alignright alignjustify outdent indent lineheight removeformat formatpainter bullist numlist  cut copy paste pastetext undo redo blockquote subscript superscript strikethrough charmap hr insertdatetime emoticons image table media link axupimgs anchor preview save print ",
		fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
		font_formats: "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif",
		save_enablewhendirty: true,
		file_picker_type: "image file media",   	//自定义文件选择器的回调内容
		//content_security_policy: "script-src *;",
		extended_valid_elements: "script[src]",
		template_cdate_format: "[CDATE: %m/%d/%Y : %H:%M:%S]",
		template_mdate_format: "[MDATE: %m/%d/%Y : %H:%M:%S]",
		autosave_ask_before_unload: true,   // 询问离开前保存
		toolbar_mode: "wrap",
		icons: "ax-color",
		max_height: 550, //编辑器高度
		min_height: 400,
		width: "100%",
		// image_class_list: [        // 上传图片class列表
		// 	{ title: "None", value: "" },
		// 	{ title: "Some class", value: "class-name" }
		// ],
		/*content_css: [ //可设置编辑区内容展示的css，谨慎使用
				"/static/reset.css",
				"/static/ax.css",
				"/static/css.css",
		],*/
	}

	sliceParam = ["plugins", "toolbar", "fontsize_formats", "file_picker_type"]
}


export default class TinyMce extends tinymceConfig {
	constructor(context, selector, option, remove) {
		super()
		// 没有传来tinymce报错
		if (this.isNull(context) || this.isUndefined(context) || this.isString(context) || this.isNull(context.majorVersion)) {
			throw Error("tinymce first param must have a context, please input a tinymce libaray!")
		}
		// 没有tinymce目标选择器报错
		if (this.isNull(selector) || this.isUndefined(selector) || this.isObject(selector)) {
			throw Error("tinymce selector must be needed:" + selector)
		}
		this.context = context
		this.selector = selector
		this.config = this.baseConfig
		this.remove = remove
		try {

			// 删除参数
			if (this.remove) {
				this.config = this.paramDelete(this.config, this.remove)
			}
			// 合并参数
			this.config = this.paramClone(this.config, option)
			this.config.selector = this.selector

			// 系统配置
			Object.keys(this.systemConfig).forEach(key => {
				this.context[key] = this.systemConfig[key]
			})

			// 返回实例
			return this.context.init(this.config)

		} catch (error) {
			throw Error(error)
		}
	}

	static init(context, selector, option, remove) {
		return new TinyMce(context, selector, option, remove)
	}

	run() {

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
	* @return: 
	*/
	paramDelete(target, origin) {
		const objStr = "[object Object]",
			toStr = Object.prototype.toString
		Object.keys(target).forEach(key => {
			if (origin[key]) {
				if (this.sliceParam.includes(key)) {
					let Index = target[key].indexOf(origin[key])
					target[key] = target[key].substring(Index + origin[key].length)
				} else {
					delete target[key]
				}
			} else {
				if (target[key] !== "null" && toStr.call(target[key]) == objStr) {
					this.paramDelete(target[key], origin)
				}
			}
		})
		return target
	}


	isUndefined(param) {
		return param == undefined
	}

	isNull(param) {
		return param == null
	}

	isString(param) {
		return typeof (param) == "string" && Object.prototype.toString.call(param) == "[object String]"
	}

	isObject(param) {
		return typeof (param) == "object" && Object.prototype.toString.call(param) == "[object Object]"
	}

	isArray(param) {
		return typeof (param) == "object" && Object.prototype.toString.call(param) == "[object Array]"
	}
}

