
- `echo $SHELL` 查看默认shell，但不一定是正在使用
- `ps` 在ps前面的是正在使用的shell
- `ls /etc/shells` 查看所有shell
- 提示符：`[user@hostname] $` $ 表示普通用户 # 表示根用户
- 进入 bash 退出 exit
- 使用 `shell --version` 查看版本

## echo 命令

作用是输出文本，参数入下：

- -n 取消回车符
- -e 解释引号内的特殊字符，如\n
- \ 命令换行

- 空格 分隔参数
- ; 顺行
- && 串行
- || 优行
- type 查看某个命令是否内置

快捷键
- up/down 浏览历史命令
- tab 补全命令 两次tab显示所有选项
- ctrl + c 结束命令

模式扩展
- ~ 当前用户主目录
- ? 任意单字符
- * 任意字符 ** 任意目录名
- [] 其中字符之一 ^或! 表示不匹配
- [x-y] 简写
- {} 扩展所有值 如 {1,2,3}.txt => 1.txt 2.txt 3.txt 注意：逗号前后不能有空格，可以嵌套
- {x..y} 简写
- $开头视为变量 变体：${name} ${!name} 获取变量最终值
- $() 获取执行给过
- `[[:class:]]` 字符之一
- \ 转义 将特殊字符还原为源字符
- '' 不做转义
- "" 不做转义 $ ` \ 除外
- << <name>\n xx\n <name>\n here文档 ，名字加单引号不做转义

变量
- env/printenv 查看环境变量，通常大写
- set 查看/设置自定义变量，仅当前shell可用  x=y 设置变量
- unset 删除变量
- export 向子shell输出变量
- $? 上个命令的退出码 成功0，失败非0
- $$ 当前shell的进程ID
- $_ 上个命令的最后一个参数
- $! 最近一个后台进程ID
- $0 当前shell名称
- $- 当前shell的启动参数
- $# 参数数量
- $@ 参数的值
- ${var:-val} 返回默认值
- ${var:=val} 设置并返回值
- ${var:+word} 有值返回空，无值返回word
- ${var:?msg} 变量存在且不为空返回值，否则打印msg并退出 1~9 表示脚本参数
- declare OPTION var=val 声明特殊类型变量
- OPTION:
- -a 数组
- -f 函数
- -F 函数名
- -i 整形变量
- -l 小写字幕
- -p 打印变量
- -r 只读
- -u 大写
- -z 输出为环境变量
- readonly 等同 declare -r
- let 声明并执行

字符串
- ${#var} 字符串长度
- ${var:offset:length} 子串

脚本
- #!/bin/bash 或 #!/usr/bin/env bash # 使用的解释器
- chmod +x 所有用户执行 +rx 读和执行 755 /700
- export PATH=$PATH:~/bin + source ~/.bashrc
- `#` 表示注释
- $0 脚本名
- $* 全部参数
- for 循环
```bash
for i in "$@"; do
  echo $i
done
```