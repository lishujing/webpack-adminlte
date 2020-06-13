/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-29 14:19:37
 * LastEditTime : 2020-06-05 15:05:07
 * Description  : config sweetalert plugin
 */

// jquery-toast-plugin
import "jquery-toast-plugin"
import "jquery-toast-plugin/dist/jquery.toast.min.css"

const Notice = {
	toast: (option) => {
		return new Promise(resolve => {
			try {
				$.toast({
					icon: option.icon || "success",
					heading: option.heading || "toast heading",
					text: option.text || "toast text",
					position: option.position || {right: "10px", top: "20px"},
					textColor: option.color || "#eee",            // text color
					textAlign: option.textAlign || "left",          // Alignment of text i.e. left, right, center
					hideAfter: option.duration !== undefined ? option.duration : 800,
					showHideTransition: option.transition || "slide",  // It can be plain, fade or slide
					allowToastClose: option.close !== undefined ? option.close : true
				})
			} catch (error) {
				throw Error("Toast Error:" + error)
			}
			setTimeout(() => {
				resolve()
			}, option.duration || 800)
		})
	}
}

export default Notice
