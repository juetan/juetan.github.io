---
title: Rust系列[五]：包、模块和命名空间
date: 2023-08-31 19:02:00
thumbnail: /assets/rust.webp
---

Rust 中的包称为 crate，包管理器称为 cargo，这两者的存在让我们很方便地管理和下载第三方库。先来简单过一下包管理器的使用，后面再说说如何创建一个包。

## cargo 的使用

cargo 既是一个包管理器，同时也是一个构建工具。作为包管理器时，主要从 [crates.io](https://crates.io) 源下载，国内可以使用字节跳动的 [rsproxy](https://rsproxy.cn) 镜像源。依赖会下载到一个全局目录，也就是说依赖是全局的，不像 NodeJS 每个项目都有单独的目录。

### 安装依赖

你可以手动在 cargo.toml 写入依赖，然后运行 cargo build 来安装。但最好的办法是这样：

```bash
cargo add <crate-name>
```


### 卸载依赖

类似于安装依赖，卸载比较简单。

```bash
cargo remove <crate-name>
```



## 创建项目

可创建的项目分为两种：二进制和代码库。

### 二进制项目

默认生成的就是二进制项目

```bash
cargo new <name>
```

默认会生成如下的目录结构

```
-- src
---- main.rs
-- cargo.toml
-- cargo.lock
```

其中

## 二进制 crate

在一个 cargo 项目中，入口通常是 src/main.rs 文件，且文件中包含 main 函数，编译后会生成 <项目名>.exe 等文件。除外，还可以 src/bin 目录下新增多个二进制 crate，每个文件都会生成同名可执行二进制文件。

## 代码库 crate

在一个 cargo 项目中，入口通常是 src/lib.rs 文件，文件中没有 main 函数，编译后会生成 <项目名>.rlib 等文件。这个比较常见，例如 rand 这个生成随机数的库就是，通常用于发布给别人用。

## 内联模块

通过 mod 关键字可以声明一个内联模块，如下：

```rust
mod one {
  pub mod two {
    pub fn three() {
      println!("three");
    }
  }
}

fn main() {
    one::two::three()
}
```

以上，模块内的成员默认不导出，需通过 pub 关键字导出，成员间使用 :: 分隔。如果路径较长，可以通过 use 关键字简化，如下：

```rust
use one::two::three;

fn main() {
    three()
}
```

## 文件模块

默认一个文件就是一个模块，例如 src/guess/guess_number 文件：

```rust
pub fn guess() {
  // ...
}
```

引入时不使用路径格式而是命名空间格式，根据文件在 src 目录下的相对路径，文件夹之间使用 :: 隔开。例如，在 src/main.rs 文件中，可以这样引入和使用：

```rust
mod guess::guess_number;

fn main() {
  guess_number::guess();
}
```

如果有目录嵌套，则按嵌套结构来，需要注意的是目录名模块需在需从特殊的 mod.rs 导出，例如 src/user/mod.rs：

```rust
pub fn hello() {
  // ...
}
```

在 src/main.rs 中使用：

```rust
mod user;

fn main() {
  user::hello();
}
```

## 结语
