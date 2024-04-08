---
title: Go语言：标识符、关键字、预定义标识符和自定义标识符
date: 2023-09-08 11:42:00
thumbnail: /assets/golang.jpg
---

标识符，用于标记各种编程元素，例如变量、函数和类型等。标识符由字符组成，Go 语言使用 unicode 字符集，标识符的命名需要遵守以下规则：

- 以字母下划线开头 + 字母/数字/下划线。注：字母指 unicode 中的字符，所以中文也是可以的
- 区分大小写。在包中，首字母大小写还有特殊意义，大写表示导出，小写表示私有
- 部分标识符已经保留不可以使用，称为关键字
- 部分标识符已有意义不建议使用，称为预定义标识符

## 关键字

Go 语言目前有 25 个关键字，不能用作标识符，介绍和示例如下：

```go
// package：声明包的名字，与文件夹名字无关，但通常与文件夹名字保持一致
package keyword

// import：导入包，导入的是路径，使用的是包名
import "fmt"

// type  ：声明一个类型别名
// struct：内置类型，是一堆属性的集合，也可以包含方法，匿名属性会嵌入
type P1 struct {
	name string
}

// interface：内置类型，是一堆方法的集合
type P2 interface {
	say()
}

// var：声明变量
// map：内置类型，key 为 数字/字符，value 为任意类型
var p1 map[string]P1

// const：声明常量，声明便需要确定值
const p2 = 1

func Run() {
  // defer ：定义延迟执行函数，会在函数结束时执行
  // func  ：声明函数
  // return：返回值
  defer func() int {
  	fmt.Println("defer")
  	return 1
  }()

  // chan  ：内置类型，通道，chan 表示 channel，用于并发同步
  // go    ：启动一个协程
  // select：选择作用的范围
  ch := make(chan int, 1)
  go func() {
    select {
      case <-ch :
  	  fmt.Println("ok")
  	}
  }()

  // for        ：定义循环结构，before;condition;after，每项均为表达式且可省略
  // range      ：生成迭代器
  // if         ：判断条件
  // esle       ：其他条件
  // continue   ：跳过本次循环
  // break      ：中断循环
  for _, value := range p1 {
    	if value.name == "A" {
    		continue;
  	} else {
    		break;
  	}
  }

  // switch      ：定义条件结构
  // case        ：定义匹配和处理
  // fallthrough ： 默认break, 这里表示继续往下执行
  // default     ：默认匹配，兜底处理
  // goto        ：跳转到 label 标注的位置
  switch p2 {
  	case 1 :
  		fallthrough
  	default:
  		goto label
  }

	label: fmt.Println("end")
}
```

## 预定义标识符

部分标识符已有特殊意义和功能，例如 int 表示整型，虽然可以用作变量名，但不建议使用。目前共有 37 个预定义标识符。

| 分类 | 预定义标识符
| --- | --
| 常量 |true, false, iota, nil
| 类型 | int, int8, int16, int32, int64, uint, uint8, uint16, uint32, uint64, uintptr, float32, float64, complex128, complex64, bool, byte, rune, string, error
| 函数 | make, len, cap, new, append, copy, close, delete, complex, real, imag, panic, recover

## 自定义标识符

除关键字和预定义标识符，剩下的就是自定义标识符，通常作为变量名、函数名和结构体等用途。不过需注意区别大小写和首字母限制，首字母大写的变量将作为公有变量，首字母小写则作为私有变量，变量 _(下划线) 的值将会被抛弃：

```go
package A

// 私有
var age = 10
// 工有
var Age = 10
// 结果将被抛弃
_, err = run()
```

## 结语

以上。标识符首字母不能为数字，且大小写敏感。使用标识符作为变量名时，关键字不可以使用，预定义标识符不建议使用，自定义标识符需注意首字母大写和下划线(_)。