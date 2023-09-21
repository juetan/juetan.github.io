import{_ as l,o as i,c as s,W as e}from"./chunks/framework.d6d633f0.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"draft/bash.md","filePath":"draft/bash.md"}'),a={name:"draft/bash.md"},n=e('<ul><li><code>echo $SHELL</code> 查看默认shell，但不一定是正在使用</li><li><code>ps</code> 在ps前面的是正在使用的shell</li><li><code>ls /etc/shells</code> 查看所有shell</li><li>提示符：<code>[user@hostname] $</code> $ 表示普通用户 # 表示根用户</li><li>进入 bash 退出 exit</li><li>使用 <code>shell --version</code> 查看版本</li></ul><h2 id="echo-命令" tabindex="-1">echo 命令 <a class="header-anchor" href="#echo-命令" aria-label="Permalink to &quot;echo 命令&quot;">​</a></h2><p>作用是输出文本，参数入下：</p><ul><li><p>-n 取消回车符</p></li><li><p>-e 解释引号内的特殊字符，如\\n</p></li><li><p>\\ 命令换行</p></li><li><p>空格 分隔参数</p></li><li><p>; 顺行</p></li><li><p>&amp;&amp; 串行</p></li><li><p>|| 优行</p></li><li><p>type 查看某个命令是否内置</p></li></ul><p>快捷键</p><ul><li>up/down 浏览历史命令</li><li>tab 补全命令 两次tab显示所有选项</li><li>ctrl + c 结束命令</li></ul><p>模式扩展</p><ul><li>~ 当前用户主目录</li><li>? 任意单字符</li><li><ul><li>任意字符 ** 任意目录名</li></ul></li><li>[] 其中字符之一 ^或! 表示不匹配</li><li>[x-y] 简写</li><li>{} 扩展所有值 如 {1,2,3}.txt =&gt; 1.txt 2.txt 3.txt 注意：逗号前后不能有空格，可以嵌套</li><li>{x..y} 简写</li><li>$开头视为变量 变体：${name} ${!name} 获取变量最终值</li><li>$() 获取执行给过</li><li><code>[[:class:]]</code> 字符之一</li><li>\\ 转义 将特殊字符还原为源字符</li><li>&#39;&#39; 不做转义</li><li>&quot;&quot; 不做转义 $ ` \\ 除外</li><li><code>&lt;&lt; &lt;name&gt;\\n xx\\n &lt;name&gt;\\n</code> here文档 ，名字加单引号不做转义</li></ul><p>变量</p><ul><li>env/printenv 查看环境变量，通常大写</li><li>set 查看/设置自定义变量，仅当前shell可用 x=y 设置变量</li><li>unset 删除变量</li><li>export 向子shell输出变量</li><li>$? 上个命令的退出码 成功0，失败非0</li><li>$$ 当前shell的进程ID</li><li>$_ 上个命令的最后一个参数</li><li>$! 最近一个后台进程ID</li><li>$0 当前shell名称</li><li>$- 当前shell的启动参数</li><li>$# 参数数量</li><li>$@ 参数的值</li><li>${var:-val} 返回默认值</li><li>${var:=val} 设置并返回值</li><li>${var:+word} 有值返回空，无值返回word</li><li>${var:?msg} 变量存在且不为空返回值，否则打印msg并退出 1~9 表示脚本参数</li><li>declare OPTION var=val 声明特殊类型变量</li><li>OPTION:</li><li>-a 数组</li><li>-f 函数</li><li>-F 函数名</li><li>-i 整形变量</li><li>-l 小写字幕</li><li>-p 打印变量</li><li>-r 只读</li><li>-u 大写</li><li>-z 输出为环境变量</li><li>readonly 等同 declare -r</li><li>let 声明并执行</li></ul><p>字符串</p><ul><li>${#var} 字符串长度</li><li>${var:offset:length} 子串</li></ul><p>脚本</p><ul><li>#!/bin/bash 或 #!/usr/bin/env bash # 使用的解释器</li><li>chmod +x 所有用户执行 +rx 读和执行 755 /700</li><li>export PATH=$PATH:~/bin + source ~/.bashrc</li><li><code>#</code> 表示注释</li><li>$0 脚本名</li><li>$* 全部参数</li><li>for 循环</li></ul><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-light"><code><span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">$@</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">; </span><span style="color:#D73A49;">do</span></span>\n<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> $i</span></span>\n<span class="line"><span style="color:#D73A49;">done</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>',15),o=[n];function p(t,r,c,d,h,u){return i(),s("div",null,o)}const _=l(a,[["render",p]]);export{b as __pageData,_ as default};
