import{_ as p,E as r,o,c,k as s,J as e,S as l,a as n}from"./chunks/framework.doOmauVw.js";const t="/assets/image-docker.kwmAKBKE.png",i="/assets/image-portainer.dee7n9MV.png",b="/assets/image-traefik.n90vlroQ.png",u="/assets/image-gitea.gl-M3ZsJ.png",y="/assets/image-docker-ubuntu.UPKE0eja.png",d="/assets/image-dns.rxeGQPSi.png",m="/assets/image-swarm-init._IQG8wgp.png",h="/assets/image-network-public.GgA8GVaH.png",_="/assets/image-volume-portainer.h8_C91hZ.png",E="/assets/image-stack-portainer.iGJh4i0B.png",k="/assets/image-portainer-page.dglA_BRc.png",A="/assets/image-gitea-runner.mjeQO1XA.png",g="/assets/image-stack-core.UGbjKb6E.png",v="/assets/image-core-status.xEe6OajE.png",f="/assets/image-portainer-exec.0I5-Ssdn.png",F="/assets/image-actions-token.W7vrtQgF.png",T="/assets/image-runner-joined.kpAoI42H.png",C="/assets/image-router-https.uciSfqBQ.png",vs=JSON.parse('{"title":"基于 Docker + Portainer + Traefik + Gitea 搭建适用于个人的CI/CD持续构建系统","description":"","frontmatter":{"title":"基于 Docker + Portainer + Traefik + Gitea 搭建适用于个人的CI/CD持续构建系统","date":"2023-09-22T10:03:00.000Z"},"headers":[],"relativePath":"tools/devops/index.md","filePath":"tools/devops/index.md"}'),P={name:"tools/devops/index.md"},x=l('<p>之前写过一篇搭建CI/CD系统的文章，技术栈与标题所述差不多，但最近查看 Gitea 文档时发现更新一个名为 Gitea Actions 的功能，略作了解后发现与 Github Actions 是类似的东西，且可以直接使用复用 Github Actions 的配置，于是兴趣满满地实践了一番并有了这篇文章。</p><p>先说下为什么是这套技术栈，可能很多人会想到用 Gitlab/Jenkins 之类的工具来实现，对于企业级管理来说没问题，但上手配置却是不低。以 Gitlab 为例，动辄 4G 的起步运行内存，加上 CI/CD 等额外的运行内存，足以劝退很多人。</p><p>选择 Gitea 是因为运行内存很低(Go 语言写的)，标题中所有工具+CI/CD任务运行在一个 2 核 4 G的腾讯云服务器完全没问题，对于个人实践来说是非常具有性价比的，且可以接触到 Github Actions 的相关内容，并反过来在 Github Actions 上实践和应用。</p><h2 id="目标" tabindex="-1">目标 <a class="header-anchor" href="#目标" aria-label="Permalink to &quot;目标&quot;">​</a></h2><p>一句话概括就是：提交代码自动部署。以前端为例，本地运行 git push 命令后，几分钟后可以访问到最新页面，免去手动构建/部署等繁琐的工作。主要流程如下：</p><ul><li>本地提交代码到 Gitea 仓库后，Gitea 自动调度 Runner 执行任务。</li><li>Runner(运行器)拉取代码，设置环境(例如NodeJS环境)，安装依赖，构建产物</li><li>Runner(运行器)以产物构建docker镜像，推送到私有仓库，并远程到部署服务器执行更新脚本</li></ul><h2 id="技术栈" tabindex="-1">技术栈 <a class="header-anchor" href="#技术栈" aria-label="Permalink to &quot;技术栈&quot;">​</a></h2><p>以容器形式部署，可视化管理。主要包含以下技术栈：</p><h3 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-label="Permalink to &quot;Docker&quot;">​</a></h3><p>一个开源的容器平台，可以将程序及依赖打包到一个轻量级、可移植的容器中运行。内置有 Swarm 集群模式，可以理解为 K8S 的简单版(官方实现)，可以同时管理和调度多台服务器上的资源。</p>',10),G=s("h3",{id:"portainer",tabindex:"-1"},[n("Portainer "),s("a",{class:"header-anchor",href:"#portainer","aria-label":'Permalink to "Portainer"'},"​")],-1),S=s("p",null,"一个可视化的docker容器管理工具，手动管理 docker 是非常麻烦的，通过 portainer 可以很方便地管理容器/镜像/网络/数据卷等内容，且支持 docker swarm 模式。",-1),w=s("h3",{id:"traefik",tabindex:"-1"},[n("Traefik "),s("a",{class:"header-anchor",href:"#traefik","aria-label":'Permalink to "Traefik"'},"​")],-1),I=s("p",null,"一个类似于 nginx 但更适用于容器的反向代理工具，支持域名和证书的动态配置，同时支持 docker swarm 模式。",-1),D=s("h3",{id:"gitea",tabindex:"-1"},[n("Gitea "),s("a",{class:"header-anchor",href:"#gitea","aria-label":'Permalink to "Gitea"'},"​")],-1),N=s("p",null,"一个git 管理平台，有两个很关键地功能：Gitea Actions 可以让我们运行等价于 Github Actions地自动化任务，例如构建产物/构建镜像等；软件包可以让我们管理上传内容，例如npm包，docker镜像等。",-1),q=s("h2",{id:"准备工作",tabindex:"-1"},[n("准备工作 "),s("a",{class:"header-anchor",href:"#准备工作","aria-label":'Permalink to "准备工作"'},"​")],-1),R=s("p",null,"简单概括为：你需要一台服务器和一个域名。尽管可以在本地实现，但建议在云服务器上实践，主要是因为云服务有独立IP，可以配置域名区分访问和管理。",-1),V=s("h3",{id:"云服务器",tabindex:"-1"},[n("云服务器 "),s("a",{class:"header-anchor",href:"#云服务器","aria-label":'Permalink to "云服务器"'},"​")],-1),j=s("p",null,"推荐 2核4G 配置，理论上 1核2G 也能勉强跑得动。以我个人为例，我这里选择的是腾讯云、带容器镜像的 ubuntu 系统，后续将不再描述 docker 的描述。",-1),B=s("h3",{id:"域名解析",tabindex:"-1"},[n("域名解析 "),s("a",{class:"header-anchor",href:"#域名解析","aria-label":'Permalink to "域名解析"'},"​")],-1),H=s("p",null,"登陆你的域名管理平台，解析名为 *.dev 的 A 记录到你的云服务器IP上，以我个人为例如下。注意：如果域名解析的是国内服务器那么域名是要备案的，备案内容自行查阅这里不再描述。",-1),K=s("h2",{id:"安装portainer",tabindex:"-1"},[n("安装Portainer "),s("a",{class:"header-anchor",href:"#安装portainer","aria-label":'Permalink to "安装Portainer"'},"​")],-1),Q=s("p",null,"登陆你的服务器，可以使用云服务商提供的 web 面板登陆，或者配置SSH以及使用 VS Code 插件进行远程等，总而言之方法比较多此处不做过多描述具体查看相关文档。",-1),J=s("h3",{id:"启用集群模式",tabindex:"-1"},[n("启用集群模式 "),s("a",{class:"header-anchor",href:"#启用集群模式","aria-label":'Permalink to "启用集群模式"'},"​")],-1),O=s("p",null,"执行 docker swarm init 命令启用 swarm 模式，会输出加入令牌和加入命令，只有单台服务器的话可以忽略这些输出。",-1),U=s("h3",{id:"创建公共网络",tabindex:"-1"},[n("创建公共网络 "),s("a",{class:"header-anchor",href:"#创建公共网络","aria-label":'Permalink to "创建公共网络"'},"​")],-1),L=s("p",null,"执行 docker network create -d overlay public 命令创建一个名为 public 的公共网络，其中 overlay 类型可以让我们与其他服务器的容器在一个内部网络内通信。",-1),Z=s("h3",{id:"创建数据卷",tabindex:"-1"},[n("创建数据卷 "),s("a",{class:"header-anchor",href:"#创建数据卷","aria-label":'Permalink to "创建数据卷"'},"​")],-1),$=s("p",null,"执行 docker volume create portainer 命令创建一个名为 portainer 的数据卷，保存你在运行 portainer 时产生的数据，避免容器重启后数据丢失的问题。",-1),M=l(`<h3 id="编写配置文件" tabindex="-1">编写配置文件 <a class="header-anchor" href="#编写配置文件" aria-label="Permalink to &quot;编写配置文件&quot;">​</a></h3><p>新建 /docker/portainer.yaml 文件，编写 portainer 配置并保存。说明：包含一个主服务和若干个子服务，其中子服务会在每台服务器上都安装，并通过主服务管理。</p><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;3.2&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  agent</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">portainer/agent:2.19.0</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/var/run/docker.sock:/var/run/docker.sock</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/var/lib/docker/volumes:/var/lib/docker/volumes</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">public</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      mode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">global</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">node.platform.os == linux</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">  core</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">portainer/portainer-ce:2.19.0</span></span>
<span class="line"><span style="color:#22863A;">    command</span><span style="color:#24292E;">: </span><span style="color:#032F62;">-H tcp://tasks.agent:9001 --tlsskipverify</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">portainer:/data</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">public</span></span>
<span class="line"><span style="color:#22863A;">    ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">9000:9000</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      mode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">replicated</span></span>
<span class="line"><span style="color:#22863A;">      replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">node.role == manager</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#22863A;">      labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.enable=true</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.server.entrypoints=web</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.server.rule=Host(\`docker.dev.juetan.cn\`)</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.services.server1.loadbalancer.server.port=9000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  public</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  portainer</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><h3 id="启动服务" tabindex="-1">启动服务 <a class="header-anchor" href="#启动服务" aria-label="Permalink to &quot;启动服务&quot;">​</a></h3><p>执行 docker stack deploy -c /docker/portainer.yaml portainer 命令启动服务，其中使用 -c 指定配置文件的位置，最后的 portainer 为名字。</p>`,5),W=s("h3",{id:"访问页面",tabindex:"-1"},[n("访问页面 "),s("a",{class:"header-anchor",href:"#访问页面","aria-label":'Permalink to "访问页面"'},"​")],-1),z=s("p",null,[n("在浏览器输入 "),s("a",{href:"http://ip:9000",target:"_blank",rel:"noreferrer"},"http://ip:9000"),n(" 并回车，页面中是以下安装页面即代表安装成功。注意：尽快安装完，否则2分钟后 Portainer 会出于安全考虑禁止安装，那时便要重启才能再操作。")],-1),X=s("h2",{id:"安装traefik和gitea",tabindex:"-1"},[n("安装Traefik和Gitea "),s("a",{class:"header-anchor",href:"#安装traefik和gitea","aria-label":'Permalink to "安装Traefik和Gitea"'},"​")],-1),Y=s("p",null,"安装完 Portainer 后，我们就可以在管理面板中进行操作而不用不停地敲命令执行。现在，登陆你的 Portainer 面板，接下来的操作都将在这里进行，你甚至不用登陆服务器敲命令。",-1),ss=s("h3",{id:"创建数据卷-1",tabindex:"-1"},[n("创建数据卷 "),s("a",{class:"header-anchor",href:"#创建数据卷-1","aria-label":'Permalink to "创建数据卷"'},"​")],-1),ns=s("p",null,"进入 Volumes 面板，分别创建 gitea 和 gitea_runner 数据卷，用于保存 gitea 和 gitea runner 在运行时产生的数据，创建时其他配置保持默认即可。",-1),as=s("h3",{id:"添加配置",tabindex:"-1"},[n("添加配置 "),s("a",{class:"header-anchor",href:"#添加配置","aria-label":'Permalink to "添加配置"'},"​")],-1),es=s("p",null,"进入 Stacks 面板，新建名为 core 的 Stack 并编写如下配置(具体请根据自身情况修改)，配置包含 3 个部分：Traefik + Gitea + Gitea Runner。",-1),ls=l(`<p>配置如下，注意注释的内容，我们尚未登陆 Gitea 没有注册令牌所以暂时留空。</p><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;3&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  traefik</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">traefik:latest</span></span>
<span class="line"><span style="color:#22863A;">    command</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--api</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--api.debug</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--api.dashboard</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--providers.docker</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--providers.docker.swarmmode</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--providers.docker.exposedbydefault=false</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--providers.docker.network=public</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--entrypoints.web.address=:80</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">public</span></span>
<span class="line"><span style="color:#22863A;">    ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">80:80</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">443:443</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/var/run/docker.sock:/var/run/docker.sock</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      mode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">replicated</span></span>
<span class="line"><span style="color:#22863A;">      replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">node.role == manager</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#22863A;">      labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.enable=true</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.dashboard.rule=Host(\`router.dev.juetan.cn\`)</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.dashboard.entrypoints=web</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.dashboard.service=api@internal</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.services.api@internal.loadbalancer.server.port=8080</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">  gitea</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">gitea/gitea:1.20.4</span></span>
<span class="line"><span style="color:#22863A;">    restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">always</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">public</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">gitea:/data</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      mode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">replicated</span></span>
<span class="line"><span style="color:#22863A;">      replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">node.role == manager</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#22863A;">      labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.enable=true</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.gitea.rule=Host(\`git.dev.juetan.cn\`)</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.routers.gitea.entrypoints=web</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">traefik.http.services.gitea1.loadbalancer.server.port=3000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">  runner</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">gitea/act_runner:nightly</span></span>
<span class="line"><span style="color:#22863A;">    restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">always</span></span>
<span class="line"><span style="color:#22863A;">    depends_on</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">gitea</span></span>
<span class="line"><span style="color:#6A737D;">    # environment:</span></span>
<span class="line"><span style="color:#6A737D;">    #   - GITEA_INSTANCE_URL=http://git.dev.juetan.cn/</span></span>
<span class="line"><span style="color:#6A737D;">    #   - GITEA_RUNNER_REGISTRATION_TOKEN=MjSd8azK2819F8Wb4sNmZYp3FhuDBXUeVYkQb1Jy</span></span>
<span class="line"><span style="color:#22863A;">    networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">public</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">gitea_runner:/data</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/var/run/docker.sock:/var/run//docker.sock</span></span>
<span class="line"><span style="color:#22863A;">    deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">      mode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">replicated</span></span>
<span class="line"><span style="color:#22863A;">      replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#22863A;">      placement</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">        constraints</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">node.role == manager</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  gitea</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#22863A;">  gitea_runner</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  public</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br></div></div><h3 id="部署服务" tabindex="-1">部署服务 <a class="header-anchor" href="#部署服务" aria-label="Permalink to &quot;部署服务&quot;">​</a></h3><p>点击底部的 Deploy the action 按钮，稍等片刻便可以从列表中点进去查看运行状态。如果出现异常，可点击查看具体运行日志，或返回去检查下语法或配置有没有问题。</p>`,4),ps=s("h2",{id:"配置gitea-actions",tabindex:"-1"},[n("配置Gitea Actions "),s("a",{class:"header-anchor",href:"#配置gitea-actions","aria-label":'Permalink to "配置Gitea Actions"'},"​")],-1),rs=s("p",null,"目前 Gitea Actions 还在开发中，默认情况下 Actions 是禁用的，使用上还是需要手动开启。官方文档上介绍有点杂，接下来以我们目前的状态快速配置以下。",-1),os=s("h3",{id:"进入容器",tabindex:"-1"},[n("进入容器 "),s("a",{class:"header-anchor",href:"#进入容器","aria-label":'Permalink to "进入容器"'},"​")],-1),cs=s("p",null,"在 Portainer 面板中，提供有进入容器中执行命令的功能，对于日常操作非常方便。当然，对于复杂的修改还是通过直接操作数据卷更方便。在 Portainer 中进入容器步骤如下：",-1),ts=l(`<h3 id="添加配置-1" tabindex="-1">添加配置 <a class="header-anchor" href="#添加配置-1" aria-label="Permalink to &quot;添加配置&quot;">​</a></h3><p>修改 /data/gitea/conf/app.ini 文件，在文件末尾添加以下配置以启用 Actions 功能。保存并退出后，此时功能尚未生效，还需要到 Services 面板进行重启。</p><div class="language-ini line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">[actions]</span></span>
<span class="line"><span style="color:#D73A49;">ENABLED</span><span style="color:#24292E;">=true</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="复制令牌" tabindex="-1">复制令牌 <a class="header-anchor" href="#复制令牌" aria-label="Permalink to &quot;复制令牌&quot;">​</a></h3><p>重启后，应该能在管理后台界面多出名为 actions 的选项卡，进入点击创建Runner按钮即可看到加入令牌(如下)。</p>`,5),is=l(`<h3 id="更新配置" tabindex="-1">更新配置 <a class="header-anchor" href="#更新配置" aria-label="Permalink to &quot;更新配置&quot;">​</a></h3><p>返回 Portainer 的 Stacks 管理页面，修改我们刚才创建的配置，还记得我们方才提到的注释吗？此时，修改为我们上一步得到的令牌，保存后重启，代码如下：</p><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  runner</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#6A737D;">    # ...</span></span>
<span class="line"><span style="color:#22863A;">    environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">GITEA_INSTANCE_URL=http://git.dev.juetan.cn/</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">GITEA_RUNNER_REGISTRATION_TOKEN=7B3NLAz4aEDwIZDQx8dNEnLxToA8Fq81WSCjmSdI</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>更新 stack 后，你应该能在管理后台的 actions 面板看到新加入的 Runner，如下：</p>`,4),bs=l(`<p>至此，我们的CI/CD环境已部署完成，其中 Portainer 用于管理 Docker 镜像和容器，Traefik 用于配置域名和代理，Gitea 用于管理 Git 代码，Gitea Actions 用来运行构建任务。</p><h2 id="补充-https证书" tabindex="-1">补充：HTTPS证书 <a class="header-anchor" href="#补充-https证书" aria-label="Permalink to &quot;补充：HTTPS证书&quot;">​</a></h2><p>Traefik 内置有证书集成的功能，对于日常我们可以使用 Traefik 自动签发 let&#39;s encrypt 的证书进行使用，需注意目前 let&#39;s encrypt 限制每周只能对一个主域名签发 50 个整数，对于日常使用是完全足够的。要进行使用需配置静态参数和动态参数。</p><ol><li>使用命令行或Portainer创建数据卷，用于存放证书等文件，避免容器重启后数据丢失导致重新请求证书。</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#032F62;"> volume</span><span style="color:#032F62;"> create</span><span style="color:#032F62;"> traefik</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="2"><li>修改之前 traefik 的 stack 配置，添加如下配置后重新部署。</li></ol><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  traefik</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    command</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#6A737D;">      # - --entrypoints.web.http.redirections.entrypoint.to=websecure</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--entrypoints.websecure.address=:443</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--certificatesresolvers.myresolver.acme.httpchallenge=true</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--certificatesresolvers.myresolver.acme.httpchallenge.entrypoint=web</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--certificatesresolvers.myresolver.acme.email=contact@juetan.cn</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">--certificatesresolvers.myresolver.acme.storage=/data/acme.json</span></span>
<span class="line"><span style="color:#22863A;">    volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">traefik:/data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">  traefik</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">    external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><ol start="3"><li>在需要使用 HTTPS 的服务上，添加以下额外的配置</li></ol><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#24292E;">- </span><span style="color:#032F62;">traefik.http.routers.dashboard.entrypoints=websecure</span></span>
<span class="line"><span style="color:#24292E;">- </span><span style="color:#032F62;">traefik.http.routers.dashboard.tls=true</span></span>
<span class="line"><span style="color:#24292E;">- </span><span style="color:#032F62;">traefik.http.routers.dashboard.tls.certresolver=myresolver</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="4"><li>贴一个访问后的效果(如下)，注意：证书只有90天有效期(从图中10月9日到1月7日可以看出)，到期前10天 Traefik 会自动续签。</li></ol>`,10),us=s("h2",{id:"结语",tabindex:"-1"},[n("结语 "),s("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),ys=s("p",null,"以上，相比于原有实践，本次配置更简洁且更易于理解。在实践时，我翻阅了不少相关的官方文档，对于以上构成也有了更深一步的的了解，特别是某些组件的参数说明和功能。如果有不懂的，有时候查阅官方文档比搜索来得更快。篇幅有限，有空再写写如何使用这套系统。",-1);function ds(ms,hs,_s,Es,ks,As){const a=r("Image");return o(),c("div",null,[x,s("p",null,[e(a,{src:t,class:"cursor-pointer"})]),G,S,s("p",null,[e(a,{src:i,class:"cursor-pointer"})]),w,I,s("p",null,[e(a,{src:b,class:"cursor-pointer"})]),D,N,s("p",null,[e(a,{src:u,class:"cursor-pointer"})]),q,R,V,j,s("p",null,[e(a,{src:y,class:"cursor-pointer"})]),B,H,s("p",null,[e(a,{src:d,class:"cursor-pointer"})]),K,Q,J,O,s("p",null,[e(a,{src:m,class:"cursor-pointer"})]),U,L,s("p",null,[e(a,{src:h,class:"cursor-pointer"})]),Z,$,s("p",null,[e(a,{src:_,class:"cursor-pointer"})]),M,s("p",null,[e(a,{src:E,class:"cursor-pointer"})]),W,z,s("p",null,[e(a,{src:k,class:"cursor-pointer"})]),X,Y,ss,ns,s("p",null,[e(a,{src:A,class:"cursor-pointer"})]),as,es,s("p",null,[e(a,{src:g,class:"cursor-pointer"})]),ls,s("p",null,[e(a,{src:v,class:"cursor-pointer"})]),ps,rs,os,cs,s("p",null,[e(a,{src:f,class:"cursor-pointer"})]),ts,s("p",null,[e(a,{src:F,class:"cursor-pointer"})]),is,s("p",null,[e(a,{src:T,class:"cursor-pointer"})]),bs,s("p",null,[e(a,{src:C,class:"cursor-pointer"})]),us,ys])}const fs=p(P,[["render",ds]]);export{vs as __pageData,fs as default};
