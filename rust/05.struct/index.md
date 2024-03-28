---
title: Rust系列[四]：结构体
date: 2023-08-31 14:43:00
thumbnail: /assets/rust.webp
---

结构体，类似于其他语言中的对象，拥有属性和属性值，注意没有方法只有属性。与元组相比，两者都可以存储不同类型的值，但结构体可以为每个成员定义名字，语法如下：

```rust
struct Animal {
  name: String,
}
```

## 元组结构体

指的是没有名字的结构体，类似元组。

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}
```

## 单元结构体

指的是没有任何字段的结构体, 这样构建出来的每个实例都是相同的。

```rust
struct A;

let a = A;
```

## 关联函数

结构体的方法，需要单独使用 `impl` 实现，如下：

```rust
struct Rectangle {
  width: u32,
  height: u32,
}

impl Rectangle {
  // 实例方法，第一个参数为self
  fn area(&self) -> u32 {
    self.width * self.height
  }

  // 静态方法，第一个参数不为self
  fn square(size: u32) -> Self {
    Self {
      width: size,
      height: size,
    }
  }
}

fn main() {
  let a1 = Rectangle {
    width: 20,
    height: 10,
  };
  let a2 = Rectangle::square(10);
  println!("a1 的面积：{}", a.area());
  println!("a2 的面积：{}", a.area());
}
```

以上，`impl` 是 implement 的缩写，里面包含函数声明，因这些函数与结构体关联，因此也叫关联函数。关联函数中，第一个参数为 `self` 的视为实例方法，在实例上调用；第一个参数不为 `self` 的视为静态方法，在结构体上调用。

## 枚举

枚举是一个类似于结构体的数据结构，每个属性都可以包含不同的值，但不一样的是，枚举可以作为多个类型的统一集合，作为参数类型时非常有用。

例如，我们有一个ip地址，可能是 ipv4 或 ipv6 ，ipv4 是一个长度为 4 的元组，ipv6 是一个字符串，用枚举可以这样：

```rust
#[derive(Debug)]
enum IpAddr {
  Ipv4(u8, u8, u8, u8),
  Ipv6(String),
}

fn get_ip(ip: &IpAddr) -> String {
  match ip {
    IpAddr::Ipv4(i1,i2,i3,i4) => format!("{i1},{i2},{i3},{i4}"),
    IpAddr::Ipv6(v) => v.clone()
  }
}

fn main() {
  let ip4 = IpAddr::Ipv4(1,1,1,1);
  let ip6 = IpAddr::Ipv6(String::from("fxxx"));
  let ip4v = get_ip(&ip4);
  let ip6v = get_ip(&ip6);
  // ipv4: Ipv4(1, 1, 1, 1), ipv6: Ipv6("fxxx")
  println!("ipv4: {ip4:?}, ipv6: {ip6:?}");
  // ipv4: 1,1,1,1, ipv6: fxxx
  println!("ipv4: {ip4v}, ipv6: {ip6v}");
}

```

## match语法

match 是个基于匹配的控制结构，它也可以对枚举进行匹配，如下：

```rust

enum Weekday {
  Monday,
  Tuesday,
  Webnesday,
  Thursday,
  Friday,
  Sunday,
  Satiday,
}

fn say(day: Weekday) {
  match day {
    Monday => {
      println!("monday");
    },
    Tuesday => sayOther(),
    - => ()
  }
}

```

以上代码中，`=>` 后面可以是表达式或者语句块，`- => ()` 匹配剩余的项，`-` 表示不使用该参数但又不希望编译器警告，
`()` 是个单元元组，在这里表示不做处理。

## if let控制流

可以理解为 match 的语法糖，仅在匹配到某个值时执行，如下：

```rust
enum Weekday {
  Monday,
  Tuesday,
  Webnesday,
  Thursday,
  Friday,
  Sunday,
  Satiday,
}

fn say(day: Weekday) {
  if let day == Weekday::Monday {
    println!("monday");
  } else {
    println!("otherday");
  }
}
```