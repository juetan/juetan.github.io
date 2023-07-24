import{_ as p,I as n,c as l,k as s,M as t,a as o,W as e,o as c}from"./chunks/framework.7ce97047.js";const r="/assets/image-md-path.4b293f91.png",i="/assets/image-md-temp.57bc2809.png",_="/assets/image-md-demo.5568fdaf.png",d="/assets/image-md-patch.fc7e4604.png",m="/assets/image-md-edit.1b7fcdec.png",h="/assets/image-md-commit.68c8d9f7.png",u="/assets/image-md-save.7e66226c.png",$=JSON.parse('{"title":"使用pnpm patch临时修复第三方库的问题","description":"","frontmatter":{"title":"使用pnpm patch临时修复第三方库的问题","date":"2023-07-24T18:00:00.000Z"},"headers":[],"relativePath":"tools/post-pnpm-patch.md","filePath":"tools/post-pnpm-patch.md"}'),g={name:"tools/post-pnpm-patch.md"},b=s("p",null,[o("目前的博客需要一个能展示demo的功能，在调研一番后决定使用 "),s("a",{href:"https://github.com/dewfall123/ruabick",target:"_blank",rel:"noreferrer"},"@ruabick/md-demo-plugins"),o(" 插件。但安装后却报错如下：")],-1),y=s("h2",{id:"问题修复",tabindex:"-1"},[o("问题修复 "),s("a",{class:"header-anchor",href:"#问题修复","aria-label":'Permalink to "问题修复"'},"​")],-1),C=s("p",null,"于是debug一番后，猜测 Vitepres 内部有部分调用里没有传路径参数，于是尝试修改包里面的代码如下：",-1),f=s("p",null,"清空缓存然后重新启动，顺利用上了，效果如下：",-1),T=e('<h2 id="打上补丁" tabindex="-1">打上补丁 <a class="header-anchor" href="#打上补丁" aria-label="Permalink to &quot;打上补丁&quot;">​</a></h2><p>问题解决后在原 Github 仓库提了issue，但这是要部署上GitHub Pages的，还得给它打个补丁。于是，很自然想起了 pnpm 的一个功能：patch，这是类似 patch-package 库的一个功能，能够临时给第三方库打补丁。</p><ol><li>运行补丁命令</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">patch</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@ruabick/md-demo-plugins@0.3.3</span></span></code></pre></div><p>结果如下：</p>',5),k=s("ol",{start:"2"},[s("li",null,"打开如上的链接，编辑并保存")],-1),F=e('<ol start="3"><li>保存补丁，参数为第一步的路径</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">patch-commit</span><span style="color:#24292E;"> </span><span style="color:#032F62;">C:</span><span style="color:#005CC5;">\\U</span><span style="color:#032F62;">sers</span><span style="color:#005CC5;">\\a</span><span style="color:#032F62;">dmin</span><span style="color:#005CC5;">\\A</span><span style="color:#032F62;">ppData</span><span style="color:#005CC5;">\\L</span><span style="color:#032F62;">ocal</span><span style="color:#005CC5;">\\T</span><span style="color:#032F62;">emp</span><span style="color:#005CC5;">\\5</span><span style="color:#032F62;">f1dec4b153d725477fe0052235988fd</span></span></code></pre></div><p>执行结果：</p>',3),P=s("p",null,"最后，你应该能看见多出这两个东西",-1),V=s("h2",{id:"最后",tabindex:"-1"},[o("最后 "),s("a",{class:"header-anchor",href:"#最后","aria-label":'Permalink to "最后"'},"​")],-1),v=s("p",null,[o("如果你依赖的某个第三方库，因为BUG或版本滞后导致无法正常使用时，可以考虑自己解决并使用 "),s("code",null,"pnpm patch"),o(" 临时打个补丁。")],-1);function S(x,A,E,I,N,B){const a=n("Image");return c(),l("div",null,[b,s("p",null,[t(a,{src:r,class:"cursor-pointer"})]),y,C,s("p",null,[t(a,{src:i,class:"cursor-pointer"})]),f,s("p",null,[t(a,{src:_,class:"cursor-pointer"})]),T,s("p",null,[t(a,{src:d,class:"cursor-pointer"})]),k,s("p",null,[t(a,{src:m,class:"cursor-pointer"})]),F,s("p",null,[t(a,{src:h,class:"cursor-pointer"})]),P,s("p",null,[t(a,{src:u,class:"cursor-pointer"})]),V,v])}const G=p(g,[["render",S]]);export{$ as __pageData,G as default};