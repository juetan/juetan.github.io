const t=JSON.parse('[{"url":"/go/03.lib/index","frontmatter":{"title":"Go系列[三]：第三方包的管理","date":"2023-09-08T11:42:00.000Z","thumbnail":"./images/4.jpg","wordCount":99},"excerpt":"Go使用包(package)的概念来管理第三方库，但他设置国内源代理bashgoenv-wGO111MODULE=ongoenv-wGOPROXY=https://goproxy.cn,direct","src":"","html":""},{"url":"/go/02.var/index","frontmatter":{"title":"GO：变量声明和变量类型","date":"2023-09-07T19:17:00.000Z","thumbnail":"./images/9.jpg","wordCount":1168},"excerpt":"Go的语法跟其他语言类似声明变量使用varnametype=value语法声明变量，声明时变量类型和初始值至少得提供一个，当只提供类型时，默认值为零值(字符串为，整型为0，布尔为false)。如下：govarnamestring;//提供类型，初始值值为：varage=18;//","src":"","html":""},{"url":"/go/01.start/index","frontmatter":{"title":"Go系列[一]：安装，编译和运行","date":"2023-09-07T18:13:00.000Z","thumbnail":"./images/8.jpg","wordCount":567},"excerpt":"下载安装打开官网下载，如下：按照指示安装，安装完打开CMD输入命令并回车，应该有如下输出：上手运行Go是一门编译型语言，需要先编译在运行，接下来写个小示例。新建文件夹，以及一个文件。bashmkdirgo-01cdgo-01touchmain.go修改文件，写个hello,wor","src":"","html":""},{"url":"/rust/07.macro/index","frontmatter":{"title":"Rust系列[七]：宏，派生宏、属性宏和函数宏","date":"2023-09-01T09:38:00.000Z","thumbnail":"./images/7.jpg","wordCount":3983},"excerpt":"宏(macro)，是一种扩展功能和语法的自定义规则，目的是减少重复代码的书写。在Rust中，宏包含声明宏和过程宏，而过程宏又分为派生宏、属性宏和函数宏三种。宏在编译期进行处理，可以操作代码和以及AST，然后替换生成新的代码和AST，这样就可以减少运行期的额外工作，提高性能。宏的目","src":"","html":""},{"url":"/rust/06.collection/index","frontmatter":{"title":"Rust系列[六]：常见集合","date":"2023-08-31T19:29:00.000Z","thumbnail":"./images/8.jpg","wordCount":10},"excerpt":"在空间，有很多集合，","src":"","html":""},{"url":"/rust/03.crate/index","frontmatter":{"title":"Rust系列[五]：包、模块和命名空间","date":"2023-08-31T19:02:00.000Z","thumbnail":"./images/5.jpg","wordCount":1147},"excerpt":"Rust中的包称为crate，包管理器称为cargo，这两者的存在让我们很方便地管理和下载第三方库。先来简单过一下包管理器的使用，后面再说说如何创建一个包。cargo的使用cargo既是一个包管理器，同时也是一个构建工具。作为包管理器时，主要从crates.io源下载，国内可以使","src":"","html":""},{"url":"/rust/05.struct/index","frontmatter":{"title":"Rust系列[四]：结构体","date":"2023-08-31T14:43:00.000Z","thumbnail":"./images/8.jpg","wordCount":1742},"excerpt":"结构体，类似于其他语言中的对象，拥有属性和属性值，注意没有方法只有属性。与元组相比，两者都可以存储不同类型的值，但结构体可以为每个成员定义名字，语法如下：ruststructAnimal{name:String,}元组结构体指的是没有名字的结构体，类似元组。ruststructC","src":"","html":""},{"url":"/rust/04.ownership/index","frontmatter":{"title":"Rust系列[三]：所有权，借用和引用","date":"2023-08-29T13:35:00.000Z","thumbnail":"./images/7.jpg","wordCount":2417},"excerpt":"当我们声明变量时，每个变量都会被分配一片内存空间，这片内存空间要在适当的时机回收，否则会造成内存泄漏。不同的语言有不同的回收机制，部分语言手动回收，如C语言等；部分语言使用垃圾回收机制自动回收，如JavaScript等；Rust选择的是不同路线：使用所有权机制进行半自动回收。所有","src":"","html":""},{"url":"/rust/02.basic/index","frontmatter":{"title":"Rust系列[二]：变量，数据类型，注释，控制结构","date":"2023-08-29T09:12:00.000Z","thumbnail":"./images/3.jpg","wordCount":1986},"excerpt":"跟其他高级语言一样，Rust使用unicode字符集，这里过一下常见的编程概念在Rust中的使用。注释单行注释，使用双斜杠语法，如下：rust//这里是单行注释letb=1;文档注释，使用三斜杠语法，用于发布crate时使用，语法：rust///这里是文档注释fnadd(){}变","src":"","html":""},{"url":"/rust/01.start/index","frontmatter":{"title":"Rust系列[一]：安装和上手","date":"2023-08-25T11:50:00.000Z","categories":"rust","tags":"rust","thumbnail":"./images/3.jpg","wordCount":2665},"excerpt":"Rust是一门高性能、高安全性的系统级编程语言，最初旨在作为C和C++的更安全替代品。Rust直译为铁锈，起名来源于一种特别健壮的真菌，这种真菌为了生存而过度设计。为什么学习要说理由的话，大概有以下几个：想学一门偏底层的语言部分概念跟NodeJS类似，let/const关键字，包","src":"","html":""},{"url":"/interview/post-implement","frontmatter":{"title":"手写系列：实现call/apply/debounce/throtle等函数","date":"2023-08-09T18:20:00.000Z","thumbnail":"./images/9.jpg","wordCount":1478},"excerpt":"ES自带很多内置函数，且有些函数是可以通过现有代码实现的，例如数组多达二十几个函数，这些函数都是可以自己实现的。这里挑一些常见的函数，巩固下。手写callcall，即调用，这是函数的一个方法，用于给函数绑定执行上下文(this)并执行，然后返回执行结果。由于this是动态的，在运","src":"","html":""},{"url":"/tools/post-wagger","frontmatter":{"title":"NestJS：基于swagger生成路由文档及进阶用法","date":"2023-08-07T00:00:00.000Z","thumbnail":"./images/1.jpg","wordCount":3335},"excerpt":"Swagger是一个用于生成RESTfulAPI接口文档的工具，目前其数据规范已更名为OPENAPI并作为一项标准进行推广。很多后端语言都有相应的社区包，在NestJS中有官方提供的@nestjs/swagger库。工作原理安装对应依赖后，使用注释/注解/装饰器在路由方法上，标注","src":"","html":""},{"url":"/tools/post-pnpm-patch","frontmatter":{"title":"使用pnpm patch临时修复第三方库的问题","date":"2023-07-24T18:00:00.000Z","thumbnail":"./images/5.jpg","wordCount":383},"excerpt":"目前的博客需要一个能展示demo的功能，在调研一番后决定使用@ruabick/md-demo-plugins插件。但安装后却报错如下：问题修复于是debug一番后，猜测Vitepres内部有部分调用里没有传路径参数，于是尝试修改包里面的代码如下：清空缓存然后重新启动，顺利用上了，","src":"","html":""},{"url":"/tools/post-http-origin","frontmatter":{"title":"HTTP协议：Origin、Host和Referer请求头字段","date":"2023-07-22T13:00:00.000Z","tags":"HTTP","thumbnail":"./images/2.jpg","wordCount":213},"excerpt":"在开发者工具中的网络面板中，经常能看到这几个字段，而且这几个字段的值看着都差不多，它们到底有什么用呢？首先说说它们的一个共同点，都是由浏览器自动携带，与安全/权限相关，接下来分别聊聊它们各自的作用。Origin直译为源头，我们常说的跨域就与它有关。跨域，可简单理解为跨域域名，即在","src":"","html":""},{"url":"/tools/post-crawlee","frontmatter":{"title":"使用Crawlee实现爬虫功能","date":"2023-07-22T11:00:00.000Z","thumbnail":"./images/3.jpg","wordCount":1680},"excerpt":"在做前端驿站这个导航网站时，收集到的每个网站都是有图标的，但部分网站由于某墙的原因，直接用源站图标URL会导致加载失败。谷歌一番后，最终用Crawlee将所有图标都爬取回来了，直接打包到项目里，这里记录下这个库的一些基本用法。今天实现一个小目标，爬取豆瓣电影Top250的数据，页","src":"","html":""},{"url":"/tools/post-audio","frontmatter":{"title":"基于Web API实现麦克风录音并保存为wav文件","date":"2023-07-22 08:0000","cover":"./image-crawlee.png","thumbnail":"./images/8.jpg","wordCount":978},"excerpt":"最近遇到了一个需求，使用电脑外接的话筒推流发广播，这里面涉及到了WebRTC的一些功能以及音频数据的处理。以前做过监听功能，接收pcm流并实时播放，因此对音频数据流略有了解，但如何从麦克风接流还不太了解。做了几天，最终完成了，这里简单回顾下并做个小demo。声音的采集当我们说话时","src":"","html":""},{"url":"/tools/post-package","frontmatter":{"title":"浅谈package.json中与打包发布相关的字段","date":"2023-07-21T19:00:00.000Z","thumbnail":"./images/5.jpg","wordCount":591},"excerpt":"如果你要发布一个包到npm上面，package.json是你不能忽视的配置。除了最基本的name和version字段，与打包发布相关的字段其实有不少，很多人可能不太关注，本文将试着解说下这些字段。发布相关先说说发布相关的字段：name必须的字段，看起来比较简单，但也有一定的命名限","src":"","html":""},{"url":"/tools/post-docker-cicd","frontmatter":{"title":"搭建一套适用于个人的CICD构建流系统","date":"2023-07-21T18:00:00.000Z","thumbnail":"./images/7.jpg","wordCount":8715},"excerpt":"在如今的容器服务中，使用Gitlab、K8S、Jenkins等技术部署服务是非常常见的，但这些需要的服务器内存和数量都不小。例如，部署一个Gitlab都需要至少4G内存，对于个人学习属实不太友好。介绍基于docker，实现面向个人的CICD集成，包括：基于docker+swarm","src":"","html":""},{"url":"/frontend/post-browser-cache","frontmatter":{"title":"HTTP中的强缓存和协商缓存以及浏览器自身的存储","date":"2023-07-20T11:49:00.000Z","thumbnail":"./images/8.jpg","wordCount":2209},"excerpt":"当一个网站有成千上万用户访问的时候，为避免并发导致的服务拥挤，使用缓存是一种非常常见的手段。例如，用户A请求了B图片，服务器返回了图片内容并告知这张图片要缓存起来，一个月后过期，浏览器接收后检测到缓存设置就会缓存在本地磁盘，后面用户A再访问B图片时，浏览器检查到B图片已经有缓存且","src":"","html":""},{"url":"/frontend/post-rollup-static","frontmatter":{"title":"探索Rollup是如何对静态资源进行处理的","date":"2023-07-19T17:59:00.000Z","thumbnail":"./images/3.jpg","wordCount":914},"excerpt":"自从Vite3发布起，就开始用它做了不少实践和项目，Vite的底层是Rollup和Esbuild。而Rollup用在打包阶段，一直以来我都好奇对Rollup如何处理静态资源的，那么今天主要是想探索一下，如何写一个Rollup插件，实现：tsimportImagefrom./ima","src":"","html":""},{"url":"/frontend/post-browser-download","frontmatter":{"title":"浏览器对二进制内容的下载处理机制","date":"2023-07-19T11:05:00.000Z","thumbnail":"./images/10.jpg","wordCount":1659},"excerpt":"从服务端下载内容是很常见的操作，例如从服务器下载一个.exe文件，一个.zip文件或.png文件等。但在浏览器进行下载，是有一点门道的，接下来从两个方面聊下如何在浏览器下载内容。利用浏览器进行下载这里的意思是指，不使用JS操作二进制数据，直接给让浏览器打开一个链接，利用浏览器的内","src":"","html":""},{"url":"/frontend/post-vite-loadup","frontmatter":{"title":"写一个Vite插件：根据配置加载不同后缀的文件","date":"2023-07-18T11:31:00.000Z","thumbnail":"./images/5.jpg","wordCount":805},"excerpt":"最近在工作中，遇到两个小问题，让我想写个Vite插件。一个是不同项目间的微小差异，某个项目在A页面加了需求，其他项目又不需要，直接在页面上加判断感觉没必要，毕竟差异只有一丢丢。另一个时，有新功能时，要新增页面但这个页面最近的版本又不上，这就得动代码了。偶然下想起Taro根据不同后","src":"","html":""},{"url":"/frontend/post-vitepress","frontmatter":{"title":"改造vitepess作为个人博客","date":"2023-07-17T11:42:00.000Z","thumbnail":"./images/8.jpg","wordCount":4614},"excerpt":"作为一名程序员，写日记是常有的事，日常我都是写在有道云笔记里面，可以看下我在有道上的记录：但最近搞了不少小工具，遇到不少问题并想记录下来，各种方案搜下来最终决定使用Vitepress以静态博客形式写日记。选择Vitepress在这之前，我是有一台1核2G的小水管服务器的，基于Ty","src":"","html":""},{"url":"/frontend/post-ejs","frontmatter":{"title":"使用 EJS 生成代码提升开发效率","description":"测试","date":"2023-07-13T00:00:00.000Z","tags":"前端","thumbnail":"./images/1.jpg","wordCount":1512},"excerpt":"EJS是一个JavaScript模板引擎，名字中的E可以指Embedded(可嵌入)、Effective(高效)、Elegant(优雅)或者是Easy(简单)。在如今的前端开发中，EJS比不上Vue或React等框架强大，但在辅助开发方面还是有用处的。话不多说，接下来以一个例子来","src":"","html":""},{"url":"/frontend/post-priority","frontmatter":{"title":"从new xx()和new xx的区别中，整理JS中操作符的优先级","date":"2023-07-13T00:00:00.000Z","thumbnail":"./images/7.jpg","wordCount":1686},"excerpt":"最近在工作中写日期格式化时，遇到一个问题，先来看下面的代码：ts//写法一newDate().toISOString;//写法二newDate.toISOString();运行结果如下：猜测是优先级的问题，然后在MDN找到了答案，它们确实是两个不同的优先级，如下图：以上，方式一中","src":"","html":""},{"url":"/frontend/post-tailwind","frontmatter":{"title":"TailwindCSS中一些有意思的用法和实现","date":"2023-07-13T00:00:00.000Z","excerpt":"在国内，TailwindCSS是一个比较有争议的CSS库，写起来很像行内style但又确实很方便。作为原子类火起来的tailwindcss还有不少很方便的原子类，本文探讨一些有趣和实用的原子类。","thumbnail":"./images/7.jpg"},"excerpt":"在国内，TailwindCSS是一个比较有争议的CSS库，写起来很像行内style但又确实很方便。作为原子类火起来的tailwindcss还有不少很方便的原子类，本文探讨一些有趣和实用的原子类。","src":"","html":""},{"url":"/rust/todo","frontmatter":{"thumbnail":"./images/3.jpg","wordCount":353},"excerpt":"生命周期指的是引用的生命周期，避免悬垂指针和使用已经释放的内容，通常在函数参数和返回值中应用。rustfnmain(){letmuts=String::from(helloworld);letword=first_word(s);s.clear();//错误！println!(t","src":"","html":""}]');export{t as d};
