/*
 * Author       : JackWei <wsm_1105@163.com>
 * LastEditors  : JackWei <wsm_1105@163.com>
 * Date         : 2020-06-13 15:06:22
 * LastEditTime : 2020-06-13 15:15:48
 * Description  : 打包前清除掉上一次某些文件
 */ 

const rimraf = require("rimraf")
const path = require("path")
const glob = require("glob")
const chalk = require("chalk")
const Log = console.log

glob.sync(path.resolve(__dirname, "../dist") + "/*").forEach(filePath => {
  const curPath = filePath.slice(filePath.lastIndexOf("/"))
  if(curPath == "/dist") return
  if(curPath == "/vendor") return
  if(curPath == "/manifest") return
  if(curPath == "/dll") return

  rimraf(filePath, () => {
    Log(chalk.hex("#E9232C").bold("删除: ") + chalk.hex("#666").underline(filePath))
  })
})
  
