import{_ as p,E as e,c as o,k as s,J as n,S as l,a as t,o as c}from"./chunks/framework.3EKbrk2Y.js";const r="/assets/image-repo-actions.Ep2v-aIk.png",i="/assets/image-repo-secrets.tIOkQZTw.png",v=JSON.parse('{"title":"Docker：使用Gitea Actions自动部署前后端分离的WEB应用","description":"","frontmatter":{"title":"Docker：使用Gitea Actions自动部署前后端分离的WEB应用","date":"2023-09-28T10:15:00.000Z"},"headers":[],"relativePath":"draft/gitea-actions/index.md","filePath":"draft/gitea-actions/index.md"}'),y={name:"draft/gitea-actions/index.md"},d=l(`<p><a href="/tools/devops/">前文</a> 说完如何搭建适用于个人的CICD系统，本文主要说说如何配置前后分离WEB应用的自动部署。接下来，将以 VueJS 作为前端框架，NestJS 作为后端框架，进行前后端的自动部署。</p><h2 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h2><p>在正式实践前，有不少准备工作要做。例如，配置一个部署服务器的账号，方便远程过去执行更新脚本；账号密码等敏感信息不能直接写到配置文件中，而是用密钥配置。接下来，我们先完成这些准备工作。</p><h3 id="创建部署用户" tabindex="-1">创建部署用户 <a class="header-anchor" href="#创建部署用户" aria-label="Permalink to &quot;创建部署用户&quot;">​</a></h3><p>我们需要在部署服务器上，创建一个用于远程更新的用户，登陆到服务器执行以下命令创建一个这样的用户。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6A737D;"># 创建用户</span></span>
<span class="line"><span style="color:#6F42C1;">useradd</span><span style="color:#D73A49;"> &lt;</span><span style="color:#032F62;">usernam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;"> -m</span><span style="color:#005CC5;"> -s</span><span style="color:#032F62;"> /bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建密码</span></span>
<span class="line"><span style="color:#6F42C1;">passwd</span><span style="color:#D73A49;"> &lt;</span><span style="color:#032F62;">usernam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 加入docker用户组</span></span>
<span class="line"><span style="color:#6F42C1;">usermod</span><span style="color:#005CC5;"> -a</span><span style="color:#005CC5;"> -G</span><span style="color:#032F62;"> docker</span><span style="color:#D73A49;"> &lt;</span><span style="color:#032F62;">usernam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 切换到该用户</span></span>
<span class="line"><span style="color:#6F42C1;">su</span><span style="color:#D73A49;"> &lt;</span><span style="color:#032F62;">usernam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 测试是否有docker的执行权限</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#032F62;"> service</span><span style="color:#032F62;"> ls</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 修改ssh的配置</span></span>
<span class="line"><span style="color:#6F42C1;">vim</span><span style="color:#032F62;"> /etc/ssh/sshd_config</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 允许使用密码登录</span></span>
<span class="line"><span style="color:#6F42C1;">PasswordAuthentication</span><span style="color:#032F62;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 重启ssh服务</span></span>
<span class="line"><span style="color:#6F42C1;">service</span><span style="color:#032F62;"> ssh</span><span style="color:#032F62;"> restart</span></span></code></pre></div><h3 id="创建仓库" tabindex="-1">创建仓库 <a class="header-anchor" href="#创建仓库" aria-label="Permalink to &quot;创建仓库&quot;">​</a></h3><p>在 Gitea 上分别创建 web 和 server 两个仓库，由于 Gitea Actions 还是实验特性，我们需要在仓库设置面板勾选 actions 以启用该功能(如下)。</p>`,8),h=s("h3",{id:"创建密钥",tabindex:"-1"},[t("创建密钥 "),s("a",{class:"header-anchor",href:"#创建密钥","aria-label":'Permalink to "创建密钥"'},"​")],-1),u=s("p",null,"我们刚才创建的用户信息，不可以直接写在配置文件里，而是通过 Gitea Actions 的密钥机制进行使用，在仓库的设置面板里创建密钥如下：",-1),E=l(`<h3 id="迁移镜像" tabindex="-1">迁移镜像 <a class="header-anchor" href="#迁移镜像" aria-label="Permalink to &quot;迁移镜像&quot;">​</a></h3><p>国内服务器访问 Github 还是比较慢的，用到的仓库可以做镜像迁移来加速访问，参考如下：</p><table><thead><tr><th>地址</th></tr></thead><tbody><tr><td><a href="https://ghproxy.com/https://github.com/actions/setup-node" target="_blank" rel="noreferrer">https://ghproxy.com/https://github.com/actions/setup-node</a></td></tr><tr><td><a href="https://ghproxy.com/https://github.com/actions/checkout" target="_blank" rel="noreferrer">https://ghproxy.com/https://github.com/actions/checkout</a></td></tr><tr><td><a href="https://ghproxy.com/https://github.com/appleboy/ssh-action" target="_blank" rel="noreferrer">https://ghproxy.com/https://github.com/appleboy/ssh-action</a></td></tr></tbody></table><h2 id="前端项目" tabindex="-1">前端项目 <a class="header-anchor" href="#前端项目" aria-label="Permalink to &quot;前端项目&quot;">​</a></h2><p>以上作为准备工作，接下来需要创建前端项目，并额外添加 2 个配置文件。</p><h3 id="新建项目" tabindex="-1">新建项目 <a class="header-anchor" href="#新建项目" aria-label="Permalink to &quot;新建项目&quot;">​</a></h3><p>以 Vite 提供的模板创建一个 Vue3.x 的项目，步骤按提示来就行，我这里选的是 TS + Vue3 的组合。你也可以选择其他的模板，作为示例没那么多讲究。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">npx</span><span style="color:#032F62;"> create</span><span style="color:#032F62;"> vite@latest</span></span></code></pre></div><h3 id="请求后端" tabindex="-1">请求后端 <a class="header-anchor" href="#请求后端" aria-label="Permalink to &quot;请求后端&quot;">​</a></h3><p>修改 /src/App.vue 文件，写个请求调用下后端的接口，代码如下：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    {{ message }}</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { onMounted, ref } </span><span style="color:#D73A49;">from</span><span style="color:#032F62;"> &#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#005CC5;"> message</span><span style="color:#D73A49;"> =</span><span style="color:#6F42C1;"> ref</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hello, world!&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">onMounted</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">  try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">    const</span><span style="color:#005CC5;"> res</span><span style="color:#D73A49;"> =</span><span style="color:#D73A49;"> await</span><span style="color:#6F42C1;"> fetch</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/api/message&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    message.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> res.</span><span style="color:#6F42C1;">string</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    message.value </span><span style="color:#D73A49;">=</span><span style="color:#032F62;"> &quot;请求失败，后端接口无法访问&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h3 id="部署配置" tabindex="-1">部署配置 <a class="header-anchor" href="#部署配置" aria-label="Permalink to &quot;部署配置&quot;">​</a></h3><p>新建 /.gitea/workflows/deploy.yaml 文件，看起来是不是跟 Github Actions 的配置差不多，实际上两个确实差不多，一个不开源另一个是开源实现。在文件中，添加配置如下：</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">自动部署</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">on</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  push</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    branches</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">master</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">env</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#6A737D;">  # docker 镜像仓库地址，例如： git.dev.juetan.cn</span></span>
<span class="line"><span style="color:#22863A;">  docker_host</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${{ secrets.DOCKER_HOST }}</span></span>
<span class="line"><span style="color:#6A737D;">  # docker 镜像仓库用户名</span></span>
<span class="line"><span style="color:#22863A;">  docker_user</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${{ secrets.DOCKER_USER }}</span></span>
<span class="line"><span style="color:#6A737D;">  # docker 镜像仓库密码</span></span>
<span class="line"><span style="color:#22863A;">  docker_pass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${{ secrets.DOCKER_PASS }}</span></span>
<span class="line"><span style="color:#6A737D;">  # docker 镜像仓库名称，例如： git.dev.juetan.cn/xxx/xxx</span></span>
<span class="line"><span style="color:#22863A;">  docker_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${{ secrets.DOCKER_HOST }}/\${{ gitea.repository }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">  # 部署服务器IP或域名, 例如: 1.1.1.1</span></span>
<span class="line"><span style="color:#22863A;">  deploy_host</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${{ secrets.DEPLOY_HOST }}</span></span>
<span class="line"><span style="color:#6A737D;">  # 部署服务器端口, 例如: 22</span></span>
<span class="line"><span style="color:#22863A;">  deploy_port</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${{ secrets.DEPLOY_PORT }}</span></span>
<span class="line"><span style="color:#6A737D;">  # 部署服务器用户名, 例如: root</span></span>
<span class="line"><span style="color:#22863A;">  deploy_user</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${{ secrets.DEPLOY_USER }}</span></span>
<span class="line"><span style="color:#6A737D;">  # 部署服务器密码, 例如: 123456</span></span>
<span class="line"><span style="color:#22863A;">  deploy_pass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${{ secrets.DEPLOY_PASS }}</span></span>
<span class="line"><span style="color:#6A737D;">  # 要更新的 docker 服务名称, 例如: demo_web</span></span>
<span class="line"><span style="color:#22863A;">  deploy_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${{ secrets.DEPLOY_NAME }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">jobs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  build</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    runs-on</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ubuntu-latest</span></span>
<span class="line"><span style="color:#22863A;">    container</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">catthehacker/ubuntu:act-latest</span></span>
<span class="line"><span style="color:#22863A;">    steps</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">检出代码</span></span>
<span class="line"><span style="color:#22863A;">        id</span><span style="color:#24292E;">: </span><span style="color:#032F62;">checkout</span></span>
<span class="line"><span style="color:#22863A;">        uses</span><span style="color:#24292E;">: </span><span style="color:#032F62;">https://gitea.com/actions/checkout@v3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">设置环境</span></span>
<span class="line"><span style="color:#22863A;">        uses</span><span style="color:#24292E;">: </span><span style="color:#032F62;">https://gitea.com/actions/setup-node@v2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">安装依赖</span></span>
<span class="line"><span style="color:#22863A;">        run</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">          npm install --registry https://registry.npmmirror.com/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">构建产物</span></span>
<span class="line"><span style="color:#22863A;">        run</span><span style="color:#24292E;">: </span><span style="color:#032F62;">npm run build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">打印目录</span></span>
<span class="line"><span style="color:#22863A;">        run</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ls ./dist</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">构建镜像</span></span>
<span class="line"><span style="color:#22863A;">        run</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">          docker build -t \${{ env.docker_name }}:latest .</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">登陆镜像</span></span>
<span class="line"><span style="color:#22863A;">        run</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">          docker login -u &quot;\${{ env.docker_user }}&quot; -p &quot;\${{ env.docker_pass }}&quot; \${{ env.docker_host }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">推送镜像</span></span>
<span class="line"><span style="color:#22863A;">        shell</span><span style="color:#24292E;">: </span><span style="color:#032F62;">bash</span></span>
<span class="line"><span style="color:#22863A;">        run</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">          docker push \${{ env.docker_name }}:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">标记镜像</span></span>
<span class="line"><span style="color:#22863A;">        if</span><span style="color:#24292E;">: </span><span style="color:#032F62;">gitea.ref_type == &#39;tag&#39;</span></span>
<span class="line"><span style="color:#22863A;">        run</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">          echo &quot;当前推送版本：\${{ gitea.ref_name }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">          docker tag \${{ env.docker_name }}:latest \${{ env.docker_name }}:\${{ gitea.ref_name }}</span></span>
<span class="line"><span style="color:#032F62;">          docker push \${{ env.docker_name }}:\${{ gitea.ref_name }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">更新服务</span></span>
<span class="line"><span style="color:#22863A;">        uses</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http://git.dev.juetan.cn/mirror/ssh-action@v1.0.0</span></span>
<span class="line"><span style="color:#22863A;">        with</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">          host</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${{ env.deploy_host }}</span></span>
<span class="line"><span style="color:#22863A;">          port</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${{ env.deploy_port }}</span></span>
<span class="line"><span style="color:#22863A;">          username</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${{ env.deploy_user }}</span></span>
<span class="line"><span style="color:#22863A;">          password</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${{ env.deploy_pass }}</span></span>
<span class="line"><span style="color:#22863A;">          script</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">            docker service ls | grep -q \${{ env.deploy_name }} || exit 0</span></span>
<span class="line"><span style="color:#032F62;">            docker service update --image \${{ env.docker_name }}:latest \${{ env.deploy_name }}</span></span></code></pre></div><p>相关语法可以查阅 Github Actions 的官方文件，这里简单解释下以上步骤：</p><ul><li>只在推送到 master 分支时进行构建</li><li>构建时使用 ubuntu 起一个容器进行构建</li><li>构建完推送到 gitea 的成品库中</li><li>远程到部署环境执行更新脚本</li></ul><h3 id="构建配置" tabindex="-1">构建配置 <a class="header-anchor" href="#构建配置" aria-label="Permalink to &quot;构建配置&quot;">​</a></h3><p>上面有一个 docker build 的步骤，需要用到 Dockerfile 配置进行构建。在项目根目录下新建 Dockerfile 文件，添加内容如下。</p><div class="language-dockerfile"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> nginx:alpine</span></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> ./dist /usr/share/nginx/html</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">EXPOSE</span><span style="color:#24292E;"> 80</span></span>
<span class="line"><span style="color:#D73A49;">CMD</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;nginx&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;-g&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;daemon off;&quot;</span><span style="color:#24292E;">]</span></span></code></pre></div><h3 id="推送代码" tabindex="-1">推送代码 <a class="header-anchor" href="#推送代码" aria-label="Permalink to &quot;推送代码&quot;">​</a></h3><p>本地添加远程仓库地址，推送后应该可以在仓库面板看到部署信息</p><h3 id="启动容器" tabindex="-1">启动容器 <a class="header-anchor" href="#启动容器" aria-label="Permalink to &quot;启动容器&quot;">​</a></h3><h2 id="后端配置" tabindex="-1">后端配置 <a class="header-anchor" href="#后端配置" aria-label="Permalink to &quot;后端配置&quot;">​</a></h2><h3 id="创建项目" tabindex="-1">创建项目 <a class="header-anchor" href="#创建项目" aria-label="Permalink to &quot;创建项目&quot;">​</a></h3><h3 id="添加接口" tabindex="-1">添加接口 <a class="header-anchor" href="#添加接口" aria-label="Permalink to &quot;添加接口&quot;">​</a></h3><h3 id="部署配置-1" tabindex="-1">部署配置 <a class="header-anchor" href="#部署配置-1" aria-label="Permalink to &quot;部署配置&quot;">​</a></h3><h3 id="构建配置-1" tabindex="-1">构建配置 <a class="header-anchor" href="#构建配置-1" aria-label="Permalink to &quot;构建配置&quot;">​</a></h3><h2 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h2>`,28);function A(m,g,_,b,F,k){const a=e("Image");return c(),o("div",null,[d,s("p",null,[n(a,{src:r,alt:"image",class:"cursor-pointer"})]),h,u,s("p",null,[n(a,{src:i,alt:"image",class:"cursor-pointer"})]),E])}const f=p(y,[["render",A]]);export{v as __pageData,f as default};
