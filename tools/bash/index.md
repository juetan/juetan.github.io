---
title: Bash工具的使用，以及日常使用。
date: 2023-09-27 10:31:00
---

Bash，全名 Bourne Again Bash。本文主要参照阮一峰的 [Bash 脚本教程](https://wangdoc.com/bash/) 教程。Bash 是一门比较宽松的脚本语法，对变量和变量类型没有什么严格限制。

## 基本语法

### 进入

登陆 linux 服务器，默认就是 shell 环境。如果不是 Bash 环境，可以使用如下命令进入：

```bash
bash
```

### 退出

使用如下命令退出：

```bash
exit
```

### 打印内容

使用 echo 命令打印内容，默认在末尾添加换行符，语法如下：

```bash
echo <content>
```

内容默认是字符串，可以使用变量，示例如下：

```bash
# 输出：位置 => /usr/bin/bash
echo "位置 => $SHELL"
```

### 声明变量

使用 declare 命令声明变量，语法如下：

```bash
declare <options> <name>=<value>
```

但此命令通常用于高级变量的声明(如只读变量)，日常使用可以省略 declare 和 options 部分，直接分配值给变量名即可。此外：

- 变量名区分大小写，需注意大小写。
- 变量值无类型，或者说都是字符串类型。
- 变量值是数字时，可以进行算数操作和比较。


### 访问变量

访问时须在变量名前加 $ 符号，语法如下：

```bash
$<name>
```

变量不存在不会报错，而是返回空字符串，示例如下：

```bash
name="绝弹"
# 输出：绝弹
echo $name
```

### 命令替换

执行命令并返回结果，语法如下：

```bash
$(<command>)
```

示例如下：

```bash
# 输出：当前位置：/j/github/juetan
echo "当前位置：$(pwd)"
```

### 参数展开

操作变量并返回结果，语法如下：

```bash
${<expansion>}
```

在参数展开中，访问变量不需要加 $ 符号开头。一些常见的操作如下：

- ${var}：简单展开变量

```bash
name="juetan"
# 输出：juetan
echo ${name}
```

- ${var:-default}：变量未设置或为空时，使用默认值

```bash
# 输出：我是默认值
echo ${site:-"我是默认值"}
```

- ${#var}：返回字符串长度

```bash
name="绝弹"
# 输出：2
echo ${#name}
```

### 条件测试

使用 [] 运算符执行测试(test 命令的简写形式)，示例如下：

```bash
[ -f /path/to/file ] && echo "文件存在" || echo "文件不存在"
```

注意：[] 内部左右需以空格隔开。


## 文件操作

Bash 提供了一系列命令和操作符，对文件进行操作。

### 覆盖内容

使用 > 操作符可以将内容覆盖到文件中，如果文件不存在会创建，示例如下：

```bash
# demo.txt
我是原本内容

echo "我是替代文本" > demo.txt

# demo.txt
我是替代文本
```

### 追加内容

使用 >> 操作符可以将输出追加到文件末尾，如果文件不存在会创建，示例如下：

```bash
echo "我是追加文本" >> demo.txt
echo "我是追加文本" >> demo.txt
echo "我是追加文本" >> demo.txt

# demo.txt
我是追加文本
我是追加文本
我是追加文本
```

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
- $() 执行命令并返回结果
- `[[:class:]]` 字符之一
- \ 转义 将特殊字符还原为源字符
- '' 不做转义
- "" 不做转义 $ ` \ 除外
- `<< <name>\n xx\n <name>\n` here文档 ，名字加单引号不做转义

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

## 结语

有点乱，有空再整理。