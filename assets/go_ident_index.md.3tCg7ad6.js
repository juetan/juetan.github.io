import{_ as s,c as n,o as a,S as l}from"./chunks/framework.3EKbrk2Y.js";const d=JSON.parse('{"title":"Go语言：标识符、关键字、预定义标识符和自定义标识符","description":"","frontmatter":{"title":"Go语言：标识符、关键字、预定义标识符和自定义标识符","date":"2023-09-08T11:42:00.000Z","thumbnail":"/assets/golang.jpg"},"headers":[],"relativePath":"go/ident/index.md","filePath":"go/ident/index.md"}'),p={name:"go/ident/index.md"},e=l(`<p>标识符，用于标记各种编程元素，例如变量、函数和类型等。标识符由字符组成，Go 语言使用 unicode 字符集，标识符的命名需要遵守以下规则：</p><ul><li>以字母下划线开头 + 字母/数字/下划线。注：字母指 unicode 中的字符，所以中文也是可以的</li><li>区分大小写。在包中，首字母大小写还有特殊意义，大写表示导出，小写表示私有</li><li>部分标识符已经保留不可以使用，称为关键字</li><li>部分标识符已有意义不建议使用，称为预定义标识符</li></ul><h2 id="关键字" tabindex="-1">关键字 <a class="header-anchor" href="#关键字" aria-label="Permalink to &quot;关键字&quot;">​</a></h2><p>Go 语言目前有 25 个关键字，不能用作标识符，介绍和示例如下：</p><div class="language-go line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#6A737D;">// package：声明包的名字，与文件夹名字无关，但通常与文件夹名字保持一致</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#6F42C1;"> keyword</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// import：导入包，导入的是路径，使用的是包名</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#032F62;"> &quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// type  ：声明一个类型别名</span></span>
<span class="line"><span style="color:#6A737D;">// struct：内置类型，是一堆属性的集合，也可以包含方法，匿名属性会嵌入</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#6F42C1;"> P1</span><span style="color:#D73A49;"> struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// interface：内置类型，是一堆方法的集合</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#6F42C1;"> P2</span><span style="color:#D73A49;"> interface</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#005CC5;">	say</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// var：声明变量</span></span>
<span class="line"><span style="color:#6A737D;">// map：内置类型，key 为 数字/字符，value 为任意类型</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> p1 </span><span style="color:#D73A49;">map</span><span style="color:#24292E;">[</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">]P1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// const：声明常量，声明便需要确定值</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> p2 </span><span style="color:#D73A49;">=</span><span style="color:#005CC5;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#6F42C1;"> Run</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#6A737D;">  // defer ：定义延迟执行函数，会在函数结束时执行</span></span>
<span class="line"><span style="color:#6A737D;">  // func  ：声明函数</span></span>
<span class="line"><span style="color:#6A737D;">  // return：返回值</span></span>
<span class="line"><span style="color:#D73A49;">  defer</span><span style="color:#D73A49;"> func</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;defer&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">  	return</span><span style="color:#005CC5;"> 1</span></span>
<span class="line"><span style="color:#24292E;">  }()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">  // chan  ：内置类型，通道，chan 表示 channel，用于并发同步</span></span>
<span class="line"><span style="color:#6A737D;">  // go    ：启动一个协程</span></span>
<span class="line"><span style="color:#6A737D;">  // select：选择作用的范围</span></span>
<span class="line"><span style="color:#24292E;">  ch </span><span style="color:#D73A49;">:=</span><span style="color:#005CC5;"> make</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">chan</span><span style="color:#D73A49;"> int</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">  go</span><span style="color:#D73A49;"> func</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#D73A49;">    select</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">      case</span><span style="color:#D73A49;"> &lt;-</span><span style="color:#24292E;">ch :</span></span>
<span class="line"><span style="color:#24292E;">  	  fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ok&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  	}</span></span>
<span class="line"><span style="color:#24292E;">  }()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">  // for        ：定义循环结构，before;condition;after，每项均为表达式且可省略</span></span>
<span class="line"><span style="color:#6A737D;">  // range      ：生成迭代器</span></span>
<span class="line"><span style="color:#6A737D;">  // if         ：判断条件</span></span>
<span class="line"><span style="color:#6A737D;">  // esle       ：其他条件</span></span>
<span class="line"><span style="color:#6A737D;">  // continue   ：跳过本次循环</span></span>
<span class="line"><span style="color:#6A737D;">  // break      ：中断循环</span></span>
<span class="line"><span style="color:#D73A49;">  for</span><span style="color:#24292E;"> _, value </span><span style="color:#D73A49;">:=</span><span style="color:#D73A49;"> range</span><span style="color:#24292E;"> p1 {</span></span>
<span class="line"><span style="color:#D73A49;">    	if</span><span style="color:#24292E;"> value.name </span><span style="color:#D73A49;">==</span><span style="color:#032F62;"> &quot;A&quot;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">    		continue</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  	} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">    		break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  	}</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">  // switch      ：定义条件结构</span></span>
<span class="line"><span style="color:#6A737D;">  // case        ：定义匹配和处理</span></span>
<span class="line"><span style="color:#6A737D;">  // fallthrough ： 默认break, 这里表示继续往下执行</span></span>
<span class="line"><span style="color:#6A737D;">  // default     ：默认匹配，兜底处理</span></span>
<span class="line"><span style="color:#6A737D;">  // goto        ：跳转到 label 标注的位置</span></span>
<span class="line"><span style="color:#D73A49;">  switch</span><span style="color:#24292E;"> p2 {</span></span>
<span class="line"><span style="color:#D73A49;">  	case</span><span style="color:#005CC5;"> 1</span><span style="color:#24292E;"> :</span></span>
<span class="line"><span style="color:#D73A49;">  		fallthrough</span></span>
<span class="line"><span style="color:#D73A49;">  	default</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#D73A49;">  		goto</span><span style="color:#24292E;"> label</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	label: fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;end&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br></div></div><h2 id="预定义标识符" tabindex="-1">预定义标识符 <a class="header-anchor" href="#预定义标识符" aria-label="Permalink to &quot;预定义标识符&quot;">​</a></h2><p>部分标识符已有特殊意义和功能，例如 int 表示整型，虽然可以用作变量名，但不建议使用。目前共有 37 个预定义标识符。</p><table><thead><tr><th>分类</th><th>预定义标识符</th></tr></thead><tbody><tr><td>常量</td><td>true, false, iota, nil</td></tr><tr><td>类型</td><td>int, int8, int16, int32, int64, uint, uint8, uint16, uint32, uint64, uintptr, float32, float64, complex128, complex64, bool, byte, rune, string, error</td></tr><tr><td>函数</td><td>make, len, cap, new, append, copy, close, delete, complex, real, imag, panic, recover</td></tr></tbody></table><h2 id="自定义标识符" tabindex="-1">自定义标识符 <a class="header-anchor" href="#自定义标识符" aria-label="Permalink to &quot;自定义标识符&quot;">​</a></h2><p>除关键字和预定义标识符，剩下的就是自定义标识符，通常作为变量名、函数名和结构体等用途。不过需注意区别大小写和首字母限制，首字母大写的变量将作为公有变量，首字母小写则作为私有变量，变量 _(下划线) 的值将会被抛弃：</p><div class="language-go line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-light vp-code"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#6F42C1;"> A</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 私有</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> age </span><span style="color:#D73A49;">=</span><span style="color:#005CC5;"> 10</span></span>
<span class="line"><span style="color:#6A737D;">// 工有</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> Age </span><span style="color:#D73A49;">=</span><span style="color:#005CC5;"> 10</span></span>
<span class="line"><span style="color:#6A737D;">// 结果将被抛弃</span></span>
<span class="line"><span style="color:#24292E;">_, err </span><span style="color:#D73A49;">=</span><span style="color:#005CC5;"> run</span><span style="color:#24292E;">()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h2><p>以上。标识符首字母不能为数字，且大小写敏感。使用标识符作为变量名时，关键字不可以使用，预定义标识符不建议使用，自定义标识符需注意首字母大写和下划线(_)。</p>`,13),r=[e];function o(c,t,i,b,y,u){return a(),n("div",null,r)}const A=s(p,[["render",o]]);export{d as __pageData,A as default};