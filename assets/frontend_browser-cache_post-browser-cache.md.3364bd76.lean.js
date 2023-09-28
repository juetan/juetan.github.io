import{_ as l,I as p,o as r,c as t,k as s,M as n,W as o,a}from"./chunks/framework.45d8ea02.js";const c="/assets/image-expires.21b50994.png",i="/assets/image-cache-control.0797b5dd.png",d="/assets/image-last-modified.8efe2754.png",_="/assets/image-etag.c7588c9c.png",h="/assets/image-local-storage.47bf8759.png",b="/assets/image-session-storage.3906b8d0.png",u="/assets/image-cookies.3d13bb8e.png",M=JSON.parse('{"title":"HTTP中的强缓存和协商缓存以及浏览器自身的存储","description":"","frontmatter":{"title":"HTTP中的强缓存和协商缓存以及浏览器自身的存储","date":"2023-07-20T11:49:00.000Z"},"headers":[],"relativePath":"frontend/browser-cache/post-browser-cache.md","filePath":"frontend/browser-cache/post-browser-cache.md"}'),m={name:"frontend/browser-cache/post-browser-cache.md"},y=o("",8),g=s("p",null,"由于 expires 字段是个绝对值，有时候会导致缓存提早或延后失效，为什么呢？",-1),T=s("p",null,"这是因为，服务端和客户端的日期是有可能不一样的，例如当深圳的用户访问纽约的服务器时，由于两者不在同一时区，各自按当地时区计算就会导致缓存失效。",-1),S=s("h3",{id:"响应头-cache-control",tabindex:"-1"},[a("响应头：Cache-Control "),s("a",{class:"header-anchor",href:"#响应头-cache-control","aria-label":'Permalink to "响应头：Cache-Control"'},"​")],-1),f=s("p",null,[a("后来就有了 "),s("code",null,"cache-control"),a(" 字段，这是个相对时间，如下：")],-1),k=o("",7),P=s("p",null,[a("当下次访问时，浏览器会通过 "),s("code",null,"If-Modified-Since"),a(" 请求头携带上一次返回的 Last-Modified 值，服务器收到后会比对是否修改过。如果没修改的话，通常会通过 "),s("code",null,"304"),a(" HTTP 状态码告知自上次以来没有修改过，反之则返回新的资源。")],-1),E=s("h3",{id:"响应头-etag",tabindex:"-1"},[a("响应头：ETag "),s("a",{class:"header-anchor",href:"#响应头-etag","aria-label":'Permalink to "响应头：ETag"'},"​")],-1),x=s("p",null,[a("除了这个，"),s("code",null,"Etag"),a(" 也是用来进行协商缓存的，如下：")],-1),C=o("",5),A=o("",5),I=o("",11),q=s("h2",{id:"结语",tabindex:"-1"},[a("结语 "),s("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),v=s("p",null,"以上，后面有想到的再补充。",-1);function D(F,N,V,w,B,L){const e=p("Image");return r(),t("div",null,[y,s("p",null,[n(e,{src:c,class:"cursor-pointer"})]),g,T,S,f,s("p",null,[n(e,{src:i,class:"cursor-pointer"})]),k,s("p",null,[n(e,{src:d,class:"cursor-pointer"})]),P,E,x,s("p",null,[n(e,{src:_,class:"cursor-pointer"})]),C,s("p",null,[n(e,{src:h,class:"cursor-pointer"})]),A,s("p",null,[n(e,{src:b,class:"cursor-pointer"})]),I,s("p",null,[n(e,{src:u,class:"cursor-pointer"})]),q,v])}const R=l(m,[["render",D]]);export{M as __pageData,R as default};