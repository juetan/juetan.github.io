import{_ as o,E as p,c as t,k as s,J as l,S as e,a as n,o as r}from"./chunks/framework.3EKbrk2Y.js";const c="/assets/image-vs-dl.bN6pgS-d.png",i="/assets/image-vs-cpp.-Kp7j00f.png",u="/assets/image-vs-comp.QNomEB0F.png",d="/assets/image-vs-lang.zwLBpsTw.png",y="/assets/image-rustup-dl.de2UF101.png",m="/assets/image-rustup-install.jhwo06xq.png",b="/assets/image-rustup-ver.COnaTpiO.png",_="/assets/image-rust-compile.f-7949vI.png",g="/assets/image-rust-exec.IEll2yIg.png",h="/assets/image-cargo-new.wUYIf0FX.png",C="/assets/image-cargo-run.tgq5I5T7.png",E="/assets/image-cargo-target.4UpErd8k.png",W=JSON.parse('{"title":"Rust系列[一]：安装和上手","description":"","frontmatter":{"title":"Rust系列[一]：安装和上手","date":"2023-08-25T11:50:00.000Z","categories":"rust","tags":"rust","thumbnail":"/assets/rust.webp"},"headers":[],"relativePath":"rust/01.start/index.md","filePath":"rust/01.start/index.md"}'),A={name:"rust/01.start/index.md"},F=e("",12),D=s("ol",{start:"2"},[s("li",null,[n("选择 "),s("code",null,"使用C++的桌面开发"),n(" 选项")])],-1),v=s("ol",{start:"3"},[s("li",null,"选择对应操作系统的开发组件")],-1),q=s("ol",{start:"4"},[s("li",null,"选择英文语言包及其他语言包")],-1),f=e("",4),R=s("ol",{start:"2"},[s("li",null,"选择默认方式即可，等待依赖下载和安装.")],-1),T=s("ol",{start:"3"},[s("li",null,[n("安装完重新打开命令行，输入 "),s("code",null,"rustc --version"),n(" 应该有输出，代表安装成功。")])],-1),S=e("",8),k=s("p",null,"其中：",-1),x=s("ul",null,[s("li",null,[s("code",null,"rustc"),n(" 是 Rust 的编译命令，类似于 javac，其中的 c 是 compile 的缩写，这个命令是跟随 rustup 安装的。")]),s("li",null,[s("code",null,".exe"),n(" 是 Windows 平台下可执行文件的后缀名")]),s("li",null,[s("code",null,".pdb"),n(" 是一个包含调试信息的文件")])],-1),w=s("ol",{start:"3"},[s("li",null,"运行 ./main.exe 命令，不出意外的话能看到如下的输出")],-1),P=s("h2",{id:"包管理工具",tabindex:"-1"},[n("包管理工具 "),s("a",{class:"header-anchor",href:"#包管理工具","aria-label":'Permalink to "包管理工具"'},"​")],-1),N=s("p",null,[n("类似于 NodeJS 有 npm 工具，Rust 也有自己的包管理工具："),s("code",null,"cargo"),n("(直译为货物)。通常来说，别人写好并发布出来的代码包，叫第三方库，但在不同语言间也有不同叫法。例如，在 NodeJS 中第三方库称为 package，而在 Rust 中称为 crate(直译为运货用的大木箱)。")],-1),I=s("p",null,"接下来，写个小项目感受下：系统生成一个随机数，我们输入一个数，然后系统会提示我们大了、小了还是相等。在生成随机数时，会用到一个叫 rand 的 crate(第三方库)",-1),V=s("ol",null,[s("li",null,[n("运行 "),s("code",null,"cargo new <name>"),n(" 命令，此时会生成如下的目录和文件")])],-1),O=e("",19),J=s("ol",{start:"5"},[s("li",null,[n("同时，当前目录下多个 "),s("code",null,"target"),n(" 目录，默认是debug模式，"),s("code",null,"debug"),n(" 目录放着我们刚才编译好的文件。可以通过 "),s("code",null,"--release"),n(" 参数指定为release模式，生成好的文件将在 "),s("code",null,"target/release"),n(" 目录下。")])],-1),B=e("",5);function j(z,G,L,$,H,M){const a=p("Image");return r(),t("div",null,[F,s("p",null,[l(a,{src:c,alt:"image",class:"cursor-pointer"})]),D,s("p",null,[l(a,{src:i,alt:"image",class:"cursor-pointer"})]),v,s("p",null,[l(a,{src:u,alt:"image",class:"cursor-pointer"})]),q,s("p",null,[l(a,{src:d,alt:"image",class:"cursor-pointer"})]),f,s("p",null,[l(a,{src:y,alt:"image",class:"cursor-pointer"})]),R,s("p",null,[l(a,{src:m,alt:"image",class:"cursor-pointer"})]),T,s("p",null,[l(a,{src:b,alt:"image",class:"cursor-pointer"})]),S,s("p",null,[l(a,{src:_,alt:"image",class:"cursor-pointer"})]),k,x,w,s("p",null,[l(a,{src:g,alt:"image",class:"cursor-pointer"})]),P,N,I,V,s("p",null,[l(a,{src:h,alt:"image",class:"cursor-pointer"})]),O,s("p",null,[l(a,{src:C,alt:"image",class:"cursor-pointer"})]),J,s("p",null,[l(a,{src:E,alt:"image",class:"cursor-pointer"})]),B])}const K=o(A,[["render",j]]);export{W as __pageData,K as default};