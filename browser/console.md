---
title: 浏览器开发者工具中 console 的常用方法
date: 2026-11-08 10:50:00
---

目前 chrome 浏览器的 console 对象共包含 25 个方法或属性。按 WHATWG 的 console 规范，只有 19 个是标准方法，剩下的都是浏览器自带的非标准方法。本文将介绍一些常用的使用场景。

```ts
console.log()
console.debug()
console.info()
console.warn()
console.error()

console.group()
console.groupCollapsed()
console.groupEnd()
console.table()
console.dir()
console.dirxml()

console.time()
console.timeLog()
console.timeEnd()
console.count()
console.countReset()
console.trace()
console.assert()
console.clear()

console.context()            // 非标准方法
console.createTask()         // 非标准方法
console.profile()            // 非标准方法
console.profileEnd()         // 非标准方法
console.timeStamp()          // 非标准方法
console.memory               // 非标准属性
```

## 打印信息

以下 5 个方法均用于输出调式信息，根据级别不同显示样式略有不同。

```ts
console.log()
console.info()
console.debug()
console.warn()   // 浅黄色背景
console.error()  // 浅红色背景

// 格式化输出
console.log('name is %s', 'juetan') // 输出：name is juetan
```

以上方法，均支持 C 语言风格的格式化参数，目前支持的格式化参数有如下：

- `%s`: 字符串(string)
- `%d`: 整数(digit)
- `%f`: 浮点数(float)
- `%o`: 对象(格式化后)，例如 `▶ <div>...<div>`
- `%O`: 对象(原始格式)，例如 `▶ div`
- `%c`: CSS样式，例如 `color: #09f;background-color:#fff`

## 打印计时

有时候我们想知道一段代码耗费多长时间执行完，此时可以使用 time 相关方法快速实现。

```ts
console.time('count')          // 开始计时，count 是名字(可选)    
for(let i=0; i<10000; i++) {}
console.timeLog('count')       // 输出当前计时，计时仍在继续。

for(let i=0; i<10000; i++) {}
console.timeEnd('count')       // 结束计时，并输出计时。

// 输出：
count: 0.093017578125 ms
count: 0.013916015625 ms
```

注意：这种方法不适合作为严格的性能基准。如果要做复现的耗时对比，用 `performance` 更可靠。

## 打印计数

有时候想知道一个函数被调用了多少次，此时可以使用 count 相关的方法。

```ts
console.count('add')      // 输出计数，add 是名字(可选)
console.count('add')
console.countReset('add') // 重置计数。注意：计数器 add 需存在
console.count('add')
console.count('add')

// 输出:
add: 1
add: 2
add: 1
add: 2
```

## 打印分组

如果打印的内容关联性较大，可以使用分组打印，将相关的内容集中到一起显示。

```ts
console.group()             // 开始分组(展开)
console.log('我是分组1-0')
console.log('我是分组1-1')
console.groupCollapsed()    // 开始分组(折叠)
console.log('我是分组2-0')
console.log('我是分组2-1')
console.groupEnd()
console.groupEnd()          // 结束分组

// 输出：
▼ console.group
  我是分组1-0
  我是分组1-1
  ▶ console.group
```

## 打印形态

如果想更直观的查看对象数组，可以使用 table 方法以可视化形式展现数组内容。

```ts
console.table([{ label: '视频', value: 1 }, { label: '音频', value: 2 }])

// 输出：
| (index) | label  | value |
|    0	  | '视频' |	1    |
|    1	  | '音频' |	2    |
▶ Array(2)
```

在我们在控制台打印一个 HTML 元素时，通常展示的是 HTML 形态，这并不利于我们查看元素属性。此时，可以使用 dir 相关方法打印对象形态。

```ts
console.log(document.body)     // 作为对比
console.dirxml(document.body)  // 效果与 log 一致
console.dir(document.body)

// 输出：
▶ <body>...</body>
▶ <body>...</body>
▶ body.classname
```

## 打印调试

如果想知道一个函数的调用链路是怎样的，可以使用 trace 打印当前的函数调用栈。

```ts
const a = () => b()
const b = () => c()
const c = () => console.trace()
a()

// 输出：
▼ console.trace
c	          @VM1471:3
b	          @VM1471:2
a	          @VM1471:1
(anonymous)	@VM1490:1
```

有时候我们想在情况符合预期时不打印任何信息，不符合预期时才打印信息，此时可以使用 assert 进行断言。

```ts
console.assert(!!window.abc, '期望 window.abc 属性有值')

// 输出：
▶ Assertion failed: 期望 window.abc 属性有值
```

如果想清空控制台信息，可以使用 clear 完成清理。

```ts
console.clear()
```

## 结语

调试是开发过程中不可缺少的一环，熟悉和理解 console 对象，可以使得我们的调试效率更上一步。