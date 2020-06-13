/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-06-13 16:19:41
 * LastEditTime : 2020-06-13 17:11:56
 * Description  : 公共的HTML资源，修改此页面的配置需要重启服务
 */


module.exports = {
	// HTML头部片段
	head: {
		// 必须的head
		baseHead: `
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<!-- Tell the browser to be responsive to screen width -->
			<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
			<!-- base style -->
			<link rel="stylesheet" href="/vendor/fontawesome-free/css/all.min.css">
			<link rel="stylesheet" href="/vendor/ionicons/css/ionicons.min.css">
			<link rel="stylesheet" href="/vendor/overlayscrollbars/OverlayScrollbars.min.css">
			<!-- adminlte theme -->
			<link rel="stylesheet" href="/vendor/adminlte/css/adminlte.min.css">
			<!-- Google Font -->
			<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">


			<!-- [if lt IE 9]>
				<script src="https://cdn.bootcdn.net/ajax/libs/html5shiv/3.7.3/html5shiv-printshiv.min.js"></script>
			<![endif] -->
		`,
		// datatable一些样式head
		tableHead: `
			<!-- plugins -->
			<link rel="stylesheet" href="/vendor/datatables-bs4/css/dataTables.bootstrap4.min.css">
			<link rel="stylesheet" href="/vendor/datatable-checkbox/dataTables.checkboxes.css">
			<link rel="stylesheet" href="/vendor/datatables-responsive/css/responsive.bootstrap4.min.css">
			<link rel="stylesheet" href="/vendor/datatables-button/buttons.dataTables.min.css">
		`
	},
	// HTML底部JS
	script: {
		// tinymce富文本
		tinymceScript: `
			<script src="/vendor/tinymce/tinymce.min.js"></script>
			<script src="/vendor/tinymce/themes/silver/theme.min.js"></script>
		`,
		// 必须的依赖
		baseScript: `
			<script src="/vendor/jquery/jquery.min.js"></script>
			<script src="/vendor/popper/popper.min.js"></script>
			<script src="/vendor/bootstrap/bootstrap.min.js"></script>
			<script src="/vendor/adminlte/js/adminlte.min.js"></script>
			<script src="/vendor/overlayscrollbars/jquery.overlayScrollbars.min.js"></script>
		`,
		// datatable依赖
		tableScript: `
			<!-- inject your plugins -->
			<!-- DataTables -->
			<script src="/vendor/datatables/jquery.dataTables.min.js"></script>
			<script src="/vendor/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
			<script src="/vendor/datatables-responsive/js/dataTables.responsive.min.js"></script>
			<script src="/vendor/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
			<script src="/vendor/datatable-checkbox/dataTables.checkboxes.min.js"></script>
			<!-- datatable打印、表格、PDF插件 -->
			<script src="/vendor/datatables-button/dataTables.buttons.min.js"></script>
			<script src="/vendor/datatables-button/buttons.flash.min.js"></script>
			<script src="/vendor/datatables-button/jszip.min.js"></script>
			<script src="/vendor/datatables-button/pdfmake.min.js"></script>
			<script src="/vendor/datatables-button/vfs_fonts.js"></script>
			<script src="/vendor/datatables-button/buttons.print.min.js"></script>
			<script src="/vendor/datatables-button/buttons.html5.min.js"></script>
		`,
	},
	// HTML公共布局
	layout: {
		// 顶部导航栏 
		nav: `
			<nav class="main-header navbar navbar-expand ">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link" id="toggleSideBar" data-widget="pushmenu" href="#" role="button"><i
								class="fas fa-bars"></i></a>
					</li>
					<li class="nav-item d-none d-sm-inline-block">
						<a href="/" class="nav-link">Home</a>
					</li>
					<li class="nav-item d-none d-sm-inline-block">
						<a href="#" class="nav-link">Contact</a>
					</li>
				</ul>

				<form class="form-inline ml-3">
					<div class="input-group input-group-sm">
						<input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
						<div class="input-group-append">
							<button class="btn btn-navbar" type="submit">
								<i class="fas fa-search"></i>
							</button>
						</div>
					</div>
				</form>

				<ul class="navbar-nav ml-auto">
					<li class="nav-item dropdown">
						<a class="nav-link" data-toggle="dropdown" href="#">
							<i class="far fa-bell"></i>
							<span class="badge badge-warning navbar-badge">15</span>
						</a>
						<div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
							<span class="dropdown-header">15 Notifications</span>
							<div class="dropdown-divider"></div>
							<a href="#" class="dropdown-item">
								<i class="fas fa-envelope mr-2"></i> 4 new messages
								<span class="float-right text-muted text-sm">3 mins</span>
							</a>
							<div class="dropdown-divider"></div>
							<a href="#" class="dropdown-item">
								<i class="fas fa-users mr-2"></i> 8 friend requests
								<span class="float-right text-muted text-sm">12 hours</span>
							</a>
							<div class="dropdown-divider"></div>
							<a href="#" class="dropdown-item">
								<i class="fas fa-file mr-2"></i> 3 new reports
								<span class="float-right text-muted text-sm">2 days</span>
							</a>
							<div class="dropdown-divider"></div>
							<a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
						</div>
					</li>
					<li class="nav-item dropdown user-menu">
						<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
							<img src="/vendor/adminlte/img/user2-160x160.jpg" class="user-image img-circle elevation-2" alt="User Image">
						</a>
						<ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
							<!-- User image -->
							<li class="user-header bg-primary">
								<img src="/vendor/adminlte/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">

								<p>
									姓名：JackWei
									<small>Member since Nov. 2012</small>
								</p>
							</li>
							<!-- Menu Body -->
							<li class="user-body">
								<div class="row">
									<div class="col-4 text-center">
										<a href="#">Followers</a>
									</div>
									<div class="col-4 text-center">
										<a href="#">Sales</a>
									</div>
									<div class="col-4 text-center">
										<a href="#">Friends</a>
									</div>
								</div>
							</li>
							<!-- Menu Footer-->
							<li class="user-footer">
								<a href="javascript:void(0);" class="btn btn-default btn-flat">详情</a>
								<a href="javascript:void(0);" id="logout" class="btn btn-default btn-flat float-right">退出</a>
							</li>
						</ul>
					</li>
					<li class="nav-item">
						<a id="fullscreen" class="nav-link" href="javascript:void(0);">
							<i class="screen-control fas fa-compress"></i>
						</a>
					</li>
					<!-- 主题切换 -->
					<li class="nav-item dropdown">
						<a href="#" id="curModel" data-toggle="dropdown" aria-expanded="false" class="nav-link dropdown-toggle">模式</a>
						<ul id="modelList" aria-labelledby="dropdownSubMenu1" class="dropdown-menu border-0 shadow"
							style="left: 0px; right: inherit;">
							<li><a href="javascript:void(0);" class="dropdown-item">夜晚</a></li>
							<li><a href="javascript:void(0);" class="dropdown-item">白天</a></li>
							<!-- <li><a href="javascript:void(0);" class="dropdown-item">自动</a></li> -->
						</ul>
					</li>
				</ul>
			</nav>
		`,
		// 侧边栏
		sidebar: `
			<aside class="main-sidebar sidebar-dark-primary elevation-4">
				<!-- 侧边栏品牌logo -->
				<a href="/" class="brand-link">
					<img src="/vendor/adminlte/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
						style="opacity: .8">
					<span class="brand-text font-weight-light">AdminLTE 3</span>
				</a>

				<!-- 侧边栏 -->
				<div class="sidebar">
					<!-- 侧边栏菜单 -->
					<nav class="mt-2">

					</nav>
				</div>
			</aside>
		`,
		// 脚部
		footer: `
			<footer class="main-footer text-sm">
				<div class="float-right d-none d-sm-inline">
					Anything you want
				</div>
				<strong>Copyright &copy; 2014-2019 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights
				reserved.
			</footer>
		`
	}
}
