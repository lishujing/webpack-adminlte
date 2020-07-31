/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : Please set LastEditors
 * Date         : 2020-04-29 15:07:34
 * LastEditTime : 2020-07-31 10:40:37
 * Description  : configure mock routes
 */

const router = require("express").Router()
const uploadImg = require("../util/uploadimg")
const uploadFile = require("../util/uploadFile")
const uploadVideo = require("../util/uploadVideo")
const Mock = require("mockjs")
const userList = [
	{
		account: "admin",
		password: "admin",
		role: 1
	}
]

// 测试
router.get("/test", (req, res) => {
	res.send({
		code: 200,
		success: "连接成功",
		date: new Date().getTime()
	})
})


// 创建文章
let article = ""
router.post("/article/add", (req, res) => {
	try {
		const { content } = req.body
		article = content || ""
		res.json({
			code: 200,
			success: "保存成功",
			date: new Date().getTime()
		})
		return
	} catch (error) {
		res.json({
			code: 406,
			error: error,
			date: new Date().getTime()
		})
	}
})
// 获取文章
router.get("/article", (req, res) => {
	try {
		res.json({
			code: 200,
			success: "获取成功",
			data: article,
			date: new Date().getTime()
		})
	} catch (error) {
		res.json({
			code: 404,
			error: "服务器异常",
			date: new Date().getTime()
		})
	}
})



// datatable list
const table2 = [
	{
		"id": 0,
		"pid": 0,
		"level": 2,
		"points": 0,
		"username": "system",
		"open_id": "ouhL1s4OlzxWjAsn6Ugn6zK0sLGk",
		"mobile": "13413854748",
		"nickname": "\u7cfb\u7edf\u7ba1\u7406\u5458",
		"promote_code": "923a32062848ec9999ab16ee0a6ecece27c3d66e",
		"create_date": "2020-05-24 13:56:42",
		"last_login_date": "2020-06-03 12:23:02"
	},
	{
		"id": 1,
		"pid": 0,
		"level": 2,
		"points": 0,
		"username": "\u5411\u5f3a",
		"open_id": "ouhL1s-9cjkrPgjkrTXWhp3Xjq9o",
		"mobile": "13984618496",
		"nickname": null,
		"promote_code": "7517227ec5d34e850d29444bcf43cd6c7abaf161",
		"create_date": "2020-05-24 14:57:51",
		"last_login_date": "2020-06-04 18:27:03"
	},
	{
		"id": 2,
		"pid": 0,
		"level": 2,
		"points": 0,
		"username": "\u90b1\u6770",
		"open_id": "ouhL1swCfta6wwzQgzLhkKVvw5Xo",
		"mobile": "18608566724",
		"nickname": null,
		"promote_code": "25e022724fc920eae0db650ee2c5f7f8a9ea2b09",
		"create_date": "2020-05-24 14:58:24",
		"last_login_date": "2020-06-04 14:17:34"
	},
	{
		"id": 5,
		"pid": 2,
		"level": 1,
		"points": 0,
		"username": "\u90b1\u67701",
		"open_id": "ouhL1swCfta6wwzQgzLhkKVvw5Xo",
		"mobile": "18608566724",
		"nickname": null,
		"promote_code": null,
		"create_date": "2020-05-24 15:14:18",
		"last_login_date": "2020-05-24 15:56:52"
	},
	{
		"id": 6,
		"pid": 0,
		"level": 2,
		"points": 0,
		"username": "\u6731\u6b22",
		"open_id": "ouhL1s53TasFAuC-KGvMRirWRIxU",
		"mobile": "13527014252",
		"nickname": null,
		"promote_code": "399ee653012d8d5b000dd5c6cdb02a78d460bb09",
		"create_date": "2020-05-24 15:28:28",
		"last_login_date": "2020-06-02 22:11:14"
	}
]
// 获取表格数据
router.get("/table2", (req, res) => {
	res.send({
		code: 200,
		success: "获取成功",
		data: table2,
		date: new Date().getTime()
	})
})


// 上传图片
router.post("/upload/img", async (req, res) => {
	await uploadImg(req, res)
})
// 上传文件
router.post("/upload/file", async (req, res) => {
	await uploadFile(req, res)
})
// 上传视频
router.post("/upload/video", async (req, res) => {
	await uploadVideo(req, res)
})

// 登录
router.post("/login", async (req, res) => {
	const { account, password } = req.body
	const user = await userList.filter((v, i) => {
		if (v.account == account) {
			return v
		}
	})
	if (user.length && (password == user[0].password)) {
		res.status(200).json({
			code: 200,
			success: "登录成功",
			data: user[0],
			date: new Date().getTime()
		})
		return
	}
	res.status(200).json({
		code: 401,
		error: "账号或密码错误",
		date: new Date().getTime()
	})
})

// 注册
router.post("/register", async (req, res) => {
	const { account, password } = req.body
	console.log(account, password)
	if (!account || !password) {
		res.status(200).json({
			code: 403,
			error: "注册失败",
			date: new Date().getTime()
		})
		return
	}
	const hasExist = await userList.filter((v, i) => {
		if (v.account == account) {
			return v
		}
	}).length ? true : false
	if (!hasExist) {
		userList.push({
			account,
			password,
			role: 2
		})
		res.status(200).json({
			code: 200,
			success: "注册成功",
			date: new Date().getTime()
		})
		return
	}
	res.status(200).json({
		code: 403,
		error: "注册失败，账号存在",
		date: new Date().getTime()
	})
})




// mock菜单
const menu1 = `
<ul class="nav nav-pills nav-sidebar flex-column nav-child-indent" data-widget="treeview" role="menu"
data-accordion="false">
<li class="nav-item">
	<a href="/" class="nav-link">
		<i class="nav-icon fas fa-home"></i>
		<p>
			后台首页
		</p>
	</a>
</li>
<li class="nav-item">
	<a href="/userinfo" class="nav-link">
		<i class="nav-icon fas fa-blind"></i>
		<p>
			会员信息
		</p>
	</a>
</li>
<li class="nav-item has-treeview">
	<a href="javascript:;" class="nav-link">
		<i class="nav-icon fas fa-tachometer-alt"></i>
		<p>
			仪表盘
			<i class="right fas fa-angle-left"></i>
		</p>
	</a>
	<ul class="nav nav-treeview">
		<li class="nav-item">
			<a href="/admin/dashboard/table" class="nav-link">
				<i class="far fa-circle nav-icon"></i>
				<p>表格</p>
			</a>
		</li>
		<li class="nav-item">
			<a href="/admin/dashboard/date" class="nav-link">
				<i class="far fa-circle nav-icon"></i>
				<p>日历</p>
			</a>
		</li>
		<li class="nav-item">
			<a href="/admin/dashboard/tinymce" class="nav-link">
				<i class="far fa-circle nav-icon"></i>
				<p>富文本编辑</p>
			</a>
		</li>
	</ul>
</li>
<li class="nav-item">
	<a href="/admin/login" class="nav-link">
		<i class="nav-icon fas fa-th"></i>
		<p>
			登录
			<span class="right badge badge-danger">New</span>
		</p>
	</a>
</li>
<li class="nav-item">
	<a href="/admin/register" class="nav-link">
		<i class="nav-icon fas fa-ambulance"></i>
		<p>
			注册
		</p>
	</a>
</li>
</ul>
`
const menu2 = `
<ul class="nav nav-pills nav-sidebar flex-column nav-child-indent" data-widget="treeview" role="menu"
data-accordion="false">
<li class="nav-item">
	<a href="/" class="nav-link">
		<i class="nav-icon fas fa-home"></i>
		<p>
			后台首页
		</p>
	</a>
</li>
<li class="nav-item">
	<a href="/userinfo" class="nav-link">
		<i class="nav-icon fas fa-blind"></i>
		<p>
			会员信息
		</p>
	</a>
</li>
<li class="nav-item">
	<a href="/nsdfasfsf" class="nav-link">
		<i class="nav-icon fas fa-blind"></i>
		<p>
			等级2
		</p>
	</a>
</li>
<li class="nav-item has-treeview">
	<a href="javascript:;" class="nav-link">
		<i class="nav-icon fas fa-tachometer-alt"></i>
		<p>
			Dashboard
			<i class="right fas fa-angle-left"></i>
		</p>
	</a>
	<ul class="nav nav-treeview">
		<li class="nav-item">
			<a href="/admin/dashboard/table" class="nav-link">
				<i class="far fa-circle nav-icon"></i>
				<p>表格</p>
			</a>
		</li>
		<li class="nav-item">
			<a href="/admin/dashboard/date" class="nav-link">
				<i class="far fa-circle nav-icon"></i>
				<p>日历</p>
			</a>
		</li>
		<li class="nav-item">
			<a href="/admin/dashboard/tinymce" class="nav-link">
				<i class="far fa-circle nav-icon"></i>
				<p>富文本编辑</p>
			</a>
		</li>
	</ul>
</li>
<li class="nav-item">
	<a href="/admin/login" class="nav-link">
		<i class="nav-icon fas fa-th"></i>
		<p>
			Login
			<span class="right badge badge-danger">New</span>
		</p>
	</a>
</li>
<li class="nav-item">
	<a href="/admin/register" class="nav-link">
		<i class="nav-icon fas fa-ambulance"></i>
		<p>
			Register
		</p>
	</a>
</li>
</ul>
`


// 获取菜单
router.post("/menulist", async (req, res) => {
	const { role } = req.body
	if (role == 1) {
		res.status(200).json({
			code: 200,
			success: menu1,
			date: new Date().getTime()
		})
	} else {
		res.status(200).json({
			code: 200,
			success: menu2,
			date: new Date().getTime()
		})
	}

})

module.exports = router
