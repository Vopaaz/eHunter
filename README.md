# eHunter
提供卷轴式/书本式阅读

# 预览
<img src="https://raw.githubusercontent.com/hanFengSan/eHunter/master/github_image/github_preview_1.jpg" style="width: 800px; display: block; padding: 10px;"/>
<img src="https://raw.githubusercontent.com/hanFengSan/eHunter/master/github_image/github_preview_2.jpg" style="width: 800px; display: block; padding: 10px;"/>
<img src="https://raw.githubusercontent.com/hanFengSan/eHunter/master/github_image/github_preview_3.jpg" style="width: 800px; display: block; padding: 10px;"/>

## 实现方式概要
在在原页面上新创建一个节点, 将vue注入到此节点上. 爬虫是利用fetch实现的.
实现上基本隔离了具体环境, 可很容易得移植到其他漫画网站/平台等.

## 获取
Chrome版本: [地址](https://chrome.google.com/webstore/detail/ehunter-more-powerful-e-h/dnnicnedpmjkbkdeijccbjkkcpcbmdoo)
Firefox版本: [地址](https://addons.mozilla.org/zh-CN/firefox/addon/ehunter/)
油猴版本: [地址](https://greasyfork.org/zh-CN/scripts/39198-ehunter)

## 运行
`npm install`后, 再`npm run dev`就可以进入dev模式了(当然,我个人喜好用yarn).
在`chrome://extensions`页面顶部打开开发者模式, 选择项目的`/dist`文件夹就OK了.
`npm run publish`可以直接生成chrome&firefox用的zip压缩文件到`publish_output`文件夹.
油猴的话, 直接把`npm run publish`后, `/dist/inject.js`的内容顶部加上油猴需要的相关注释信息就可以了.


## 项目结构
```
|-eHunter
  |-build
    |-gulpfile.js // 部署用的gulp脚本
    |-webpack.dev.conf.js // 开发中打包用的webpack脚本
    |-webpack.prod.conf.js // 生产中打包用的webpack脚本
  |-dist // release文件夹
  |-src
    |-assets // 资源文件夹
    |-components // vue组件
    |-service // 业务类
      |-parser // 解析页面用的各种praser class
      |-request // 异步请求队列序列化/请求失败自动重试等功能的请求服务类
      |-storage // 差不多是个model层吧...
      |-type // 一些类型的服务类
      |-api.js // 请求url的封装
      |-NotificationService.js // 通知服务
      |-SettingServie.js // 设置服务类
      |-PlatformService.js // 平台接口的隔离层, 用于屏蔽chrome和firefox的api上的差异
    |-store // vuex相关
    |-style // sass的变量还有muse-ui的定制等
    |-utils // 工具类
    |-app.injuect.vue // 卷轴阅读的vue主组件
    |-app.popup.vue // 弹出框的vue主组件
    |-background.js // chrome的后台任务, 目前只用于通知服务
    |-main.inject.js // webpack入口; vue注入前的前期处理
    |-main.popup.js // webpack入口
    |-mainifest.json // chrome extension的文件/权限/说明用的清单
```