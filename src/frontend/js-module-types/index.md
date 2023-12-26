---
title: 模块化开发：AMD、CMD、UMD、CommonJS和EsModule的浅谈
date: 2023-12-22 09:48:00
---

模块化是目前开发绕不开的话题，很多语言都有类似的机制，但最初作为脚本目的的 JavaScript 却没有这样的机制。这也导致后来社区群起提出很多规范，经过多年争执和混乱，目前使用最广的 是 2 大模块规范：CommonJS 和 EsModule 规范。其中 CommonJS 是 NodeJS 的内置规范，而 EsModule 则是 ECMA 提出的标准规范。本文会简单聊聊以往的模块规范(多数已逐渐淘汰，因此不必太过深入)，然后聊聊当前 2 大模块规范在当前开发中的使用。

## 历史规范

在 NodeJS 出现以前，前端的模块化是比较模糊的，大部分是使用全局命名、命名空间、IIFE之类的实现。在 2009 年起，开始出现名为 Server.js 的模块规范，后来为进一步推广到浏览器端，改名 CommonJS。但是，服务器端和浏览器端加载机制是不同的：在服务器端，模块文件都在本地，使用文件系统调用是非常快的，因而一般采用同步加载的方式；在浏览器端，模块文件都在服务器，通过网络加载是不确定具体加载时间的，因而一般采用异步加载的方式。

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

[UMD](https://github.com/umdjs/umd)，即 Universal Module Definition(通用模块定义)，适用于浏览器端和服务器端，是一种同时兼容 AMD 和 CommonJS 的模块规范。主要机制如下：

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

## 常用规范

前面提到的几个规范接触范围并不是很广，日常接触最多的还是 CmmonJS 和 EsModule 规范，接下来聊聊这 2 个规范。

### CommonJS

这是 NodeJS 的内置规范，每个模块以文件为基础，每个文件内可使用几个特殊的变量，如下：

```js
// require: 特殊变量，引入模块
const _ = require('lodash')

// module: 特殊变量，当前模块信息
console.log(module.id);

// exports: 特殊变量，module.exports 的别名，用于导出内容
exports.add = (x, y) => {
  return x + y;
}
```

实际上，CommonJS 并没有从语言规范进行入手，只是借助现有语法来实现，对象引用和赋值导出等问题依然是有的。此外，以上代码中的特殊变量来源，可以理解为加载时使用函数进行包裹传入所得，如下：

```js
function loadModule({ require, module }) {
  let exports = module.exports;
  // 模块内的代码
}
```

### EsModule

这是 Ecma 的标准规范，每个模块也以文件为基础，每个文件内有几个特殊的语法和变量，如下：

```js
// import/from 特殊语法 引入变量
import _ from 'lodash'

// export 特殊语法，导出内容
export function add(x, y) {
  return x + y;
}

// import 特殊变量，异步导入
async function say() {
  const x = await import('xxx')
  x.xx()
}
```

可以看出，EsModule 是从语言层面进行入手的，因而带来非常多的好处。例如，导入导出是可以静态分析的，

## 使用区别

以上只是简单聊聊，实际内容有很多，对于我们日常使用，主要还是要关注下面这些：

### 静态分析

CommonJS 导出不易于静态分析，EsModule 导入易于静态分析，为什么说这么说？主要在于 CommonJS 中 export 的名字是可以变化的，这在编译时无法找到其具体来源，只能在运行时才能确定，如下：

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

### 导出机制

CommonJS 导出的是变量，EsModule 导出的是关系，理解这点看如下的例子：

使用 CommonJS 的情况：
```js
// a.js
let x = 1;
const add = () => { x += 1 }
module.exports = { x, add }

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

// b.js
import a from './a.js'
console.log(a.x) // 输出 1
a.add()          // 执行 +1
console.log(a.x) // 输出 2。+1 操作有效，导出的 a.x 与内部的 x 存在关系
```

### 入口解析

当我们导入某个从 npm 下载的模块时，写的是模块标识，但实际上 from 后面的字符串，最终都要能解析到一个具体的绝对路径。如下：

```js
// 写起来：
import lodash from 'lodash';
// 实际上：
import xx from 'D://project/myproject/node_modules/lodash/index.mjs'
```

解析的算法有很多，其中 NodeJS 自带一套解析算法，社区也有其他算法。根据 NodeJs 的解析算法，上面中的 index.mjs 并不是固定的，而是根据你使用的是 import 还是 require 语法，以及 lodash 中 package.json 的某些字段进行判断。主要包含以下步骤：

先解析项目的 package.json 得到 type 字段，再解析依赖得 package.json 文件(以下字段均指这里的)，按以下步骤进行判断：

1. 检查是否有 exports 字段，该字段可以分别指定 import 和 require 时的入口文件，如下：

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

2. 如果 type 为 module，有 module 字段则使用该字段，如下：

```json
{
  "name": "todo",
  "module": "./dist/index.mjs"
}
```

3. 使用 main 字段，在 exports 没出现以前，通常作为 CommonJS 类型的入口与 module 字段相配合，如下：

```json
{
  "name": "todo",
  "main": "./dist/index.js"
}
```

4. 降级为 index.js 文件，如果依赖的 package.json 未指定以上任何字段，其结构应是如下：

```
.
├── index.js
└── package.json
```

此外，还有一些其他的条件导出，例如，在 NodeJS 环境导出一份，在浏览器环境导出另一份，此处暂不做过多介绍，有兴趣的可以自行谷歌。

## 结语

目前，CommonJS 和 EsModule 通常都在打包下包了一层，增加了不少便捷的特性。例如，可以在 EsModule 中引入 CommonJS 模块，背后是打包工具将 CommonJS 转换为 EsModule 类型。以上，暂时写这么多，有空再补充。