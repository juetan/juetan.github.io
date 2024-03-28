import{_ as o,h as e,l as s,u as a,x as p,O as l,m as t,f as c}from"./chunks/framework.DZazWmmr.js";const r="/assets/image-dir.DHgDx8ou.png",i="/assets/image-dist.Co6i242i.png",y="/assets/image-file-url.Cu4v1AGl.png",d="/assets/image-import-meta.DNUNur0w.png",T=JSON.parse('{"title":"编写Rollup插件：如何生成静态资源并在运行中获取到对应资源","description":"","frontmatter":{"title":"编写Rollup插件：如何生成静态资源并在运行中获取到对应资源","date":"2023-10-20T17:59:00.000Z"},"headers":[],"relativePath":"tools/rollup-static/index.md","filePath":"tools/rollup-static/index.md"}'),E={name:"tools/rollup-static/index.md"},u=s("p",null,"自从 Vite 3 发布起，就开始用它做了不少实践和项目，Vite 的底层是 Rollup 和 Esbuild。Rollup 主要用在打包阶段，今天记录下 Rollup 对于静态资源是如何处理，以及 resolveImportMeta 和 resolveFileUrl 两个钩子的使用。",-1),g=s("h2",{id:"准备工作",tabindex:"-1"},[p("准备工作 "),s("a",{class:"header-anchor",href:"#准备工作","aria-label":'Permalink to "准备工作"'},"​")],-1),m=s("p",null,"新建个项目，安装 rollup 和 tsx 作为开发依赖即可，其中 tsx 是个命令行工具(类似ts-node)，可以运行 .ts 文件。此外，创建目录结构如下：",-1),h=l("",14),A=l("",4),_=l("",6),D=s("h2",{id:"最后",tabindex:"-1"},[p("最后 "),s("a",{class:"header-anchor",href:"#最后","aria-label":'Permalink to "最后"'},"​")],-1),C=s("p",null,"以上。",-1);function F(b,f,v,x,P,I){const n=t("Image");return c(),e("div",null,[u,g,m,s("p",null,[a(n,{src:r,alt:"image",class:"cursor-pointer"})]),h,s("p",null,[a(n,{src:i,alt:"image",class:"cursor-pointer"})]),A,s("p",null,[a(n,{src:y,alt:"image",class:"cursor-pointer"})]),_,s("p",null,[a(n,{src:d,alt:"image",class:"cursor-pointer"})]),D,C])}const k=o(E,[["render",F]]);export{T as __pageData,k as default};