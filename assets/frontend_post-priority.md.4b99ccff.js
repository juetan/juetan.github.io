import{_ as n,I as s,o as r,c as i,k as t,M as l,W as a,a as d}from"./chunks/framework.d6d633f0.js";const o="/assets/image-date.d7a8026e.png",g="/assets/image-new.5f05f0da.png",v=JSON.parse('{"title":"从new xx()和new xx的区别中，整理JS中操作符的优先级","description":"","frontmatter":{"title":"从new xx()和new xx的区别中，整理JS中操作符的优先级","date":"2023-07-13T00:00:00.000Z"},"headers":[],"relativePath":"frontend/post-priority.md","filePath":"frontend/post-priority.md"}'),f={name:"frontend/post-priority.md"},y=a(`<p>最近在工作中写日期格式化时，遇到一个问题，先来看下面的代码：</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-light"><code><span class="line"><span style="color:#6A737D;">// 写法一</span></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Date</span><span style="color:#24292E;">().toISOString;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 写法二</span></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> Date.</span><span style="color:#6F42C1;">toISOString</span><span style="color:#24292E;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>运行结果如下：</p>`,3),x=t("p",null,[d("猜测是优先级的问题，然后在 MDN 找到了"),t("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_precedence#%E6%B1%87%E6%80%BB%E8%A1%A8",target:"_blank",rel:"noreferrer"},"答案"),d("，它们确实是两个不同的优先级，如下图：")],-1),c=a('<p>以上，方式一中的 <code>.</code> 优先级最高，但其左边需要先求值，因而先执行<code>new Date()</code>得到实例，再返回实例上的<code>toISOString</code>属性；而方式二中的 <code>. </code>优先级也是最高，但其左边不用求值，因而可以先执行<code>Date.toISOString</code>得到<code>toISOString</code>值(Date 上不存在该属性，因此该值为 undefined)，再尝试进行<code>new toISOString</code>操作时报错发生。</p><h2 id="优先级" tabindex="-1">优先级 <a class="header-anchor" href="#优先级" aria-label="Permalink to &quot;优先级&quot;">​</a></h2><p>我印象中的运算符只有四十几个，没想到在 MDN 里面找到的有六十几个。说实话，上面的运算符以前真没注意过，趁着空闲我决定将这些运算符整理下，整理后总体分为下面的五大类：</p><h3 id="一级运算符" tabindex="-1">一级运算符 <a class="header-anchor" href="#一级运算符" aria-label="Permalink to &quot;一级运算符&quot;">​</a></h3><p>大部分是一元操作符。</p><table><thead><tr><th style="text-align:left;">运算符</th><th style="text-align:left;">类型</th><th>说明</th></tr></thead><tbody><tr><td style="text-align:left;">( … )</td><td style="text-align:left;">分组</td><td>优先级最高的运算符</td></tr><tr><td style="text-align:left;">… . …</td><td style="text-align:left;">成员访问</td><td>静态访问</td></tr><tr><td style="text-align:left;">[]</td><td style="text-align:left;">需计算的成员访问</td><td>动态访问</td></tr><tr><td style="text-align:left;">new xx()</td><td style="text-align:left;">new（带参数列表）</td><td>实例化</td></tr><tr><td style="text-align:left;">()</td><td style="text-align:left;">函数调用</td><td>函数调用</td></tr><tr><td style="text-align:left;">?.</td><td style="text-align:left;">可选链（Optional chaining）</td><td><code>a?.b</code>类似于<code>a === null || a === void 0 ? void 0 : a.b;</code></td></tr><tr><td style="text-align:left;">new …</td><td style="text-align:left;">new（无参数列表）</td><td>实例化</td></tr><tr><td style="text-align:left;">… ++</td><td style="text-align:left;">后置递增</td><td>先返回再+1，例如 <code>let a = 1; const b = a++; // b: 1 a: 2</code>。比较常见的是在 for 循环中进行后置递增。</td></tr><tr><td style="text-align:left;">… --</td><td style="text-align:left;">后置递减</td><td>同上</td></tr><tr><td style="text-align:left;">! …</td><td style="text-align:left;">逻辑非 (!)</td><td></td></tr><tr><td style="text-align:left;">~ …</td><td style="text-align:left;">按位非 (~)</td><td></td></tr><tr><td style="text-align:left;">+ …</td><td style="text-align:left;">一元加法 (+)</td><td>可用于把字符串转换为数值，例如<code>+&#39;1&#39;</code>将得到<code>1</code>。</td></tr><tr><td style="text-align:left;">- …</td><td style="text-align:left;">一元减法 (-)</td><td>同上</td></tr><tr><td style="text-align:left;">++ …</td><td style="text-align:left;">前置递增</td><td>与后置递增不同，先执行+1 再返回</td></tr><tr><td style="text-align:left;">-- …</td><td style="text-align:left;">前置递减</td><td>同上</td></tr><tr><td style="text-align:left;">typeof …</td><td style="text-align:left;">typeof</td><td>返回值只有这几个：string | number | boolean | undefined | null | function | object</td></tr><tr><td style="text-align:left;">void …</td><td style="text-align:left;">void</td><td>比较常见的是使用<code>void 0</code>代替 undefined，因为在以前 undefined 是可以作为变量名使用的。</td></tr><tr><td style="text-align:left;">delete …</td><td style="text-align:left;">delete</td><td>删除对象的属性</td></tr><tr><td style="text-align:left;">await …</td><td style="text-align:left;">await</td><td>等待某个 promise 执行成功</td></tr></tbody></table><h3 id="算符运算符" tabindex="-1">算符运算符 <a class="header-anchor" href="#算符运算符" aria-label="Permalink to &quot;算符运算符&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">运算符</th><th style="text-align:left;">类型</th><th>说明</th></tr></thead><tbody><tr><td style="text-align:left;">… ** …</td><td style="text-align:left;">幂 (**)</td><td></td></tr><tr><td style="text-align:left;">… * …</td><td style="text-align:left;">乘法 (*)</td><td></td></tr><tr><td style="text-align:left;">… / …</td><td style="text-align:left;">除法 (/)</td><td></td></tr><tr><td style="text-align:left;">… % …</td><td style="text-align:left;">取余 (%)</td><td></td></tr><tr><td style="text-align:left;">… + …</td><td style="text-align:left;">加法 (+)</td><td></td></tr><tr><td style="text-align:left;">… - …</td><td style="text-align:left;">减法 (-)</td><td></td></tr><tr><td style="text-align:left;">… &lt;&lt; …</td><td style="text-align:left;">按位左移 (&lt;&lt;)</td><td>通常用于二进制数据的移位, 例如：<code>(4)&lt;&lt;1</code> 将得到<code>8</code>。过程：十进制<code>4</code>转换为二进制<code>100</code>, 左移一位得到<code>1000</code>，再转换为十进制即为<code>8</code>。</td></tr><tr><td style="text-align:left;">… &gt;&gt; …</td><td style="text-align:left;">按位右移 (&gt;&gt;)</td><td>同上</td></tr><tr><td style="text-align:left;">… &gt;&gt;&gt; …</td><td style="text-align:left;">无符号右移 (&gt;&gt;&gt;)</td><td>同上</td></tr><tr><td style="text-align:left;">… &lt; …</td><td style="text-align:left;">小于 (&lt;)</td><td>对于数值，比较大小</td></tr><tr><td style="text-align:left;">… &lt;= …</td><td style="text-align:left;">小于等于 (&lt;=)</td><td></td></tr><tr><td style="text-align:left;">… &gt; …</td><td style="text-align:left;">大于 (&gt;)</td><td></td></tr><tr><td style="text-align:left;">… &gt;= …</td><td style="text-align:left;">大于等于 (&gt;=)</td><td></td></tr></tbody></table><h3 id="比较运算符" tabindex="-1">比较运算符 <a class="header-anchor" href="#比较运算符" aria-label="Permalink to &quot;比较运算符&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">运算符</th><th style="text-align:left;">类型</th><th>说明</th></tr></thead><tbody><tr><td style="text-align:left;">… in …</td><td style="text-align:left;">in</td><td>判断某个属性是否存在于对象上，会顺着原型链进行查找，可以用<code>Object.prototype.hasOwnProperty.call(obj, &#39;xx&#39;)</code>进行检测自身的属性是否存在。</td></tr><tr><td style="text-align:left;">… instanceof …</td><td style="text-align:left;">instanceof</td><td>判断右边的对象，是否在左边对象的原型链上。</td></tr><tr><td style="text-align:left;">… == …</td><td style="text-align:left;">相等 (==)</td><td>左右两边的值可能会先做隐式转换，再进行比较，例如: <code>&#39;1&#39; == 1 //true</code></td></tr><tr><td style="text-align:left;">… != …</td><td style="text-align:left;">不相等 (!=)</td><td>同上</td></tr><tr><td style="text-align:left;">… === …</td><td style="text-align:left;">一致/严格相等 (===)</td><td>左右两边的值不做隐式转换，直接比较，例如：<code>&#39;1&#39; === 1 // false</code></td></tr><tr><td style="text-align:left;">… !== …</td><td style="text-align:left;">不一致/严格不相等 (!==)</td><td>同上</td></tr></tbody></table><h3 id="布尔运算符" tabindex="-1">布尔运算符 <a class="header-anchor" href="#布尔运算符" aria-label="Permalink to &quot;布尔运算符&quot;">​</a></h3><p>| 运算符 | 类型 | 说明 | | :------------- | :------------------ | --------------------------------------------------------------------------------------------------------------------------- | --- | | … &amp; … | 按位与 (&amp;) | 常用于对二进制数值进行操作 | | … ^ … | 按位异或 (^) | | … | … | 按位或 (|) | | … &amp;&amp; … | 逻辑与 (&amp;&amp;) | | … || … | 逻辑或 ( | | ) | | … ?? … | 空值合并 (??) | 当左边的值不为 undefined 或 null 时，返回左边，否则返回右边， 具体代码可能是这样的\\n: <code>a !== null &amp;&amp; a !== void 0 ? a : b;</code> |</p><h3 id="赋值运算符" tabindex="-1">赋值运算符 <a class="header-anchor" href="#赋值运算符" aria-label="Permalink to &quot;赋值运算符&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">运算符</th><th style="text-align:left;">类型</th><th>说明</th></tr></thead><tbody><tr><td style="text-align:left;">… ? … : …</td><td style="text-align:left;">条件（三元）运算符</td><td>可以在简单场景中代替 if/else 使用，不过自从出了??运算符，这个运算符用的比较少</td></tr><tr><td style="text-align:left;">… = …</td><td style="text-align:left;">赋值</td><td></td></tr><tr><td style="text-align:left;">… += …</td><td style="text-align:left;"></td><td></td></tr><tr><td style="text-align:left;">… -= …</td><td style="text-align:left;"></td><td></td></tr><tr><td style="text-align:left;">… **= …</td><td style="text-align:left;"></td><td></td></tr><tr><td style="text-align:left;">… *= …</td><td style="text-align:left;"></td><td></td></tr><tr><td style="text-align:left;">… /= …</td><td style="text-align:left;"></td><td></td></tr><tr><td style="text-align:left;">… %= …</td><td style="text-align:left;"></td><td></td></tr><tr><td style="text-align:left;">… &lt;&lt;= …</td><td style="text-align:left;"></td><td></td></tr><tr><td style="text-align:left;">… &gt;&gt;= …</td><td style="text-align:left;"></td><td></td></tr><tr><td style="text-align:left;">… &gt;&gt;&gt;= …</td><td style="text-align:left;"></td><td></td></tr><tr><td style="text-align:left;">… &amp;= …</td><td style="text-align:left;"></td><td></td></tr><tr><td style="text-align:left;">… ^= …</td><td style="text-align:left;"></td><td></td></tr><tr><td style="text-align:left;">…</td><td style="text-align:left;">= …</td><td></td></tr><tr><td style="text-align:left;">… &amp;&amp;= …</td><td style="text-align:left;"></td><td></td></tr><tr><td style="text-align:left;">…</td><td style="text-align:left;"></td><td>= …</td></tr><tr><td style="text-align:left;">… ??= …</td><td style="text-align:left;"></td><td></td></tr><tr><td style="text-align:left;">… , …</td><td style="text-align:left;">逗号 / 序列</td><td>优先级最低的运算符，由于其会返回最后一个值，在某些简短操作中也会用到，例如：<code>const map = items.reduce((m, i) =&gt; (m[i.id]=i,m), {})</code></td></tr></tbody></table><h2 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h2><p>优先级的重要性不言而喻，往后还是要多多温习。</p>',16);function p(h,b,m,u,_,S){const e=s("Image");return r(),i("div",null,[y,t("p",null,[l(e,{src:o,class:"cursor-pointer"})]),x,t("p",null,[l(e,{src:g,class:"cursor-pointer"})]),c])}const P=n(f,[["render",p]]);export{v as __pageData,P as default};
