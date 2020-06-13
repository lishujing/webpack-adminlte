/*
 * Author: JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date: 2020-05-20 13:26:11
 * LastEditTime : 2020-06-04 14:30:19
 * Description: use gulp to build the project
 */

const fs = require("fs")
const path = require("path")
const gulp = require("gulp")
const gulpDebug = require("gulp-debug")
const shell = require("shelljs")
let isChangeScss


// 初始化改变bootstrap文件内容
gulp.task("changebstap", done => {
  fs.readFile("./node_modules/bootstrap/scss/bootstrap.scss", "utf8", (err, data) => {
    isChangeScss = data.includes("@import '../../../src/bootstrap/custom.scss';")
    if (!isChangeScss) {
      fs.writeFile("./node_modules/bootstrap/scss/bootstrap.scss", "@import '../../../src/bootstrap/custom.scss';" + data, () => { })
      console.log("******   bootstrap is changing    ******\n")
      done()
      return
    }
    console.log("******   bootstrap has changed    ******\n")
    done()
    return
  })
})


// 编译bootstrap订制的scss文件
gulp.task("compile", done => {
  shell.exec("npm run compile-bstp")
  done()
})


// 监视活动
gulp.task("auto", done => {
  return gulp.watch("./src/bootstrap/custom.scss", gulp.series("compile", "exportbstp"))
  // done()
})

// 输出bootstrap
gulp.task("exportbstp", () => {
  return gulp.src("./node_modules/bootstrap/dist/css/bootstrap.css")
    .pipe(gulp.src("./node_modules/bootstrap/dist/css/bootstrap.css.map"))
    .pipe(gulp.src("./node_modules/bootstrap/dist/css/bootstrap-grid.css"))
    .pipe(gulp.src("./node_modules/bootstrap/dist/css/bootstrap-grid.css.map"))
    .pipe(gulp.src("./node_modules/bootstrap/dist/css/bootstrap-reboot.css"))
    .pipe(gulp.src("./node_modules/bootstrap/dist/css/bootstrap-reboot.css.map"))
    .pipe(gulp.src("./node_modules/bootstrap/dist/js/bootstrap.min.js"))
    .pipe(gulp.src("./node_modules/bootstrap/dist/js/bootstrap.min.js.map"))
    .pipe(gulpDebug({ title: "export bootstrap：" }))
    .pipe(gulp.dest("./dist/vendor/bootstrap"))
})

// 输出adminlte
// gulp.task("exportadminlte", () => {
//   return gulp.src("./node_modules/admin-lte/dist/**/*")
//     .pipe(gulpDebug({ title: "export adminlte：" }))
//     .pipe(gulp.dest("./dist/vendor/adminlte"))
// })

// install Bootstrap
gulp.task("buildBootstrap", done => {
  console.log("******   Building BootStrap：   ******\n")
  fs.readdir(path.resolve(__dirname, "node_modules/bootstrap/node_modules"), (err, data) => {
    if (err) {
      shell.exec("npm run bstp-install")
      done()
      return
    }
    console.log("******   Bootstrap has builded    ******\n")
    done()
    return
  })

})


gulp.task("default",
  gulp.series(
    "buildBootstrap",
    "changebstap",
    "exportbstp",
    // "exportadminlte",
    "auto"
  )
)

