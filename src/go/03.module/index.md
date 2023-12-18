---
title: Go语言：项目、包依赖、第三方类库和可执行命令的管理
date: 2023-09-08 11:42:00
thumbnail: /assets/golang.jpg
---

如今 Go 已内置有模块管理，但一开始支持得并不友好，后来才逐渐完善起来。与 NodeJS 依赖管理有几个不同点：

- NodeJS 依赖是从统一的中心源(npm)下载的，Go 没有中心源，通常从 git 仓库下载，常见第三方库都托管在 GitHub 上面
- NodeJS 下载依赖到项目的 node_modules 目录下，Go 下载依赖到全局目录($GOPATH/pkg目录)下

## 管理历史

依赖管理的变化，主要经历以下 3 个阶段：

### GOPATH

`GOPATH` 是一个环境变量，表示 GO 代码的保存路径。 项目和依赖都要在 GOPATH 目录下，于是产生一些问题：项目必须在 GOPATH 目录下创建，不够灵活；依赖只能存一个版本，如果不同项目依赖不同版本的库会很麻烦。

### VENDOR

从 v1.5 版本起，GO 引入 Vendor 模式：如果项目根目录下有 vendor 目录，那么会优先使用该目录下的库。对于 vendor 的管理，社区中有些一些便捷工具，如 godep 和 dep 等。

### MODULE

从 v1.11 版本起，GO 引入 Module 模式，从 v1.13 起， GO MODULE 称为默认的依赖管理工具。项目中保存 2 个特殊文件：

- go.mod：类似于 package.json 文件，记录项目名、GO 版本和依赖信息
- go.sum：类似于 package-lock.json 记录依赖的哈希值，确保项目在不同环境中下载到的依赖是一致的，该文件由 GO 更新无须手动操作。

下面只说 Go Module 相关的内容。

## 环境变量

### GO1111MODULE

GO111MODULE 是一个环境变量，表示是否开启 GO MODULE 模式，有 3 个可选值：

- off ：禁用，将从 GOPATH 和 vendor 中查找依赖
- on  ：启用，将从 go.mod 中查找依赖
- auto：自动，项目在 GOPATH/src 目录外且存在 go.mod 文件时启用

设置命令为：

```bash
go env -w GO1111MODULE=on
```

### GOPROXY

`GOPROXY` 是一个环境变量，表示下载依赖时使用的代理地址，需要设置代理地址主要是因为：GO 没有自己的中心源，很多库的开发者将代码托管在 Github 上，而国内因为墙的原因访问 Github 是很困难的。从 v1.13 起，GO 的默认代理地址为：https://proxy.golang.org，该地址在国内无法访问，可以设置国内代理，
命令如下：

```bash
go env -w GOPROXY=https://goproxy.cn,direct
```

## 管理命令

启用 GO MODULE 后，可以使用 `go mod <cmd>` 开头的命令管理，命令中的 mod 指 module(模块)。常用的命令有如下：

### 初始项目

在项目中创建 go.mod 文件，其中 name 可选，默认使用文件夹的名字。

```bash
go mod init [name]
```

### 下载依赖

依赖会下载到 $GOPATH/pkg 目录下，然后更新 go.mod 文件和 go.sum 文件中的信息，如下：

```bash
# 下载依赖
go get <pkg-name>

# 更新全部依赖 -u 表示 update patch, 表示仅更新版本号(semver)中的 patch 位
go get -u=patch

# 下载全部依赖：适用于首次下载项目。
go mod download
```

### 删除依赖

以下命令，会根据代码引用情况自动更新/删除 go.mod 中的依赖，清除无用的依赖。

```bash
go mod tidy
```

### 安装命令

以下命令，会安装二进制命令也会安装到 $GOPATH/bin 目录下。

```bash
go install <pkg-name>
```

## 包语法

包在 Go 语言中是按文件夹为基本形态的，这与 NodeJS 按文件为基本形态有很大不同，下面说说其声明语法和导入语法

### 声明语法

包以文件夹为基本形态，同一文件夹下的 .go 文件均需声明为同一个包。包的名字不必跟文件夹名字相同，但通常情况下都建议保持一致。同一 package 内的变量可随意调用且无需引入，即使在不同文件中。例如：

```go
// a/b.go
var name string = "juetan"

// a/c.go
fmt.Println(name)
```

典型的 .go 文件语法为如下

```go
// 声明所在的包
package A;

// 导入其他包
import "B";

// 首字母小写表示私有变量(private)，仅可在包内范围使用
var name = "";

// 首字母大写表示导出变量(public)
var Age = "";

// 特殊函数，导入时调用(多次导入仅调用1次)，可有多个同名函数，按顺序调用
func init() {
  // ...
}

// 特殊函数，仅在 package main 中有效，作为二进制命令的入口
func main() {
  // ...
}
```

### 导入语法

使用 import 关键字进行导入，导入的是路径，使用的是包名。例如：

```go
// a/b/c.go 注：文件夹名字与包名字不同，即 b 和 c
package d
// 声明导出函数
func Run() {}
```

则在使用时，应该是这样：

```go
package xx
// 按路径进行导入
import "a/b"
// 按包名进行使用
d.Run()
```

除直接按路径导入外，还有些特殊语法，如下：

```go
// 1. 使用 . 表示泛导入，可以省略包名进行调用
import (
  . "fmt"
)
func main() {
  // 省略包名，直接使用函数
  Println("hello, world");
}

// 2. 别名
import(
  f "fmt"
)
func main() {
  f.Println("hello, world");
}

// 3. 特殊别名 _ 表示丢弃变量名，用处是仅调用该包里面的init函数进行初始化操作
import (
  _ "github.com/ziutek/mymysql/godrv"
)
```

## 项目结构

参考：https://zhuanlan.zhihu.com/p/659823790

在 Go 语言中，项目有 2 种类型：package(构建第三方类库), command(构建可执行命令)。终极形态，如果既要导出类库也要导出命令，通常是在 package 的基础上，将命令统一放置在 cmd 目录下，如下：

```bash
# 模块配置
go.mod

# 特殊文件，依赖包的入口文件，与 go.mod 中的声明保持一致
<name>.go
# 依赖包的子包
auth
  auth.go

# 特殊文件，命令包的入口文件
main.go
# 命令包的子包
cmd
  run
    main.go

# 特殊文件夹，内部依赖子包，不会被导出外部
internal
  hash
    hash.go
```

以上，将导出 2 个包和 2 个命令，使用如下：

```bash
go get <name>
go get <name>/auth
go install <name>
go install <name>/cmd/run
```

## 结语

以上，了解 GO 对于依赖的管理，同时知道：

- GOPATH 表示 GO 代码的引用地方
- GO111MODULE 表示是否启用 GO MODULE 模式
- GOPROXY 表示代理地址
- go mod xx 用于管理 GO MODULE
- go get 用于下载依赖