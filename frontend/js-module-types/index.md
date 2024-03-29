---
title: 模块格式：理解AMD、CMD、UMD、CJS、ESM的区别
date: 2023-12-22 09:48:00
---

很多语言都有模块机制，但最初作为脚本的 JavaScript 却没有这样的机制。这也导致后来社区群起提出很多规范，经过多年争执和发展，目前使用最广的 是 2 大模块规范：CJS 和 ESM 规范。

其中 CJS 是 NodeJS 的内置规范，而 ESM 则是 ECMA 提出的标准规范。本文会先回顾下过往的模块规范，多数已逐渐过时或淘汰，因此不必太过深入。然后聊聊当前 2 大模块规范在当前开发中的使用。

## 历史规范

在 NodeJS 出现以前，前端的模块化是比较模糊的，大部分是使用全局命名、命名空间、IIFE之类的实现。在 2009 年 NodeJS 诞生后，开始出现名为 Server.js 的模块规范，后来为进一步推广到浏览器端，改名 CommonJS。不过，服务器端和浏览器端的加载是不同的：

- 在服务器端，模块文件都在本地，使用文件系统调用是非常快的，因而一般采用同步加载的方式；
- 在浏览器端，模块文件都在服务器，通过网络加载是不确定具体加载时间的，因而一般采用异步加载的方式。

围绕着模块加载和执行时机问题，出现几个常见的模块规范：

### AMD

[AMD](https://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition)，即 Async Module Definition(异步模块定义)，适用于浏览器端，[RequireJS](https://requirejs.org/) 是其中的实现。主要写法如下：

```js
  // 提前定义依赖
define(["a", "b", "c"], function(a, b, c) {
  // 即便没使用模块 b 但依然加载
 if (false) {
   b.foo()
 }
})
```

### CMD

[CMD](https://github.com/cmdjs/specification/blob/master/draft/module.md)，即 Common Module Definition(公共模块定义)，适用于浏览器端。[SeaJS](https://github.com/seajs/seajs) 是其中的实现。主要写法如下：

```js
define(function(require, exports, module){
  // 就近加载
  var module2 = require('./module2')
  //暴露模块
  exports.xxx = value
})
```

### UMD

[UMD](https://github.com/umdjs/umd)，即 Universal Module Definition(通用模块定义)，是一种同时兼容 AMD 和 CommonJS 的模块规范。适用于浏览器端和服务器端，主要机制如下：

```js
(function(root, factory) {
  // AMD 规范
  if(typeof define === 'function' && define.amd) {
    define(['jquery', 'underscore'], factory);
  }
  // CommomJs 规范
  else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'), require('underscore'));
  }
  // 全局变量
  else {
    root.returnExports = factory(root.jQuery, root._);
  }
} (this, function (){}))
```

## 主流规范

前面提到的几个规范接触范围并不是很广，日常接触最多的还是 CJS 和 ESM 规范，接下来聊聊这 2 个规范。

### CJS

即 CommonJS 规范，这是 NodeJS 的内置规范，每个模块以文件为基础，每个文件内可使用几个特殊的变量，如下：

```js
// require: 特殊变量，引入模块
const _ = require('lodash')

// exports: 特殊变量，module.exports 的别名，用于导出内容
exports.add = (x, y) => {
  return x + y;
}
```

实际上，CommonJS 并不是什么新东西，只是借助现有语法来实现，对象引用和赋值导出等问题依然是有的。此外，以上代码中的特殊变量来源，可以理解为加载时使用函数进行包裹传入所得，如下：

```js
function loadModule({ require, module }) {
  let exports = module.exports;
  // 模块内的代码
}
```

### ESM

即 EsModule，这是 Ecma 的标准规范，NodeJS 从 13.2.0 版本起开始支持，每个模块也以文件为基础，每个文件内有几个特殊的语法和变量，如下：

```js
// import/from 语法
import _ from 'lodash'

// export 语法
export function add(x, y) {
  return x + y;
}
```

可以看出，EsModule 是从语言层面进行入手的，因而带来非常多的好处。例如，导入导出是可以静态分析的，

## 使用区别

CJS 和 ESM 是目前使用最广泛的规范，接下来聊聊在日常中的使用，主要还是要关注下面这些：

### 静态分析

CommonJS 导出不易于静态分析，EsModule 导入易于静态分析，为什么这么说呢？主要在于 CommonJS 中导出的名字是可以变化的，这在编译时无法找到其具体来源，只能在运行时才能确定，例如：

使用 CommonJS 的情况(如下)，导出名字允许使用变量，这会导致编译时难以分析：

```js
let name = 'add';
// 使用的是对象引用，随时都可以改变
module.exports = { [name]: 1 }
```

使用 EsModule 的情况(如下)，导出名字不允许使用变量，编译时就可以确定其代码引用关系：

```js
let value = 1
// 使用的是语言语法，没有修改的余地
export { value }
```

可以简单理解为，CJS 和 ESM 都导出一个对象，CJS 的属性名可以变化，ESM 的属性名不可以变化，这点决定了两者是否易于静态分析。

### 导出机制

CommonJS 导出的是变量，EsModule 导出的是关系，如何理解这点？来看下同样的代码：在 CJS 和 ESM 中的表现，如下：

使用 CommonJS 的情况：
```js
// a.js
let x = 1;
const add = () => { x += 1 }
module.exports = { x, add }
```

```js
// b.js
const a = require('./a.js');

console.log(a.x) // 输出 1
a.add()          // 执行 +1
console.log(a.x) // 输出 1。+1 操作无效，导出的 a.x 与内部的 x 无关系
```

使用 EsModule 的情况：

```js
// a.js
let x = 1;
const add = () => { x += 1 }
export { x, add }
```

```js
// b.js
import a from './a.js'

console.log(a.x) // 输出 1
a.add()          // 执行 +1
console.log(a.x) // 输出 2。+1 操作有效，导出的 a.x 与内部的 x 存在关系
```

这只在简单类型的变量上有所体验，对于对象数组等引用类型的变量，CJS 和 ESM 都是一样。看起来，ESM 更像是指针。

### 入口解析

当我们导入某个从 npm 下载的模块时，代码中写的是模块标识，例如：

```js
import lodash from 'lodash';
```

但实际上 from 后面的字符串，最终都要能解析到一个入口文件的绝对路径，例如：

```js
import lodash from 'D://project/myproject/node_modules/lodash/index.mjs'
```

从模块标识到绝对路径的过程，是由一套解析算法实现的，而且这套算法并不是固定的。其中 NodeJS 内置一套解析算法，社区也有其他算法。接下来，以 NodeJs 的解析算法为例，理解其对 ESM 和 CJS 的影响。

通常情况下，ESM 模块默认只能导入 ESM 模块，CJS 模块只能导入 CJS 模块，但我们常常能看到一个模块既能被 CJS 模块引入，也能被 ESM 模块引入，这是啥情况？

其实，一个模块是可以导出多种格式的。这里的模块，指的是带 package.json 的模块，其中有几个特殊字段决定了导入时的入口位置：

1. exports 字段指定 import/require 时的入口位置，NodeJS 在 12.7.0 版本中实验性引入，并在 13.7.0 版本中正式使用，该如下：

```json
{
  "name": "todo",
  "exports": {
    ".": {
      "import": "./index.mjs",
      "require": "./index.cjs"
    }
  }
}
```

2. module 字段指定 import 时的入口位置，NodeJS 在 12.0.0 版本中引入，如下：

```json
{
  "name": "todo",
  "module": "./dist/index.mjs"
}
```

3. main 字段指定 import/require 时的入口位置，从 NodeJS 早期版本就一直存在，如下：

```json
{
  "name": "todo",
  "main": "./dist/index.js"
}
```

4. index.js 是默认的入口位置，如果依赖的 package.json 未指定以上任何字段，其结构应是如下：

```
.
├── index.js
└── package.json
```

此外，还有一些其他的条件导出，例如，在 NodeJS 环境导出一份，在浏览器环境导出另一份，此处暂不做过多介绍，有兴趣的可以自行谷歌。

## 结语

目前，CommonJS 和 EsModule 通常都在打包下包了一层，增加了不少便捷的特性。例如，可以在 EsModule 中引入 CommonJS 模块，背后是打包工具将 CommonJS 转换为 EsModule 类型。以上，暂时写这么多，有空再补充。