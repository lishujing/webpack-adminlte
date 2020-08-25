/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-05-26 10:37:17
 * LastEditTime : 2020-06-12 14:35:24
 * Description  : some config about adminlte theme
 */

export default class theme {
	constructor() {
		this.darkStyle = `
			.content-wrapper,
			.content-wrapper div,
			.content-wrapper span,
			.content-wrapper h3,
			.content-wrapper h2,
			.content-wrapper h1,
			.content-wrapper h4,
			.content-wrapper h5 {
				background: #343a40;
				color: #c7c4c4 !important;
			}
			.info-box{
				background-color: #343a40 !important;
			}
			.bg-gradient-warning,
			.bg-gradient-success{
				background: #343a40 !important;
			}
			
			.main-footer {
				background-color: #343a40 !important;
				color: #c7c4c4 !important;
				border-top: 1px solid #515457;
			}
			
			.main-header {
				border-bottom: 1px solid #515457;
			}
			.main-header .dropdown-menu {
				background-color: #343a40 !important;
				border: 1px solid #c7c4c4;
			}
			.main-header .dropdown-menu a {
				color: #c7c4c4 !important;
			}
			.main-header .dropdown-menu a:hover {
				background-color: #666464 !important;
			}
			.main-header .dropdown-menu span {
				color: #c7c4c4 !important;
			}
			input.form-control{
				color: #c7c4c4;
			}

			/*锁屏截面*/
			html{
				background-color: #343a40 !important;
			}
			.lockscreen, .lockscreen-logo a{
				background-color: #343a40 !important;
				color: #c7c4c4 !important;
			}

			/*datatable*/
			.page-item .page-link{
				background-color: #343a40 !important;
				color: #c7c4c4 !important;
			}
			.page-item.active .page-link{
				font-weight: 600;
			}
			.page-item.disabled .page-link{
				background-color: #404449 !important;
			}
			.table-hover tbody tr:hover {
				color: #212529;
				background-color: rgb(255, 255, 255) !important;
			}
			.table-hover tbody tr:hover span{
				color: #212529;
				background-color: transparent !important;
			}
			.dataTables_filter .form-control{
				background-color: rgba(255,255,255,.2);
				border: none;
			}
			.form-control:focus {
				background-color: rgba(255,255,255,.6);
				border: 0!important;
				color: #343a40;
			}
			.layout-footer-fixed .wrapper .content-wrapper{
				background-color: #343a40;
			}


			/*datatables下载button*/
			button.dt-button, div.dt-button, a.dt-button {
				color: #212529 !important;
				background-color: #343a40 !important;
				background-image: none !important;
				border: 1px solid rgb(214, 214, 214);
			}
			button.dt-button:hover, div.dt-button:hover, a.dt-button:hover{
				background-color: #474344 !important;
			}
			.dt-buttons .dt-button:hover span{
				background-color: #474344 !important;
				color: #fff;
			}
			.dt-buttons .dt-button span{
				background-color: #343a40 !important;
			}
			.dt-button-info,
			.dt-button-info h2{
				background-color: #343a40 !important;
				color: #c7c4c4 !important;
			}
			


			@media (min-width: 576px) {
				.navbar-nav > .user-menu > .dropdown-menu > .user-body a {
					background-color: #343a40 !important;
					color: #c7c4c4 !important;
				}
				.navbar-nav > .user-menu > .dropdown-menu > .user-footer {
					background-color: #343a40;
				}
				.navbar-nav > .user-menu > .dropdown-menu > .user-header.bg-primary {
					background-color: #343a40 !important;
				}
				.btn-default {
					background-color: #343a40 !important;
				}
			}

			@media (max-width: 576px) {
				.navbar-nav > .user-menu > .dropdown-menu > .user-body a {
					background-color: #343a40 !important;
					color: #c7c4c4 !important;
				}
				.navbar-nav > .user-menu > .dropdown-menu > .user-footer {
					background-color: #343a40;
				}
				.navbar-nav > .user-menu > .dropdown-menu > .user-header.bg-primary {
					background-color: #343a40 !important;
				}
				.btn-default {
					background-color: #343a40 !important;
				}
			}

			.login-page,
			.register-page{
				background-color: #343a40 !important;
				color: #c7c4c4 !important;
			}
			.login-box .card-body,
			.register-box .card-body{
				background-color: #333333 !important;
				color: #c7c4c4 !important;
			}
			.login-logo a,
			.register-logo a{
				color: #c7c4c4 !important;
			}
			.card-danger:not(.card-outline)>.card-header{
				background-color: #333333 !important;
			}
			.card, .info-box, .timeline-item{
				box-shadow: 0 0 28px rgba(0,0,0,.25),0 0 10px rgba(0,0,0,.22)!important;
			}
			.wrapper .content-header{
				/* border-bottom: 1px solid #515457; */
			}

			/*顶部进度条nprogress*/
			#nprogress .bar{
				background: #fff !important;
				height: 3px;
			}
			#nprogress .spinner-icon{
				border-top-color: #fff;
  			border-left-color: #fff;
			}

			/*tinymce*/
			.container-fluid blockquote{
				background-color: #343a40 !important;
				box-shadow: 0 2px 10px rgba(0,0,0,.25),0 2px 2px rgba(0,0,0,.22)!important;
			}

			/*bootstrap*/
			.modal.fade,.modal-dialog{
				background-color: transparent !important;
			}

			.wrapper .content-header{
				background-color: #343a40;
			}

			.main-sidebar,
			.brand-link{
				background-color: #343a40;
			}
			.brand-link{
				color: #fff !important;
			}
		`

		this.lightStyle = `
			.control-sidebar{
				color: rgb(51, 51, 51);
			}
			.os-scrollbar-handle{
				background: rgba(0, 0, 0, .4) !important;
			}
			.wrapper .content-header{
				background-color: #f8f8f8;
			}


			
		`
	}

	dark() {
		$(".main-header.navbar").removeClass("navbar-white navbar-light").addClass("navbar-dark navbar-gray-dark")
		$(".main-sidebar").removeClass("sidebar-light-primary").addClass("sidebar-dark-primary")
		$(".control-sidebar").removeClass("control-sidebar-light").addClass("control-sidebar-dark")
	}
	light() {
		$(".main-header.navbar").removeClass("navbar-gray-dark navbar-dark").addClass("navbar-white navbar-light")
		$(".main-sidebar").removeClass("sidebar-dark-primary").addClass("sidebar-light-primary")
		$(".control-sidebar").removeClass("control-sidebar-dark").addClass("control-sidebar-light")
	}
}


