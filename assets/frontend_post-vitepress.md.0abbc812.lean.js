import{_ as o,I as e,c as t,k as s,M as a,W as p,a as l,o as c}from"./chunks/framework.7ce97047.js";const r="/assets/image-icon.a919120f.png",y="/assets/image-preview.373db507.png",i="/assets/image-alias.f99fcb5c.png",E="/assets/image-replace.d975321e.png",d="/assets/image-permission.242baa99.png",u="/assets/image-actions.67c8d48c.png",C="/assets/image-branch.7c7a5b60.png",g="/assets/image-site.1b88b2d2.png",G=JSON.parse('{"title":"改造vitepess作为个人博客","description":"","frontmatter":{"title":"改造vitepess作为个人博客","date":"2023-07-17T11:42:00.000Z"},"headers":[],"relativePath":"frontend/post-vitepress.md","filePath":"frontend/post-vitepress.md"}'),h={name:"frontend/post-vitepress.md"},b=p("",26),m=p("",11),A=s("h2",{id:"替换默认主题的部分组件",tabindex:"-1"},[l("替换默认主题的部分组件 "),s("a",{class:"header-anchor",href:"#替换默认主题的部分组件","aria-label":'Permalink to "替换默认主题的部分组件"'},"​")],-1),_=s("p",null,"我并没有从零开始写一个主题，而是基于默认主题修改，主要是大部分功能已经满足需求。而使用默认主题，难免有部分组件想要修改，这该怎么办呢？",-1),f=s("p",null,[l("官方提供有一个"),s("a",{href:"https://vitepress.dev/guide/extending-default-theme#overriding-internal-components",target:"_blank",rel:"noreferrer"},"解决方案"),l(", 通过设置别名进行替换。但试过之后，我发现包含有相对路径的引用就会报错，如下：")],-1),v=p("",4),F=p("",17),D=s("ol",{start:"3"},[s("li",null,"写完配置就可以这个推送了，可以在这里看到运行状态。")],-1),k=s("ol",{start:"4"},[s("li",null,"构建后应该能看到多出来一个 gh-pages 分支，此时还需要配置该分支作为部署分支即可。")],-1),x=s("ol",{start:"5"},[s("li",null,"通常需要等待一会才生效，下面贴一张部署完的页面效果图。")],-1),T=s("h2",{id:"最后",tabindex:"-1"},[l("最后 "),s("a",{class:"header-anchor",href:"#最后","aria-label":'Permalink to "最后"'},"​")],-1),q=s("p",null,"以上，想到什么写什么，可能存在遗漏或描述不全，后面根据情况在详细补充。",-1);function I(w,P,V,S,N,U){const n=e("Image");return c(),t("div",null,[b,s("p",null,[a(n,{src:r,class:"cursor-pointer"})]),m,s("p",null,[a(n,{src:y,class:"cursor-pointer"})]),A,_,f,s("p",null,[a(n,{src:i,class:"cursor-pointer"})]),v,s("p",null,[a(n,{src:E,class:"cursor-pointer"})]),F,s("p",null,[a(n,{src:d,class:"cursor-pointer"})]),D,s("p",null,[a(n,{src:u,class:"cursor-pointer"})]),k,s("p",null,[a(n,{src:C,class:"cursor-pointer"})]),x,s("p",null,[a(n,{src:g,class:"cursor-pointer"})]),T,q])}const B=o(h,[["render",I]]);export{G as __pageData,B as default};