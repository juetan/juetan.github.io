import{_ as p,I as r,o,c,k as s,M as l,W as e,a as n}from"./chunks/framework.45d8ea02.js";const t="/assets/image-docker.4891d91f.png",i="/assets/image-portainer.3a436119.png",b="/assets/image-traefik.c86f4936.png",y="/assets/image-gitea.5b959cdb.png",u="/assets/image-docker-ubuntu.e22c78bc.png",d="/assets/image-dns.bb977a79.png",m="/assets/image-swarm-init.af19c9b0.png",E="/assets/image-network-public.013790e7.png",_="/assets/image-volume-portainer.fabfac13.png",h="/assets/image-stack-portainer.f6b65006.png",k="/assets/image-portainer-page.6f90b4f1.png",A="/assets/image-gitea-runner.a5473fcc.png",g="/assets/image-stack-core.d13a9861.png",f="/assets/image-core-status.eda80fc6.png",v="/assets/image-portainer-exec.820a48c1.png",F="/assets/image-actions-token.a1b324c5.png",C="/assets/image-runner-joined.88fcb9d1.png",gs=JSON.parse('{"title":"基于 Docker + Portainer + Traefik + Gitea 搭建适用于个人的CI/CD持续构建系统","description":"","frontmatter":{"title":"基于 Docker + Portainer + Traefik + Gitea 搭建适用于个人的CI/CD持续构建系统","date":"2023-09-22T10:03:00.000Z"},"headers":[],"relativePath":"tools/devops/index.md","filePath":"tools/devops/index.md"}'),P={name:"tools/devops/index.md"},T=e("",10),x=s("h3",{id:"portainer",tabindex:"-1"},[n("Portainer "),s("a",{class:"header-anchor",href:"#portainer","aria-label":'Permalink to "Portainer"'},"​")],-1),G=s("p",null,"一个可视化的docker容器管理工具，手动管理 docker 是非常麻烦的，通过 portainer 可以很方便地管理容器/镜像/网络/数据卷等内容，且支持 docker swarm 模式。",-1),S=s("h3",{id:"traefik",tabindex:"-1"},[n("Traefik "),s("a",{class:"header-anchor",href:"#traefik","aria-label":'Permalink to "Traefik"'},"​")],-1),I=s("p",null,"一个类似于 nginx 但更适用于容器的反向代理工具，支持域名和证书的动态配置，同时支持 docker swarm 模式。",-1),w=s("h3",{id:"gitea",tabindex:"-1"},[n("Gitea "),s("a",{class:"header-anchor",href:"#gitea","aria-label":'Permalink to "Gitea"'},"​")],-1),D=s("p",null,"一个git 管理平台，有两个很关键地功能：Gitea Actions 可以让我们运行等价于 Github Actions地自动化任务，例如构建产物/构建镜像等；软件包可以让我们管理上传内容，例如npm包，docker镜像等。",-1),N=s("h2",{id:"准备工作",tabindex:"-1"},[n("准备工作 "),s("a",{class:"header-anchor",href:"#准备工作","aria-label":'Permalink to "准备工作"'},"​")],-1),q=s("p",null,"简单概括为：你需要一台服务器和一个域名。尽管可以在本地实现，但建议在云服务器上实践，主要是因为云服务有独立IP，可以配置域名区分访问和管理。",-1),R=s("h3",{id:"云服务器",tabindex:"-1"},[n("云服务器 "),s("a",{class:"header-anchor",href:"#云服务器","aria-label":'Permalink to "云服务器"'},"​")],-1),V=s("p",null,"推荐 2核4G 配置，理论上 1核2G 也能勉强跑得动。以我个人为例，我这里选择的是腾讯云、带容器镜像的 ubuntu 系统，后续将不再描述 docker 的描述。",-1),j=s("h3",{id:"域名解析",tabindex:"-1"},[n("域名解析 "),s("a",{class:"header-anchor",href:"#域名解析","aria-label":'Permalink to "域名解析"'},"​")],-1),B=s("p",null,"登陆你的域名管理平台，解析名为 *.dev 的 A 记录到你的云服务器IP上，以我个人为例如下。注意：如果域名解析的是国内服务器那么域名是要备案的，备案内容自行查阅这里不再描述。",-1),H=s("h2",{id:"安装portainer",tabindex:"-1"},[n("安装Portainer "),s("a",{class:"header-anchor",href:"#安装portainer","aria-label":'Permalink to "安装Portainer"'},"​")],-1),L=s("p",null,"登陆你的服务器，可以使用云服务商提供的 web 面板登陆，或者配置SSH以及使用 VS Code 插件进行远程等，总而言之方法比较多此处不做过多描述具体查看相关文档。",-1),O=s("h3",{id:"启用集群模式",tabindex:"-1"},[n("启用集群模式 "),s("a",{class:"header-anchor",href:"#启用集群模式","aria-label":'Permalink to "启用集群模式"'},"​")],-1),U=s("p",null,"执行 docker swarm init 命令启用 swarm 模式，会输出加入令牌和加入命令，只有单台服务器的话可以忽略这些输出。",-1),J=s("h3",{id:"创建公共网络",tabindex:"-1"},[n("创建公共网络 "),s("a",{class:"header-anchor",href:"#创建公共网络","aria-label":'Permalink to "创建公共网络"'},"​")],-1),K=s("p",null,"执行 docker network create -d overlay public 命令创建一个名为 public 的公共网络，其中 overlay 类型可以让我们与其他服务器的容器在一个内部网络内通信。",-1),$=s("h3",{id:"创建数据卷",tabindex:"-1"},[n("创建数据卷 "),s("a",{class:"header-anchor",href:"#创建数据卷","aria-label":'Permalink to "创建数据卷"'},"​")],-1),W=s("p",null,"执行 docker volume create portainer 命令创建一个名为 portainer 的数据卷，保存你在运行 portainer 时产生的数据，避免容器重启后数据丢失的问题。",-1),Z=e("",5),z=s("h3",{id:"访问页面",tabindex:"-1"},[n("访问页面 "),s("a",{class:"header-anchor",href:"#访问页面","aria-label":'Permalink to "访问页面"'},"​")],-1),M=s("p",null,[n("在浏览器输入 "),s("a",{href:"http://ip:9000",target:"_blank",rel:"noreferrer"},"http://ip:9000"),n(" 并回车，页面中是以下安装页面即代表安装成功。注意：尽快安装完，否则2分钟后 Portainer 会出于安全考虑禁止安装，那时便要重启才能再操作。")],-1),Q=s("h2",{id:"安装traefik和gitea",tabindex:"-1"},[n("安装Traefik和Gitea "),s("a",{class:"header-anchor",href:"#安装traefik和gitea","aria-label":'Permalink to "安装Traefik和Gitea"'},"​")],-1),Y=s("p",null,"安装完 Portainer 后，我们就可以在管理面板中进行操作而不用不停地敲命令执行。现在，登陆你的 Portainer 面板，接下来的操作都将在这里进行，你甚至不用登陆服务器敲命令。",-1),X=s("h3",{id:"创建数据卷-1",tabindex:"-1"},[n("创建数据卷 "),s("a",{class:"header-anchor",href:"#创建数据卷-1","aria-label":'Permalink to "创建数据卷"'},"​")],-1),ss=s("p",null,"进入 Volumes 面板，分别创建 gitea 和 gitea_runner 数据卷，用于保存 gitea 和 gitea runner 在运行时产生的数据，创建时其他配置保持默认即可。",-1),ns=s("h3",{id:"添加配置",tabindex:"-1"},[n("添加配置 "),s("a",{class:"header-anchor",href:"#添加配置","aria-label":'Permalink to "添加配置"'},"​")],-1),as=s("p",null,"进入 Stacks 面板，新建名为 core 的 Stack 并编写如下配置(具体请根据自身情况修改)，配置包含 3 个部分：Traefik + Gitea + Gitea Runner。",-1),ls=e("",4),es=s("h2",{id:"配置gitea-actions",tabindex:"-1"},[n("配置Gitea Actions "),s("a",{class:"header-anchor",href:"#配置gitea-actions","aria-label":'Permalink to "配置Gitea Actions"'},"​")],-1),ps=s("p",null,"目前 Gitea Actions 还在开发中，默认情况下 Actions 是禁用的，使用上还是需要手动开启。官方文档上介绍有点杂，接下来以我们目前的状态快速配置以下。",-1),rs=s("h3",{id:"进入容器",tabindex:"-1"},[n("进入容器 "),s("a",{class:"header-anchor",href:"#进入容器","aria-label":'Permalink to "进入容器"'},"​")],-1),os=s("p",null,"在 Portainer 面板中，提供有进入容器中执行命令的功能，对于日常操作非常方便。当然，对于复杂的修改还是通过直接操作数据卷更方便。在 Portainer 中进入容器步骤如下：",-1),cs=e("",5),ts=e("",4),is=s("p",null,"至此，我们的CI/CD环境已部署完成，其中 Portainer 用于管理 Docker 镜像和容器，Traefik 用于配置域名和代理，Gitea 用于管理 Git 代码，Gitea Actions 用来运行构建任务。",-1),bs=s("h2",{id:"结语",tabindex:"-1"},[n("结语 "),s("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),ys=s("p",null,"以上，相比于原有实践，本次配置更简洁且更易于理解。在实践时，我翻阅了不少相关的官方文档，对于以上构成也有了更深一步的的了解，特别是某些组件的参数说明和功能。如果有不懂的，有时候查阅官方文档比搜索来得更快。篇幅有限，有空再写写如何使用这套系统。",-1);function us(ds,ms,Es,_s,hs,ks){const a=r("Image");return o(),c("div",null,[T,s("p",null,[l(a,{src:t,class:"cursor-pointer"})]),x,G,s("p",null,[l(a,{src:i,class:"cursor-pointer"})]),S,I,s("p",null,[l(a,{src:b,class:"cursor-pointer"})]),w,D,s("p",null,[l(a,{src:y,class:"cursor-pointer"})]),N,q,R,V,s("p",null,[l(a,{src:u,class:"cursor-pointer"})]),j,B,s("p",null,[l(a,{src:d,class:"cursor-pointer"})]),H,L,O,U,s("p",null,[l(a,{src:m,class:"cursor-pointer"})]),J,K,s("p",null,[l(a,{src:E,class:"cursor-pointer"})]),$,W,s("p",null,[l(a,{src:_,class:"cursor-pointer"})]),Z,s("p",null,[l(a,{src:h,class:"cursor-pointer"})]),z,M,s("p",null,[l(a,{src:k,class:"cursor-pointer"})]),Q,Y,X,ss,s("p",null,[l(a,{src:A,class:"cursor-pointer"})]),ns,as,s("p",null,[l(a,{src:g,class:"cursor-pointer"})]),ls,s("p",null,[l(a,{src:f,class:"cursor-pointer"})]),es,ps,rs,os,s("p",null,[l(a,{src:v,class:"cursor-pointer"})]),cs,s("p",null,[l(a,{src:F,class:"cursor-pointer"})]),ts,s("p",null,[l(a,{src:C,class:"cursor-pointer"})]),is,bs,ys])}const fs=p(P,[["render",us]]);export{gs as __pageData,fs as default};
