/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : Please set LastEditors
 * Date         : 2020-04-29 11:22:30
 * LastEditTime : 2020-07-31 10:02:14
 * Description  : Please_add_description
 */ 

import "@/util/getMenu"
import "@/setting/index"
import Chart from "chart.js"

Chart.platform.disableCSSInjection = false

// 条形图
var ticksStyle = {
	fontColor: "#495057",
	fontStyle: "bold"
}
new Chart($("#chart"), {
	type: "bar",
	data: {
		labels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
		datasets: [
			{
				backgroundColor: "#007bff",
				borderColor: "#007bff",
				data: [1000, 2000, 3000, 2500, 2700, 2500, 3000]
			},
			{
				backgroundColor: "#ced4da",
				borderColor: "#ced4da",
				data: [700, 1700, 2700, 2000, 1800, 1500, 2000]
			}
		]
	},
	options: {
		maintainAspectRatio: false,
		tooltips: {
			mode: "index",
			intersect: true
		},
		hover: {
			mode: "index",
			intersect: true
		},
		legend: {
			display: false
		},
		scales: {
			yAxes: [{
				// display: false,
				gridLines: {
					display: true,
					lineWidth: "4px",
					color: "rgba(0, 0, 0, .2)",
					zeroLineColor: "transparent"
				},
				ticks: $.extend({
					beginAtZero: true,

					// Include a dollar sign in the ticks
					callback: function (value, index, values) {
						if (value >= 1000) {
							value /= 1000
							value += "k"
						}
						return "$" + value
					}
				}, ticksStyle)
			}],
			xAxes: [{
				display: true,
				gridLines: {
					display: false
				},
				ticks: ticksStyle
			}]
		}
	}
})

// 饼图
var pieChartCanvas = $("#pieChart").get(0).getContext("2d")
var pieChart = new Chart(pieChartCanvas, {
	type: "pie",
	data: {
		labels: [
			"Chrome",
			"IE",
			"FireFox",
			"Safari",
			"Opera",
			"Navigator",
		],
		datasets: [
			{
				data: [700, 500, 400, 600, 300, 100],
				backgroundColor: ["#f56954", "#00a65a", "#f39c12", "#00c0ef", "#3c8dbc", "#d2d6de"],
			}
		]
	},
	options: {
		maintainAspectRatio: false,
		responsive: true,
	}
})
