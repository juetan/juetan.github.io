import{_ as e,E as t,c as p,k as s,J as n,a as l,S as o,o as i}from"./chunks/framework.3EKbrk2Y.js";const c="/assets/image.aVzgCQqn.png",r="/assets/image-2.iL5SBtjP.png",d="/assets/image-1.RliqrnMM.png",g="/assets/image-3.TQ-wJx6t.png",L=JSON.parse('{"title":"使用 Mkcert 和 Nginx 完成局域网 HTTP 到 HTTPS 的切换访问","description":"","frontmatter":{"title":"使用 Mkcert 和 Nginx 完成局域网 HTTP 到 HTTPS 的切换访问","date":"2024-01-09T18:12:00.000Z"},"headers":[],"relativePath":"tools/mkcert-nginx-https/index.md","filePath":"tools/mkcert-nginx-https/index.md"}'),u={name:"tools/mkcert-nginx-https/index.md"},h=s("p",null,"部署在公网上的 WEB 应用，通常都会申请一个域名和其对应的 HTTPS 证书，但 HTTPS 证书通常是为域名颁发的(有IP的但不容易申请)，我们在局域网内使用的是 IP，因此申请一个 HTTPS 证书这条路不太行。但使用自签证书是个不错的选择。",-1),_=s("h2",{id:"mkcert-生成证书",tabindex:"-1"},[l("Mkcert 生成证书 "),s("a",{class:"header-anchor",href:"#mkcert-生成证书","aria-label":'Permalink to "Mkcert 生成证书"'},"​")],-1),S=s("p",null,"使用 OPENSSL 生成 HTTPS 证书比较繁琐，我们可以使用 mkcert 这个开源工具，非常小巧且方便。",-1),b=s("ol",null,[s("li",null,[l("下载 "),s("a",{href:"https://github.com/FiloSottile/mkcert/releases/tag/v1.4.4",target:"_blank",rel:"noreferrer"},"Mkcert"),l(" 工具，下面均称呼为 mkcert.exe。")])],-1),C=o(`<ol start="2"><li>使用以下命令安装根证书到本系统</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>./mkcert.exe -install</span></span></code></pre></div><ol start="3"><li>使用以下命令查看根证书的保存位置，进入该目录，将 rootCA.pem 另存为 rootCA.crt，保存该文件，后面会用到。</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>./mkcert.exe -CAROOT</span></span></code></pre></div><ol start="3"><li>使用以下命令生成域名证书</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>./mkcert.exe -key-file key.pem -cert-file cert.pem 192.168.1.23</span></span></code></pre></div><p>其中：</p><ul><li>-key-file 指定保存证钥的位置，示例中表示保存在同一目录下的 key.pem 文件中, 名字可自取</li><li>-cert-file 指定保存证书的位置，同上。</li><li>192.168.1.23 关联的域名或IP</li></ul><p>保存 key.pem 和 cert.pem 两个文件，后面会用到。</p><h2 id="nginx-安装-ssl-模块" tabindex="-1">Nginx 安装 SSL 模块 <a class="header-anchor" href="#nginx-安装-ssl-模块" aria-label="Permalink to &quot;Nginx 安装 SSL 模块&quot;">​</a></h2><p>不用 Nginx 的可以跳过， 先使用以下命令查看 Nginx 是否启用 SSL 模块:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>./nginx -V</span></span></code></pre></div><p>如果输出中含 --with-http_ssl_module 字样则标识已安装有 SSL 模块，后续步骤可以跳过，安装步骤：</p><ol><li>进入 nginx 源码目录：</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>cd /opt/data/nginx</span></span></code></pre></div><ol start="2"><li>执行以下命令进行配置</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">./configure</span><span style="color:#005CC5;"> --prefix=/opt/data/nginx</span><span style="color:#005CC5;"> --with-http_ssl_module</span><span style="color:#005CC5;"> --with-openssl=/usr/local/openssl</span></span></code></pre></div><p>其中：</p><ul><li>--prefix：指定 nginx 运行位置，配置相关路径会用到</li><li>--with-http_ssl_module 安装 ssl 模块</li><li>--with-openssl=/usr/local/openssl 指定 openssl 的位置，注意是源码位置不是命令所在的位置，该参数可以先不带试试，失败了再指定</li></ul><ol start="3"><li>执行以下命令进行编译：</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>make</span></span></code></pre></div><p>注意：如果提示 <code>./config：没有那个文件或目录</code> 错误，则需要修改 nginx 源码目录的 auto/lib/openssl/conf 文件，如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span># before:</span></span>
<span class="line"><span>CORE_INCS=&quot;$CORE_INCS $OPENSSL/.openssl/include&quot;</span></span>
<span class="line"><span>CORE_DEPS=&quot;$CORE_DEPS $OPENSSL/.openssl/include/openssl/ssl.h&quot;</span></span>
<span class="line"><span>CORE_LIBS=&quot;$CORE_LIBS $OPENSSL/.openssl/lib/libssl.a&quot;</span></span>
<span class="line"><span>CORE_LIBS=&quot;$CORE_LIBS $OPENSSL/.openssl/lib/libcrypto.a&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># after: 均去掉 .openssl 字样</span></span>
<span class="line"><span>CORE_INCS=&quot;$CORE_INCS $OPENSSL/include&quot;</span></span>
<span class="line"><span>CORE_DEPS=&quot;$CORE_DEPS $OPENSSL/include/openssl/ssl.h&quot;</span></span>
<span class="line"><span>CORE_LIBS=&quot;$CORE_LIBS $OPENSSL/lib/libssl.a&quot;</span></span>
<span class="line"><span>CORE_LIBS=&quot;$CORE_LIBS $OPENSSL/lib/libcrypto.a&quot;</span></span></code></pre></div><p>修改完需重新执行第 2 步，再执行 make 命令。</p><ol start="4"><li>备份原有的 nginx ，将 nginx 源码目录下的 objs/nginx 复制到对应地方并重新启动：</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>cp &lt;nginx-src&gt;/objs/nginx &lt;target&gt;</span></span></code></pre></div><h2 id="nginx-添加-ssl-配置" tabindex="-1">Nginx 添加 SSL 配置 <a class="header-anchor" href="#nginx-添加-ssl-配置" aria-label="Permalink to &quot;Nginx 添加 SSL 配置&quot;">​</a></h2><p>安装完 SSL 模块后，下面针对具体服务进行配置：</p><ol><li>将前面保存好的 key.pem 和 cert.pem 上传到服务器，位置可自定义(例如：/usr/data/nginx/ssl)</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span># 示例：使用 ssh 上传</span></span>
<span class="line"><span>scp ./key.pem root@10.10.10.10:/xxx</span></span></code></pre></div><ol start="2"><li>修改 nginx 配置</li></ol><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">server</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6A737D;">  # 标注为 ssl</span></span>
<span class="line"><span style="color:#D73A49;">  listen </span><span style="color:#24292E;">3000 ssl;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">  # 指定证钥和证书的位置</span></span>
<span class="line"><span style="color:#D73A49;">  ssl_certificate </span><span style="color:#24292E;">/usr/data/nginx/ssl/cert.pem;</span></span>
<span class="line"><span style="color:#D73A49;">  ssl_certificate_key </span><span style="color:#24292E;">/usr/data/nginx/ssl/key.pem;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">  # 301 重定向 http 到 https</span></span>
<span class="line"><span style="color:#D73A49;">  error_page </span><span style="color:#24292E;">497 </span><span style="color:#005CC5;">=301</span><span style="color:#24292E;"> https://$host:$server_port$request_uri;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ol start="3"><li>重新启动 nginx</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>./nginx -s reload</span></span></code></pre></div><h2 id="mkcert-安装根证书" tabindex="-1">Mkcert 安装根证书 <a class="header-anchor" href="#mkcert-安装根证书" aria-label="Permalink to &quot;Mkcert 安装根证书&quot;">​</a></h2><p>以上完成后，已经可以访问页面，但通常都会告警使用的是未信任的证书，如下：</p>`,36),m=s("p",null,"这需要将前面保存好的 rootCA.crt 文件复制到客户端电脑，双击打开安装根证书，如下：",-1),x=s("p",null,"清理下浏览器缓存或使用无痕模式打开，再访问页面即可：",-1),y=s("h2",{id:"结语",tabindex:"-1"},[l("结语 "),s("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),k=s("p",null,"以上，适用于局域网内使用或开发用途，真部署在外网还是申请 HTTPS 证书比较安全。此外，Mkcert 在每个操作系统中生成的根证书都是不同的，请不要在别的电脑上随便生成，而是复制源证书的根证书进行安装。",-1);function v(E,P,f,O,T,N){const a=t("Image");return i(),p("div",null,[h,_,S,b,s("p",null,[n(a,{src:c,alt:"image",class:"cursor-pointer"})]),C,s("p",null,[n(a,{src:r,alt:"image",class:"cursor-pointer"})]),m,s("p",null,[n(a,{src:d,alt:"image",class:"cursor-pointer"})]),x,s("p",null,[n(a,{src:g,alt:"image",class:"cursor-pointer"})]),y,k])}const $=e(u,[["render",v]]);export{L as __pageData,$ as default};
