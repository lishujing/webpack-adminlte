/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : Please set LastEditors
 * Date         : 2020-04-29 15:07:55
 * LastEditTime : 2020-07-31 10:37:59
 * Description  : config cross-domain
 */ 


module.exports = app => {
	app.all("*", (req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild")
		res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")

		if (req.method == "OPTIONS") {
			res.sendStatus(200)
		}
		else {
			next()
		}
	})
}
