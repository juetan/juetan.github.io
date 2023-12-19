import{_ as o,E as p,c as l,k as s,J as e,a as n,S as t,o as c}from"./chunks/framework.3EKbrk2Y.js";const r="/assets/image-md-path.CynnxDut.png",i="/assets/image-md-temp.Fgcvuy5K.png",d="/assets/image-md-demo.Cz-3Ql1I.png",_="/assets/image-md-patch.1CI0_mrd.png",m="/assets/image-md-edit.laQHGPhc.png",h="/assets/image-md-commit.nOdBWs09.png",u="/assets/image-md-save.I-Me6Vaj.png",G=JSON.parse('{"title":"使用pnpm patch临时修复第三方库的问题","description":"","frontmatter":{"title":"使用pnpm patch临时修复第三方库的问题","date":"2023-07-24T18:00:00.000Z"},"headers":[],"relativePath":"tools/pnpm-patch/index.md","filePath":"tools/pnpm-patch/index.md"}'),g={name:"tools/pnpm-patch/index.md"},b=s("p",null,[n("目前的博客需要一个能展示demo的功能，在调研一番后决定使用 "),s("a",{href:"https://github.com/dewfall123/ruabick",target:"_blank",rel:"noreferrer"},"@ruabick/md-demo-plugins"),n(" 插件。但安装后却报错如下：")],-1),C=s("h2",{id:"问题修复",tabindex:"-1"},[n("问题修复 "),s("a",{class:"header-anchor",href:"#问题修复","aria-label":'Permalink to "问题修复"'},"​")],-1),y=s("p",null,"于是debug一番后，猜测 Vitepres 内部有部分调用里没有传路径参数，于是尝试修改包里面的代码如下：",-1),f=s("p",null,"清空缓存然后重新启动，顺利用上了，效果如下：",-1),v=t('<h2 id="打上补丁" tabindex="-1">打上补丁 <a class="header-anchor" href="#打上补丁" aria-label="Permalink to &quot;打上补丁&quot;">​</a></h2><p>问题解决后在原 Github 仓库提了issue，但这是要部署上GitHub Pages的，还得给它打个补丁。于是，很自然想起了 pnpm 的一个功能：patch，这是类似 patch-package 库的一个功能，能够临时给第三方库打补丁。</p><ol><li>运行补丁命令</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#032F62;"> patch</span><span style="color:#032F62;"> @ruabick/md-demo-plugins@0.3.3</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>结果如下：</p>',5),T=s("ol",{start:"2"},[s("li",null,"打开如上的链接，编辑并保存")],-1),k=t('<ol start="3"><li>保存补丁，参数为第一步的路径</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#032F62;"> patch-commit</span><span style="color:#032F62;"> C:</span><span style="color:#005CC5;">\\U</span><span style="color:#032F62;">sers</span><span style="color:#005CC5;">\\a</span><span style="color:#032F62;">dmin</span><span style="color:#005CC5;">\\A</span><span style="color:#032F62;">ppData</span><span style="color:#005CC5;">\\L</span><span style="color:#032F62;">ocal</span><span style="color:#005CC5;">\\T</span><span style="color:#032F62;">emp</span><span style="color:#005CC5;">\\5</span><span style="color:#032F62;">f1dec4b153d725477fe0052235988fd</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>执行结果：</p>',3),F=s("p",null,"最后，你应该能看见多出这两个东西",-1),x=s("h2",{id:"最后",tabindex:"-1"},[n("最后 "),s("a",{class:"header-anchor",href:"#最后","aria-label":'Permalink to "最后"'},"​")],-1),P=s("p",null,[n("如果你依赖的某个第三方库，因为BUG或版本滞后导致无法正常使用时，可以考虑自己解决并使用 "),s("code",null,"pnpm patch"),n(" 临时打个补丁。")],-1);function V(I,S,A,N,B,D){const a=p("Image");return c(),l("div",null,[b,s("p",null,[e(a,{src:r,class:"cursor-pointer"})]),C,y,s("p",null,[e(a,{src:i,class:"cursor-pointer"})]),f,s("p",null,[e(a,{src:d,class:"cursor-pointer"})]),v,s("p",null,[e(a,{src:_,class:"cursor-pointer"})]),T,s("p",null,[e(a,{src:m,class:"cursor-pointer"})]),k,s("p",null,[e(a,{src:h,class:"cursor-pointer"})]),F,s("p",null,[e(a,{src:u,class:"cursor-pointer"})]),x,P])}const $=o(g,[["render",V]]);export{G as __pageData,$ as default};
