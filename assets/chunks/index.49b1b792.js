import{k as ot,f as ft}from"./index.6eaeffb8.js";import{a7 as mt}from"./framework.45d8ea02.js";const xt=JSON.parse('[{"url":"/tools/rollup-static/index","frontmatter":{"title":"编写Rollup插件：如何生成静态资源并在运行中获取到对应资源","date":"2023-10-20T17:59:00.000Z","thumbnail":"./images/5.jpg","wordCount":2071},"excerpt":"自从Vite3发布起，就开始用它做了不少实践和项目，Vite的底层是Rollup和Esbuild。Rollup主要用在打包阶段，今天记录下Rollup对于静态资源是如何处理，以及resolveImportMeta和resolveFileUrl两个钩子的使用。准备工作新建个项目，安","src":"","html":""},{"url":"/tools/git/index","frontmatter":{"title":"Git：日常可能使用到的一些命令和用法","date":"2023-10-20T14:54:00.000Z","thumbnail":"./images/6.jpg","wordCount":523},"excerpt":"仅作备忘录，常见的那几个命令就不多说了，这里仅记录下日常可能使用到且易忘记的一些命令和用法。GitClean清理未追踪的文件和目录，包含以下几个常用参数：参数说明-f清理文件(file)-d清理目录(directory)-x清理.gitignore中标记的文件和目录-n不执行，仅","src":"","html":""},{"url":"/tools/tampermonkey/index","frontmatter":{"title":"开发油猴脚本：在Iconfont项目中导出符合unocss图标格式的JSON文件","date":"2023-10-09T11:03:00.000Z","thumbnail":"./images/3.jpg","wordCount":9633},"excerpt":"Tampermonkey(油猴，最近插件的名字好像改为篡改猴)，是一款浏览器插件。其主要功能在于管理和应用社区中的脚本，使用油猴而不是浏览器插件，主要在于便利性和自由性。举个例子，在谷歌浏览器中使用开发者身份上架插件是要收费的(5刀)，使用油猴就完全不用担心。此外，插件包含敏感功","src":"","html":""},{"url":"/tools/node-alpine-sqlite3/node-alpine-sqlite3","frontmatter":{"title":"使用Node-Alpine构建Docker镜像时，Sqlite3安装失败如何解决？","date":"2023-09-27T08:53:00.000Z","thumbnail":"./images/8.jpg","wordCount":1768},"excerpt":"最近在部署NestJS容器时，发现基于node:18打包出来的镜像有1G多，于是抱着节省体积的想法，打算用node:18-alpine进行构建。不曾想，打包是成功了但运行时却报错sqlite3不存在。在摸索一番后，最终解决这个问题，在这里记录下。问题探究出问题后首先去查了下sql","src":"","html":""},{"url":"/tools/ssh-remote/index","frontmatter":{"title":"使用SSH连接远程服务器，结合密钥和配置文件实现一键登陆","date":"2023-09-25T10:34:00.000Z","thumbnail":"./images/2.jpg","wordCount":1551},"excerpt":"如果你有一台云服务器，日常需要远程进去执行命令，那么SSH是非常理想的工具。服务器通常都会安装有Sshd服务，你可以使用Ssh客户端进行登陆。登陆方式通常由以下两种：使用账号密码登陆使用账号/密码的好处是，随时随地不受限制，例如在家里登陆，在公司登陆，在外面的网吧登陆。但缺点是容","src":"","html":""},{"url":"/tools/devops/index","frontmatter":{"title":"基于 Docker + Portainer + Traefik + Gitea 搭建适用于个人的CI/CD持续构建系统","date":"2023-09-22T10:03:00.000Z","thumbnail":"./images/8.jpg","wordCount":6424},"excerpt":"之前写过一篇搭建CI/CD系统的文章，技术栈与标题所述差不多，但最近查看Gitea文档时发现更新一个名为GiteaActions的功能，略作了解后发现与GithubActions是类似的东西，且可以直接使用复用GithubActions的配置，于是兴趣满满地实践了一番并有了这篇文","src":"","html":""},{"url":"/go/03.lib/index","frontmatter":{"title":"Go系列[三]：第三方包的管理","date":"2023-09-08T11:42:00.000Z","thumbnail":"/assets/golang.jpg","wordCount":101},"excerpt":"Go使用包(package)的概念来管理第三方库，但他设置国内源代理bashgoenv-wGO111MODULE=ongoenv-wGOPROXY=https://goproxy.cn,direct12","src":"","html":""},{"url":"/go/02.var/index","frontmatter":{"title":"Go系列[二]：变量声明和变量类型","date":"2023-09-07T19:17:00.000Z","thumbnail":"/assets/golang.jpg","wordCount":1306},"excerpt":"Go的语法跟其他语言类似声明变量使用varnametype=value语法声明变量，声明时变量类型和初始值至少得提供一个，当只提供类型时，默认值为零值(字符串为，整型为0，布尔为false)。如下：govarnamestring;//提供类型，初始值值为：varage=18;//","src":"","html":""},{"url":"/go/01.start/index","frontmatter":{"title":"Go系列[一]：安装，编译和运行","date":"2023-09-07T18:13:00.000Z","thumbnail":"/assets/golang.jpg","wordCount":578},"excerpt":"下载安装打开官网下载，如下：按照指示安装，安装完打开CMD输入命令并回车，应该有如下输出：上手运行Go是一门编译型语言，需要先编译在运行，接下来写个小示例。新建文件夹，以及一个文件。bashmkdirgo-01cdgo-01touchmain.go123修改文件，写个hello,","src":"","html":""},{"url":"/rust/07.macro/index","frontmatter":{"title":"Rust系列[七]：宏，派生宏、属性宏和函数宏","date":"2023-09-01T09:38:00.000Z","thumbnail":"/assets/rust.webp","wordCount":4324},"excerpt":"宏(macro)，是一种扩展功能和语法的自定义规则，目的是减少重复代码的书写。在Rust中，宏包含声明宏和过程宏，而过程宏又分为派生宏、属性宏和函数宏三种。宏在编译期进行处理，可以操作代码和以及AST，然后替换生成新的代码和AST，这样就可以减少运行期的额外工作，提高性能。宏的目","src":"","html":""},{"url":"/rust/06.collection/index","frontmatter":{"title":"Rust系列[六]：常见集合","date":"2023-08-31T19:29:00.000Z","thumbnail":"/assets/rust.webp","wordCount":10},"excerpt":"在空间，有很多集合，","src":"","html":""},{"url":"/rust/03.crate/index","frontmatter":{"title":"Rust系列[五]：包、模块和命名空间","date":"2023-08-31T19:02:00.000Z","thumbnail":"/assets/rust.webp","wordCount":1188},"excerpt":"Rust中的包称为crate，包管理器称为cargo，这两者的存在让我们很方便地管理和下载第三方库。先来简单过一下包管理器的使用，后面再说说如何创建一个包。cargo的使用cargo既是一个包管理器，同时也是一个构建工具。作为包管理器时，主要从crates.io源下载，国内可以使","src":"","html":""},{"url":"/rust/05.struct/index","frontmatter":{"title":"Rust系列[四]：结构体","date":"2023-08-31T14:43:00.000Z","thumbnail":"/assets/rust.webp","wordCount":1895},"excerpt":"结构体，类似于其他语言中的对象，拥有属性和属性值，注意没有方法只有属性。与元组相比，两者都可以存储不同类型的值，但结构体可以为每个成员定义名字，语法如下：ruststructAnimal{name:String,}123元组结构体指的是没有名字的结构体，类似元组。ruststru","src":"","html":""},{"url":"/rust/04.ownership/index","frontmatter":{"title":"Rust系列[三]：所有权，借用和引用","date":"2023-08-29T13:35:00.000Z","thumbnail":"/assets/rust.webp","wordCount":2562},"excerpt":"当我们声明变量时，每个变量都会被分配一片内存空间，这片内存空间要在适当的时机回收，否则会造成内存泄漏。不同的语言有不同的回收机制，部分语言手动回收，如C语言等；部分语言使用垃圾回收机制自动回收，如JavaScript等；Rust选择的是不同路线：使用所有权机制进行半自动回收。所有","src":"","html":""},{"url":"/rust/02.basic/index","frontmatter":{"title":"Rust系列[二]：变量，数据类型，注释，控制结构","date":"2023-08-29T09:12:00.000Z","thumbnail":"/assets/rust.webp","wordCount":2281},"excerpt":"跟其他高级语言一样，Rust使用unicode字符集，这里过一下常见的编程概念在Rust中的使用。注释文档注释，沿用C语言风格的注释，可以使用双斜杠或斜杠星的格式进行注释，其中双斜杠是单行注释，斜杠星是多行注释，语法如下：rust//这里是代码注释letx=1;/*这里是代码注释","src":"","html":""},{"url":"/rust/01.start/index","frontmatter":{"title":"Rust系列[一]：安装和上手","date":"2023-08-25T11:50:00.000Z","categories":"rust","tags":"rust","thumbnail":"/assets/rust.webp","wordCount":3039},"excerpt":"Rust是一门高性能、高安全性的系统级编程语言，最初旨在作为C和C++的更安全替代品。Rust直译为铁锈，起名来源于一种特别健壮的真菌，这种真菌为了生存而过度设计。灵感来源于霍尔公寓楼里的一部坏电梯，这些设备的软件通常是C或C++写的，这些语言需要手动管理大量内存，存在崩溃的可能","src":"","html":""},{"url":"/interview/post-implement","frontmatter":{"title":"手写系列：实现call/apply/debounce/throtle等函数","date":"2023-08-09T18:20:00.000Z","thumbnail":"./images/2.jpg","wordCount":1532},"excerpt":"ES自带很多内置函数，且有些函数是可以通过现有代码实现的，例如数组多达二十几个函数，这些函数都是可以自己实现的。这里挑一些常见的函数，巩固下。手写callcall，即调用，这是函数的一个方法，用于给函数绑定执行上下文(this)并执行，然后返回执行结果。由于this是动态的，在运","src":"","html":""},{"url":"/tools/nest-swagger/index","frontmatter":{"title":"NestJS：基于swagger生成路由文档及进阶用法","date":"2023-08-07T00:00:00.000Z","thumbnail":"./images/5.jpg","wordCount":3519},"excerpt":"Swagger是一个用于生成RESTfulAPI接口文档的工具，目前其数据规范已更名为OPENAPI并作为一项标准进行推广。很多后端语言都有相应的社区包，在NestJS中有官方提供的@nestjs/swagger库。工作原理安装对应依赖后，使用注释/注解/装饰器在路由方法上，标注","src":"","html":""},{"url":"/tools/pnpm-patch/index","frontmatter":{"title":"使用pnpm patch临时修复第三方库的问题","date":"2023-07-24T18:00:00.000Z","thumbnail":"./images/6.jpg","wordCount":385},"excerpt":"目前的博客需要一个能展示demo的功能，在调研一番后决定使用@ruabick/md-demo-plugins插件。但安装后却报错如下：问题修复于是debug一番后，猜测Vitepres内部有部分调用里没有传路径参数，于是尝试修改包里面的代码如下：清空缓存然后重新启动，顺利用上了，","src":"","html":""},{"url":"/tools/crawlee/index","frontmatter":{"title":"使用Crawlee实现爬虫功能","date":"2023-07-22T11:00:00.000Z","thumbnail":"./images/4.jpg","wordCount":1743},"excerpt":"在做前端驿站这个导航网站时，收集到的每个网站都是有图标的，但部分网站由于某墙的原因，直接用源站图标URL会导致加载失败。谷歌一番后，最终用Crawlee将所有图标都爬取回来了，直接打包到项目里，这里记录下这个库的一些基本用法。今天实现一个小目标，爬取豆瓣电影Top250的数据，页","src":"","html":""},{"url":"/frontend/browser-cache/post-browser-cache","frontmatter":{"title":"HTTP中的强缓存和协商缓存以及浏览器自身的存储","date":"2023-07-20T11:49:00.000Z","thumbnail":"./images/4.jpg","wordCount":2225},"excerpt":"当一个网站有成千上万用户访问的时候，为避免并发导致的服务拥挤，使用缓存是一种非常常见的手段。例如，用户A请求了B图片，服务器返回了图片内容并告知这张图片要缓存起来，一个月后过期，浏览器接收后检测到缓存设置就会缓存在本地磁盘，后面用户A再访问B图片时，浏览器检查到B图片已经有缓存且","src":"","html":""},{"url":"/frontend/browser-download/index","frontmatter":{"title":"浏览器对二进制内容的下载处理机制","date":"2023-07-19T11:05:00.000Z","thumbnail":"./images/2.jpg","wordCount":1696},"excerpt":"从服务端下载内容是很常见的操作，例如从服务器下载一个.exe文件，一个.zip文件或.png文件等。但在浏览器进行下载，是有一点门道的，接下来从两个方面聊下如何在浏览器下载内容。利用浏览器进行下载这里的意思是指，不使用JS操作二进制数据，直接给让浏览器打开一个链接，利用浏览器的内","src":"","html":""},{"url":"/tools/http-orign-host-referer/index","frontmatter":{"title":"HTTP协议：Origin、Host和Referer请求头字段","date":"2023-07-22T13:00:00.000Z","tags":"HTTP","thumbnail":"./images/4.jpg","wordCount":213},"excerpt":"在开发者工具中的网络面板中，经常能看到这几个字段，而且这几个字段的值看着都差不多，它们到底有什么用呢？首先说说它们的一个共同点，都是由浏览器自动携带，与安全/权限相关，接下来分别聊聊它们各自的作用。Origin直译为源头，我们常说的跨域就与它有关。跨域，可简单理解为跨域域名，即在","src":"","html":""},{"url":"/tools/web-audio/index","frontmatter":{"title":"基于Web API实现麦克风录音并保存为wav文件","date":"2023-07-22 08:0000","cover":"./image-crawlee.png","thumbnail":"./images/3.jpg","wordCount":983},"excerpt":"最近遇到了一个需求，使用电脑外接的话筒推流发广播，这里面涉及到了WebRTC的一些功能以及音频数据的处理。以前做过监听功能，接收pcm流并实时播放，因此对音频数据流略有了解，但如何从麦克风接流还不太了解。做了几天，最终完成了，这里简单回顾下并做个小demo。声音的采集当我们说话时","src":"","html":""},{"url":"/tools/npm-package-json/index","frontmatter":{"title":"浅谈package.json中与打包发布相关的字段","date":"2023-07-21T19:00:00.000Z","thumbnail":"./images/2.jpg","wordCount":596},"excerpt":"如果你要发布一个包到npm上面，package.json是你不能忽视的配置。除了最基本的name和version字段，与打包发布相关的字段其实有不少，很多人可能不太关注，本文将试着解说下这些字段。发布相关先说说发布相关的字段：name必须的字段，看起来比较简单，但也有一定的命名限","src":"","html":""},{"url":"/tools/cicd/index","frontmatter":{"title":"搭建一套适用于个人的CICD构建流系统","date":"2023-07-21T18:00:00.000Z","thumbnail":"./images/1.jpg","wordCount":9971},"excerpt":"在如今的容器服务中，使用Gitlab、K8S、Jenkins等技术部署服务是非常常见的，但这些需要的服务器内存和数量都不小。例如，部署一个Gitlab都需要至少4G内存，对于个人学习属实不太友好。介绍基于docker，实现面向个人的CICD集成，包括：基于docker+swarm","src":"","html":""},{"url":"/frontend/js-priority/index","frontmatter":{"title":"从new xx()和new xx的区别中，整理JS中操作符的优先级","date":"2023-07-13T00:00:00.000Z","thumbnail":"./images/9.jpg","wordCount":1691},"excerpt":"最近在工作中写日期格式化时，遇到一个问题，先来看下面的代码：ts//写法一newDate().toISOString;//写法二newDate.toISOString();12345运行结果如下：猜测是优先级的问题，然后在MDN找到了答案，它们确实是两个不同的优先级，如下图：以上","src":"","html":""},{"url":"/frontend/tool-ejs/index","frontmatter":{"title":"使用 EJS 生成代码提升开发效率","description":"测试","date":"2023-07-13T00:00:00.000Z","tags":"前端","thumbnail":"./images/3.jpg","wordCount":1601},"excerpt":"EJS是一个JavaScript模板引擎，名字中的E可以指Embedded(可嵌入)、Effective(高效)、Elegant(优雅)或者是Easy(简单)。在如今的前端开发中，EJS比不上Vue或React等框架强大，但在辅助开发方面还是有用处的。话不多说，接下来以一个例子来","src":"","html":""},{"url":"/frontend/vitepress-blog/index","frontmatter":{"title":"改造vitepess作为个人博客","date":"2023-06-17T11:42:00.000Z","thumbnail":"./images/4.jpg","wordCount":4840},"excerpt":"作为一名程序员，写日记是常有的事，日常我都是写在有道云笔记里面，可以看下我在有道上的记录：但最近搞了不少小工具，遇到不少问题并想记录下来，各种方案搜下来最终决定使用Vitepress以静态博客形式写日记。选择Vitepress在这之前，我是有一台1核2G的小水管服务器的，基于Ty","src":"","html":""}]');var rt;(function(t){t[t.ELEMENT=1]="ELEMENT",t[t.FUNCTIONAL_COMPONENT=2]="FUNCTIONAL_COMPONENT",t[t.STATEFUL_COMPONENT=4]="STATEFUL_COMPONENT",t[t.COMPONENT=6]="COMPONENT",t[t.TEXT_CHILDREN=8]="TEXT_CHILDREN",t[t.ARRAY_CHILDREN=16]="ARRAY_CHILDREN",t[t.SLOTS_CHILDREN=32]="SLOTS_CHILDREN",t[t.TELEPORT=64]="TELEPORT",t[t.SUSPENSE=128]="SUSPENSE",t[t.COMPONENT_SHOULD_KEEP_ALIVE=256]="COMPONENT_SHOULD_KEEP_ALIVE",t[t.COMPONENT_KEPT_ALIVE=512]="COMPONENT_KEPT_ALIVE"})(rt||(rt={}));var nt;(function(t){t[t.TEXT=1]="TEXT",t[t.CLASS=2]="CLASS",t[t.STYLE=4]="STYLE",t[t.PROPS=8]="PROPS",t[t.FULL_PROPS=16]="FULL_PROPS",t[t.HYDRATE_EVENTS=32]="HYDRATE_EVENTS",t[t.STABLE_FRAGMENT=64]="STABLE_FRAGMENT",t[t.KEYED_FRAGMENT=128]="KEYED_FRAGMENT",t[t.UNKEYED_FRAGMENT=256]="UNKEYED_FRAGMENT",t[t.NEED_PATCH=512]="NEED_PATCH",t[t.DYNAMIC_SLOTS=1024]="DYNAMIC_SLOTS",t[t.DEV_ROOT_FRAGMENT=2048]="DEV_ROOT_FRAGMENT",t[t.HOISTED=-1]="HOISTED",t[t.BAIL=-2]="BAIL"})(nt||(nt={}));const Q=t=>!!(t&&t.shapeFlag&1),z=(t,h)=>!!(t&&t.shapeFlag&6),it=(t,h)=>!!(t&&t.shapeFlag&16),ht=(t,h)=>!!(t&&t.shapeFlag&32),X=t=>{var h,d;if(t)for(const s of t){if(Q(s)||z(s))return s;if(it(s,s.children)){const c=X(s.children);if(c)return c}else if(ht(s,s.children)){const c=(d=(h=s.children).default)==null?void 0:d.call(h);if(c){const g=X(c);if(g)return g}}else if(ot(s)){const c=X(s);if(c)return c}}},vt=t=>{if(!t)return!0;for(const h of t)if(h.children)return!1;return!0},pt=(t,h)=>{if(t&&t.length>0)for(let d=0;d<t.length;d++){const s=t[d];if(Q(s)||z(s)){const g=ft(h)?h(s):h;return t[d]=mt(s,g,!0),!0}const c=F(s);if(c&&c.length>0&&pt(c,h))return!0}return!1},F=t=>{if(it(t,t.children))return t.children;if(ot(t))return t},st=t=>{var h,d;if(Q(t))return t.el;if(z(t)){if(((h=t.el)==null?void 0:h.nodeType)===1)return t.el;if((d=t.component)!=null&&d.subTree){const s=st(t.component.subTree);if(s)return s}}else{const s=F(t);return Tt(s)}},Tt=t=>{if(t&&t.length>0)for(const h of t){const d=st(h);if(d)return d}},ut=(t,h)=>{var d;const s=[];if(z(t,t.type))t.type.name===h?t.component&&s.push(t.component.uid):(d=t.component)!=null&&d.subTree&&s.push(...ut(t.component.subTree,h));else{const c=F(t);c&&s.push(...wt(c,h))}return s},wt=(t,h)=>{const d=[];if(t&&t.length>0)for(const s of t)d.push(...ut(s,h));return d};var q=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function tt(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var at={exports:{}};(function(t,h){(function(d,s){t.exports=s()})(q,function(){var d=1e3,s=6e4,c=36e5,g="millisecond",M="second",w="minute",_="hour",p="day",b="week",i="month",f="quarter",x="year",O="date",Y="Invalid Date",k=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,j=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,Z={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(u){var n=["th","st","nd","rd"],e=u%100;return"["+u+(n[(e-20)%10]||n[e]||n[0])+"]"}},L=function(u,n,e){var o=String(u);return!o||o.length>=n?u:""+Array(n+1-o.length).join(e)+u},R={s:L,z:function(u){var n=-u.utcOffset(),e=Math.abs(n),o=Math.floor(e/60),r=e%60;return(n<=0?"+":"-")+L(o,2,"0")+":"+L(r,2,"0")},m:function u(n,e){if(n.date()<e.date())return-u(e,n);var o=12*(e.year()-n.year())+(e.month()-n.month()),r=n.clone().add(o,i),a=e-r<0,l=n.clone().add(o+(a?-1:1),i);return+(-(o+(e-r)/(a?r-l:l-r))||0)},a:function(u){return u<0?Math.ceil(u)||0:Math.floor(u)},p:function(u){return{M:i,y:x,w:b,d:p,D:O,h:_,m:w,s:M,ms:g,Q:f}[u]||String(u||"").toLowerCase().replace(/s$/,"")},u:function(u){return u===void 0}},S="en",C={};C[S]=Z;var G=function(u){return u instanceof P},H=function u(n,e,o){var r;if(!n)return S;if(typeof n=="string"){var a=n.toLowerCase();C[a]&&(r=a),e&&(C[a]=e,r=a);var l=n.split("-");if(!r&&l.length>1)return u(l[0])}else{var T=n.name;C[T]=n,r=T}return!o&&r&&(S=r),r||!o&&S},y=function(u,n){if(G(u))return u.clone();var e=typeof n=="object"?n:{};return e.date=u,e.args=arguments,new P(e)},m=R;m.l=H,m.i=G,m.w=function(u,n){return y(u,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var P=function(){function u(e){this.$L=H(e.locale,null,!0),this.parse(e)}var n=u.prototype;return n.parse=function(e){this.$d=function(o){var r=o.date,a=o.utc;if(r===null)return new Date(NaN);if(m.u(r))return new Date;if(r instanceof Date)return new Date(r);if(typeof r=="string"&&!/Z$/i.test(r)){var l=r.match(k);if(l){var T=l[2]-1||0,E=(l[7]||"0").substring(0,3);return a?new Date(Date.UTC(l[1],T,l[3]||1,l[4]||0,l[5]||0,l[6]||0,E)):new Date(l[1],T,l[3]||1,l[4]||0,l[5]||0,l[6]||0,E)}}return new Date(r)}(e),this.$x=e.x||{},this.init()},n.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},n.$utils=function(){return m},n.isValid=function(){return this.$d.toString()!==Y},n.isSame=function(e,o){var r=y(e);return this.startOf(o)<=r&&r<=this.endOf(o)},n.isAfter=function(e,o){return y(e)<this.startOf(o)},n.isBefore=function(e,o){return this.endOf(o)<y(e)},n.$g=function(e,o,r){return m.u(e)?this[o]:this.set(r,e)},n.unix=function(){return Math.floor(this.valueOf()/1e3)},n.valueOf=function(){return this.$d.getTime()},n.startOf=function(e,o){var r=this,a=!!m.u(o)||o,l=m.p(e),T=function(V,v){var I=m.w(r.$u?Date.UTC(r.$y,v,V):new Date(r.$y,v,V),r);return a?I:I.endOf(p)},E=function(V,v){return m.w(r.toDate()[V].apply(r.toDate("s"),(a?[0,0,0,0]:[23,59,59,999]).slice(v)),r)},D=this.$W,$=this.$M,N=this.$D,J="set"+(this.$u?"UTC":"");switch(l){case x:return a?T(1,0):T(31,11);case i:return a?T(1,$):T(0,$+1);case b:var U=this.$locale().weekStart||0,B=(D<U?D+7:D)-U;return T(a?N-B:N+(6-B),$);case p:case O:return E(J+"Hours",0);case _:return E(J+"Minutes",1);case w:return E(J+"Seconds",2);case M:return E(J+"Milliseconds",3);default:return this.clone()}},n.endOf=function(e){return this.startOf(e,!1)},n.$set=function(e,o){var r,a=m.p(e),l="set"+(this.$u?"UTC":""),T=(r={},r[p]=l+"Date",r[O]=l+"Date",r[i]=l+"Month",r[x]=l+"FullYear",r[_]=l+"Hours",r[w]=l+"Minutes",r[M]=l+"Seconds",r[g]=l+"Milliseconds",r)[a],E=a===p?this.$D+(o-this.$W):o;if(a===i||a===x){var D=this.clone().set(O,1);D.$d[T](E),D.init(),this.$d=D.set(O,Math.min(this.$D,D.daysInMonth())).$d}else T&&this.$d[T](E);return this.init(),this},n.set=function(e,o){return this.clone().$set(e,o)},n.get=function(e){return this[m.p(e)]()},n.add=function(e,o){var r,a=this;e=Number(e);var l=m.p(o),T=function($){var N=y(a);return m.w(N.date(N.date()+Math.round($*e)),a)};if(l===i)return this.set(i,this.$M+e);if(l===x)return this.set(x,this.$y+e);if(l===p)return T(1);if(l===b)return T(7);var E=(r={},r[w]=s,r[_]=c,r[M]=d,r)[l]||1,D=this.$d.getTime()+e*E;return m.w(D,this)},n.subtract=function(e,o){return this.add(-1*e,o)},n.format=function(e){var o=this,r=this.$locale();if(!this.isValid())return r.invalidDate||Y;var a=e||"YYYY-MM-DDTHH:mm:ssZ",l=m.z(this),T=this.$H,E=this.$m,D=this.$M,$=r.weekdays,N=r.months,J=r.meridiem,U=function(v,I,W,K){return v&&(v[I]||v(o,a))||W[I].slice(0,K)},B=function(v){return m.s(T%12||12,v,"0")},V=J||function(v,I,W){var K=v<12?"AM":"PM";return W?K.toLowerCase():K};return a.replace(j,function(v,I){return I||function(W){switch(W){case"YY":return String(o.$y).slice(-2);case"YYYY":return m.s(o.$y,4,"0");case"M":return D+1;case"MM":return m.s(D+1,2,"0");case"MMM":return U(r.monthsShort,D,N,3);case"MMMM":return U(N,D);case"D":return o.$D;case"DD":return m.s(o.$D,2,"0");case"d":return String(o.$W);case"dd":return U(r.weekdaysMin,o.$W,$,2);case"ddd":return U(r.weekdaysShort,o.$W,$,3);case"dddd":return $[o.$W];case"H":return String(T);case"HH":return m.s(T,2,"0");case"h":return B(1);case"hh":return B(2);case"a":return V(T,E,!0);case"A":return V(T,E,!1);case"m":return String(E);case"mm":return m.s(E,2,"0");case"s":return String(o.$s);case"ss":return m.s(o.$s,2,"0");case"SSS":return m.s(o.$ms,3,"0");case"Z":return l}return null}(v)||l.replace(":","")})},n.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},n.diff=function(e,o,r){var a,l=this,T=m.p(o),E=y(e),D=(E.utcOffset()-this.utcOffset())*s,$=this-E,N=function(){return m.m(l,E)};switch(T){case x:a=N()/12;break;case i:a=N();break;case f:a=N()/3;break;case b:a=($-D)/6048e5;break;case p:a=($-D)/864e5;break;case _:a=$/c;break;case w:a=$/s;break;case M:a=$/d;break;default:a=$}return r?a:m.a(a)},n.daysInMonth=function(){return this.endOf(i).$D},n.$locale=function(){return C[this.$L]},n.locale=function(e,o){if(!e)return this.$L;var r=this.clone(),a=H(e,o,!0);return a&&(r.$L=a),r},n.clone=function(){return m.w(this.$d,this)},n.toDate=function(){return new Date(this.valueOf())},n.toJSON=function(){return this.isValid()?this.toISOString():null},n.toISOString=function(){return this.$d.toISOString()},n.toString=function(){return this.$d.toUTCString()},u}(),et=P.prototype;return y.prototype=et,[["$ms",g],["$s",M],["$m",w],["$H",_],["$W",p],["$M",i],["$y",x],["$D",O]].forEach(function(u){et[u[1]]=function(n){return this.$g(n,u[0],u[1])}}),y.extend=function(u,n){return u.$i||(u(n,P,y),u.$i=!0),y},y.locale=H,y.isDayjs=G,y.unix=function(u){return y(1e3*u)},y.en=C[S],y.Ls=C,y.p={},y})})(at);var lt=at.exports;const A=tt(lt);var Mt={exports:{}};(function(t,h){(function(d,s){t.exports=s(lt)})(q,function(d){function s(M){return M&&typeof M=="object"&&"default"in M?M:{default:M}}var c=s(d),g={name:"zh-cn",weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),ordinal:function(M,w){return w==="W"?M+"周":M+"日"},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日Ah点mm分",LLLL:"YYYY年M月D日ddddAh点mm分",l:"YYYY/M/D",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日dddd HH:mm"},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},meridiem:function(M,w){var _=100*M+w;return _<600?"凌晨":_<900?"早上":_<1100?"上午":_<1300?"中午":_<1800?"下午":"晚上"}};return c.default.locale(g,null,!0),g})})(Mt);var ct={exports:{}};(function(t,h){(function(d,s){t.exports=s()})(q,function(){return function(d,s,c){var g=s.prototype,M=function(i){return i&&(i.indexOf?i:i.s)},w=function(i,f,x,O,Y){var k=i.name?i:i.$locale(),j=M(k[f]),Z=M(k[x]),L=j||Z.map(function(S){return S.slice(0,O)});if(!Y)return L;var R=k.weekStart;return L.map(function(S,C){return L[(C+(R||0))%7]})},_=function(){return c.Ls[c.locale()]},p=function(i,f){return i.formats[f]||function(x){return x.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(O,Y,k){return Y||k.slice(1)})}(i.formats[f.toUpperCase()])},b=function(){var i=this;return{months:function(f){return f?f.format("MMMM"):w(i,"months")},monthsShort:function(f){return f?f.format("MMM"):w(i,"monthsShort","months",3)},firstDayOfWeek:function(){return i.$locale().weekStart||0},weekdays:function(f){return f?f.format("dddd"):w(i,"weekdays")},weekdaysMin:function(f){return f?f.format("dd"):w(i,"weekdaysMin","weekdays",2)},weekdaysShort:function(f){return f?f.format("ddd"):w(i,"weekdaysShort","weekdays",3)},longDateFormat:function(f){return p(i.$locale(),f)},meridiem:this.$locale().meridiem,ordinal:this.$locale().ordinal}};g.localeData=function(){return b.bind(this)()},c.localeData=function(){var i=_();return{firstDayOfWeek:function(){return i.weekStart||0},weekdays:function(){return c.weekdays()},weekdaysShort:function(){return c.weekdaysShort()},weekdaysMin:function(){return c.weekdaysMin()},months:function(){return c.months()},monthsShort:function(){return c.monthsShort()},longDateFormat:function(f){return p(i,f)},meridiem:i.meridiem,ordinal:i.ordinal}},c.months=function(){return w(_(),"months")},c.monthsShort=function(){return w(_(),"monthsShort","months",3)},c.weekdays=function(i){return w(_(),"weekdays",null,null,i)},c.weekdaysShort=function(i){return w(_(),"weekdaysShort","weekdays",3,i)},c.weekdaysMin=function(i){return w(_(),"weekdaysMin","weekdays",2,i)}}})})(ct);var _t=ct.exports;const gt=tt(_t);var dt={exports:{}};(function(t,h){(function(d,s){t.exports=s()})(q,function(){return function(d,s,c){d=d||{};var g=s.prototype,M={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function w(p,b,i,f){return g.fromToBase(p,b,i,f)}c.en.relativeTime=M,g.fromToBase=function(p,b,i,f,x){for(var O,Y,k,j=i.$locale().relativeTime||M,Z=d.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],L=Z.length,R=0;R<L;R+=1){var S=Z[R];S.d&&(O=f?c(p).diff(i,S.d,!0):i.diff(p,S.d,!0));var C=(d.rounding||Math.round)(Math.abs(O));if(k=O>0,C<=S.r||!S.r){C<=1&&R>0&&(S=Z[R-1]);var G=j[S.l];x&&(C=x(""+C)),Y=typeof G=="string"?G.replace("%d",C):G(C,b,S.l,k);break}}if(b)return Y;var H=k?j.future:j.past;return typeof H=="function"?H(Y):H.replace("%s",Y)},g.to=function(p,b){return w(p,b,this,!0)},g.from=function(p,b){return w(p,b,this)};var _=function(p){return p.$u?c.utc():c()};g.toNow=function(p){return this.to(_(this),p)},g.fromNow=function(p){return this.from(_(this),p)}}})})(dt);var Et=dt.exports;const yt=tt(Et),Dt="YYYY-MM-DD HH:mm:ss",St="YYYY-MM-DD",Ct="HH:mm:ss";A.locale("zh-cn");A.extend(yt);A.extend(gt);A.DATETIME=Dt;A.DATE=St;A.TIME=Ct;A.prototype._format=A.prototype.format;A.prototype.format=function(t){return t?this._format(t):this._format(A.DATETIME)};export{A as a,X as b,Tt as c,xt as d,wt as g,vt as i,pt as m};
