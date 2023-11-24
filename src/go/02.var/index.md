---
title: Go系列[二]：变量声明和变量类型
date: 2023-09-07 19:17:00
thumbnail: /assets/golang.jpg
---

Go 的语法跟其他语言类似

## 声明变量

使用 var name type = value 语法声明变量，声明时变量类型和初始值至少得提供一个，当只提供类型时，默认值为零值(字符串为 ""，整型为 0，布尔为 false)。如下：

```go
var name string;                     // 提供类型，初始值值为：""
var age = 18;                        // 提供初始值，类型推导为 int
var email string = "1@exmple.com";   // 同时提供
```

支持同时声明多变量，使用圆括号包裹声明内容，等号左边是变量名和类型，多个变量名以逗号隔开，可同时为多个变量指定同一类型，等号右边是变量值，多个变量值以逗号隔开，如下：

```go
var ( x, y int );        // 同类型
var (z, z1 = 1, "1");    // 带默认值
```

在函数内部，可使用 name := value 语法声明短变量，同时声明多个短变量时可覆盖同名变量，但至少得有一个新变量，如下：

```go
in, err := os.Open(infile)
out, err := os.Create(outfile) // out 是新变量，err 覆盖前面的同名变量
```

## 声明常量

使用 const NAME type = value 语法声明常量，其中类型可忽略交由编译器推断，值需要指定一个具体值。通常用于指定一个固定值，例如圆周率等

```go
const PI = 3.131492654
const (
  x uint16 = 100
  y                       // y 和 x 相等
  z = 10
)
```

## 简单变量

简单变量，指的是存储在栈结构上，长度相对固定且占用内存不大的数据结构，例如字符串、数字和布尔等数据类型。基础类型是基础，复杂类型如数组等也是由这些类型封装而成的。

### 字符串

字符，使用单引号(')进行声明。字符串，使用双引号(")或反引号(`)进行声明，使用双引号会处理字符串中的转义符，而反引号会原样输出，此外反引号还可以声明多行字符串。

```Go
var s1 = "hello, \n world"  // \n 会转译为换行符
var s2 = `hello, \n world`  // 原样输出
var s3 = `行1
行2
`                           // 多行字符串
```

输出如下：

```
hello,
 world
hello, \n world
行1
        行2
```

### 整形

整形，分为 无符号(uint) 和 有符号(int) 两种。其中，符号指的是正负符号，无符号不包含负数，而有符号类型包含负数，u 是 unsinged 的简写，int 是 integer 的简写，示例如下：

```go
var x int8 = 1      // 有符号8位，范围：-128 ~ 127
var y uint8 = -1    // 无符号8位，范围：0 ~ 255
```

长度有 8、16、32、64 和 int 五种，其中 int 取决于操作系统，在 32 位操作系统上 int 长度为 32，在 64 位操作系统上 int 长度为 64。两两组合，共有如下类型：

| 符号   | 8 位        | 16 位  | 32 位       | 64 位  | 系统位 |
| ------ | ----------- | ------ | ----------- | ------ | ------ |
| 有符号 | int8        | int16  | int32(rune) | int64  | int    |
| 无符号 | uint8(byte) | uint16 | uint32      | uint64 | uint   |

### 浮点型

浮点型，分为 float32 和 float64 两种。其中，点指的是小数点，浮点顾名思义小数点的位置是浮动的。此外，float32 也称单精度浮点数，而 float64 称为双精度浮点数。浮点数都是有符号的，示例如下：

```go
var x float32 = 0.1
var y float64 = 0.1
```

### 布尔型

包含两个值：true(真) 和 false(假)，示例如下：

```go
var t bool = true
var f bool = false
```

## 复杂变量

### 数组

使用 `var <name> [<length>]<type>{<index>:<init-value>, ...}` 语法进行声明。其中 length 可以指定为 ... 表示长度根据后面的初始值声明进行推断；cap 方法用于获取数组的容量，len 方法用于定义数组的长度，如下：

```go
var a1 [5]int;

a1[0] = 1;
a1[1] = 2;

fmt.Println(cap(a1));
fmt.Println(len(a1));
```

除了可以使用 for index 遍历数组，也可以使用迭代器进行遍历，如下：

```go
var a2 = [...]int{1:3,4:6};
for index, value := range a2 {
	fmt.Println(index, value)
}

// 结果：
// 0 0
// 1 3
// 2 0
// 3 0
// 4 6
```

### 切片

切片与数组类似，区别在于数组是定长的，切片是变长的，因此在数组长度的语法上不指定长度接口，如下：

```go
var s1 []init            // 空切片
var s2 = make(int, 3, 5) // 长度为3，容量为5的切片
```

> new 和 make 都是用于创建和初始化对象的内置函数，区别如下：new 将其初始化为零值返回内存指针；make(make(<type>, len, cap)) 返回已初始化的对象。

> 值类型：string int float boolean array struct; 引用类型：slice map chan pointer

### map

语法：

```go
// 方式1：不能直接使用，默认为nil
var m1 map[int]string
if (m1 == nil) {
  m1 = make(map[int]string)
}

// 方式2
var m2 = make(map[int]string, 0)
```

使用迭代器进行遍历，但顺序无法保证，如下：

```go
var m1 = make(map[int]string)
m1[1] = "A"
m2[2] = "B"
m3[3] = "C"

for key, value := range m1 {
  fmt.Println(key, value)
}
```

map 不是并发安全的，因此 Go 在 v1.9 版本推出 sync.Map 提供并发安全的map，如下：

```go
var m1 sync.Map

m1.Store("A", 97)
m1.Load("A")
m1.Delete("A")
m1.Range(func(k, v interface{}) bool {
    fmt.Println(k, v)
    return true
})
```

### 函数

与其他语言不一样的是，Go 的函数支持多返回值。

```go
func <name>(<name> <type>, ...) (<name> <type>, ...) {
  // 函数体
}
```

### 指针

指针，是包含普通变量地址的变量。使用 & 获取其他变量的地址，使用 * 获取指针变量指向地址的值。

```go
var s1 = "字符串"
var s2 = &s1

fmt.Println(*s2)
```

### 结构体

语法：

```go
type Persion struct {
  name string
  age  int
}

// 方式1
var p1 = Persion {}
p1.name = "A"
p1.age = 1

// 方式2
var p2 = Persion {
  name: "A",
  age: 1
}
```

以上的声明语法有些奇怪，要分成两部分：type 是一个用于声明的关键字，类似于 var 和 const，只不过声明的是类型别名，语法为 `type <alias> <name>`，因此 Persion 为类型的别名，struct {} 为类型。

### 方法

方法可以理解为特殊的函数，可以依附于结构体进行调用(如下)。注意：不能在函数内声明方法，须在定义结构体的包内为其定义方法。

```go
type Persion struct {
  name string
  age int
}

func (p Persion) say(msg string) {
  fmt.Printf("%s 说：%s", p.name, msg)
}

func main() {
  p1 := Persion{ "测试", 1 }
  p1.say("hello, world!")
}
```

### 反射

反射，指在运行时根据变量获取类型和值等信息。

```go
import (
	"fmt"
	"reflect"
);

func main() {
  n1 := 8
  fmt.Println(reflect.TypeOf(n1))
  fmt.Println(reflect.ValueOf(n1))
}

// 输出：
// int
// 8
```

### 协程

相比于进程(process)和线程(thread)，协程(routine)是一个轻量的并发解决方案。

## 结语

总体而言，比较通俗且容易上手，但比较奇怪的是多变量声明语法和短变量语法。多变量声明语法，可能对于声明多个同类型的变量比较实用，其他暂时想不到其便捷性是怎么设置的。而短变量语法，感觉略显随意且会覆盖同名变量，是优点也算是缺点吧。
