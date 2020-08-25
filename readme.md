# webpack+gulp使用adminLTE3.x和bootstrap4.x搭建后台通用的骨架
本后台管理系统主要是基于webpack+jQuery的传统页面开发，属于webpack多入口工程，在bootstrap的基础上使用adminlte3后台管理系统框架来搭建页面，用gulp工具来辅助webpack编译bootstrap来到达定制化bootstrap。相同的，后台管理系统在webpack基础上分支出开发环境和生产环境两个阶段，方便开发和维护。

## 工程结构
```md
webpack-adminlte
  ├── build                            【webpack config】            
  │    ├── webpack.config.js            =>            统一变量、通用函数、入口配置、manifest配置
  │    ├── webpack.base.conf.js         =>            基本公共配置
  │    ├── webpack.dev.conf.js          =>            开发环境配置
  │    ├── webpack.prod.conf.js         =>            生产环境配置
  │    ├── webpack.del.conf.js          =>            配置清除上次打包文件
  │    └── webpack.dll.conf.js          =>            manifest配置
  ├── dist                             【webpack output】   
  |    ├── *                            =>            打包后的各种文件
  |    └── static                       =>            第三方静态库(不参与打包)
  ├── mock                             【mock server】
  |    ├── server.js                    =>            mock server entry
  |    ├── config                      【about mock server config】 
  |    ├── routers                     【mock routes】   
  |    |    ├── article.js              =>            文章相关路由
  |    |    ├── *.js                    =>            *相关路由
  |    ├── util                        【about mock server util】 
  |    └── static                      【about mock server static file】 
  |         ├── img                    【img file】
  |         ├── file                   【orther file】
  |         └── video                  【video file】
  ├── src                              【project origin code】   
  |    ├── api                         【about ajax http】
  |    |    ├── cmsAction.js            =>            文章相关HTTP请求
  |    |    └── *Action.js              =>            *相关HTTP请求
  |    ├── assets                      【about project static files that needs webpack pack】
  |    |    ├── image                  【图片】
  |    |    └── style                  【样式】
  |    ├── bootstrap                   【bootstrap】
  |    |    └── custom.scss             =>            自定义bootstap保存进行编译
  |    ├── config                      【about origin code config eg: 环境、变量...】
  |    ├── components                      【组件】
  |    |    ├── backtop/backtop         =>            返回顶部
  |    |    ├── notice/notice           =>            提示框
  |    |    └── ...                     =>            ...
  |    ├── layout                      【布局】
  |    |    ├── common                 【复用】
  |    |    |    ├── nav.html           =>            顶部导航栏
  |    |    |    ├── footer.html        =>            脚部版权相关
  |    |    |    ├── sidebar.html       =>            侧边导航栏
  |    |    |    ├── breabcrumb.html    =>            面包屑
  |    |    |    ├── loading.html       =>            页面加载
  |    |    |    ├── baseheader.html    =>            公用的`head标签`内容
  |    |    |    └── basescript.html    =>            公用的`script标签`内容
  |    |    ├── pluginHead             【插件样式放在头部】
  |    |    |    ├── tableHead.html     =>            datatable相关样式
  |    |    |    └── *Head.html         =>            *相关样式
  |    |    ├── pluginScript           【插件js放在脚部】
  |    |    |    ├── tableScript.html   =>            datatable相关js
  |    |    |    └── *Script.html       =>            *相关js
  |    ├── pages                       【工程页面 eg:文件夹代表真实路径,文件夹下的index.js当前页面下的入口】
  |    |    ├── admin 
  |    |    |    ├── cms 
  |    |    |    |    ├── post 
  |    |    |    |    |    ├── index.html   =>        `/admin/cms/post`页面
  |    |    |    |    |    ├── index.js     =>        `/admin/cms/post`页面入口
  |    |    |    |    |    ├── index.scss   =>        `/admin/cms/post`页面样式(需在入口引入)
  |    |    |    |    |    ├── ...          =>        ...
  |    |    |    |    |    ├── detail      【路径下可以继续嵌套路径】
  |    |    |    |    |    |    ├── index.js  =>      `/admin/cms/post/deail`页面
  |    |    |    └──  └──  └──  └── ...
  |    ├── setting                     【设置】
  |    |    ├── index.js                =>            设置入口
  |    |    ├── breadcrumb.js           =>            生成面包屑
  |    |    ├── globalEven.js           =>            全局事件
  |    |    ├── activeLink.js           =>            标记侧边栏
  |    |    ├── theme.js                =>            主题模式相关(保留)
  |    |    ├── custom.scss             =>            全局样式
  |    |    └── ...                     =>            ...
  |    ├── util                        【工具】
  |    |    ├── http.js                 =>            ajax
  |    |    ├── upload.js               =>            upload img file ...
  |    |    └── ...                     =>            ...
  |    └── route.js                     =>            工程页面路由
  ├── .babelrc                          =>            babel config for webpack
  ├── .browerslistrc                    =>            about brower support 
  ├── .editorconfig                     =>            about project edit config 
  ├── .eslintignore                     =>            eslint ignore
  ├── .eslintrc                         =>            eslint config
  ├── gulpfile.js                       =>            gulp config
  ├── LICENSE                           =>            LICENSE
  └── postcss.config.js                 =>            perfect css for webpack
```

以上便是后台管理系统工程目录和解释，`【xxx】`为文件夹注释，`=> xxx`为文件注释

## 食用步骤

### 启动
1. 初次克隆本项目的伙伴需要先下载项目所有依赖，执行:
```sh
npm install

npm run bstp-install
```

2. 启动项目，执行：
```sh
npm run dev
```

3. 打包项目，执行：
```sh
npm run build
```

4. 本地预览，执行：
```sh
npm start
```

5. 打包发布，执行：
```sh
npm run publish
```


项目在`package.json`中设置了基本的脚本，你可以根据自己的需求进行增添或删除,


### 介绍

基本脚本介绍:
- `bstp-install`: 下载`bootstap相关`的依赖
- `compile-bstp`: 编译`bootstap`，已经整合到gulp中，无需手动编译
- `del`: 执行将会删除上次打包结果(已经整合到dev和build)
- `mock`: 启动mock服务
- `gulp`: 启动gulp服务
- `webpack-dev`: 启动webpack开发环境不包含mock服务
- `webpack`: 启动工程开发环境如果你不需要编译bootstap
- `dll`: 打包manifest
- `dev`: 启动工程开发环境包含编译bootstap
- `build`: 打包工程
- `start`: 运行打包后的工程


## 注意事项

### pack library

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


### 文件命名
`pages`是页面文件的入口，`page/**`下的文件夹名字表示真实的路径URL，webpack会以文件夹下的`index.js`作为当前页面入口，`index.html`会作为当前页面的html文件模板，因此真实的页面文件夹下必须包含`index.html和index.js`，这个主要和webpack的配置有关，自己也可以根据实际的需求进行更改


### 版本要求
- webpack4
- nodejs >= 6.8.0


### blog
Blog's articles for this link：[https://blog.usword.cn](https://blog.usword.cn)


## donate
Thank you for your donation

<div style="display:flex;align-item:center;justify-content:center;">
 <img src="https://cdn.jsdelivr.net/gh/1046224544/cdn1@master/base/alipay.png" width = "200" height = "230" alt="支付宝" align=center />
 <img src="https://cdn.jsdelivr.net/gh/1046224544/cdn1@master/base/wechatpay.jpg" width = "200" height = "230" alt="微信" align=center />
</div>
