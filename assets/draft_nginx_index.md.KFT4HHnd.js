import{_ as p,E as e,c as o,k as s,J as a,S as l,a as t,o as c}from"./chunks/framework.3EKbrk2Y.js";const i="/assets/image-1.VRInJm1W.png",r="/assets/image-2.00SElsae.png",d="/assets/image.53n5aJsc.png",g="/assets/image-3.3MdoKRjY.png",h="/assets/image-7.oi13YM5M.png",y="/assets/image-8.EoIs5bvy.png",u="/assets/image-9.UvJnFobd.png",_="/assets/image-12.AHZIXBzr.png",m="/assets/image-13.Fmtl0588.png",b="/assets/image-11.yuL5SyqN.png",x="/assets/image-15.tyAefHJk.png",C="/assets/image-16.c6zAA1Gl.png",M=JSON.parse('{"title":"Nginx：安装、模式匹配、反向代理，负载均衡","description":"","frontmatter":{"title":"Nginx：安装、模式匹配、反向代理，负载均衡","date":"2024-01-09T16:44:00.000Z"},"headers":[],"relativePath":"draft/nginx/index.md","filePath":"draft/nginx/index.md"}'),v={name:"draft/nginx/index.md"},A=l(`<p><a href="https://nginx.org/en/index.html" target="_blank" rel="noreferrer">Nginx</a> 是一款高性能的HTTP服务器和反向代理服务器。它的特点是轻量级、高并发、稳定性好，能够处理高负载的情况。后端服务虽然可以单独监听服务，但能力有限不如 Nginx 专业和高效，因此通常作为后端服务的前置中间件搭配使用。本文，记录下使用笔记。</p><h2 id="快速上手" tabindex="-1">快速上手 <a class="header-anchor" href="#快速上手" aria-label="Permalink to &quot;快速上手&quot;">​</a></h2><p>使用 Yum/Apt 等包管理器可以下载预编译的 Nginx，但通常还是推荐下载源码自行编译安装，其中一个好处是可以搭配自定义需求进行编译安装。</p><ol><li>从 <a href="https://nginx.org/en/download.html" target="_blank" rel="noreferrer">官网</a> 选择合适的版本，使用 Wget 或其他工具下载源码，例如：</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#032F62;"> https://nginx.org/download/nginx-1.22.1.tar.gz</span></span></code></pre></div><ol start="2"><li>解压缩</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">tar</span><span style="color:#032F62;"> zxvf</span><span style="color:#032F62;"> nginx-1.22.1.tar.gz</span></span></code></pre></div><ol start="3"><li>进入解压后的目录，配置所需的模块和参数，以下指定了前缀(即安装位置，在解析配置路径等时也会用到)，还可以添加 SSL 模块(提供 HTTPS 服务)等模块。</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">./configure</span><span style="color:#005CC5;"> --prefix=/usr/local/nginx</span></span></code></pre></div><ol start="4"><li>进行编译和安装，会安装到前面 --prefix 参数指定的位置。</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">make</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">make</span><span style="color:#032F62;"> install</span></span></code></pre></div><ol start="5"><li>启动 Nginx，可执行文件位于 --prefix 地址的 sbin 目录下</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6A737D;"># /usr/local/nginx/sbin</span></span>
<span class="line"><span style="color:#6F42C1;">./nginx</span></span></code></pre></div><ol start="6"><li>浏览器访问 IP 地址，能看到以下页面即表示安装成功。</li></ol>`,14),E=l(`<h2 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h2><p>在 Nginx 安装目录下包含很多子目录和文件，作为新手我们需要关注以下几个重点文件：</p><div class="language-tree"><button title="Copy Code" class="copy"></button><span class="lang">tree</span><pre class="shiki github-light vp-code"><code><span class="line"><span># /usr/local/nginx</span></span>
<span class="line"><span></span></span>
<span class="line"><span>├── client_body_temp</span></span>
<span class="line"><span>├── conf                             # 配置目录</span></span>
<span class="line"><span>│   ├── fastcgi.conf</span></span>
<span class="line"><span>│   ├── fastcgi.conf.default</span></span>
<span class="line"><span>│   ├── fastcgi_params</span></span>
<span class="line"><span>│   ├── fastcgi_params.default</span></span>
<span class="line"><span>│   ├── koi-utf</span></span>
<span class="line"><span>│   ├── koi-win</span></span>
<span class="line"><span>│   ├── mime.types</span></span>
<span class="line"><span>│   ├── mime.types.default</span></span>
<span class="line"><span>│   ├── nginx.conf                   # 配置文件</span></span>
<span class="line"><span>│   ├── nginx.conf.default</span></span>
<span class="line"><span>│   ├── scgi_params</span></span>
<span class="line"><span>│   ├── scgi_params.default</span></span>
<span class="line"><span>│   ├── uwsgi_params</span></span>
<span class="line"><span>│   ├── uwsgi_params.default</span></span>
<span class="line"><span>│   └── win-utf</span></span>
<span class="line"><span>├── fastcgi_temp</span></span>
<span class="line"><span>├── html                             # 站点目录</span></span>
<span class="line"><span>│   ├── 50x.html</span></span>
<span class="line"><span>│   └── index.html</span></span>
<span class="line"><span>├── logs</span></span>
<span class="line"><span>│   ├── access.log</span></span>
<span class="line"><span>│   ├── error.log</span></span>
<span class="line"><span>│   └── nginx.pid</span></span>
<span class="line"><span>├── proxy_temp</span></span>
<span class="line"><span>├── sbin</span></span>
<span class="line"><span>│   └── nginx                        # 可执行文件</span></span>
<span class="line"><span>├── scgi_temp</span></span>
<span class="line"><span>└── uwsgi_temp</span></span></code></pre></div><h3 id="可执行文件" tabindex="-1">可执行文件 <a class="header-anchor" href="#可执行文件" aria-label="Permalink to &quot;可执行文件&quot;">​</a></h3><p>即 sbin/nginx 文件，服务入口，这是我们启动 nginx 的可执行文件，下面是一些用法：</p><ul><li>启动服务，不带任何参数</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">./nginx</span></span></code></pre></div><ul><li>关闭服务</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">./nginx</span><span style="color:#005CC5;"> -s</span><span style="color:#032F62;"> stop</span></span></code></pre></div><ul><li>重启服务，适用于修改完配置的情况</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">./nginx</span><span style="color:#005CC5;"> -s</span><span style="color:#032F62;"> reload</span></span></code></pre></div><ul><li>检查配置，检查 conf/nginx.conf 是否有误</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">./nginx</span><span style="color:#005CC5;"> -t</span></span></code></pre></div><ul><li>查看版本</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">./nginx</span><span style="color:#005CC5;"> -v</span></span></code></pre></div><h3 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h3><p>即 conf/nginx.conf 文件，这里是需要关注的核心，里面的内容由指令组成，主要包含以下几个部分：</p><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6A737D;"># 全局配置，例如运行用户、日志位置等</span></span>
<span class="line"><span style="color:#D73A49;">user </span><span style="color:#24292E;">nginx;</span></span>
<span class="line"><span style="color:#D73A49;">worker_processes </span><span style="color:#24292E;">1</span></span>
<span class="line"><span style="color:#24292E;">error_log /var/log/nginx/error.log</span><span style="color:#005CC5;"> warn</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 事件配置</span></span>
<span class="line"><span style="color:#D73A49;">events</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">  worker_connections </span><span style="color:#24292E;">1024;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># HTTP服务(重点)</span></span>
<span class="line"><span style="color:#D73A49;">http</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">  include </span><span style="color:#24292E;">      /etc/nginx/mime.types;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">  # 服务器配置</span></span>
<span class="line"><span style="color:#D73A49;">  server</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6A737D;">    # 监听端口</span></span>
<span class="line"><span style="color:#D73A49;">    listen </span><span style="color:#005CC5;">      80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">    # 通常是域名，区分不同服务</span></span>
<span class="line"><span style="color:#D73A49;">    server_name </span><span style="color:#24292E;">juetan.cn;</span></span>
<span class="line"><span style="color:#6A737D;">    # URL匹配</span></span>
<span class="line"><span style="color:#D73A49;">    location</span><span style="color:#6F42C1;"> / </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#6A737D;">      # 网站所在的目录</span></span>
<span class="line"><span style="color:#D73A49;">      root </span><span style="color:#24292E;">  /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#6A737D;">      # 首页文件</span></span>
<span class="line"><span style="color:#D73A49;">      index </span><span style="color:#24292E;">index.html index.htm;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">  # 可以有多个服务器配置</span></span>
<span class="line"><span style="color:#D73A49;">  server</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6A737D;">    # ...</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="网站目录" tabindex="-1">网站目录 <a class="header-anchor" href="#网站目录" aria-label="Permalink to &quot;网站目录&quot;">​</a></h3><p>即 html 目录，站点目录(使用其他目录也可以)，通常放的是静态文件，后端接口等动态内容通常不在这里。</p><p>当使用静态文件，也就是基于文件系统的站点访问时，通常使用 root 指定位置，如下：</p><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">server</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6A737D;">  # 监听端口</span></span>
<span class="line"><span style="color:#D73A49;">  listen </span><span style="color:#005CC5;">      80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">  # 通常是域名，区分不同服务</span></span>
<span class="line"><span style="color:#D73A49;">  server_name </span><span style="color:#24292E;">juetan.cn;</span></span>
<span class="line"><span style="color:#6A737D;">  # URL匹配</span></span>
<span class="line"><span style="color:#D73A49;">  location</span><span style="color:#6F42C1;"> / </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#6A737D;">    # 网站所在的目录</span></span>
<span class="line"><span style="color:#D73A49;">    root </span><span style="color:#24292E;">  /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#6A737D;">    # 首页文件</span></span>
<span class="line"><span style="color:#D73A49;">    index </span><span style="color:#24292E;">index.html index.htm;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>当使用后端服务时，通常使用 proxy_pass 进行代理转发，</p><h2 id="配置参数" tabindex="-1">配置参数 <a class="header-anchor" href="#配置参数" aria-label="Permalink to &quot;配置参数&quot;">​</a></h2><p>使用 Nginx 的核心就是使用配置文件，一个个讲参数有点乏味，我更喜欢通过案例来了解参数使用，接下来将通过几个典型案例了解其配置。</p><h3 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h3><p>以下实践均在 Windows 系统下进行，为了区分不同域名访问，先修改下 hosts 文件，添加 2 个自定义域名：a.com 和 b.com。这 2 个域名尚未启用，不用担心有啥问题。如下：</p>`,27),D=s("h3",{id:"域名匹配",tabindex:"-1"},[t("域名匹配 "),s("a",{class:"header-anchor",href:"#域名匹配","aria-label":'Permalink to "域名匹配"'},"​")],-1),f=s("p",null,"一个服务器是可以绑定多个域名的，例如 a.com 和 b.com 都指向 10.10.10.10 时。但在浏览器访问时，域名都会解析成 IP 再发送，也就是 a.com 和 b.com 都往 10.10.10.10:80 发请求，那么 Nginx 如何区分这些服务呢？",-1),T=s("p",null,"这依赖于一个 HTTP 请求头：Host，该字段由浏览器自动携带，表明当前域名或IP，如下：",-1),k=l(`<p>在 Nginx 配置中，可以配置 2 个监听同一端口的服务，Nginx 会根据 server_name 对应的域名或IP进行匹配，如下：</p><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">server</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">  listen </span><span style="color:#24292E;">80;</span></span>
<span class="line"><span style="color:#D73A49;">  server_name </span><span style="color:#24292E;">a.com;</span></span>
<span class="line"><span style="color:#D73A49;">  root </span><span style="color:#24292E;">html/a;</span></span>
<span class="line"><span style="color:#D73A49;">  index </span><span style="color:#24292E;">index.html;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">server</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">  listen </span><span style="color:#24292E;">80;</span></span>
<span class="line"><span style="color:#D73A49;">  server_name </span><span style="color:#24292E;">b.com;</span></span>
<span class="line"><span style="color:#D73A49;">  root </span><span style="color:#24292E;">html/b;</span></span>
<span class="line"><span style="color:#D73A49;">  index </span><span style="color:#24292E;">index.html;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在 html 目录下，创建如下文件：</p>`,3),P=s("p",null,"重启 Nginx 后，分别访问 a.com 和 b.com ，效果如下：",-1),N=s("p",null,"以上是在浏览器访问的情况，我们在 Postman 等工具下测试下 Nginx 是不是根据 Host 请求头来区分，以下是正常访问：",-1),S=s("p",null,"修改 Host 为任意值再访问，如下：",-1),F=l(`<p>可以看到修改后不再返回 b.com 字样而是 a.com 字样，证明 Host 对 Nginx 的服务匹配是有影响的。</p><h3 id="文件匹配" tabindex="-1">文件匹配 <a class="header-anchor" href="#文件匹配" aria-label="Permalink to &quot;文件匹配&quot;">​</a></h3><p>静态访问，指一个 URL 对应具体的静态文件(如.html文件)，而不是像 API 接口这种返回动态内容。我们来看下，一个 URL 是如何对应到具体文件上的，如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span># Nginx配置</span></span>
<span class="line"><span>location / {</span></span>
<span class="line"><span>  root html/b</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># URL匹配</span></span>
<span class="line"><span>https://b.com/code.html =&gt; html/b/code.html</span></span></code></pre></div><p>以上，我们指定了 root 属性，那么可以在查找时 URL 中的 <a href="https://b.com" target="_blank" rel="noreferrer">https://b.com</a> 会被替换为 html，再把 URL 中的 code.html 拼接上，最终也就是 nginx-path/html/b/code.html 这个路径。访问效果如下：</p>`,5),q=l(`<h3 id="目录匹配" tabindex="-1">目录匹配 <a class="header-anchor" href="#目录匹配" aria-label="Permalink to &quot;目录匹配&quot;">​</a></h3><p>当 URL 不以斜杠结尾时表示读取的是文件，而以斜杠结尾时表示读取的是目录。当读取目录时，默认会返回该目录下的 index.html 文件，此设置可以通过 index 指令进行修改：</p><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">location</span><span style="color:#6F42C1;"> / </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#D73A49;">  index </span><span style="color:#24292E;">index.html index.htm;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>访问效果如下：</p>`,4),I=s("p",null,"此外，当 URL 不以斜杠结尾时，没有这个文件却有这个目录时，会自动 301 重定向到带斜杠结尾的 URL，如下：",-1),R=l(`<h3 id="单页应用" tabindex="-1">单页应用 <a class="header-anchor" href="#单页应用" aria-label="Permalink to &quot;单页应用&quot;">​</a></h3><p>当部署基于 webhistory 路由的单页应用时，通常会希望除静态文件外的 URL 都指向 index.html 文件。这可以通过 Nginx 的 try_files 指令进行，如下：</p><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">location</span><span style="color:#6F42C1;"> / </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#D73A49;">  try_files </span><span style="color:#24292E;">$uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>以上，访问时会先尝试匹配文件，然后是目录，最后是 index.html 文件。例如，存在的情况下：</p>`,4),V=s("p",null,"不存在的情况下(如下)，访问 /xxx (不存在)，返回 /index.html 的内容：",-1),w=l(`<h3 id="反向代理" tabindex="-1">反向代理 <a class="header-anchor" href="#反向代理" aria-label="Permalink to &quot;反向代理&quot;">​</a></h3><p>所谓代理，简单来说就是这事我不亲自干，我找别人代表我干，那这个人就是代理。所谓正向/反向，其实是站在用户的角度来看的，正向就是代表用户发起请求，反向就是代表服务器返回响应。</p><p>在 Nginx 中反向代理主要通过 proxy_pass 这个指令进行配置。例如，把 所有请求都转向 <a href="http://127.0.0.1:3000" target="_blank" rel="noreferrer">http://127.0.0.1:3000</a> 这个地址：</p><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">location</span><span style="color:#6F42C1;"> / </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#D73A49;">  proxy_pass </span><span style="color:#24292E;">http://127.0.0.1:3000</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>注意：location 是否以斜杠结尾和 proxy_pass 是否以斜杠结尾会影响最终的转发地址。来看下以下几种转发例子：</p><ul><li>拼接完整路径到代理路径后面。这种比较常见，如下：</li></ul><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6A737D;"># 情况1：拼接在域名后面</span></span>
<span class="line"><span style="color:#D73A49;">location</span><span style="color:#6F42C1;"> /api </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#D73A49;">  proxy_pass </span><span style="color:#24292E;">http://127.0.0.1:3000</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 情况2：拼接在路径后面</span></span>
<span class="line"><span style="color:#24292E;">location /api {</span></span>
<span class="line"><span style="color:#24292E;">  proxy_pass http://127.0.0.1:3000/systema</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>那么，实际效果会如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span># 情况1</span></span>
<span class="line"><span>http://a.com/api/v1/users =&gt; http://127.0.0.1:3000/api/v1/users</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 情况2</span></span>
<span class="line"><span>http://a.com/api/v1/users =&gt; http://127.0.0.1:3000/systema/api/v1/users</span></span></code></pre></div><ul><li>拼接剩余路径到代理路径后面</li></ul><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">location</span><span style="color:#6F42C1;"> /api/ </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#D73A49;">  proxy_pass </span><span style="color:#24292E;">http://127.0.0.1:3000/apiv1/</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>效果：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>http://a.com/api/users =&gt; http://127.0.0.1:3000/apiv1/users</span></span></code></pre></div><h2 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h2><p>TODO</p>`,15);function L(U,H,J,$,z,B){const n=e("Image");return c(),o("div",null,[A,s("p",null,[a(n,{src:i,alt:"image",class:"cursor-pointer"})]),E,s("p",null,[a(n,{src:r,alt:"image",class:"cursor-pointer"})]),D,f,T,s("p",null,[a(n,{src:d,alt:"image",class:"cursor-pointer"})]),k,s("p",null,[a(n,{src:g,alt:"image",class:"cursor-pointer"})]),P,s("p",null,[a(n,{src:h,alt:"image",class:"cursor-pointer"})]),N,s("p",null,[a(n,{src:y,alt:"image",class:"cursor-pointer"})]),S,s("p",null,[a(n,{src:u,alt:"image",class:"cursor-pointer"})]),F,s("p",null,[a(n,{src:_,alt:"image",class:"cursor-pointer"})]),q,s("p",null,[a(n,{src:m,alt:"image",class:"cursor-pointer"})]),I,s("p",null,[a(n,{src:b,alt:"image",class:"cursor-pointer"})]),R,s("p",null,[a(n,{src:x,alt:"image",class:"cursor-pointer"})]),V,s("p",null,[a(n,{src:C,alt:"image",class:"cursor-pointer"})]),w])}const O=p(v,[["render",L]]);export{M as __pageData,O as default};
