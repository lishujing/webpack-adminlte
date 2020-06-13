# webpack+gulp使用adminLTE3.x和bootstrap4.x搭建通用的骨架

## 食用步骤

### 操作简述

``` bash

* npm install

* npm run dev

* npm run build

* npm start

```

### 步骤介绍

* 下载依赖：`npm install`

* 打开开发环境(首次执行会需要一点时间下载bootstrap的依赖): `npm run dev`

* 打包：`npm run build`，若看到出现`npm run dll`字样，请执行`npm run dll`抽离第三方库（详细操作看下面的注意事项）

* 打包后查看：`npm run start`

## 注意事项

> 如果你想用webpack把第三方库打包单独打包出去，请自行在 `build/webpack.config.js` 中找到 `VendorLibrary` 对象，把你想打包的第三库名字作为 `key` ，数组中包含的是真正要打包的东西，请看下方实例：

``` js
//path： build/webpack.config.js

const VendorLibrary = {
    vue: ['vue', 'vuex', 'vue-router'] // add some bootstrap library in project.
    // bootstrap: ['bootstrap'],  // you can add orther library for using.
    // jQuery: ['jquery'],
    // popper: ['popper.js']
}
```

上面演示了想把 `vue` 单独打包出去，后面的数组中是你想把哪些库放在里面，当然放的东西项目中肯定都是用到的，不然就没有啥意义了，上面代码是将 `vue，vuex，vue-router` 都打包到一个 `vue` 中去，
你也可以放一个，像下面这种

``` js
//path： build/webpack.config.js

const VendorLibrary = {
        vue: ['vue']
        vuex: ['vuex'],
        vuex: ['vue-router']
```

>如果没有以上要打包的资源，不必执行`npm run dll`，具体看控制台是否显示`npm run dll`，没有则不用执行


## 项目介绍
### src目录
1. 本项目是基于`webpack+gulp`搭建的多入口页面应用，`src`是项目的源代码，`src/pages`是你需要添加的心得页面，页面的路径对应文件夹的名字，文件夹下的`html`文件统一命名`index.html`,入口的js文件必须是`index.js`，`index目录`是首页文件夹，
>新建pages下面新文件夹，要重新启动服务，`npm run dev`

2. 其中`setting目录`和系统的配置相关

### dist目录
1. `dist`目录是项目最终生成打包的目标文件夹，其中`vendor`文件夹是第三方库文件，不用动它
2. `dll`和`manifest`文件夹是你用webpack打包的动态链接库，只有你在`build/webpack.config.js`配置了需要单独打包的库，执行`npm run dll`才会有这个目录，关于动态链接库的配置，请看上面的注意事项

### mock目录
1. 用来模拟`mock数据`


### bootstrap订制
bootstrap订制需要在`src/bootstrap/custom.scss`进行自己相关的订制，详细见[bootstrap主题化](https://getbootstrap.net/docs/getting-started/theming/)



## donate
Thank you for your donation

<div style="display:flex;align-item:center;justify-content:center;">
 <img src="https://cdn.jsdelivr.net/gh/1046224544/cdn1@master/base/alipay.png" width = "200" height = "230" alt="支付宝" align=center />
 <img src="https://cdn.jsdelivr.net/gh/1046224544/cdn1@master/base/wechatpay.jpg" width = "200" height = "230" alt="微信" align=center />
</div>
