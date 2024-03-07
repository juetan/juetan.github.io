import{_ as s,c as a,o as e,S as l}from"./chunks/framework.3EKbrk2Y.js";const b=JSON.parse('{"title":"使用SSH连接远程服务器，结合密钥和配置文件实现一键登陆","description":"","frontmatter":{"title":"使用SSH连接远程服务器，结合密钥和配置文件实现一键登陆","date":"2023-09-25T10:34:00.000Z"},"headers":[],"relativePath":"tools/ssh-remote/index.md","filePath":"tools/ssh-remote/index.md"}'),n={name:"tools/ssh-remote/index.md"},o=l(`<p>如果你有一台云服务器，日常需要远程进去执行命令，那么 SSH 是非常理想的工具。服务器通常都会安装有 Sshd 服务，你可以使用 Ssh 客户端进行登陆。登陆方式通常由以下两种：</p><ul><li>使用账号密码登陆</li></ul><p>使用账号/密码的好处是，随时随地不受限制，例如在家里登陆，在公司登陆，在外面的网吧登陆。但缺点是容易遭到暴力破解，而一旦遭到侵入后果不堪设想。</p><ul><li>使用密钥进行登陆</li></ul><p>使用密钥的好处是，安全且不用担心暴力侵入(除非你的密钥暴露)，但缺点是你只能使用特定电脑登陆，不能随时随地登陆。</p><h2 id="使用账号密码登陆" tabindex="-1">使用账号密码登陆 <a class="header-anchor" href="#使用账号密码登陆" aria-label="Permalink to &quot;使用账号密码登陆&quot;">​</a></h2><p>部分服务器，默认是不允许使用账号密码进行登陆的，那么在使用前需要修改 Sshd 的配置文件来允许使用账号密码登陆，步骤如下：</p><h3 id="修改配置" tabindex="-1">修改配置 <a class="header-anchor" href="#修改配置" aria-label="Permalink to &quot;修改配置&quot;">​</a></h3><p>执行 vim /etc/ssh/sshd_config 命令，找到 PasswordAuthentication 配置并设置为 yes，如下：</p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#24292E;">PasswordAuthentication yes</span></span></code></pre></div><h3 id="重启服务" tabindex="-1">重启服务 <a class="header-anchor" href="#重启服务" aria-label="Permalink to &quot;重启服务&quot;">​</a></h3><p>修改完配置要重启才能生效，在不同系统上命令可能不同，对于使用 sysvinit 的系统，执行以下命令</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">service</span><span style="color:#032F62;"> ssh</span><span style="color:#032F62;"> restart</span></span></code></pre></div><p>对于使用 systemde 的系统则使用，则使用以下命令。提示：如果不确定是哪个，你也可以两个都试试。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#032F62;"> restart</span><span style="color:#032F62;"> sshd</span></span></code></pre></div><h3 id="添加用户" tabindex="-1">添加用户 <a class="header-anchor" href="#添加用户" aria-label="Permalink to &quot;添加用户&quot;">​</a></h3><p>使用以下命令，创建一个用户并设置其密码，其中 -a 表示 append(追加)，-G 表示 group(用户组)，连起来就是给新用户 SUDO 的权限。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">useradd</span><span style="color:#005CC5;"> -a</span><span style="color:#005CC5;"> -G</span><span style="color:#032F62;"> root</span><span style="color:#032F62;"> demo</span></span>
<span class="line"><span style="color:#6F42C1;">passwd</span><span style="color:#032F62;"> demo</span></span></code></pre></div><h3 id="本地连接" tabindex="-1">本地连接 <a class="header-anchor" href="#本地连接" aria-label="Permalink to &quot;本地连接&quot;">​</a></h3><p>在本地打开 CMD，执行以下命令应该能访问上服务器，其中账号和 IP 使用 @ 分隔，回车后会让你输入密码，默认端口是 22。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">ssh</span><span style="color:#032F62;"> demo@</span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">i</span><span style="color:#24292E;">p</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><h3 id="添加别名" tabindex="-1">添加别名 <a class="header-anchor" href="#添加别名" aria-label="Permalink to &quot;添加别名&quot;">​</a></h3><p>本步骤可选，修改本地 ~/.ssh/config 文件(如下)，给我们的服务器定义别名配置，后面就不用每次都输入账号/IP。在 Windows 平台下，路径为 C:\\Users\\user\\.ssh\\config 。</p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#24292E;">Host server</span></span>
<span class="line"><span style="color:#24292E;">  HostName 119.91.22.143</span></span>
<span class="line"><span style="color:#24292E;">  Port 22</span></span>
<span class="line"><span style="color:#24292E;">  User demo</span></span></code></pre></div><p>以上，其中：</p><ul><li>Host 定义服务器的别名</li><li>HostName 定义主机名，可以是服务器的 IP 或域名</li><li>Port 定义服务器的端口，默认是 22</li><li>User 定义要登陆的账号，注意这里不能定义密码，每次登陆还是要手动输入密码的。</li></ul><h3 id="再次登陆" tabindex="-1">再次登陆 <a class="header-anchor" href="#再次登陆" aria-label="Permalink to &quot;再次登陆&quot;">​</a></h3><p>这次就可以使用以下命令进行登陆，看起来是不是很像域名和 IP 的关系，这样就不用记住具体的服务器 IP 了。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">ssh</span><span style="color:#032F62;"> server</span></span></code></pre></div><h2 id="使用密钥进行登陆" tabindex="-1">使用密钥进行登陆 <a class="header-anchor" href="#使用密钥进行登陆" aria-label="Permalink to &quot;使用密钥进行登陆&quot;">​</a></h2><p>使用密钥的好处是安全，对于生产环境来说是至关重要的，毕竟你也不想第二天醒来发现，数据被人加密，服务器被用来挖矿吧。</p><h3 id="创建密钥" tabindex="-1">创建密钥 <a class="header-anchor" href="#创建密钥" aria-label="Permalink to &quot;创建密钥&quot;">​</a></h3><p>在本地执行以下命令，会在 ~/.ssh 目录下生成 id_rsa 和 id_rsa_pub 文件。其中 id_rsa 是密钥文件，id_rsa_pub 是公钥文件。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">ssh-keygen</span><span style="color:#005CC5;"> -t</span><span style="color:#032F62;"> rsa</span></span></code></pre></div><h3 id="添加公钥" tabindex="-1">添加公钥 <a class="header-anchor" href="#添加公钥" aria-label="Permalink to &quot;添加公钥&quot;">​</a></h3><p>将公钥内容复制到服务器的 ~/.ssh/authorized_keys 文件末尾，方式很多种，这里介绍下 Windows 下没有 ssh-copy-id 命令是如何进行复制的，命令如下：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#005CC5;">type</span><span style="color:#24292E;"> $env</span><span style="color:#032F62;">:USERPROFILE</span><span style="color:#005CC5;">\\.</span><span style="color:#032F62;">ssh</span><span style="color:#005CC5;">\\i</span><span style="color:#032F62;">d_rsa.pub</span><span style="color:#D73A49;"> |</span><span style="color:#6F42C1;"> ssh</span><span style="color:#032F62;"> user@hostname</span><span style="color:#032F62;"> &quot;cat &gt;&gt; ~/.ssh/authorized_keys&quot;</span></span></code></pre></div><h3 id="进行登陆" tabindex="-1">进行登陆 <a class="header-anchor" href="#进行登陆" aria-label="Permalink to &quot;进行登陆&quot;">​</a></h3><p>前面两步已配置好客户端和服务端，接下来就可以使用以下命令进行登陆。注意：我们不用输入密码就可以直接登陆。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">ssh</span><span style="color:#032F62;"> demo@</span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">i</span><span style="color:#24292E;">p</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><h3 id="配置别名" tabindex="-1">配置别名 <a class="header-anchor" href="#配置别名" aria-label="Permalink to &quot;配置别名&quot;">​</a></h3><p>跟账号登陆方式一样，我们也可以修改 ~/.ssh/config 进行别名配置(如下)。其中，IdentityFile 指定我们登陆时使用的密钥文件位置。</p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#24292E;">Host server1</span></span>
<span class="line"><span style="color:#24292E;"> HostName &lt;ip&gt;</span></span>
<span class="line"><span style="color:#24292E;"> User &lt;user&gt;</span></span>
<span class="line"><span style="color:#24292E;"> IdentityFile ~/.ssh/id_rsa</span></span></code></pre></div><h3 id="再次登陆-1" tabindex="-1">再次登陆 <a class="header-anchor" href="#再次登陆-1" aria-label="Permalink to &quot;再次登陆&quot;">​</a></h3><p>使用以下命令登陆，比账号登陆更舒服的是我们这次密码也不用输入，真正意义上实现一键登陆。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">ssh</span><span style="color:#032F62;"> server1</span></span></code></pre></div><h2 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h2><p>以上，介绍两种使用 SSH 登陆服务器的方式：账号密码和密钥登陆。此外，如果有编辑文件或敲代码的需求，可以配合 VS Code 的 SSH 插件进行使用，体验上非常友好且接近于本地使用。</p>`,48),t=[o];function p(i,c,r,d,h,u){return e(),a("div",null,t)}const g=s(n,[["render",p]]);export{b as __pageData,g as default};
