import{_ as p,E as o,o as r,c as t,k as s,J as l,a as n,S as e}from"./chunks/framework.doOmauVw.js";const c="/assets/image-douban.5wnwSMvF.png",i="/assets/image-douban-movie.rDOkDTqv.png",y="/assets/image-douban-data.t7DxzaaX.png",q=JSON.parse('{"title":"使用Crawlee实现爬虫功能","description":"","frontmatter":{"title":"使用Crawlee实现爬虫功能","date":"2023-07-22T11:00:00.000Z"},"headers":[],"relativePath":"tools/crawlee/index.md","filePath":"tools/crawlee/index.md"}'),u={name:"tools/crawlee/index.md"},d=s("p",null,[n("在做 "),s("a",{href:"https://juetan.cn/nav",target:"_blank",rel:"noreferrer"},"前端驿站"),n(" 这个导航网站时，收集到的每个网站都是有图标的，但部分网站由于某墙的原因，直接用源站图标URL会导致加载失败。谷歌一番后，最终用 "),s("a",{href:"https://crawlee.dev/",target:"_blank",rel:"noreferrer"},"Crawlee"),n(" 将所有图标都爬取回来了，直接打包到项目里，这里记录下这个库的一些基本用法。")],-1),b=s("p",null,[n("今天实现一个小目标，爬取 "),s("a",{href:"https://movie.douban.com/top250",target:"_blank",rel:"noreferrer"},"豆瓣电影 Top 250"),n(" 的数据，页面如下：")],-1),m=e(`<p>最终整理成如下的 JSON 数据，并把图片也下载下来：</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#005CC5;">    &quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xxx&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#005CC5;">    &quot;cover&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./xxx.png&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">  ...</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="crawlee" tabindex="-1">Crawlee <a class="header-anchor" href="#crawlee" aria-label="Permalink to &quot;Crawlee&quot;">​</a></h2><p><a href="https://crawlee.dev/" target="_blank" rel="noreferrer">Crawlee</a> 是从 Apify 里面独立出来的爬虫模块，支持 Cheerio 、Puppeteer 和 Playwright 的无缝集成。内置支持的爬取类有：</p><ul><li>BasicCrawler：基类</li><li>HttpCrawler：基于 <a href="https://github.com/apify/got-scraping" target="_blank" rel="noreferrer">got</a> 请求库，用于执行原生请求，例如下载图片。</li><li>CheerioCrawler：基于 <a href="https://github.com/cheeriojs/cheerio/wiki/Chinese-README" target="_blank" rel="noreferrer">Cheerio</a> 库(类似于 JQuery 但可以在 NodeJS 中使用)，用于解析DOM获取链接、文字等内容。</li><li>PuppeteerCrawler：基于 <a href="https://pptr.dev/" target="_blank" rel="noreferrer">Puppeteer</a> 库(谷歌出品)，通过协议操作无头浏览器，实现截图、点击按钮等复杂功能</li><li>PlaywrightCrawler：基于 <a href="https://playwright.dev/" target="_blank" rel="noreferrer">Playwright</a> 库(类似 Puppeteer但倾向测试，微软出品)</li></ul><p>我们的目标比较简单，因此使用 CheerioCrawler 和 HttpCrawler 就足够。</p><h2 id="初始化新项目" tabindex="-1">初始化新项目 <a class="header-anchor" href="#初始化新项目" aria-label="Permalink to &quot;初始化新项目&quot;">​</a></h2><ol><li>新建个项目</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#032F62;"> init</span><span style="color:#005CC5;"> -y</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="2"><li>安装 Crawlee</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#032F62;"> install</span><span style="color:#032F62;"> crawlee</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="3"><li>在根目录下，新建 <code>./data/images</code> 目录、<code>./data/movies.json</code> 文件 和 <code>./index.js</code> 文件。</li></ol><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6A737D;">// index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// TODO</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="实现数据的爬取" tabindex="-1">实现数据的爬取 <a class="header-anchor" href="#实现数据的爬取" aria-label="Permalink to &quot;实现数据的爬取&quot;">​</a></h2><p>首先分析下页面爬取的元素：</p>`,15),C=e(`<p>可编写代码如下：</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { CheerioCrawler, RequestList } </span><span style="color:#D73A49;">from</span><span style="color:#032F62;"> &#39;crawlee&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#6F42C1;"> run</span><span style="color:#D73A49;"> =</span><span style="color:#D73A49;"> async</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">  const</span><span style="color:#005CC5;"> data</span><span style="color:#D73A49;"> =</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#D73A49;">  const</span><span style="color:#005CC5;"> urls</span><span style="color:#D73A49;"> =</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#D73A49;">  for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#005CC5;"> 0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#005CC5;"> 10</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">+=</span><span style="color:#005CC5;"> 1</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    urls.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`https://movie.douban.com/top250?start=\${</span><span style="color:#24292E;">i</span><span style="color:#D73A49;"> *</span><span style="color:#005CC5;"> 25</span><span style="color:#032F62;">}&amp;filter=\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#D73A49;">  const</span><span style="color:#005CC5;"> crawler</span><span style="color:#D73A49;"> =</span><span style="color:#D73A49;"> new</span><span style="color:#6F42C1;"> CheerioCrawler</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    requestList: </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> RequestList.</span><span style="color:#6F42C1;">open</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;list&#39;</span><span style="color:#24292E;">, urls),</span></span>
<span class="line"><span style="color:#D73A49;">    async</span><span style="color:#6F42C1;"> requestHandler</span><span style="color:#24292E;">({ </span><span style="color:#E36209;">$</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#D73A49;">      const</span><span style="color:#005CC5;"> $list</span><span style="color:#D73A49;"> =</span><span style="color:#6F42C1;"> $</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.grid_view&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">      for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">const</span><span style="color:#005CC5;"> item</span><span style="color:#D73A49;"> of</span><span style="color:#24292E;"> $list.</span><span style="color:#6F42C1;">children</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#D73A49;">        const</span><span style="color:#005CC5;"> $item</span><span style="color:#D73A49;"> =</span><span style="color:#6F42C1;"> $</span><span style="color:#24292E;">(item);</span></span>
<span class="line"><span style="color:#D73A49;">        const</span><span style="color:#005CC5;"> cover</span><span style="color:#D73A49;"> =</span><span style="color:#24292E;"> $item.</span><span style="color:#6F42C1;">find</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.pic img&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">attr</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;src&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">||</span><span style="color:#032F62;"> &#39;&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">        const</span><span style="color:#005CC5;"> title</span><span style="color:#D73A49;"> =</span><span style="color:#24292E;"> $item.</span><span style="color:#6F42C1;">find</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.hd .title&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">text</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        data.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">({ cover, title });</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#D73A49;">  const</span><span style="color:#005CC5;"> stat</span><span style="color:#D73A49;"> =</span><span style="color:#D73A49;"> await</span><span style="color:#24292E;"> crawler.</span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#D73A49;">  for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">const</span><span style="color:#005CC5;"> item</span><span style="color:#D73A49;"> of</span><span style="color:#24292E;"> data) {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(item.title, item.cover);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#D73A49;">  const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">requestsFinished</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">requestsFailed</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">crawlerRuntimeMillis</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> stat;</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`共爬取 \${</span><span style="color:#24292E;">data</span><span style="color:#032F62;">.</span><span style="color:#005CC5;">length</span><span style="color:#032F62;">} 条数据\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`统计信息: 成功: \${</span><span style="color:#24292E;">requestsFinished</span><span style="color:#032F62;">} 个, 失败: \${</span><span style="color:#24292E;">requestsFailed</span><span style="color:#032F62;">} 个, 耗时: \${</span><span style="color:#24292E;">crawlerRuntimeMillis</span><span style="color:#032F62;">} ms.\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">run</span><span style="color:#24292E;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>以上代码逻辑大致如下：</p><ul><li>通过 <code> RequestList.open()</code> 构建一个请求列表，这里我们根据目标URL的格式，构建了包含10个请求的列表。</li><li>通过 <code>new CheerioCrawler()</code> 构建一个爬取实例，requestList为请求列表，requestHandler为请求处理函数。</li><li>通过 <code>run()</code> 方法运行，返回统计信息</li></ul><p>由于我们使用的是 CheerioCrawler，因此 requestHandler 的参数里有一个 <code>$</code> 参数(cheerio实例)，此时通过熟悉的JQuery调用方式，就能拿到所需的数据。不出意外的话，我们应该能得到如下的结果：</p>`,5),h=s("h2",{id:"实现图片的爬取",tabindex:"-1"},[n("实现图片的爬取 "),s("a",{class:"header-anchor",href:"#实现图片的爬取","aria-label":'Permalink to "实现图片的爬取"'},"​")],-1),E=s("p",null,"以上拿到了图片地址，但还没有下载下来，接下来实现下载。",-1);function _(g,D,A,w,F,v){const a=o("Image");return r(),t("div",null,[d,b,s("p",null,[l(a,{src:c,class:"cursor-pointer"})]),m,s("p",null,[l(a,{src:i,class:"cursor-pointer"})]),C,s("p",null,[l(a,{src:y,class:"cursor-pointer"})]),h,E])}const k=p(u,[["render",_]]);export{q as __pageData,k as default};
