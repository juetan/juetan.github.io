import{_ as t,E as o,c as l,k as a,J as r,S as n,a as i,o as s}from"./chunks/framework.3EKbrk2Y.js";const h="/assets/image.LbF9K4m4.png",k=JSON.parse('{"title":"XPath：选择 XML 元素和 HTML 元素，CSS 选择器之外的另一种选择器","description":"","frontmatter":{"title":"XPath：选择 XML 元素和 HTML 元素，CSS 选择器之外的另一种选择器","date":"2024-01-19T12:20:20.000Z"},"headers":[],"relativePath":"tools/xpath/index.md","filePath":"tools/xpath/index.md"}'),c={name:"tools/xpath/index.md"},d=n('<p>XPath，全称 XML Path Language，是一种用于在 XML 文档中选择节点或节点集的表达式语言。HTML 与 XML 格式相似，因此 XPath 也能作用在 HTML 上。相比于 CSS 选择器，XPath 可以执行更复杂的选择，例如根据元素是否包含文本，属性值是否大于特定值等等。以下，记录下学习到的一些语法。</p><h2 id="基本语法" tabindex="-1">基本语法 <a class="header-anchor" href="#基本语法" aria-label="Permalink to &quot;基本语法&quot;">​</a></h2><p>XPath 采用路径式的查找方法，整个 XML 作为树级结构从根节点往下查找，示例如下：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>/div/a[@target=&quot;_blank&quot;]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>以上表示：查找根元素下的直接子元素 div 下，属性 target 为 _blank 的直接子元素 a。其中开头的 / 表示从根元素开始查找，后面的 / 表示直接子元素，而 div 和 a 则为标签名。</p><h2 id="路径过滤" tabindex="-1">路径过滤 <a class="header-anchor" href="#路径过滤" aria-label="Permalink to &quot;路径过滤&quot;">​</a></h2><p>选择路径时不必一层层往下指定，可以跳过某些中间路径，相关的语法有：</p><ul><li>/ 直接子元素，以 / 开头表示根节点，类似于 CSS 的 &gt; 选择器</li><li>// 后辈子元素，非直接子元素也可以，类似于 CSS 的 &lt;空格&gt; 选择器</li><li>:: 兄弟元素，类似于 CSS 的 ~ 选择器</li><li>. 当前节点</li><li>.. 父节点</li><li>* 所有节点</li></ul><h2 id="节点过滤" tabindex="-1">节点过滤 <a class="header-anchor" href="#节点过滤" aria-label="Permalink to &quot;节点过滤&quot;">​</a></h2><p>每个节点都可以使用 [condition] 进行过滤，可以根据文本包含、属性值等内容进行过滤，[] 内可以使用内置函数。</p><ul><li>[@id=&quot;box&quot;]： 使用 @ 表示属性(可以省略)，这里匹配 id 属性为 box 的元素。</li><li>[@count &gt; 1]: 匹配 count 属性值大于 1 的元素</li><li>[contains(text(), &#39;xx&#39;)]：匹配文本包含 xx 的元素，contains 和 text 皆为内置函数。</li></ul><h2 id="内置函数" tabindex="-1">内置函数 <a class="header-anchor" href="#内置函数" aria-label="Permalink to &quot;内置函数&quot;">​</a></h2><p>以上只是介绍概念和用法，关于更多过滤方法和内置函数可查阅菜鸟教程的 <a href="https://www.runoob.com/xpath/xpath-functions.html" target="_blank" rel="noreferrer">XPath 文档</a>。</p><h2 id="在浏览器" tabindex="-1">在浏览器 <a class="header-anchor" href="#在浏览器" aria-label="Permalink to &quot;在浏览器&quot;">​</a></h2><p>在浏览器可以使用 <code>document.evaluate</code> 方法根据 XPath 选择元素，具体用法可查阅 MDN 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document/evaluate" target="_blank" rel="noreferrer">文档</a>。</p><p>此外，还可以安装 <a href="https://chromewebstore.google.com/detail/xpath-helper/hgimnogjllphhhkhlmebbmlgjoejdpjl" target="_blank" rel="noreferrer">XPath Helper</a> 插件，有了此插件基本上可以不用上面的方法。安装好后，使用效果如下：</p>',16),p=a("h2",{id:"结语",tabindex:"-1"},[i("结语 "),a("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),u=a("p",null,"语法总体不太复杂，使用类似文件夹路径的方式选择元素，可以过滤路径，也可以过滤节点。有过 CSS 经验的应该上手很快，值得注意的就是内置函数的使用，很多强大的匹配规则都需要它们来完成。",-1);function _(m,b,x,g,f,P){const e=o("Image");return s(),l("div",null,[d,a("p",null,[r(e,{src:h,alt:"image",class:"cursor-pointer"})]),p,u])}const X=t(c,[["render",_]]);export{k as __pageData,X as default};
