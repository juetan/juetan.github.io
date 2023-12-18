import{_ as s,o as n,c as a,W as p}from"./chunks/framework.45d8ea02.js";const m=JSON.parse('{"title":"浅谈vue3与vue2之间的不同与思想差异","description":"","frontmatter":{"title":"浅谈vue3与vue2之间的不同与思想差异","date":"2023-11-08T08:41:00.000Z"},"headers":[],"relativePath":"draft/vue3-composition/index.md","filePath":"draft/vue3-composition/index.md"}'),l={name:"draft/vue3-composition/index.md"},e=p(`<p>最近在 vue2 项目和 vue3 项目之间跳来跳去，有了一些体会。</p><h2 id="组合式" tabindex="-1">组合式 <a class="header-anchor" href="#组合式" aria-label="Permalink to &quot;组合式&quot;">​</a></h2><p>组合式刚上手可能是有些不适应的，咋看会觉得不如选项式看着顺眼。但组合式确实是很好的写法，不仅是形式上的好处，还有带来思想上的一些启示。先聊聊为什么需要组合式：复用和解耦。</p><p>复用</p><p>复用，即可以重复使用。组件复用说得比较多，例如 UI 库的按钮、弹窗和输入框等，主要我想说说逻辑复用。在 vue2，会使用 mixin 进行复用，但会带来问题，例如来源不清。代码如下，引入 4 个 mixin，但 add 方法却不能看出是哪个 mixin 携带的。</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { AMixin, BMixin, CMixin, DMixin } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./mixin&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  mixins: [AMixin, BMixin, CMixin, DMixin],</span></span>
<span class="line"><span style="color:#24292E;">  methods: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">demo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">script</span><span style="color:#D73A49;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>在 vue3，使用组合式可以很好的解决这个问题。代码如下，没有黑魔法，每个方法来源都清晰可见。</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useA, useB, useC, useD } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./composable&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">add1</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useA</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">add2</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useB</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">add</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useC</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#E36209;">add</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">add4</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useD</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  methods: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">demo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">script</span><span style="color:#D73A49;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>除以上，组合式配合其他写法能达到很好的开发体验。例如，使用setup语法可以简化书写结构；使用typescript能带来不错的类型提示。</p><p>解耦</p><p>解耦是</p>`,11),o=[e];function r(c,t,i,y,u,b){return n(),a("div",null,o)}const E=s(l,[["render",r]]);export{m as __pageData,E as default};
