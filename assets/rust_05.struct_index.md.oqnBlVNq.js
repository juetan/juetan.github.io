import{_ as s,o as n,c as a,S as l}from"./chunks/framework.doOmauVw.js";const m=JSON.parse('{"title":"Rust系列[四]：结构体","description":"","frontmatter":{"title":"Rust系列[四]：结构体","date":"2023-08-31T14:43:00.000Z","thumbnail":"/assets/rust.webp"},"headers":[],"relativePath":"rust/05.struct/index.md","filePath":"rust/05.struct/index.md"}'),p={name:"rust/05.struct/index.md"},e=l(`<p>结构体，类似于其他语言中的对象，拥有属性和属性值，注意没有方法只有属性。与元组相比，两者都可以存储不同类型的值，但结构体可以为每个成员定义名字，语法如下：</p><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">struct</span><span style="color:#6F42C1;"> Animal</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  name</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;"> String</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="元组结构体" tabindex="-1">元组结构体 <a class="header-anchor" href="#元组结构体" aria-label="Permalink to &quot;元组结构体&quot;">​</a></h2><p>指的是没有名字的结构体，类似元组。</p><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">struct</span><span style="color:#6F42C1;"> Color</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">i32</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">i32</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">i32</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">struct</span><span style="color:#6F42C1;"> Point</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">i32</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">i32</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">i32</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">fn</span><span style="color:#6F42C1;"> main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#D73A49;">    let</span><span style="color:#24292E;"> black </span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;"> Color</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">    let</span><span style="color:#24292E;"> origin </span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;"> Point</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="单元结构体" tabindex="-1">单元结构体 <a class="header-anchor" href="#单元结构体" aria-label="Permalink to &quot;单元结构体&quot;">​</a></h2><p>指的是没有任何字段的结构体, 这样构建出来的每个实例都是相同的。</p><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">struct</span><span style="color:#6F42C1;"> A</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;"> A</span><span style="color:#24292E;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="关联函数" tabindex="-1">关联函数 <a class="header-anchor" href="#关联函数" aria-label="Permalink to &quot;关联函数&quot;">​</a></h2><p>结构体的方法，需要单独使用 <code>impl</code> 实现，如下：</p><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">struct</span><span style="color:#6F42C1;"> Rectangle</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  width</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;"> u32</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  height</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;"> u32</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">impl</span><span style="color:#6F42C1;"> Rectangle</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6A737D;">  // 实例方法，第一个参数为self</span></span>
<span class="line"><span style="color:#D73A49;">  fn</span><span style="color:#6F42C1;"> area</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">-&gt;</span><span style="color:#6F42C1;"> u32</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#005CC5;">    self</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">width </span><span style="color:#D73A49;">*</span><span style="color:#005CC5;"> self</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">height</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">  // 静态方法，第一个参数不为self</span></span>
<span class="line"><span style="color:#D73A49;">  fn</span><span style="color:#6F42C1;"> square</span><span style="color:#24292E;">(size</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;"> u32</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">-&gt;</span><span style="color:#005CC5;"> Self</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#005CC5;">    Self</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      width</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> size,</span></span>
<span class="line"><span style="color:#24292E;">      height</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> size,</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">fn</span><span style="color:#6F42C1;"> main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#D73A49;">  let</span><span style="color:#24292E;"> a1 </span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;"> Rectangle</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    width</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;"> 20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    height</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;"> 10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#D73A49;">  let</span><span style="color:#24292E;"> a2 </span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;"> Rectangle</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">square</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6F42C1;">  println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a1 的面积：{}&quot;</span><span style="color:#24292E;">, a</span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">area</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#6F42C1;">  println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a2 的面积：{}&quot;</span><span style="color:#24292E;">, a</span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">area</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>以上，<code>impl</code> 是 implement 的缩写，里面包含函数声明，因这些函数与结构体关联，因此也叫关联函数。关联函数中，第一个参数为 <code>self</code> 的视为实例方法，在实例上调用；第一个参数不为 <code>self</code> 的视为静态方法，在结构体上调用。</p><h2 id="枚举" tabindex="-1">枚举 <a class="header-anchor" href="#枚举" aria-label="Permalink to &quot;枚举&quot;">​</a></h2><p>枚举是一个类似于结构体的数据结构，每个属性都可以包含不同的值，但不一样的是，枚举可以作为多个类型的统一集合，作为参数类型时非常有用。</p><p>例如，我们有一个ip地址，可能是 ipv4 或 ipv6 ，ipv4 是一个长度为 4 的元组，ipv6 是一个字符串，用枚举可以这样：</p><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#24292E;">#[derive(</span><span style="color:#6F42C1;">Debug</span><span style="color:#24292E;">)]</span></span>
<span class="line"><span style="color:#D73A49;">enum</span><span style="color:#6F42C1;"> IpAddr</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6F42C1;">  Ipv4</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">u8</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">u8</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">u8</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">u8</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#6F42C1;">  Ipv6</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">fn</span><span style="color:#6F42C1;"> get_ip</span><span style="color:#24292E;">(ip</span><span style="color:#D73A49;">:</span><span style="color:#D73A49;"> &amp;</span><span style="color:#6F42C1;">IpAddr</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">-&gt;</span><span style="color:#6F42C1;"> String</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">  match</span><span style="color:#24292E;"> ip {</span></span>
<span class="line"><span style="color:#6F42C1;">    IpAddr</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Ipv4</span><span style="color:#24292E;">(i1,i2,i3,i4) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#6F42C1;"> format!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;{i1},{i2},{i3},{i4}&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#6F42C1;">    IpAddr</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Ipv6</span><span style="color:#24292E;">(v) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> v</span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">clone</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">fn</span><span style="color:#6F42C1;"> main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#D73A49;">  let</span><span style="color:#24292E;"> ip4 </span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;"> IpAddr</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Ipv4</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">  let</span><span style="color:#24292E;"> ip6 </span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;"> IpAddr</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Ipv6</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">String</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">from</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;fxxx&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#D73A49;">  let</span><span style="color:#24292E;"> ip4v </span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;"> get_ip</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">ip4);</span></span>
<span class="line"><span style="color:#D73A49;">  let</span><span style="color:#24292E;"> ip6v </span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;"> get_ip</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">ip6);</span></span>
<span class="line"><span style="color:#6A737D;">  // ipv4: Ipv4(1, 1, 1, 1), ipv6: Ipv6(&quot;fxxx&quot;)</span></span>
<span class="line"><span style="color:#6F42C1;">  println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ipv4: {ip4:?}, ipv6: {ip6:?}&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6A737D;">  // ipv4: 1,1,1,1, ipv6: fxxx</span></span>
<span class="line"><span style="color:#6F42C1;">  println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ipv4: {ip4v}, ipv6: {ip6v}&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="match语法" tabindex="-1">match语法 <a class="header-anchor" href="#match语法" aria-label="Permalink to &quot;match语法&quot;">​</a></h2><p>match 是个基于匹配的控制结构，它也可以对枚举进行匹配，如下：</p><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-light vp-code"><code><span class="line"></span>
<span class="line"><span style="color:#D73A49;">enum</span><span style="color:#6F42C1;"> Weekday</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6F42C1;">  Monday</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#6F42C1;">  Tuesday</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#6F42C1;">  Webnesday</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#6F42C1;">  Thursday</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#6F42C1;">  Friday</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#6F42C1;">  Sunday</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#6F42C1;">  Satiday</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">fn</span><span style="color:#6F42C1;"> say</span><span style="color:#24292E;">(day</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;"> Weekday</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#D73A49;">  match</span><span style="color:#24292E;"> day {</span></span>
<span class="line"><span style="color:#6F42C1;">    Monday</span><span style="color:#D73A49;"> =&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6F42C1;">      println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;monday&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#6F42C1;">    Tuesday</span><span style="color:#D73A49;"> =&gt;</span><span style="color:#6F42C1;"> sayOther</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#D73A49;">    -</span><span style="color:#D73A49;"> =&gt;</span><span style="color:#24292E;"> ()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>以上代码中，<code>=&gt;</code> 后面可以是表达式或者语句块，<code>- =&gt; ()</code> 匹配剩余的项，<code>-</code> 表示不使用该参数但又不希望编译器警告， <code>()</code> 是个单元元组，在这里表示不做处理。</p><h2 id="if-let控制流" tabindex="-1">if let控制流 <a class="header-anchor" href="#if-let控制流" aria-label="Permalink to &quot;if let控制流&quot;">​</a></h2><p>可以理解为 match 的语法糖，仅在匹配到某个值时执行，如下：</p><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">enum</span><span style="color:#6F42C1;"> Weekday</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6F42C1;">  Monday</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#6F42C1;">  Tuesday</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#6F42C1;">  Webnesday</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#6F42C1;">  Thursday</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#6F42C1;">  Friday</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#6F42C1;">  Sunday</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#6F42C1;">  Satiday</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">fn</span><span style="color:#6F42C1;"> say</span><span style="color:#24292E;">(day</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;"> Weekday</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#D73A49;">  if</span><span style="color:#D73A49;"> let</span><span style="color:#24292E;"> day </span><span style="color:#D73A49;">==</span><span style="color:#6F42C1;"> Weekday</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Monday</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6F42C1;">    println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;monday&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6F42C1;">    println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;otherday&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div>`,23),o=[e];function r(c,t,i,y,b,u){return n(),a("div",null,o)}const E=s(p,[["render",r]]);export{m as __pageData,E as default};
