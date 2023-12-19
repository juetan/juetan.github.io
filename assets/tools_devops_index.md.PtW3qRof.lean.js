import{_ as p,E as r,c as o,k as s,J as e,S as l,a as n,o as c}from"./chunks/framework.3EKbrk2Y.js";const t="/assets/image-docker.kwmAKBKE.png",i="/assets/image-portainer.dee7n9MV.png",b="/assets/image-traefik.n90vlroQ.png",u="/assets/image-gitea.gl-M3ZsJ.png",y="/assets/image-docker-ubuntu.UPKE0eja.png",d="/assets/image-dns.rxeGQPSi.png",m="/assets/image-swarm-init._IQG8wgp.png",h="/assets/image-network-public.GgA8GVaH.png",_="/assets/image-volume-portainer.h8_C91hZ.png",E="/assets/image-stack-portainer.iGJh4i0B.png",k="/assets/image-portainer-page.dglA_BRc.png",A="/assets/image-gitea-runner.mjeQO1XA.png",g="/assets/image-stack-core.UGbjKb6E.png",v="/assets/image-core-status.xEe6OajE.png",f="/assets/image-portainer-exec.0I5-Ssdn.png",F="/assets/image-actions-token.W7vrtQgF.png",T="/assets/image-runner-joined.kpAoI42H.png",C="/assets/image-router-https.uciSfqBQ.png",vs=JSON.parse('{"title":"基于 Docker + Portainer + Traefik + Gitea 搭建适用于个人的CI/CD持续构建系统","description":"","frontmatter":{"title":"基于 Docker + Portainer + Traefik + Gitea 搭建适用于个人的CI/CD持续构建系统","date":"2023-09-22T10:03:00.000Z"},"headers":[],"relativePath":"tools/devops/index.md","filePath":"tools/devops/index.md"}'),P={name:"tools/devops/index.md"},x=l("",10),G=s("h3",{id:"portainer",tabindex:"-1"},[n("Portainer "),s("a",{class:"header-anchor",href:"#portainer","aria-label":'Permalink to "Portainer"'},"​")],-1),S=s("p",null,"一个可视化的docker容器管理工具，手动管理 docker 是非常麻烦的，通过 portainer 可以很方便地管理容器/镜像/网络/数据卷等内容，且支持 docker swarm 模式。",-1),w=s("h3",{id:"traefik",tabindex:"-1"},[n("Traefik "),s("a",{class:"header-anchor",href:"#traefik","aria-label":'Permalink to "Traefik"'},"​")],-1),I=s("p",null,"一个类似于 nginx 但更适用于容器的反向代理工具，支持域名和证书的动态配置，同时支持 docker swarm 模式。",-1),D=s("h3",{id:"gitea",tabindex:"-1"},[n("Gitea "),s("a",{class:"header-anchor",href:"#gitea","aria-label":'Permalink to "Gitea"'},"​")],-1),N=s("p",null,"一个git 管理平台，有两个很关键地功能：Gitea Actions 可以让我们运行等价于 Github Actions地自动化任务，例如构建产物/构建镜像等；软件包可以让我们管理上传内容，例如npm包，docker镜像等。",-1),q=s("h2",{id:"准备工作",tabindex:"-1"},[n("准备工作 "),s("a",{class:"header-anchor",href:"#准备工作","aria-label":'Permalink to "准备工作"'},"​")],-1),R=s("p",null,"简单概括为：你需要一台服务器和一个域名。尽管可以在本地实现，但建议在云服务器上实践，主要是因为云服务有独立IP，可以配置域名区分访问和管理。",-1),V=s("h3",{id:"云服务器",tabindex:"-1"},[n("云服务器 "),s("a",{class:"header-anchor",href:"#云服务器","aria-label":'Permalink to "云服务器"'},"​")],-1),j=s("p",null,"推荐 2核4G 配置，理论上 1核2G 也能勉强跑得动。以我个人为例，我这里选择的是腾讯云、带容器镜像的 ubuntu 系统，后续将不再描述 docker 的描述。",-1),B=s("h3",{id:"域名解析",tabindex:"-1"},[n("域名解析 "),s("a",{class:"header-anchor",href:"#域名解析","aria-label":'Permalink to "域名解析"'},"​")],-1),H=s("p",null,"登陆你的域名管理平台，解析名为 *.dev 的 A 记录到你的云服务器IP上，以我个人为例如下。注意：如果域名解析的是国内服务器那么域名是要备案的，备案内容自行查阅这里不再描述。",-1),K=s("h2",{id:"安装portainer",tabindex:"-1"},[n("安装Portainer "),s("a",{class:"header-anchor",href:"#安装portainer","aria-label":'Permalink to "安装Portainer"'},"​")],-1),Q=s("p",null,"登陆你的服务器，可以使用云服务商提供的 web 面板登陆，或者配置SSH以及使用 VS Code 插件进行远程等，总而言之方法比较多此处不做过多描述具体查看相关文档。",-1),J=s("h3",{id:"启用集群模式",tabindex:"-1"},[n("启用集群模式 "),s("a",{class:"header-anchor",href:"#启用集群模式","aria-label":'Permalink to "启用集群模式"'},"​")],-1),O=s("p",null,"执行 docker swarm init 命令启用 swarm 模式，会输出加入令牌和加入命令，只有单台服务器的话可以忽略这些输出。",-1),U=s("h3",{id:"创建公共网络",tabindex:"-1"},[n("创建公共网络 "),s("a",{class:"header-anchor",href:"#创建公共网络","aria-label":'Permalink to "创建公共网络"'},"​")],-1),L=s("p",null,"执行 docker network create -d overlay public 命令创建一个名为 public 的公共网络，其中 overlay 类型可以让我们与其他服务器的容器在一个内部网络内通信。",-1),Z=s("h3",{id:"创建数据卷",tabindex:"-1"},[n("创建数据卷 "),s("a",{class:"header-anchor",href:"#创建数据卷","aria-label":'Permalink to "创建数据卷"'},"​")],-1),$=s("p",null,"执行 docker volume create portainer 命令创建一个名为 portainer 的数据卷，保存你在运行 portainer 时产生的数据，避免容器重启后数据丢失的问题。",-1),M=l("",5),W=s("h3",{id:"访问页面",tabindex:"-1"},[n("访问页面 "),s("a",{class:"header-anchor",href:"#访问页面","aria-label":'Permalink to "访问页面"'},"​")],-1),z=s("p",null,[n("在浏览器输入 "),s("a",{href:"http://ip:9000",target:"_blank",rel:"noreferrer"},"http://ip:9000"),n(" 并回车，页面中是以下安装页面即代表安装成功。注意：尽快安装完，否则2分钟后 Portainer 会出于安全考虑禁止安装，那时便要重启才能再操作。")],-1),X=s("h2",{id:"安装traefik和gitea",tabindex:"-1"},[n("安装Traefik和Gitea "),s("a",{class:"header-anchor",href:"#安装traefik和gitea","aria-label":'Permalink to "安装Traefik和Gitea"'},"​")],-1),Y=s("p",null,"安装完 Portainer 后，我们就可以在管理面板中进行操作而不用不停地敲命令执行。现在，登陆你的 Portainer 面板，接下来的操作都将在这里进行，你甚至不用登陆服务器敲命令。",-1),ss=s("h3",{id:"创建数据卷-1",tabindex:"-1"},[n("创建数据卷 "),s("a",{class:"header-anchor",href:"#创建数据卷-1","aria-label":'Permalink to "创建数据卷"'},"​")],-1),ns=s("p",null,"进入 Volumes 面板，分别创建 gitea 和 gitea_runner 数据卷，用于保存 gitea 和 gitea runner 在运行时产生的数据，创建时其他配置保持默认即可。",-1),as=s("h3",{id:"添加配置",tabindex:"-1"},[n("添加配置 "),s("a",{class:"header-anchor",href:"#添加配置","aria-label":'Permalink to "添加配置"'},"​")],-1),es=s("p",null,"进入 Stacks 面板，新建名为 core 的 Stack 并编写如下配置(具体请根据自身情况修改)，配置包含 3 个部分：Traefik + Gitea + Gitea Runner。",-1),ls=l("",4),ps=s("h2",{id:"配置gitea-actions",tabindex:"-1"},[n("配置Gitea Actions "),s("a",{class:"header-anchor",href:"#配置gitea-actions","aria-label":'Permalink to "配置Gitea Actions"'},"​")],-1),rs=s("p",null,"目前 Gitea Actions 还在开发中，默认情况下 Actions 是禁用的，使用上还是需要手动开启。官方文档上介绍有点杂，接下来以我们目前的状态快速配置以下。",-1),os=s("h3",{id:"进入容器",tabindex:"-1"},[n("进入容器 "),s("a",{class:"header-anchor",href:"#进入容器","aria-label":'Permalink to "进入容器"'},"​")],-1),cs=s("p",null,"在 Portainer 面板中，提供有进入容器中执行命令的功能，对于日常操作非常方便。当然，对于复杂的修改还是通过直接操作数据卷更方便。在 Portainer 中进入容器步骤如下：",-1),ts=l("",5),is=l("",4),bs=l("",10),us=s("h2",{id:"结语",tabindex:"-1"},[n("结语 "),s("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),ys=s("p",null,"以上，相比于原有实践，本次配置更简洁且更易于理解。在实践时，我翻阅了不少相关的官方文档，对于以上构成也有了更深一步的的了解，特别是某些组件的参数说明和功能。如果有不懂的，有时候查阅官方文档比搜索来得更快。篇幅有限，有空再写写如何使用这套系统。",-1);function ds(ms,hs,_s,Es,ks,As){const a=r("Image");return c(),o("div",null,[x,s("p",null,[e(a,{src:t,class:"cursor-pointer"})]),G,S,s("p",null,[e(a,{src:i,class:"cursor-pointer"})]),w,I,s("p",null,[e(a,{src:b,class:"cursor-pointer"})]),D,N,s("p",null,[e(a,{src:u,class:"cursor-pointer"})]),q,R,V,j,s("p",null,[e(a,{src:y,class:"cursor-pointer"})]),B,H,s("p",null,[e(a,{src:d,class:"cursor-pointer"})]),K,Q,J,O,s("p",null,[e(a,{src:m,class:"cursor-pointer"})]),U,L,s("p",null,[e(a,{src:h,class:"cursor-pointer"})]),Z,$,s("p",null,[e(a,{src:_,class:"cursor-pointer"})]),M,s("p",null,[e(a,{src:E,class:"cursor-pointer"})]),W,z,s("p",null,[e(a,{src:k,class:"cursor-pointer"})]),X,Y,ss,ns,s("p",null,[e(a,{src:A,class:"cursor-pointer"})]),as,es,s("p",null,[e(a,{src:g,class:"cursor-pointer"})]),ls,s("p",null,[e(a,{src:v,class:"cursor-pointer"})]),ps,rs,os,cs,s("p",null,[e(a,{src:f,class:"cursor-pointer"})]),ts,s("p",null,[e(a,{src:F,class:"cursor-pointer"})]),is,s("p",null,[e(a,{src:T,class:"cursor-pointer"})]),bs,s("p",null,[e(a,{src:C,class:"cursor-pointer"})]),us,ys])}const fs=p(P,[["render",ds]]);export{vs as __pageData,fs as default};
