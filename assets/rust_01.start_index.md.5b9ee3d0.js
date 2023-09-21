import{_ as e,I as p,o as r,c as t,k as s,M as l,W as o,a as n}from"./chunks/framework.d6d633f0.js";const c="/assets/image-vs-dl.ef00efaf.png",i="/assets/image-vs-cpp.2a4bc46a.png",u="/assets/image-vs-comp.240f59a1.png",y="/assets/image-vs-lang.622bb572.png",d="/assets/image-rustup-dl.d92c30e8.png",m="/assets/image-rustup-install.a4595638.png",b="/assets/image-rustup-ver.1a93928f.png",_="/assets/image-rust-compile.287ed95b.png",g="/assets/image-rust-exec.767bb5c4.png",h="/assets/image-cargo-new.801ff44e.png",E="/assets/image-cargo-run.030ac84b.png",C="/assets/image-cargo-target.03155175.png",Z=JSON.parse('{"title":"Rust系列[一]：安装和上手","description":"","frontmatter":{"title":"Rust系列[一]：安装和上手","date":"2023-08-25T11:50:00.000Z","categories":"rust","tags":"rust"},"headers":[],"relativePath":"rust/01.start/index.md","filePath":"rust/01.start/index.md"}'),A={name:"rust/01.start/index.md"},D=o('<p>Rust 是一门高性能、高安全性的系统级编程语言，最初旨在作为 C 和 C++ 的更安全替代品。Rust 直译为铁锈，起名来源于一种特别健壮的真菌，这种真菌 &quot;为了生存而过度设计&quot;。灵感来源于霍尔公寓楼里的一部坏电梯，这些设备的软件通常是 C 或 C++ 写的，这些语言需要手动管理大量内存，存在崩溃的可能，因此 Hoare 开始研究一种即紧凑又没有内存错误的语言。</p><h2 id="为什么学习" tabindex="-1">为什么学习 <a class="header-anchor" href="#为什么学习" aria-label="Permalink to &quot;为什么学习&quot;">​</a></h2><p>要说理由的话，大概有以下几个：</p><ul><li>想学一门偏底层的语言</li><li>部分概念跟NodeJS类似，let/const关键字，包管理器等</li></ul><h2 id="历史" tabindex="-1">历史 <a class="header-anchor" href="#历史" aria-label="Permalink to &quot;历史&quot;">​</a></h2><p>比起 Java/Python 等众多上世纪九十年创建的编程语言，Rust 算是一门比较年轻的语言，因而没什么历史包袱且从前辈那里学来很多思想，学习到的概念不至于太模糊。</p><ul><li>2006 年：作为 Mozilla 开发者 Grayon Hoare 的个人项目开始</li><li>2009 年：Mozilla 赞助该项目。</li><li>2010 年：Mozilla 正式宣布 Rust 项目。</li><li>2015 年：Rust 1.0 发布。</li></ul><h2 id="安装-rust" tabindex="-1">安装 Rust <a class="header-anchor" href="#安装-rust" aria-label="Permalink to &quot;安装 Rust&quot;">​</a></h2><p>在不同操作系统上，安装的方式和步骤略有差异，这里以 Windows 操作系统为例。在 Windows 上，Rust 的安装分为两部分：c++依赖的安装，rustup 的安装。</p><h3 id="安装-c-依赖" tabindex="-1">安装 C++ 依赖 <a class="header-anchor" href="#安装-c-依赖" aria-label="Permalink to &quot;安装 C++ 依赖&quot;">​</a></h3><p>Rust 依赖于 c++ 环境，为什么不在安装包内置而需要单独安装呢？个人猜测，这部分依赖是比较常用的，如果每个工具都单独内置一份会造成极大浪费(源于硬件落后的年代)，且 Rust 大部分用户可能是 C/C++ 用户且他们已安装有此类环境。安装方式有很多，这里选择通过 VS 安装。</p><ol><li>通过 <a href="https://visualstudio.microsoft.com/zh-hans/downloads/" target="_blank" rel="noreferrer">官网</a> 下载 VS 社区版并安装。</li></ol>',12),F=s("ol",{start:"2"},[s("li",null,[n("选择 "),s("code",null,"使用C++的桌面开发"),n(" 选项")])],-1),q=s("ol",{start:"3"},[s("li",null,"选择对应操作系统的开发组件")],-1),f=s("ol",{start:"4"},[s("li",null,"选择英文语言包及其他语言包")],-1),v=o('<p>点击 <code>安装</code> 按钮等待下载和安装，我所选的依赖有 2G+大小，网速不好的话估计得等好一会。安装后之后，就可以接下来下一步的安装了。</p><h3 id="安装-rustup" tabindex="-1">安装 Rustup <a class="header-anchor" href="#安装-rustup" aria-label="Permalink to &quot;安装 Rustup&quot;">​</a></h3><p>Rustup 是 Rust 的版本管理和命令行工具。Rust 的安装有<a href="https://forge.rust-lang.org/infra/other-installation-methods.html" target="_blank" rel="noreferrer">很多方式</a>，这里以官方推荐的 Rustup 为例。</p><ol><li>通过 <a href="https://www.rust-lang.org/tools/install" target="_blank" rel="noreferrer">官网</a> 下载 Rustup 并安装。</li></ol>',4),R=s("ol",{start:"2"},[s("li",null,"选择默认方式即可，等待依赖下载和安装.")],-1),T=s("ol",{start:"3"},[s("li",null,[n("安装完重新打开命令行，输入 "),s("code",null,"rustc --version"),n(" 应该有输出，代表安装成功。")])],-1),k=o(`<p>至此，Rust 安装已完成。</p><h2 id="写个示例" tabindex="-1">写个示例 <a class="header-anchor" href="#写个示例" aria-label="Permalink to &quot;写个示例&quot;">​</a></h2><p>Rust 是一门编译型语言，需要先编译再运行，比起 JavaScript 等解释型语言，Rust 会直接编译成可以运行的软件而无需任何解释器。接下来写个小示例看看，请上最经典的 hello, world 示例。</p><ol><li>在任意目录下新建 main.rs 文件，编写代码如下：</li></ol><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-light"><code><span class="line"><span style="color:#D73A49;">fn</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Hello, world!&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>以上代码中：</p><ul><li><code>fn</code> 是 function 的缩写，表示声明一个函数</li><li><code>main</code> 是函数名，当名字为 main 时作为命令行程序的入口</li><li><code>println</code> 用于打印带换行符的字符串，<code>!</code> 表示这是个编译宏。</li></ul><ol start="2"><li>运行 rustc ./main.ts 命令，然后你应该能看到当前目录下多出两个文件：main.exe 和 main.pdb</li></ol>`,8),S=s("p",null,"其中：",-1),x=s("ul",null,[s("li",null,[s("code",null,"rustc"),n(" 是 Rust 的编译命令，类似于 javac，其中的 c 是 compile 的缩写，这个命令是跟随 rustup 安装的。")]),s("li",null,[s("code",null,".exe"),n(" 是 Windows 平台下可执行文件的后缀名")]),s("li",null,[s("code",null,".pdb"),n(" 是一个包含调试信息的文件")])],-1),P=s("ol",{start:"3"},[s("li",null,"运行 ./main.exe 命令，不出意外的话能看到如下的输出")],-1),w=s("h2",{id:"包管理工具",tabindex:"-1"},[n("包管理工具 "),s("a",{class:"header-anchor",href:"#包管理工具","aria-label":'Permalink to "包管理工具"'},"​")],-1),N=s("p",null,[n("类似于 NodeJS 有 npm 工具，Rust 也有自己的包管理工具："),s("code",null,"cargo"),n("(直译为货物)。通常来说，别人写好并发布出来的代码包，叫第三方库，但在不同语言间也有不同叫法。例如，在 NodeJS 中第三方库称为 package，而在 Rust 中称为 crate(直译为运货用的大木箱)。")],-1),V=s("p",null,"接下来，写个小项目感受下：系统生成一个随机数，我们输入一个数，然后系统会提示我们大了、小了还是相等。在生成随机数时，会用到一个叫 rand 的 crate(第三方库)",-1),I=s("ol",null,[s("li",null,[n("运行 "),s("code",null,"cargo new <name>"),n(" 命令，此时会生成如下的目录和文件")])],-1),O=o(`<p>其中：</p><ul><li><code>cargo</code> 是 Rust 的包管理命令，同时也是构建命令，这个命令是随 <code>rustup</code> 安装的</li><li><code>Cargo.toml</code> 是 Cargo 的配置文件，类似于 NodeJS 中的 package.json 文件</li><li><code>src/main.rs</code> 是 Cargo 项目的入口</li></ul><ol start="2"><li>打开 <code>Cargo.toml</code> 文件，添加 rand 依赖，.toml 是一种类似于 json/yaml 的文件格式。</li></ol><div class="language-toml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-light"><code><span class="line"><span style="color:#6A737D;">#...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#6F42C1;">dependencies</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">rand = </span><span style="color:#032F62;">&quot;0.8.5&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#...</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ol start="3"><li>打开 <code>src/main.rs</code> 文件，编写我们的代码</li></ol><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-light"><code><span class="line"><span style="color:#D73A49;">use</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">io;</span></span>
<span class="line"><span style="color:#D73A49;">use</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">rand</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Rng</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">use</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">cmp</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Ordering</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">fn</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;欢迎来到猜数游戏&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> secret_number </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">rand</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">thread_rng</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">gen_range</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">..=</span><span style="color:#005CC5;">100</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;请输入你的猜数：&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">mut</span><span style="color:#24292E;"> guess </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">new</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">io</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">stdin</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">read_line</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;mut</span><span style="color:#24292E;"> guess)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Failed to read line&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> guess</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">u32</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> guess</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">trim</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;请输入一个数字&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">match</span><span style="color:#24292E;"> guess</span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">cmp</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">secret_number) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">Ordering</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Less</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;小了, 数字是: {}&quot;</span><span style="color:#24292E;">, secret_number),</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">Ordering</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Greater</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;大了, 数字是: {}&quot;</span><span style="color:#24292E;">, secret_number),</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">Ordering</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Equal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;相等&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>上面的代码，涉及的语法有点多，我们来慢慢看下，首先是顶部的声明：</p><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-light"><code><span class="line"><span style="color:#D73A49;">use</span><span style="color:#24292E;"> std</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">io</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li><code>use</code> 表示使用某个模块，类似于 NodeJS 的 import 语法</li><li><code>std</code> 表示内置的标准库，std 是 standard 的缩写</li><li><code>::</code> 表示子成员，在对象上表示其静态成员</li><li><code>io</code> 是输出输出库，io 是 input/output 的缩写</li></ul><p>接下来是：</p><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> secret_number </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">rand</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">thread_rng</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">gen_range</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">..=</span><span style="color:#005CC5;">100</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">mut</span><span style="color:#24292E;"> guess </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">new</span><span style="color:#24292E;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li><code>let</code> 用于声明一个变量，听起来可变但默认是不可变的，允许用 <code>mut</code> 标识为可变</li><li><code>1..=100</code> 表示 1 到 100 范围(左闭右闭)，如果是 1..100 就是 1 到 99(左闭右开)。</li><li><code>mut</code> 表示该可修改，mut 是 mutable 的缩写</li></ul><p>再接下来是</p><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-light"><code><span class="line"><span style="color:#6F42C1;">io</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">stdin</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">read_line</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;mut</span><span style="color:#24292E;"> guess)</span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">expect</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Failed to read line&quot;</span><span style="color:#24292E;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li><code>&amp;</code> 表示对某个变量的引用</li><li><code>&amp;mut</code> 表示可修改的变量引用</li><li><code>expect</code> 表示期望有值，否则报错并将传入的参数设为异常消息</li></ul><p>最后是</p><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-light"><code><span class="line"><span style="color:#D73A49;">match</span><span style="color:#24292E;"> guess</span><span style="color:#D73A49;">.</span><span style="color:#6F42C1;">cmp</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">secret_number) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">Ordering</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Less</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;小了&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">Ordering</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Greater</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;大了&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">Ordering</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Equal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">println!</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;相等&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul><li><code>match</code> 用于匹配某个值，类似于 switch 语法</li><li><code>cmp</code> 方法用于比对两个数字，返回一个枚举(即 Ordering)。cmp 是 compare 的缩写</li><li><code>Ordering</code> 是一个枚举值，包含 Less/Greater/Equal 成员</li></ul><ol start="4"><li>运行 <code>cargo run</code> 命令，此时会先下载我们刚写入的 rand 依赖，然后再编译执行，如下：</li></ol>`,19),J=s("ol",{start:"5"},[s("li",null,[n("同时，当前目录下多个 "),s("code",null,"target"),n(" 目录，默认是debug模式，"),s("code",null,"debug"),n(" 目录放着我们刚才编译好的文件。可以通过 "),s("code",null,"--release"),n(" 参数指定为release模式，生成好的文件将在 "),s("code",null,"target/release"),n(" 目录下。")])],-1),G=o('<h2 id="学习资料" tabindex="-1">学习资料 <a class="header-anchor" href="#学习资料" aria-label="Permalink to &quot;学习资料&quot;">​</a></h2><ul><li><a href="https://course.rs/about-book.html" target="_blank" rel="noreferrer">Rust语言圣经</a></li><li><a href="https://rusty.course.rs/about.html" target="_blank" rel="noreferrer">Rusty Book-常用库和代码片段</a></li><li><a href="https://doc.rust-lang.org/cargo/index.html" target="_blank" rel="noreferrer">Cargo 官方文档</a></li></ul><h2 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h2><p>以上简单了解了几个关于 Rust 的重要概念：</p><ul><li>rustup 是 Rust 的版本管理工具，如同 NodeJS 中的 nvm。</li><li>rustc 是 Rust 的编译命令</li><li>cargo 是 Rust 的包管理和构建命令</li><li>crate 是 Rust 对于第三方库的叫法</li></ul>',5);function z(B,M,W,$,j,H){const a=p("Image");return r(),t("div",null,[D,s("p",null,[l(a,{src:c,class:"cursor-pointer"})]),F,s("p",null,[l(a,{src:i,class:"cursor-pointer"})]),q,s("p",null,[l(a,{src:u,class:"cursor-pointer"})]),f,s("p",null,[l(a,{src:y,class:"cursor-pointer"})]),v,s("p",null,[l(a,{src:d,class:"cursor-pointer"})]),R,s("p",null,[l(a,{src:m,class:"cursor-pointer"})]),T,s("p",null,[l(a,{src:b,class:"cursor-pointer"})]),k,s("p",null,[l(a,{src:_,class:"cursor-pointer"})]),S,x,P,s("p",null,[l(a,{src:g,class:"cursor-pointer"})]),w,N,V,I,s("p",null,[l(a,{src:h,class:"cursor-pointer"})]),O,s("p",null,[l(a,{src:E,class:"cursor-pointer"})]),J,s("p",null,[l(a,{src:C,class:"cursor-pointer"})]),G])}const K=e(A,[["render",z]]);export{Z as __pageData,K as default};
