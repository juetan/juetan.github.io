import{_ as s,o as a,c as n,W as l}from"./chunks/framework.d6d633f0.js";const g=JSON.parse('{"title":"GO：变量声明和变量类型","description":"","frontmatter":{"title":"GO：变量声明和变量类型","date":"2023-09-07T19:17:00.000Z"},"headers":[],"relativePath":"go/02.var/index.md","filePath":"go/02.var/index.md"}'),o={name:"go/02.var/index.md"},p=l(`<p>Go 的语法跟其他语言类似</p><h2 id="声明变量" tabindex="-1">声明变量 <a class="header-anchor" href="#声明变量" aria-label="Permalink to &quot;声明变量&quot;">​</a></h2><p>使用 var name type = value 语法声明变量，声明时变量类型和初始值至少得提供一个，当只提供类型时，默认值为零值(字符串为 &quot;&quot;，整型为 0，布尔为 false)。如下：</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> name </span><span style="color:#D73A49;">string</span><span style="color:#24292E;">;                     </span><span style="color:#6A737D;">// 提供类型，初始值值为：&quot;&quot;</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">18</span><span style="color:#24292E;">;                        </span><span style="color:#6A737D;">// 提供初始值，类型推导为 int</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> email </span><span style="color:#D73A49;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;1@exmple.com&quot;</span><span style="color:#24292E;">;   </span><span style="color:#6A737D;">// 同时提供</span></span></code></pre></div><p>支持同时声明多变量，使用圆括号包裹声明内容，等号左边是变量名和类型，多个变量名以逗号隔开，可同时为多个变量指定同一类型，等号右边是变量值，多个变量值以逗号隔开，如下：</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> ( x, y </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> );        </span><span style="color:#6A737D;">// 同类型</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> (z, z1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">);    </span><span style="color:#6A737D;">// 带默认值</span></span></code></pre></div><p>在函数内部，可使用 name := value 语法声明短变量，同时声明多个短变量时可覆盖同名变量，但至少得有一个新变量，如下：</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-light"><code><span class="line"><span style="color:#24292E;">in, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> os.</span><span style="color:#005CC5;">Open</span><span style="color:#24292E;">(infile)</span></span>
<span class="line"><span style="color:#24292E;">out, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> os.</span><span style="color:#005CC5;">Create</span><span style="color:#24292E;">(outfile) </span><span style="color:#6A737D;">// out 是新变量，err 覆盖前面的同名变量</span></span></code></pre></div><h2 id="声明常量" tabindex="-1">声明常量 <a class="header-anchor" href="#声明常量" aria-label="Permalink to &quot;声明常量&quot;">​</a></h2><p>使用 <code>const &lt;NAME&gt; &lt;type&gt; = &lt;value&gt;</code> 语法声明常量，其中类型可忽略交由编译器推断，值需要指定一个具体值。通常用于指定一个固定值，例如圆周率等</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> PI </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3.131492654</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">  x uint16 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span></span>
<span class="line"><span style="color:#24292E;">  y                       </span><span style="color:#6A737D;">// y 和 x 相等</span></span>
<span class="line"><span style="color:#24292E;">  z </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">)</span></span></code></pre></div><h2 id="简单变量" tabindex="-1">简单变量 <a class="header-anchor" href="#简单变量" aria-label="Permalink to &quot;简单变量&quot;">​</a></h2><p>简单变量，指的是存储在栈结构上，长度相对固定且占用内存不大的数据结构，例如字符串、数字和布尔等数据类型。基础类型是基础，复杂类型如数组等也是由这些类型封装而成的。</p><h3 id="字符串" tabindex="-1">字符串 <a class="header-anchor" href="#字符串" aria-label="Permalink to &quot;字符串&quot;">​</a></h3><p>类型为 string</p><h3 id="整形" tabindex="-1">整形 <a class="header-anchor" href="#整形" aria-label="Permalink to &quot;整形&quot;">​</a></h3><p>整形，分为 无符号(uint) 和 有符号(int) 两类，有无符号指的是有无正负符号。无符号不包含负数(首位为0)，而有符号类型包含负数(首位为 0 代表正数，首位为 1 代表负数)，u 是 unsinged 的简写，int 是 integer 的简写，例如：</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> x </span><span style="color:#D73A49;">int8</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 无符号8位，范围：0 ~ 255</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> y </span><span style="color:#D73A49;">uint8</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 有符号8位，范围：-128 ~ 127</span></span></code></pre></div><p>长度有 8、16、32、64 和 int 五种，其中 int 取决于操作系统，在 32 位操作系统上 int 长度为 32，在 64 位操作系统上 int 长度为 64。两两相交，共有如下类型：</p><table><thead><tr><th>符号</th><th>8 位</th><th>16 位</th><th>32 位</th><th>64 位</th><th>系统位</th></tr></thead><tbody><tr><td>有符号</td><td>int8</td><td>int16</td><td>int32</td><td>int64</td><td>int</td></tr><tr><td>无符号</td><td>uint8</td><td>uint16</td><td>uint32</td><td>uint64</td><td>uint</td></tr></tbody></table><h3 id="浮点型" tabindex="-1">浮点型 <a class="header-anchor" href="#浮点型" aria-label="Permalink to &quot;浮点型&quot;">​</a></h3><p>浮点型，点指的是小数点，浮点顾名思义小数点的位置是浮动的。分为 float32 和 float64 两种，其中 float32 也称单精度浮点数，而 float64 称为双精度浮点数。浮点数都是有符号的，示例如下：</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> x </span><span style="color:#D73A49;">float32</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0.1</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> y </span><span style="color:#D73A49;">float64</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0.1</span></span></code></pre></div><h3 id="布尔型" tabindex="-1">布尔型 <a class="header-anchor" href="#布尔型" aria-label="Permalink to &quot;布尔型&quot;">​</a></h3><p>包含两个值：true(真) 和 false(假)。</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> f </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span></code></pre></div>`,26),t=[p];function e(c,r,i,y,d,h){return a(),n("div",null,t)}const E=s(o,[["render",e]]);export{g as __pageData,E as default};
