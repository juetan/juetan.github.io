import{_ as l,I as o,o as p,c as t,k as s,M as e,a,W as i}from"./chunks/framework.45d8ea02.js";const c="/assets/image-sqlite3-bin.848195ae.png",r="/assets/image-sqlite3-18.494a645b.png",d="/assets/image-sqlite3-alpine.f767afd5.png",_="/assets/image-build-gcc.e549ccc4.png",u="/assets/image-build-cache.f5f701ea.png",m="/assets/image-18-size.443a687e.png",h="/assets/image-alpine-size.f8599638.png",z=JSON.parse('{"title":"使用Node-Alpine构建Docker镜像时，Sqlite3安装失败如何解决？","description":"","frontmatter":{"title":"使用Node-Alpine构建Docker镜像时，Sqlite3安装失败如何解决？","date":"2023-09-27T08:53:00.000Z"},"headers":[],"relativePath":"tools/node-alpine-sqlite3/node-alpine-sqlite3.md","filePath":"tools/node-alpine-sqlite3/node-alpine-sqlite3.md"}'),b={name:"tools/node-alpine-sqlite3/node-alpine-sqlite3.md"},g=s("p",null,"最近在部署 NestJS 容器时，发现基于 node:18 打包出来的镜像有 1G 多，于是抱着节省体积的想法，打算用 node:18-alpine 进行构建。不曾想，打包是成功了但运行时却报错 sqlite3 不存在。在摸索一番后，最终解决这个问题，在这里记录下。",-1),y=s("h2",{id:"问题探究",tabindex:"-1"},[a("问题探究 "),s("a",{class:"header-anchor",href:"#问题探究","aria-label":'Permalink to "问题探究"'},"​")],-1),q=s("p",null,"出问题后首先去查了下 sqlite3 的官方文档，发现 sqlite3 有个二进制依赖，但这个二进制是不随着包下载的，而是下载后包后，在本地打包成对应平台的二进制文件。猜测这样做的原因，是减少安装时的依赖，毕竟把每个操作系统对应的二进制编译文件都放在一起体积会非常大，官方给出的类型如下：",-1),f=s("p",null,"如此多的编译类型，果然还是单独编译比较划算。但编译需要 node-gyp 和 gcc 等依赖，哪个镜像有这些东西呢？",-1),x=s("h2",{id:"尝试多阶段构建",tabindex:"-1"},[a("尝试多阶段构建 "),s("a",{class:"header-anchor",href:"#尝试多阶段构建","aria-label":'Permalink to "尝试多阶段构建"'},"​")],-1),A=s("p",null,"第一反应是 node:18 应该有这些依赖，不然体积不会如此大。于是想能不能使用多阶段构建进行处理，即构建阶段基于 node:18 镜像，而打包阶段使用 node:18-alpine 镜像，试了试最终也是失败告终。后来想了想，node:18 和 node:18-alpine 架构是不一样的，node:18 打包出来的依赖在 node:18-alpine 中不能用。这点后来也证实了，贴一下对比吧。",-1),k=s("p",null,"以下是 node:18 打包出来的镜像，可以看到 sqlite3 构建出来的二进制文件名是 napi-v6-linux-glibc-x64 。",-1),D=s("p",null,"以下是 node:18-alpine 打包出来的镜像，可以看到 sqlite3 构建出来的二进制文件名是 napi-v6-linux-musl-x64 。",-1),E=i(`<p>以上，两个架构不同导致打包出来的二进制名也不同，不能兼容也在情理之中。</p><h2 id="安装所需依赖" tabindex="-1">安装所需依赖 <a class="header-anchor" href="#安装所需依赖" aria-label="Permalink to &quot;安装所需依赖&quot;">​</a></h2><p>既然多阶段构建不行，那么只能在 node:18-alpine 安装所需的 gcc 等依赖，谷歌搜索一番后，最后找到安装方法，话不多说直接贴一下关键代码吧。</p><div class="language-dockerfile line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-light"><code><span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> node:18-alpine </span><span style="color:#D73A49;">As</span><span style="color:#24292E;"> dev</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> apk update &amp;&amp; apk add sqlite</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> apk add --no-cache --virtual .build-deps g++ gcc libgcc libstdc++ linux-headers make python3</span></span>
<span class="line"><span style="color:#6A737D;"># ...</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> npm run build &amp;&amp; npm prune --production</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> node:18-alpine </span><span style="color:#D73A49;">As</span><span style="color:#24292E;"> build</span></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> --from=dev /app/xxx ./</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">EXPOSE</span><span style="color:#24292E;"> 3030</span></span>
<span class="line"><span style="color:#D73A49;">CMD</span><span style="color:#24292E;"> [ </span><span style="color:#032F62;">&quot;node&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;./dist/main.js&quot;</span><span style="color:#24292E;"> ]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>以上：第一阶段使用 node:18-alpine 作为基础镜像，安装 gcc 等依赖。值得注意的是，新版 alpine 应使用 python3 而不是 python 作为依赖名，后者在新版中找不到。打包完后，清除 node_modules 中不必要的开发依赖。第二阶段，则是单纯把第一阶段构建好的 dist 和 node_modules 等产物复制过来，这样最终的镜像就是非常精简的。</p><p>吐槽一下，国内服务器似乎也逃不过墙的命运，不光 Github 访问受限，连从 alpinelinux 下载依赖也受限，首次构建光这个阶段就足足耗费一个小时的时间(如下)。</p>`,6),v=s("p",null,"不过还好 Docker 有缓存机制，第二次构建使用缓存很快就构建了(如下)。",-1),N=s("h2",{id:"前后体积对比",tabindex:"-1"},[a("前后体积对比 "),s("a",{class:"header-anchor",href:"#前后体积对比","aria-label":'Permalink to "前后体积对比"'},"​")],-1),P=s("p",null,"使用多阶段构建配合 alpine 镜像，效果还是非常理想的，接下来来对比下两者间的体积。",-1),S=s("p",null,"首先是使用 node:18 打包出来的镜像，基础镜像 1G 左右(大概?)，配合 node_modules 等未优化内容，体积是惊人的 1.4 G(如下)，看到的时候吓我一跳。",-1),M=s("p",null,"然后是使用 node:18-alpine 打包出来的镜像，基础镜像 60M 左右，加上 node_modules 等文件体积也才 300 多M，可以说是非常理想。",-1),T=s("p",null,"以上，合理使用镜像带来的效果非常不错。不过还是要吐槽下，这个镜像体积也不太小，普通的 vue 前端配合 nginx:alpine 打包出来也就 40M 左右，这 300M 属于大体积了。当然了，如果没有二进制和路径等其他要求，打包成单文件应用也是可以的，但这样容易产生其他问题。",-1),C=s("h2",{id:"结语",tabindex:"-1"},[a("结语 "),s("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),R=s("p",null,"以上，使用带二进制依赖的包时，需要注意构建环境，不然即使打包成功也运行不起来。这里其实还有点，国内下载依赖由于神秘力量的原因通常都比较慢，可以配置镜像源进行加速，有兴趣的可以自行研究下，这里暂不做研究。",-1);function V(I,O,F,G,$,B){const n=o("Image");return p(),t("div",null,[g,y,q,s("p",null,[e(n,{src:c,class:"cursor-pointer"})]),f,x,A,k,s("p",null,[e(n,{src:r,class:"cursor-pointer"})]),D,s("p",null,[e(n,{src:d,class:"cursor-pointer"})]),E,s("p",null,[e(n,{src:_,class:"cursor-pointer"})]),v,s("p",null,[e(n,{src:u,class:"cursor-pointer"})]),N,P,S,s("p",null,[e(n,{src:m,class:"cursor-pointer"})]),M,s("p",null,[e(n,{src:h,class:"cursor-pointer"})]),T,C,R])}const J=l(b,[["render",V]]);export{z as __pageData,J as default};
