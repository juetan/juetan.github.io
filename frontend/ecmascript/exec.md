---
title: 代码的执行过程
date: 2024-04-07 12:00:00
---

JavaScript 是一门解释型语言，这句话经常看到，但你思考过背后包含的意义吗？

## 语言类型

一段代码，通常要经过编译和运行两个过程。编译是为了把源代码转换成机器码，而运行就是把机器码交给 CPU 来执行。根据编译这一步骤是否提前运行，分为两类语言：

### 编译型

编译型语言：提前编译好，无需安装运行环境。以 Windows 下的 Go 语言为例，如下：

```
// 1. main.go
func main() {
  fmt.Println("Hello, 世界")
}

// 2. 编译，得到 xx.exe
go build main.go

// 3. 无需其他环境直接运行，输出 Hello, 世界
./xx.exe
```

### 解释型

解释型语言：运行时编译，需要安装运行环境。以 Windows 下的 Python 语言为例，如下：

```
// 1. main.py
print("Hello, 世界")

// 2. 需要 Python 环境才能运行，输出 Hello, 世界
python main.py
```

这两种类型的出现，与运行速度/性能/可移植性等因素有关。作为开发者，面对编译型语言时常常需要参与到编译中，而解释型语言通常不用考虑编译的问题。

### 补充：转译型

与编译相对应的，还有转译，这词可能不太常见。如果说，编译是将高级语言转为低级语言，例如 Go 转机器码；那么转译是将高级语言转为另一种高级语言，例如 Java 转 JavaScript。名字中的转，更多指的是语法层面上的转换。以 [TypeScript](https://www.typescriptlang.org/play) 为例，以下 TypeScript 代码：

```ts
enum MediaType {
  TEXT,
  IMAGE,
  AUDIO,
}
```

会被转译为如下 JavaScript 代码：

```js
'use strict';
var MediaType;
(function (MediaType) {
  MediaType[(MediaType['TEXT'] = 0)] = 'TEXT';
  MediaType[(MediaType['IMAGE'] = 1)] = 'IMAGE';
  MediaType[(MediaType['AUDIO'] = 2)] = 'AUDIO';
})(MediaType || (MediaType = {}));
```

## 编译过程

编译，通常会经过以下过程：

### 词法分析

词法分析(Tokenizing)，将源代码转换为词法单元(Token)，类似于把一串字符串转换为一串单词。例如，使用 [js-tokens](https://github.com/lydell/js-tokens) 工具，词法分析以下代码：

```js
const a = 2;
```

会得到如下结果：

```js
[
  { type: 'IdentifierName', value: 'const' },
  { type: 'WhiteSpace', value: ' ' },
  { type: 'IdentifierName', value: 'a' },
  { type: 'WhiteSpace', value: ' ' },
  { type: 'Punctuator', value: '=' },
  { type: 'WhiteSpace', value: ' ' },
  { type: 'NumericLiteral', value: '2' },
  { type: 'Punctuator', value: ';' },
];
```

### 语法分析

语法分析(Parsing)，就是把词法分析的结果，按照语法规则进行解析，得到抽象语法树(AST)。例如， 使用 [Astexplorer](https://astexplorer.net/) 工具，语法分析以下代码：

```js
const a = 2;
```

经过词法解析和语法解析后，得到如下抽象语法树：

```json
{
  "type": "Program",
  "comments": [],
  "sourceType": "module",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "value": 2,
            "raw": "2"
          }
        }
      ],
      "kind": "const"
    }
  ]
}
```

### 语法检查

在前面生成的语法树基础上，检车代码是否正确，这涉及语法树的遍历。以编译器 [babel](https://babeljs.io/) 为例，以下 babel 插件会检查变量是否已声明：

```js
function plugin({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        // 获取当前作用域
        const scope = path.scope;
        // 检查变量是否在当前作用域或其父作用域中声明
        if (!scope.hasBinding(path.node.name)) {
          console.log(`变量 "${path.node.name}" 未声明`);
        }
      },
    },
  };
}
```

### 生成中间码和优化

基于语法树，生成中间码(Intermediate Code, IC)。这是接近于机器码的低级代码，但依然是抽象的，这是为了进行各种优化，如循环优化，常量传播、死代码消除等。中间码具体是怎样的无法得知，不过死代码消除这个可以讲讲，这其实就是我们常说的 TreeShaking(摇树)，即把用不到的叶子从树上摇下来，减少代码的体积。例如，我们的源代码是这样的：

```js
// a.js
export const add = (x, y) => x + y;
export const sub = (x, y) => x - y;

// b.js
import { add } from './a.js';
console.log(add(2, 1));
```

经过 TreeShaking 后，是这样的：

```js
// a.js
export const add = (x, y) => x + y;

// b.js
import { add } from './a.js';
console.log(add(2, 1));
```

以上，b 只用到 a 的 add 方法，那么 a 在打包时会移除 add 以外的代码。这样减少了不必要的代码体积和运行消耗。

### 代码生成

最后，将优化后的中间代码转换为目标机器代码，这是二进制代码的生成阶段。这个阶段的输出是可以直接在目标硬件上执行的二进制代码。

## 运行过程

接下来，基本就是把二进制放进 CPU 中执行，编译型语言有时会有边执行边优化的机制。我们写的代码，会影响到运行过程，例如：

- 异常未处理，运行时会中止运行
- 不恰当的调用，会导致运行时内存溢出
- 不恰当的调用，会导致线程阻塞
- 有些编译期未识别到的错误，会导致运行中止

为了高效且正确地编写代码，了解运行过程的一些机制是非常有必要的。例如，了解垃圾回收机制，可以有效避免书写垃圾代码导致的内存溢出；了解事件循环禁止，可以有效避免执行顺序不对或线程阻塞的问题。

## 结语

按执行方式，编程语言分为解释型和编译型。其中，解释型有良好的跨平台基础，编译型有良好的性能基础。但无论哪种类型，执行都是经过编译和运行两大过程，其主要区别在于编译的执行时机。