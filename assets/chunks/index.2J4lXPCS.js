import{O as Tt,a5 as wt,a7 as yt,d as bt,g as it,o as Ct,c as Mt,n as St,P as Et,k as vt}from"./framework.3EKbrk2Y.js";const se=JSON.parse('[{"url":"/tools/chrome-web-scrapper/","frontmatter":{"title":"浏览器插件：Web Scraper 的基本用法和抓取页面内容示例","date":"2023-12-25T17:16:00.000Z","thumbnail":"./images/5.jpg","wordCount":1587},"excerpt":"WebScraper是一个浏览器扩展，用于从页面中提取数据(网页爬虫)。对于简单或偶然的需求非常有用，例如正在写代码缺少一些示例数据，使用此插件可以很快从类似的网站提取内容作为模拟数据。从Chrome的插件市场安装后，页面F12打开开发者工具会多出一个名WebScraper的面板","src":"","html":""},{"url":"/frontend/js-module-types/","frontmatter":{"title":"模块化开发：AMD、CMD、UMD、CommonJS和EsModule的浅谈","date":"2023-12-22T09:48:00.000Z","thumbnail":"./images/9.jpg","wordCount":3671},"excerpt":"模块化是目前开发绕不开的话题，很多语言都有类似的机制，但最初作为脚本目的的JavaScript却没有这样的机制。这也导致后来社区群起提出很多规范，经过多年争执和混乱，目前使用最广的是2大模块规范：CommonJS和EsModule规范。其中CommonJS是NodeJS的内置规范","src":"","html":""},{"url":"/tools/vite-plugin-build-info/","frontmatter":{"title":"编写Vite插件：根据后缀加载不同的文件并输出构建时间/版本等信息","date":"2023-12-18T11:31:00.000Z","thumbnail":"./images/2.jpg","wordCount":2534},"excerpt":"在日常开发中，输出版本号和构建时间会是个常见需求，有利用于定位到具体代码中。有时也想根据文件后缀进行打包，毕竟有时候2个项目间只有部分页面不同。以上，开发个vite插件可以很好地满足需要，过程就不具体说了，贴下主要代码。输出版本号和构建时间以下代码，输出LOGO、Git提交哈希值","src":"","html":""},{"url":"/tools/emby-unlock-server/","frontmatter":{"title":"Emby：自建验证服务器绕过 Emby Premiere 的校验","date":"2023-12-14T17:25:00.000Z","thumbnail":"./images/2.jpg","wordCount":2768},"excerpt":"Emby是一个基于C/C++实现的私有影音管理工具，自带web管理面板同时支持在移动端、平板端等平台上连接EmbyServer进行播放。原本是开源的，后来转了闭源，基于此产生另一开源分支jellyfin。会员计划Emby有个叫EmbyPremiere的会员计划，永久版119刀，可","src":"","html":""},{"url":"/vue/vue-load-from-url/","frontmatter":{"title":"Vue：模拟@vitejs/plugin-vue解析和加载SFC组件(.vue文件)的过程。","date":"2023-10-24T10:16:00.000Z","thumbnail":"./images/10.jpg","wordCount":4147},"excerpt":"Vite是一个与前端框架无关的打包工具，既可以打包Vue也可以打包React、Solid等其他框架。在打包Vue的SFC(SingleFileComponent,单文件组件)时，主要是借助@vitejs/plugin-vue这个插件，该插件主要的作用是把.vue文件编译为.js文","src":"","html":""},{"url":"/tools/rollup-static/","frontmatter":{"title":"编写Rollup插件：如何生成静态资源并在运行中获取到对应资源","date":"2023-10-20T17:59:00.000Z","thumbnail":"./images/10.jpg","wordCount":2109},"excerpt":"自从Vite3发布起，就开始用它做了不少实践和项目，Vite的底层是Rollup和Esbuild。Rollup主要用在打包阶段，今天记录下Rollup对于静态资源是如何处理，以及resolveImportMeta和resolveFileUrl两个钩子的使用。准备工作新建个项目，安","src":"","html":""},{"url":"/tools/git/","frontmatter":{"title":"Git：日常可能使用到的一些命令和用法","date":"2023-10-20T14:54:00.000Z","thumbnail":"./images/8.jpg","wordCount":523},"excerpt":"仅作备忘录，常见的那几个命令就不多说了，这里仅记录下日常可能使用到且易忘记的一些命令和用法。GitClean清理未追踪的文件和目录，包含以下几个常用参数：参数说明-f清理文件(file)-d清理目录(directory)-x清理.gitignore中标记的文件和目录-n不执行，仅","src":"","html":""},{"url":"/tools/tampermonkey/","frontmatter":{"title":"开发油猴脚本：在Iconfont项目中导出符合unocss图标格式的JSON文件","date":"2023-10-09T11:03:00.000Z","thumbnail":"./images/3.jpg","wordCount":9768},"excerpt":"Tampermonkey(油猴，最近插件的名字好像改为篡改猴)，是一款浏览器插件。其主要功能在于管理和应用社区中的脚本，使用油猴而不是浏览器插件，主要在于便利性和自由性。举个例子，在谷歌浏览器中使用开发者身份上架插件是要收费的(5刀)，使用油猴就完全不用担心。此外，插件包含敏感功","src":"","html":""},{"url":"/tools/node-alpine-sqlite3/","frontmatter":{"title":"使用Node-Alpine构建Docker镜像时，Sqlite3安装失败如何解决？","date":"2023-09-27T08:53:00.000Z","thumbnail":"./images/6.jpg","wordCount":1772},"excerpt":"最近在部署NestJS容器时，发现基于node:18打包出来的镜像有1G多，于是抱着节省体积的想法，打算用node:18-alpine进行构建。不曾想，打包是成功了但运行时却报错sqlite3不存在。在摸索一番后，最终解决这个问题，在这里记录下。问题探究出问题后首先去查了下sql","src":"","html":""},{"url":"/tools/ssh-remote/","frontmatter":{"title":"使用SSH连接远程服务器，结合密钥和配置文件实现一键登陆","date":"2023-09-25T10:34:00.000Z","thumbnail":"./images/3.jpg","wordCount":1553},"excerpt":"如果你有一台云服务器，日常需要远程进去执行命令，那么SSH是非常理想的工具。服务器通常都会安装有Sshd服务，你可以使用Ssh客户端进行登陆。登陆方式通常由以下两种：使用账号密码登陆使用账号/密码的好处是，随时随地不受限制，例如在家里登陆，在公司登陆，在外面的网吧登陆。但缺点是容","src":"","html":""},{"url":"/tools/devops/","frontmatter":{"title":"基于 Docker + Portainer + Traefik + Gitea 搭建适用于个人的CI/CD持续构建系统","date":"2023-09-22T10:03:00.000Z","thumbnail":"./images/5.jpg","wordCount":6428},"excerpt":"之前写过一篇搭建CI/CD系统的文章，技术栈与标题所述差不多，但最近查看Gitea文档时发现更新一个名为GiteaActions的功能，略作了解后发现与GithubActions是类似的东西，且可以直接使用复用GithubActions的配置，于是兴趣满满地实践了一番并有了这篇文","src":"","html":""},{"url":"/go/03.module/","frontmatter":{"title":"Go语言：项目、包依赖、第三方类库和可执行命令的管理","date":"2023-09-08T11:42:00.000Z","thumbnail":"/assets/golang.jpg","wordCount":2744},"excerpt":"如今Go已内置有模块管理，但一开始支持得并不友好，后来才逐渐完善起来。与NodeJS依赖管理有几个不同点：NodeJS依赖是从统一的中心源(npm)下载的，Go没有中心源，通常从git仓库下载，常见第三方库都托管在GitHub上面NodeJS下载依赖到项目的node_module","src":"","html":""},{"url":"/go/ident/","frontmatter":{"title":"Go语言：标识符、关键字、预定义标识符和自定义标识符","date":"2023-09-08T11:42:00.000Z","thumbnail":"/assets/golang.jpg","wordCount":1786},"excerpt":"标识符，用于标记各种编程元素，例如变量、函数和类型等。标识符由字符组成，Go语言使用unicode字符集，标识符的命名需要遵守以下规则：以字母下划线开头+字母/数字/下划线。注：字母指unicode中的字符，所以中文也是可以的区分大小写。在包中，首字母大小写还有特殊意义，大写表示","src":"","html":""},{"url":"/go/02.var/","frontmatter":{"title":"Go语言：注释、变量、常量、简单类型和复杂类型","date":"2023-09-07T19:17:00.000Z","thumbnail":"/assets/golang.jpg","wordCount":5129},"excerpt":"Go语言的创建者也是C语言的创建者之一，因此不少语法都有C语言语法的影子。例如，程序入口为main函数，函数printf命名，注释使用//开头等。此外，GO语言也有自己的特殊语法，例如使用:=声明短变量，函数支持多返回值，公有函数首字母大写等。注释Go使用C语言风格的注释，其中单","src":"","html":""},{"url":"/go/01.start/","frontmatter":{"title":"Go系列[一]：安装，编译和运行","date":"2023-09-07T18:13:00.000Z","thumbnail":"/assets/golang.jpg","wordCount":860},"excerpt":"Go语言是一门编译型语言，由Google创立于2007年，因此很容易联想到Go语言名字的由来。历史2007年创建2012年发布v1.0版本安装打开官网下载，如果需要版本管理，可以使用GVM工具。按照指示操作即可，安装完打开CMD输入goversion命令并回车，有如下输出即代表安","src":"","html":""},{"url":"/rust/07.macro/","frontmatter":{"title":"Rust系列[七]：宏，派生宏、属性宏和函数宏","date":"2023-09-01T09:38:00.000Z","thumbnail":"/assets/rust.webp","wordCount":4366},"excerpt":"宏(macro)，是一种扩展功能和语法的自定义规则，目的是减少重复代码的书写。在Rust中，宏包含声明宏和过程宏，而过程宏又分为派生宏、属性宏和函数宏三种。宏在编译期进行处理，可以操作代码和以及AST，然后替换生成新的代码和AST，这样就可以减少运行期的额外工作，提高性能。宏的目","src":"","html":""},{"url":"/rust/06.collection/","frontmatter":{"title":"Rust系列[六]：常见集合","date":"2023-08-31T19:29:00.000Z","thumbnail":"/assets/rust.webp","wordCount":10},"excerpt":"在空间，有很多集合，","src":"","html":""},{"url":"/rust/03.crate/","frontmatter":{"title":"Rust系列[五]：包、模块和命名空间","date":"2023-08-31T19:02:00.000Z","thumbnail":"/assets/rust.webp","wordCount":1190},"excerpt":"Rust中的包称为crate，包管理器称为cargo，这两者的存在让我们很方便地管理和下载第三方库。先来简单过一下包管理器的使用，后面再说说如何创建一个包。cargo的使用cargo既是一个包管理器，同时也是一个构建工具。作为包管理器时，主要从crates.io源下载，国内可以使","src":"","html":""},{"url":"/rust/05.struct/","frontmatter":{"title":"Rust系列[四]：结构体","date":"2023-08-31T14:43:00.000Z","thumbnail":"/assets/rust.webp","wordCount":1925},"excerpt":"结构体，类似于其他语言中的对象，拥有属性和属性值，注意没有方法只有属性。与元组相比，两者都可以存储不同类型的值，但结构体可以为每个成员定义名字，语法如下：ruststructAnimal{name:String,}123元组结构体指的是没有名字的结构体，类似元组。ruststru","src":"","html":""},{"url":"/rust/04.ownership/","frontmatter":{"title":"Rust系列[三]：所有权，借用和引用","date":"2023-08-29T13:35:00.000Z","thumbnail":"/assets/rust.webp","wordCount":2607},"excerpt":"当我们声明变量时，每个变量都会被分配一片内存空间，这片内存空间要在适当的时机回收，否则会造成内存泄漏。不同的语言有不同的回收机制，部分语言手动回收，如C语言等；部分语言使用垃圾回收机制自动回收，如JavaScript等；Rust选择的是不同路线：使用所有权机制进行半自动回收。所有","src":"","html":""},{"url":"/rust/02.basic/","frontmatter":{"title":"Rust系列[二]：变量，数据类型，注释，控制结构","date":"2023-08-29T09:12:00.000Z","thumbnail":"/assets/rust.webp","wordCount":2303},"excerpt":"跟其他高级语言一样，Rust使用unicode字符集，这里过一下常见的编程概念在Rust中的使用。注释文档注释，沿用C语言风格的注释，可以使用双斜杠或斜杠星的格式进行注释，其中双斜杠是单行注释，斜杠星是多行注释，语法如下：rust//这里是代码注释letx=1;/*这里是代码注释","src":"","html":""},{"url":"/rust/01.start/","frontmatter":{"title":"Rust系列[一]：安装和上手","date":"2023-08-25T11:50:00.000Z","categories":"rust","tags":"rust","thumbnail":"/assets/rust.webp","wordCount":3069},"excerpt":"Rust是一门高性能、高安全性的系统级编程语言，最初旨在作为C和C++的更安全替代品。Rust直译为铁锈，起名来源于一种特别健壮的真菌，这种真菌为了生存而过度设计。灵感来源于霍尔公寓楼里的一部坏电梯，这些设备的软件通常是C或C++写的，这些语言需要手动管理大量内存，存在崩溃的可能","src":"","html":""},{"url":"/interview/post-implement","frontmatter":{"title":"手写系列：实现call/apply/debounce/throtle等函数","date":"2023-08-09T18:20:00.000Z","thumbnail":"./images/10.jpg","wordCount":1536},"excerpt":"ES自带很多内置函数，且有些函数是可以通过现有代码实现的，例如数组多达二十几个函数，这些函数都是可以自己实现的。这里挑一些常见的函数，巩固下。手写callcall，即调用，这是函数的一个方法，用于给函数绑定执行上下文(this)并执行，然后返回执行结果。由于this是动态的，在运","src":"","html":""},{"url":"/tools/pnpm-patch/","frontmatter":{"title":"使用pnpm patch临时修复第三方库的问题","date":"2023-07-24T18:00:00.000Z","thumbnail":"./images/6.jpg","wordCount":385},"excerpt":"目前的博客需要一个能展示demo的功能，在调研一番后决定使用@ruabick/md-demo-plugins插件。但安装后却报错如下：问题修复于是debug一番后，猜测Vitepres内部有部分调用里没有传路径参数，于是尝试修改包里面的代码如下：清空缓存然后重新启动，顺利用上了，","src":"","html":""},{"url":"/tools/crawlee/","frontmatter":{"title":"使用Crawlee实现爬虫功能","date":"2023-07-22T11:00:00.000Z","thumbnail":"./images/6.jpg","wordCount":1766},"excerpt":"在做前端驿站这个导航网站时，收集到的每个网站都是有图标的，但部分网站由于某墙的原因，直接用源站图标URL会导致加载失败。谷歌一番后，最终用Crawlee将所有图标都爬取回来了，直接打包到项目里，这里记录下这个库的一些基本用法。今天实现一个小目标，爬取豆瓣电影Top250的数据，页","src":"","html":""},{"url":"/frontend/browser-cache/post-browser-cache","frontmatter":{"title":"HTTP中的强缓存和协商缓存以及浏览器自身的存储","date":"2023-07-20T11:49:00.000Z","thumbnail":"./images/10.jpg","wordCount":2241},"excerpt":"当一个网站有成千上万用户访问的时候，为避免并发导致的服务拥挤，使用缓存是一种非常常见的手段。例如，用户A请求了B图片，服务器返回了图片内容并告知这张图片要缓存起来，一个月后过期，浏览器接收后检测到缓存设置就会缓存在本地磁盘，后面用户A再访问B图片时，浏览器检查到B图片已经有缓存且","src":"","html":""},{"url":"/tools/nest-swagger/","frontmatter":{"title":"NestJS：基于swagger生成路由文档及进阶用法","date":"2023-08-07T00:00:00.000Z","thumbnail":"./images/5.jpg","wordCount":3605},"excerpt":"Swagger是一个用于生成RESTfulAPI接口文档的工具，目前其数据规范已更名为OPENAPI并作为一项标准进行推广。很多后端语言都有相应的社区包，在NestJS中有官方提供的@nestjs/swagger库。工作原理安装对应依赖后，使用注释/注解/装饰器在路由方法上，标注","src":"","html":""},{"url":"/tools/http-orign-host-referer/","frontmatter":{"title":"HTTP协议：Origin、Host和Referer请求头字段","date":"2023-07-22T13:00:00.000Z","tags":"HTTP","thumbnail":"./images/10.jpg","wordCount":213},"excerpt":"在开发者工具中的网络面板中，经常能看到这几个字段，而且这几个字段的值看着都差不多，它们到底有什么用呢？首先说说它们的一个共同点，都是由浏览器自动携带，与安全/权限相关，接下来分别聊聊它们各自的作用。Origin直译为源头，我们常说的跨域就与它有关。跨域，可简单理解为跨域域名，即在","src":"","html":""},{"url":"/tools/web-audio/","frontmatter":{"title":"基于Web API实现麦克风录音并保存为wav文件","date":"2023-07-22 08:0000","cover":"./image-crawlee.png","thumbnail":"./images/2.jpg","wordCount":3388},"excerpt":"最近遇到了一个需求，使用电脑外接的话筒推流发广播，这里面涉及到了WebRTC的一些功能以及音频数据的处理。以前做过监听功能，接收pcm流并实时播放，因此对音频数据流略有了解，但如何从麦克风接流还不太了解。做了几天，最终完成了，这里简单回顾下并做个小demo。声音的采集深的概念我们","src":"","html":""},{"url":"/tools/npm-package-json/","frontmatter":{"title":"浅谈package.json中与打包发布相关的字段","date":"2023-07-21T19:00:00.000Z","thumbnail":"./images/9.jpg","wordCount":600},"excerpt":"如果你要发布一个包到npm上面，package.json是你不能忽视的配置。除了最基本的name和version字段，与打包发布相关的字段其实有不少，很多人可能不太关注，本文将试着解说下这些字段。发布相关先说说发布相关的字段：name必须的字段，看起来比较简单，但也有一定的命名限","src":"","html":""},{"url":"/tools/cicd/","frontmatter":{"title":"搭建一套适用于个人的CICD构建流系统","date":"2023-07-21T18:00:00.000Z","thumbnail":"./images/4.jpg","wordCount":9999},"excerpt":"在如今的容器服务中，使用Gitlab、K8S、Jenkins等技术部署服务是非常常见的，但这些需要的服务器内存和数量都不小。例如，部署一个Gitlab都需要至少4G内存，对于个人学习属实不太友好。介绍基于docker，实现面向个人的CICD集成，包括：基于docker+swarm","src":"","html":""},{"url":"/frontend/browser-download/","frontmatter":{"title":"浏览器对二进制内容的下载处理机制","date":"2023-07-19T11:05:00.000Z","thumbnail":"./images/4.jpg","wordCount":1709},"excerpt":"从服务端下载内容是很常见的操作，例如从服务器下载一个.exe文件，一个.zip文件或.png文件等。但在浏览器进行下载，是有一点门道的，接下来从两个方面聊下如何在浏览器下载内容。利用浏览器进行下载这里的意思是指，不使用JS操作二进制数据，直接给让浏览器打开一个链接，利用浏览器的内","src":"","html":""},{"url":"/frontend/js-priority/","frontmatter":{"title":"从new xx()和new xx的区别中，整理JS中操作符的优先级","date":"2023-07-13T00:00:00.000Z","thumbnail":"./images/4.jpg","wordCount":1691},"excerpt":"最近在工作中写日期格式化时，遇到一个问题，先来看下面的代码：ts//写法一newDate().toISOString;//写法二newDate.toISOString();12345运行结果如下：猜测是优先级的问题，然后在MDN找到了答案，它们确实是两个不同的优先级，如下图：以上","src":"","html":""},{"url":"/frontend/tool-ejs/","frontmatter":{"title":"使用 EJS 生成代码提升开发效率","description":"测试","date":"2023-07-13T00:00:00.000Z","tags":"前端","thumbnail":"./images/7.jpg","wordCount":1657},"excerpt":"EJS是一个JavaScript模板引擎，名字中的E可以指Embedded(可嵌入)、Effective(高效)、Elegant(优雅)或者是Easy(简单)。在如今的前端开发中，EJS比不上Vue或React等框架强大，但在辅助开发方面还是有用处的。话不多说，接下来以一个例子来","src":"","html":""},{"url":"/frontend/vitepress-blog/","frontmatter":{"title":"改造vitepess作为个人博客","date":"2023-06-17T11:42:00.000Z","thumbnail":"./images/10.jpg","wordCount":4896},"excerpt":"作为一名程序员，写日记是常有的事，日常我都是写在有道云笔记里面，可以看下我在有道上的记录：但最近搞了不少小工具，遇到不少问题并想记录下来，各种方案搜下来最终决定使用Vitepress以静态博客形式写日记。选择Vitepress在这之前，我是有一台1核2G的小水管服务器的，基于Ty","src":"","html":""}]'),B=Object.prototype.toString;function ct(t){return B.call(t)==="[object Array]"}function ue(t){return B.call(t)==="[object Null]"}function ae(t){return B.call(t)==="[object Boolean]"}function $t(t){return B.call(t)==="[object Object]"}function le(t){return B.call(t)==="[object String]"}function Dt(t){return B.call(t)==="[object Number]"&&t===t}function ce(t){return t===void 0}function Ot(t){return typeof t=="function"}function de(t){return $t(t)&&Object.keys(t).length===0}const fe=t=>(t==null?void 0:t.$)!==void 0,Nt=Symbol("ArcoConfigProvider");var kt=Object.defineProperty,xt=Object.defineProperties,Lt=Object.getOwnPropertyDescriptors,st=Object.getOwnPropertySymbols,jt=Object.prototype.hasOwnProperty,At=Object.prototype.propertyIsEnumerable,ut=(t,o,i)=>o in t?kt(t,o,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[o]=i,Yt=(t,o)=>{for(var i in o||(o={}))jt.call(o,i)&&ut(t,i,o[i]);if(st)for(var i of st(o))At.call(o,i)&&ut(t,i,o[i]);return t},Rt=(t,o)=>xt(t,Lt(o));const It="A",Ht="arco",tt="$arco",me=t=>{var o;return(o=t==null?void 0:t.componentPrefix)!=null?o:It},he=(t,o)=>{var i;o&&o.classPrefix&&(t.config.globalProperties[tt]=Rt(Yt({},(i=t.config.globalProperties[tt])!=null?i:{}),{classPrefix:o.classPrefix}))},Pt=t=>{var o,i,s;const l=wt(),g=Tt(Nt,void 0),m=(s=(i=g==null?void 0:g.prefixCls)!=null?i:(o=l==null?void 0:l.appContext.config.globalProperties[tt])==null?void 0:o.classPrefix)!=null?s:Ht;return t?`${m}-${t}`:m};var at;(function(t){t[t.ELEMENT=1]="ELEMENT",t[t.FUNCTIONAL_COMPONENT=2]="FUNCTIONAL_COMPONENT",t[t.STATEFUL_COMPONENT=4]="STATEFUL_COMPONENT",t[t.COMPONENT=6]="COMPONENT",t[t.TEXT_CHILDREN=8]="TEXT_CHILDREN",t[t.ARRAY_CHILDREN=16]="ARRAY_CHILDREN",t[t.SLOTS_CHILDREN=32]="SLOTS_CHILDREN",t[t.TELEPORT=64]="TELEPORT",t[t.SUSPENSE=128]="SUSPENSE",t[t.COMPONENT_SHOULD_KEEP_ALIVE=256]="COMPONENT_SHOULD_KEEP_ALIVE",t[t.COMPONENT_KEPT_ALIVE=512]="COMPONENT_KEPT_ALIVE"})(at||(at={}));var lt;(function(t){t[t.TEXT=1]="TEXT",t[t.CLASS=2]="CLASS",t[t.STYLE=4]="STYLE",t[t.PROPS=8]="PROPS",t[t.FULL_PROPS=16]="FULL_PROPS",t[t.HYDRATE_EVENTS=32]="HYDRATE_EVENTS",t[t.STABLE_FRAGMENT=64]="STABLE_FRAGMENT",t[t.KEYED_FRAGMENT=128]="KEYED_FRAGMENT",t[t.UNKEYED_FRAGMENT=256]="UNKEYED_FRAGMENT",t[t.NEED_PATCH=512]="NEED_PATCH",t[t.DYNAMIC_SLOTS=1024]="DYNAMIC_SLOTS",t[t.DEV_ROOT_FRAGMENT=2048]="DEV_ROOT_FRAGMENT",t[t.HOISTED=-1]="HOISTED",t[t.BAIL=-2]="BAIL"})(lt||(lt={}));const et=t=>!!(t&&t.shapeFlag&1),q=(t,o)=>!!(t&&t.shapeFlag&6),dt=(t,o)=>!!(t&&t.shapeFlag&16),Gt=(t,o)=>!!(t&&t.shapeFlag&32),Q=t=>{var o,i;if(t)for(const s of t){if(et(s)||q(s))return s;if(dt(s,s.children)){const l=Q(s.children);if(l)return l}else if(Gt(s,s.children)){const l=(i=(o=s.children).default)==null?void 0:i.call(o);if(l){const g=Q(l);if(g)return g}}else if(ct(s)){const l=Q(s);if(l)return l}}},pe=t=>{if(!t)return!0;for(const o of t)if(o.children)return!1;return!0},Zt=(t,o)=>{if(t&&t.length>0)for(let i=0;i<t.length;i++){const s=t[i];if(et(s)||q(s)){const g=Ot(o)?o(s):o;return t[i]=yt(s,g,!0),!0}const l=rt(s);if(l&&l.length>0&&Zt(l,o))return!0}return!1},rt=t=>{if(dt(t,t.children))return t.children;if(ct(t))return t},ft=t=>{var o,i;if(et(t))return t.el;if(q(t)){if(((o=t.el)==null?void 0:o.nodeType)===1)return t.el;if((i=t.component)!=null&&i.subTree){const s=ft(t.component.subTree);if(s)return s}}else{const s=rt(t);return Vt(s)}},Vt=t=>{if(t&&t.length>0)for(const o of t){const i=ft(o);if(i)return i}},mt=(t,o)=>{var i;const s=[];if(q(t,t.type))t.type.name===o?t.component&&s.push(t.component.uid):(i=t.component)!=null&&i.subTree&&s.push(...mt(t.component.subTree,o));else{const l=rt(t);l&&s.push(...Jt(l,o))}return s},Jt=(t,o)=>{const i=[];if(t&&t.length>0)for(const s of t)i.push(...mt(s,o));return i};var Bt=(t,o)=>{for(const[i,s]of o)t[i]=s;return t};const Ut=bt({name:"IconLoading",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:t=>["butt","round","square"].includes(t)},strokeLinejoin:{type:String,default:"miter",validator:t=>["arcs","bevel","miter","miter-clip","round"].includes(t)},rotate:Number,spin:Boolean},emits:{click:t=>!0},setup(t,{emit:o}){const i=Pt("icon"),s=it(()=>[i,`${i}-loading`,{[`${i}-spin`]:t.spin}]),l=it(()=>{const m={};return t.size&&(m.fontSize=Dt(t.size)?`${t.size}px`:t.size),t.rotate&&(m.transform=`rotate(${t.rotate}deg)`),m});return{cls:s,innerStyle:l,onClick:m=>{o("click",m)}}}}),Wt=["stroke-width","stroke-linecap","stroke-linejoin"],zt=vt("path",{d:"M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6"},null,-1),Kt=[zt];function qt(t,o,i,s,l,g){return Ct(),Mt("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:St(t.cls),style:Et(t.innerStyle),"stroke-width":t.strokeWidth,"stroke-linecap":t.strokeLinecap,"stroke-linejoin":t.strokeLinejoin,onClick:o[0]||(o[0]=(...m)=>t.onClick&&t.onClick(...m))},Kt,14,Wt)}var F=Bt(Ut,[["render",qt]]);const ge=Object.assign(F,{install:(t,o)=>{var i;const s=(i=o==null?void 0:o.iconPrefix)!=null?i:"";t.component(s+F.name,F)}});var X=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function nt(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var ht={exports:{}};(function(t,o){(function(i,s){t.exports=s()})(X,function(){var i=1e3,s=6e4,l=36e5,g="millisecond",m="second",w="minute",y="hour",_="day",$="week",a="month",h="quarter",D="year",N="date",x="Invalid Date",L=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,H=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,P={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(c){var n=["th","st","nd","rd"],e=c%100;return"["+c+(n[(e-20)%10]||n[e]||n[0])+"]"}},A=function(c,n,e){var u=String(c);return!u||u.length>=n?c:""+Array(n+1-u.length).join(e)+c},Y={s:A,z:function(c){var n=-c.utcOffset(),e=Math.abs(n),u=Math.floor(e/60),r=e%60;return(n<=0?"+":"-")+A(u,2,"0")+":"+A(r,2,"0")},m:function c(n,e){if(n.date()<e.date())return-c(e,n);var u=12*(e.year()-n.year())+(e.month()-n.month()),r=n.clone().add(u,a),d=e-r<0,f=n.clone().add(u+(d?-1:1),a);return+(-(u+(e-r)/(d?r-f:f-r))||0)},a:function(c){return c<0?Math.ceil(c)||0:Math.floor(c)},p:function(c){return{M:a,y:D,w:$,d:_,D:N,h:y,m:w,s:m,ms:g,Q:h}[c]||String(c||"").toLowerCase().replace(/s$/,"")},u:function(c){return c===void 0}},S="en",E={};E[S]=P;var G=function(c){return c instanceof z},R=function c(n,e,u){var r;if(!n)return S;if(typeof n=="string"){var d=n.toLowerCase();E[d]&&(r=d),e&&(E[d]=e,r=d);var f=n.split("-");if(!r&&f.length>1)return c(f[0])}else{var T=n.name;E[T]=n,r=T}return!u&&r&&(S=r),r||!u&&S},C=function(c,n){if(G(c))return c.clone();var e=typeof n=="object"?n:{};return e.date=c,e.args=arguments,new z(e)},p=Y;p.l=R,p.i=G,p.w=function(c,n){return C(c,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var z=function(){function c(e){this.$L=R(e.locale,null,!0),this.parse(e)}var n=c.prototype;return n.parse=function(e){this.$d=function(u){var r=u.date,d=u.utc;if(r===null)return new Date(NaN);if(p.u(r))return new Date;if(r instanceof Date)return new Date(r);if(typeof r=="string"&&!/Z$/i.test(r)){var f=r.match(L);if(f){var T=f[2]-1||0,b=(f[7]||"0").substring(0,3);return d?new Date(Date.UTC(f[1],T,f[3]||1,f[4]||0,f[5]||0,f[6]||0,b)):new Date(f[1],T,f[3]||1,f[4]||0,f[5]||0,f[6]||0,b)}}return new Date(r)}(e),this.$x=e.x||{},this.init()},n.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},n.$utils=function(){return p},n.isValid=function(){return this.$d.toString()!==x},n.isSame=function(e,u){var r=C(e);return this.startOf(u)<=r&&r<=this.endOf(u)},n.isAfter=function(e,u){return C(e)<this.startOf(u)},n.isBefore=function(e,u){return this.endOf(u)<C(e)},n.$g=function(e,u,r){return p.u(e)?this[u]:this.set(r,e)},n.unix=function(){return Math.floor(this.valueOf()/1e3)},n.valueOf=function(){return this.$d.getTime()},n.startOf=function(e,u){var r=this,d=!!p.u(u)||u,f=p.p(e),T=function(V,O){var I=p.w(r.$u?Date.UTC(r.$y,O,V):new Date(r.$y,O,V),r);return d?I:I.endOf(_)},b=function(V,O){return p.w(r.toDate()[V].apply(r.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(O)),r)},M=this.$W,v=this.$M,k=this.$D,J="set"+(this.$u?"UTC":"");switch(f){case D:return d?T(1,0):T(31,11);case a:return d?T(1,v):T(0,v+1);case $:var Z=this.$locale().weekStart||0,U=(M<Z?M+7:M)-Z;return T(d?k-U:k+(6-U),v);case _:case N:return b(J+"Hours",0);case y:return b(J+"Minutes",1);case w:return b(J+"Seconds",2);case m:return b(J+"Milliseconds",3);default:return this.clone()}},n.endOf=function(e){return this.startOf(e,!1)},n.$set=function(e,u){var r,d=p.p(e),f="set"+(this.$u?"UTC":""),T=(r={},r[_]=f+"Date",r[N]=f+"Date",r[a]=f+"Month",r[D]=f+"FullYear",r[y]=f+"Hours",r[w]=f+"Minutes",r[m]=f+"Seconds",r[g]=f+"Milliseconds",r)[d],b=d===_?this.$D+(u-this.$W):u;if(d===a||d===D){var M=this.clone().set(N,1);M.$d[T](b),M.init(),this.$d=M.set(N,Math.min(this.$D,M.daysInMonth())).$d}else T&&this.$d[T](b);return this.init(),this},n.set=function(e,u){return this.clone().$set(e,u)},n.get=function(e){return this[p.p(e)]()},n.add=function(e,u){var r,d=this;e=Number(e);var f=p.p(u),T=function(v){var k=C(d);return p.w(k.date(k.date()+Math.round(v*e)),d)};if(f===a)return this.set(a,this.$M+e);if(f===D)return this.set(D,this.$y+e);if(f===_)return T(1);if(f===$)return T(7);var b=(r={},r[w]=s,r[y]=l,r[m]=i,r)[f]||1,M=this.$d.getTime()+e*b;return p.w(M,this)},n.subtract=function(e,u){return this.add(-1*e,u)},n.format=function(e){var u=this,r=this.$locale();if(!this.isValid())return r.invalidDate||x;var d=e||"YYYY-MM-DDTHH:mm:ssZ",f=p.z(this),T=this.$H,b=this.$m,M=this.$M,v=r.weekdays,k=r.months,J=r.meridiem,Z=function(O,I,W,K){return O&&(O[I]||O(u,d))||W[I].slice(0,K)},U=function(O){return p.s(T%12||12,O,"0")},V=J||function(O,I,W){var K=O<12?"AM":"PM";return W?K.toLowerCase():K};return d.replace(H,function(O,I){return I||function(W){switch(W){case"YY":return String(u.$y).slice(-2);case"YYYY":return p.s(u.$y,4,"0");case"M":return M+1;case"MM":return p.s(M+1,2,"0");case"MMM":return Z(r.monthsShort,M,k,3);case"MMMM":return Z(k,M);case"D":return u.$D;case"DD":return p.s(u.$D,2,"0");case"d":return String(u.$W);case"dd":return Z(r.weekdaysMin,u.$W,v,2);case"ddd":return Z(r.weekdaysShort,u.$W,v,3);case"dddd":return v[u.$W];case"H":return String(T);case"HH":return p.s(T,2,"0");case"h":return U(1);case"hh":return U(2);case"a":return V(T,b,!0);case"A":return V(T,b,!1);case"m":return String(b);case"mm":return p.s(b,2,"0");case"s":return String(u.$s);case"ss":return p.s(u.$s,2,"0");case"SSS":return p.s(u.$ms,3,"0");case"Z":return f}return null}(O)||f.replace(":","")})},n.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},n.diff=function(e,u,r){var d,f=this,T=p.p(u),b=C(e),M=(b.utcOffset()-this.utcOffset())*s,v=this-b,k=function(){return p.m(f,b)};switch(T){case D:d=k()/12;break;case a:d=k();break;case h:d=k()/3;break;case $:d=(v-M)/6048e5;break;case _:d=(v-M)/864e5;break;case y:d=v/l;break;case w:d=v/s;break;case m:d=v/i;break;default:d=v}return r?d:p.a(d)},n.daysInMonth=function(){return this.endOf(a).$D},n.$locale=function(){return E[this.$L]},n.locale=function(e,u){if(!e)return this.$L;var r=this.clone(),d=R(e,u,!0);return d&&(r.$L=d),r},n.clone=function(){return p.w(this.$d,this)},n.toDate=function(){return new Date(this.valueOf())},n.toJSON=function(){return this.isValid()?this.toISOString():null},n.toISOString=function(){return this.$d.toISOString()},n.toString=function(){return this.$d.toUTCString()},c}(),ot=z.prototype;return C.prototype=ot,[["$ms",g],["$s",m],["$m",w],["$H",y],["$W",_],["$M",a],["$y",D],["$D",N]].forEach(function(c){ot[c[1]]=function(n){return this.$g(n,c[0],c[1])}}),C.extend=function(c,n){return c.$i||(c(n,z,C),c.$i=!0),C},C.locale=R,C.isDayjs=G,C.unix=function(c){return C(1e3*c)},C.en=E[S],C.Ls=E,C.p={},C})})(ht);var pt=ht.exports;const j=nt(pt);var Xt={exports:{}};(function(t,o){(function(i,s){t.exports=s(pt)})(X,function(i){function s(m){return m&&typeof m=="object"&&"default"in m?m:{default:m}}var l=s(i),g={name:"zh-cn",weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),ordinal:function(m,w){return w==="W"?m+"周":m+"日"},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日Ah点mm分",LLLL:"YYYY年M月D日ddddAh点mm分",l:"YYYY/M/D",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日dddd HH:mm"},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},meridiem:function(m,w){var y=100*m+w;return y<600?"凌晨":y<900?"早上":y<1100?"上午":y<1300?"中午":y<1800?"下午":"晚上"}};return l.default.locale(g,null,!0),g})})(Xt);var gt={exports:{}};(function(t,o){(function(i,s){t.exports=s()})(X,function(){return function(i,s,l){var g=s.prototype,m=function(a){return a&&(a.indexOf?a:a.s)},w=function(a,h,D,N,x){var L=a.name?a:a.$locale(),H=m(L[h]),P=m(L[D]),A=H||P.map(function(S){return S.slice(0,N)});if(!x)return A;var Y=L.weekStart;return A.map(function(S,E){return A[(E+(Y||0))%7]})},y=function(){return l.Ls[l.locale()]},_=function(a,h){return a.formats[h]||function(D){return D.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(N,x,L){return x||L.slice(1)})}(a.formats[h.toUpperCase()])},$=function(){var a=this;return{months:function(h){return h?h.format("MMMM"):w(a,"months")},monthsShort:function(h){return h?h.format("MMM"):w(a,"monthsShort","months",3)},firstDayOfWeek:function(){return a.$locale().weekStart||0},weekdays:function(h){return h?h.format("dddd"):w(a,"weekdays")},weekdaysMin:function(h){return h?h.format("dd"):w(a,"weekdaysMin","weekdays",2)},weekdaysShort:function(h){return h?h.format("ddd"):w(a,"weekdaysShort","weekdays",3)},longDateFormat:function(h){return _(a.$locale(),h)},meridiem:this.$locale().meridiem,ordinal:this.$locale().ordinal}};g.localeData=function(){return $.bind(this)()},l.localeData=function(){var a=y();return{firstDayOfWeek:function(){return a.weekStart||0},weekdays:function(){return l.weekdays()},weekdaysShort:function(){return l.weekdaysShort()},weekdaysMin:function(){return l.weekdaysMin()},months:function(){return l.months()},monthsShort:function(){return l.monthsShort()},longDateFormat:function(h){return _(a,h)},meridiem:a.meridiem,ordinal:a.ordinal}},l.months=function(){return w(y(),"months")},l.monthsShort=function(){return w(y(),"monthsShort","months",3)},l.weekdays=function(a){return w(y(),"weekdays",null,null,a)},l.weekdaysShort=function(a){return w(y(),"weekdaysShort","weekdays",3,a)},l.weekdaysMin=function(a){return w(y(),"weekdaysMin","weekdays",2,a)}}})})(gt);var Qt=gt.exports;const Ft=nt(Qt);var _t={exports:{}};(function(t,o){(function(i,s){t.exports=s()})(X,function(){return function(i,s,l){i=i||{};var g=s.prototype,m={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function w(_,$,a,h){return g.fromToBase(_,$,a,h)}l.en.relativeTime=m,g.fromToBase=function(_,$,a,h,D){for(var N,x,L,H=a.$locale().relativeTime||m,P=i.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],A=P.length,Y=0;Y<A;Y+=1){var S=P[Y];S.d&&(N=h?l(_).diff(a,S.d,!0):a.diff(_,S.d,!0));var E=(i.rounding||Math.round)(Math.abs(N));if(L=N>0,E<=S.r||!S.r){E<=1&&Y>0&&(S=P[Y-1]);var G=H[S.l];D&&(E=D(""+E)),x=typeof G=="string"?G.replace("%d",E):G(E,$,S.l,L);break}}if($)return x;var R=L?H.future:H.past;return typeof R=="function"?R(x):R.replace("%s",x)},g.to=function(_,$){return w(_,$,this,!0)},g.from=function(_,$){return w(_,$,this)};var y=function(_){return _.$u?l.utc():l()};g.toNow=function(_){return this.to(y(this),_)},g.fromNow=function(_){return this.from(y(this),_)}}})})(_t);var te=_t.exports;const ee=nt(te),re="YYYY-MM-DD HH:mm:ss",ne="YYYY-MM-DD",oe="HH:mm:ss";j.locale("zh-cn");j.extend(ee);j.extend(Ft);j.DATETIME=re;j.DATE=ne;j.TIME=oe;j.prototype._format=j.prototype.format;j.prototype.format=function(t){return t?this._format(t):this._format(j.DATETIME)};export{ge as I,Bt as _,Pt as a,me as b,j as c,se as d,Q as e,Dt as f,Jt as g,ce as h,fe as i,ue as j,$t as k,Ot as l,Nt as m,ae as n,ct as o,le as p,de as q,Vt as r,he as s,pe as t,Zt as u};
