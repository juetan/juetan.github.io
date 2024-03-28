import{_ as a,h as p,l as s,u as l,O as o,x as e,m as t,f as c}from"./chunks/framework.DZazWmmr.js";const r="/assets/image-overview.jUrt-PmD.png",D=JSON.parse('{"title":"Vue：模拟@vitejs/plugin-vue解析和加载SFC组件(.vue文件)的过程。","description":"","frontmatter":{"title":"Vue：模拟@vitejs/plugin-vue解析和加载SFC组件(.vue文件)的过程。","date":"2023-10-24T10:16:00.000Z"},"headers":[],"relativePath":"vue/vue-load-from-url/index.md","filePath":"vue/vue-load-from-url/index.md"}'),y={name:"vue/vue-load-from-url/index.md"},i=o(`<p>Vite 是一个与前端框架无关的打包工具，既可以打包 Vue 也可以打包 React、Solid 等其他框架。在打包 Vue 的 SFC(Single File Component, 单文件组件)时，主要是借助 <a href="https://github.com/vuejs/core/tree/main/packages/compiler-sfc" target="_blank" rel="noreferrer">@vitejs/plugin-vue</a> 这个插件，该插件主要的作用是把 .vue 文件编译为 .js 文件。</p><p>今天，主要模拟并记录下：当浏览器请求 .vue 文件时，服务器是如何解析并返回相关内容的。由于是模拟过程，因此不少代码都是写死的，主要目的是了解流程即可。</p><h2 id="创建项目" tabindex="-1">创建项目 <a class="header-anchor" href="#创建项目" aria-label="Permalink to &quot;创建项目&quot;">​</a></h2><p>创建一个项目，并安装以下依赖，其中：Vite 使用 connect 作为后端服务，我们简单点使用 express 即可。此外，sfc 的编译器已内置到 vue 这个包中。tsx 是一个运行 Typescript 的工具，使用 Esbuild 因而非常快。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#032F62;"> i</span><span style="color:#032F62;"> express</span><span style="color:#032F62;"> vue</span><span style="color:#032F62;"> tsx</span><span style="color:#005CC5;"> -D</span></span></code></pre></div><h2 id="项目结构" tabindex="-1">项目结构 <a class="header-anchor" href="#项目结构" aria-label="Permalink to &quot;项目结构&quot;">​</a></h2><p>在开始之前，我们先创建一个 Vite 和 Vue 最小环境的目录结构，仅需 5 个文件，如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-light vp-code"><code><span class="line"><span>.</span></span>
<span class="line"><span>├── src/</span></span>
<span class="line"><span>│   ├── App.vue</span></span>
<span class="line"><span>│   └── main.ts</span></span>
<span class="line"><span>├── index.html</span></span>
<span class="line"><span>├── package.json</span></span>
<span class="line"><span>└── server.ts</span></span></code></pre></div><h2 id="页面代码" tabindex="-1">页面代码 <a class="header-anchor" href="#页面代码" aria-label="Permalink to &quot;页面代码&quot;">​</a></h2><p>我们先来补全以上几个文件的代码，除 server.html 文件，其他几个文件内容与普通 vite 项目无异。</p><h3 id="index-html" tabindex="-1">index.html <a class="header-anchor" href="#index-html" aria-label="Permalink to &quot;index.html&quot;">​</a></h3><p>依赖 ./src/main.ts 文件</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#24292E;">&lt;!</span><span style="color:#22863A;">DOCTYPE</span><span style="color:#6F42C1;"> html</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">html</span><span style="color:#6F42C1;"> lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;en&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">meta</span><span style="color:#6F42C1;"> charset</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">meta</span><span style="color:#6F42C1;"> http-equiv</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;X-UA-Compatible&quot;</span><span style="color:#6F42C1;"> content</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;IE=edge&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">meta</span><span style="color:#6F42C1;"> name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;viewport&quot;</span><span style="color:#6F42C1;"> content</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;Vue Development Server&lt;/</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#6F42C1;"> id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">&gt;app&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">script</span><span style="color:#6F42C1;"> src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;./src/main.ts&quot;</span><span style="color:#6F42C1;"> type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;module&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h3 id="main-ts" tabindex="-1">main.ts <a class="header-anchor" href="#main-ts" aria-label="Permalink to &quot;main.ts&quot;">​</a></h3><p>依赖 vue 和 ./App.vue 文件</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createApp } </span><span style="color:#D73A49;">from</span><span style="color:#032F62;"> &#39;vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App </span><span style="color:#D73A49;">from</span><span style="color:#032F62;"> &#39;./App.vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#005CC5;"> app</span><span style="color:#D73A49;"> =</span><span style="color:#6F42C1;"> createApp</span><span style="color:#24292E;">(App);</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">mount</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#app&#39;</span><span style="color:#24292E;">);</span></span></code></pre></div><h3 id="app-vue" tabindex="-1">App.vue <a class="header-anchor" href="#app-vue" aria-label="Permalink to &quot;App.vue&quot;">​</a></h3><p>依赖 vue，包含 1 个template标签，2 个 script 标签(普通和setup)，2 个 style 标签(普通和scoped)。</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#6F42C1;"> class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;title&quot;</span><span style="color:#24292E;">&gt;头部&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#6F42C1;"> class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;content&quot;</span><span style="color:#24292E;">&gt;内容: {{ message1 }} - {{ message2 }}&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#6F42C1;"> setup</span><span style="color:#6F42C1;"> lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ref } </span><span style="color:#D73A49;">from</span><span style="color:#032F62;"> &#39;vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#005CC5;"> message1</span><span style="color:#D73A49;"> =</span><span style="color:#6F42C1;"> ref</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;来自 script setup 的消息&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#6F42C1;"> lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#D73A49;"> default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6F42C1;">  data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#D73A49;">    return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      message2: </span><span style="color:#032F62;">&#39;来自 script 的消息&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#6F42C1;"> scoped</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">.title</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#005CC5;">  color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">.content</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#005CC5;">  color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">blue</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="核心代码" tabindex="-1">核心代码 <a class="header-anchor" href="#核心代码" aria-label="Permalink to &quot;核心代码&quot;">​</a></h2><p>接下来是 server.ts 中的内容，主要是启动一个服务器，接收请求路径和返回转换过的内容，先看一眼最终代码：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> express </span><span style="color:#D73A49;">from</span><span style="color:#032F62;"> &#39;express&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> fs </span><span style="color:#D73A49;">from</span><span style="color:#032F62;"> &#39;fs/promises&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { parse, compileScript, compileTemplate, compileStyle, SFCTemplateCompileOptions } </span><span style="color:#D73A49;">from</span><span style="color:#032F62;"> &#39;vue/compiler-sfc&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#6F42C1;"> replaceVue</span><span style="color:#D73A49;"> =</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">content</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;"> string</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> content.</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">/from (&#39;</span><span style="color:#D73A49;">|</span><span style="color:#032F62;">&quot;)vue(&#39;</span><span style="color:#D73A49;">|</span><span style="color:#032F62;">&quot;)/</span><span style="color:#24292E;">, </span><span style="color:#032F62;">\`from &#39;/vue&#39;\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#005CC5;"> app</span><span style="color:#D73A49;"> =</span><span style="color:#6F42C1;"> express</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">req</span><span style="color:#24292E;">, </span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">  const</span><span style="color:#005CC5;"> content</span><span style="color:#D73A49;"> =</span><span style="color:#D73A49;"> await</span><span style="color:#24292E;"> fs.</span><span style="color:#6F42C1;">readFile</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./index.html&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;utf-8&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  res.</span><span style="color:#6F42C1;">header</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Content-Type&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;text/html&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  res.</span><span style="color:#6F42C1;">end</span><span style="color:#24292E;">(content);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/src/main.ts&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">req</span><span style="color:#24292E;">, </span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">  const</span><span style="color:#005CC5;"> content</span><span style="color:#D73A49;"> =</span><span style="color:#D73A49;"> await</span><span style="color:#24292E;"> fs.</span><span style="color:#6F42C1;">readFile</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./src/main.ts&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;utf-8&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  res.</span><span style="color:#6F42C1;">header</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Content-Type&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;text/javascript&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  res.</span><span style="color:#6F42C1;">end</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">replaceVue</span><span style="color:#24292E;">(content));</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/vue&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">req</span><span style="color:#24292E;">, </span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">  const</span><span style="color:#005CC5;"> content</span><span style="color:#D73A49;"> =</span><span style="color:#D73A49;"> await</span><span style="color:#24292E;"> fs.</span><span style="color:#6F42C1;">readFile</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../node_modules/vue/dist/vue.esm-browser.prod.js&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;utf-8&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  res.</span><span style="color:#6F42C1;">header</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Content-Type&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;text/javascript&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  res.</span><span style="color:#6F42C1;">end</span><span style="color:#24292E;">(content);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/src/App.vue&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">req</span><span style="color:#24292E;">, </span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  res.</span><span style="color:#6F42C1;">header</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Content-Type&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;text/javascript&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">  const</span><span style="color:#005CC5;"> content</span><span style="color:#D73A49;"> =</span><span style="color:#D73A49;"> await</span><span style="color:#24292E;"> fs.</span><span style="color:#6F42C1;">readFile</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./src/App.vue&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;utf-8&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">  const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">descriptor</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;"> parse</span><span style="color:#24292E;">(content);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">  const</span><span style="color:#005CC5;"> templateOptions</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;"> SFCTemplateCompileOptions</span><span style="color:#D73A49;"> =</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#032F62;">&#39;pref&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    filename: </span><span style="color:#032F62;">&#39;App.vue&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    isProd: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    source: descriptor.template.content,</span></span>
<span class="line"><span style="color:#24292E;">    scoped: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    slotted: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    compilerOptions: {</span></span>
<span class="line"><span style="color:#24292E;">      scopeId: </span><span style="color:#032F62;">&#39;data-v-pref&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">  const</span><span style="color:#005CC5;"> script</span><span style="color:#D73A49;"> =</span><span style="color:#6F42C1;"> compileScript</span><span style="color:#24292E;">(descriptor, {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#032F62;">&#39;pref&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    templateOptions: {</span></span>
<span class="line"><span style="color:#24292E;">      compilerOptions: {</span></span>
<span class="line"><span style="color:#D73A49;">        ...</span><span style="color:#24292E;">templateOptions.compilerOptions,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">  const</span><span style="color:#005CC5;"> template</span><span style="color:#D73A49;"> =</span><span style="color:#6F42C1;"> compileTemplate</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#D73A49;">    ...</span><span style="color:#24292E;">templateOptions,</span></span>
<span class="line"><span style="color:#24292E;">    compilerOptions: {</span></span>
<span class="line"><span style="color:#D73A49;">      ...</span><span style="color:#24292E;">templateOptions.compilerOptions,</span></span>
<span class="line"><span style="color:#24292E;">      bindingMetadata: script.bindings,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">  let</span><span style="color:#24292E;"> styles </span><span style="color:#D73A49;">=</span><span style="color:#032F62;"> &#39;&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">  for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">const</span><span style="color:#005CC5;"> style</span><span style="color:#D73A49;"> of</span><span style="color:#24292E;"> descriptor.styles) {</span></span>
<span class="line"><span style="color:#D73A49;">    const</span><span style="color:#005CC5;"> css</span><span style="color:#D73A49;"> =</span><span style="color:#6F42C1;"> compileStyle</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      id: </span><span style="color:#032F62;">&#39;data-v-pref&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      filename: </span><span style="color:#032F62;">&#39;App.vue&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      source: style.content,</span></span>
<span class="line"><span style="color:#24292E;">      scoped: style.scoped,</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    styles </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> css.code;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">  if</span><span style="color:#24292E;"> (req.query.type </span><span style="color:#D73A49;">===</span><span style="color:#032F62;"> &#39;style&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#D73A49;">    return</span><span style="color:#24292E;"> res.</span><span style="color:#6F42C1;">end</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">      const style = document.createElement(&#39;style&#39;);</span></span>
<span class="line"><span style="color:#032F62;">      style.innerHTML = \${</span><span style="color:#005CC5;">JSON</span><span style="color:#032F62;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#032F62;">(</span><span style="color:#24292E;">styles</span><span style="color:#032F62;">)</span><span style="color:#032F62;">};</span></span>
<span class="line"><span style="color:#032F62;">      document.head.appendChild(style);</span></span>
<span class="line"><span style="color:#032F62;">    \`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  res.</span><span style="color:#6F42C1;">end</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#6F42C1;">    replaceVue</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">      import &#39;./App.vue?type=style&#39;;</span></span>
<span class="line"><span style="color:#032F62;">      \${</span><span style="color:#6F42C1;">replaceVue</span><span style="color:#032F62;">(</span><span style="color:#24292E;">template</span><span style="color:#032F62;">.</span><span style="color:#24292E;">code</span><span style="color:#032F62;">)</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">      \${</span><span style="color:#6F42C1;">replaceVue</span><span style="color:#032F62;">(</span><span style="color:#24292E;">script</span><span style="color:#032F62;">.</span><span style="color:#24292E;">content</span><span style="color:#032F62;">.</span><span style="color:#6F42C1;">replace</span><span style="color:#032F62;">(</span><span style="color:#032F62;">&#39;export default&#39;</span><span style="color:#032F62;">, </span><span style="color:#032F62;">&#39;const _default_ =&#39;</span><span style="color:#032F62;">))</span><span style="color:#032F62;">};</span></span>
<span class="line"><span style="color:#032F62;">      _default_.render = render;</span></span>
<span class="line"><span style="color:#032F62;">      export default _default_;</span></span>
<span class="line"><span style="color:#032F62;">    \`</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3000</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Server started at http://localhost:3000&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>以上，对于以 ./ 或 ../ 开头的文件，解析实际路径并转换返回即可；对于 vue 这种模块，要先将其转换为 /vue 之类的路径格式，再返回 node_modules 目录下对应的文件内容；对于 .vue 文件，执行如下过程：</p><ul><li>使用 parse 解析 .vue 中的内容，得到组件描述符(descriptor)</li><li>使用 compileScript 编译，得到脚本内容，在此过程中会整合 script 和 setup</li><li>使用 compileTemplate 编译，得到 render 函数</li><li>使用 compilerStyle 编译，得到 css 字符串</li></ul><p>在 @vitejs/plugin-vue，template 和 script 在一起的，style 是单独的，估计是热更新好处理，以上代码也遵顼了这种逻辑。</p><h2 id="启动服务" tabindex="-1">启动服务 <a class="header-anchor" href="#启动服务" aria-label="Permalink to &quot;启动服务&quot;">​</a></h2><p>在项目根目录下，运行 <code>npx tsx ./server.ts</code> 命令后，浏览器打开即可。贴一张运行效果和具体网络请求吧，如下：</p>`,27),E=s("h2",{id:"最后",tabindex:"-1"},[e("最后 "),s("a",{class:"header-anchor",href:"#最后","aria-label":'Permalink to "最后"'},"​")],-1),u=s("p",null,"以上，通过一个简单的例子，模拟 @vitejs/plugin-vue 在 Vite 开发环境下的处理流程。此外也可以看到，通过解析/转换这种思路，Vite 理论上可以支持非常多的自定义请求。",-1);function d(F,C,m,A,h,g){const n=t("Image");return c(),p("div",null,[i,s("p",null,[l(n,{src:r,alt:"image",class:"cursor-pointer"})]),E,u])}const f=a(y,[["render",d]]);export{D as __pageData,f as default};