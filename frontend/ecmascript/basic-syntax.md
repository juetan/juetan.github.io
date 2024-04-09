---
title: 基本语法
date: 2024-04-07 12:00:00
---

## 标识符

标识符由多个字符组成，表示某个编程元素，如变量、函数、类等。不同类型的标识符，需要遵顼不同的规则。

### 字符集

字符集是一门编程语言的基础，决定了你能使用的字符数量。目前主流的语言都使用 Unicode 字符集，JS 亦是如此，这个字符集包含有世界上大部分国家的语言字符，最多可包含一百多万个字符。Unicode 字符集兼容 ASCII 字符集，一些常见于的字符集如下：

- unicode 统一码或万国码，目前最常用的
- ascii 美国标准信息交换码，包含 10 个阿拉伯数字，26 个英文字母，以及 32 个特殊符号
- gb/gbk 国标码，我们国家的中文字符编码标准，目前用得比较少
- big5 大五码，台湾地区使用

### 保留字

保留字，或者说关键字，是特殊含义的标识符，不能用作其他用途。目前的保留字有：

已使用的保留字：

```bash
break      do         instanceof  typeof
case       else       new         var
catch      finally    return      void
continue   for        switch      while
debugger   function   this        with
default    if         throw       delete
in         try        class       extends
const      export     import
```

待使用的保留字：

```bash
abstract    boolean     byte        char
constdouble enum        final       float
goto        implements  int         interfacelong
native      package     private     protected
public      short       static      super
throw       transient   volatile    synchronized
```

### 预定义标识符

预定义标识符是特殊的标识符，大部分是内置变量，允许用作变量名但不建议使用，如：

```bash
String      Number      Boolean      Array
Date        Function    Math         Object
RegExp      Error       EvalError    JSON
Infinity    NaN         isNaN        isFinite
undefined   arguments   parseInt     parseFloat
eval        decodeURI   encodeURI    decodeURIComponent
encodeURIComponent      RangeError   ReferenceError
TypeError   URIError    SyntaxError
```

### 自定义标识符

剩余的标识符，大部分用作变量名或变量值字面量。当自定义标识符用作变量名时，需要遵顼一定的命名规则：

- 首字符：以字母、$或\_开头，不能以数字开头
- 区分大小写，name 和 Name 使用不同的变量

除了以上的强制要求，还有一些约定熟成的命名方式：

- 变量名使用小驼峰命名法，首字母小写，后续单词的首字母大写，例如 myName，maxNumberInArray。
- 常量名全部大写，例如 PI = 3.14
- 类名使用大驼峰命名法，首字母大写，例如 MyClass

## 注释

注释是对代码的补充，用于解释代码的含义，让代码更易读。JS 使用 C 语言风格的注释。

### 单行注释

单行注释以双斜杠开头，可以单独一行也可放在行末尾，示例：

```js
// 这是单行注释
console.log('Hello World'); // 语句末尾也行
```

### 多行注释

多行注释以斜杠+星号开头，并以星号+斜杠结尾，示例：

```js
/*
这是多行注释
*/
console.log('Hello World');
```

## 变量声明

变量由变量名和变量值组成，无需声明变量值类型(运行时自动识别)，变量名遵顼前面说到的命名规则，变量值有字面量形式和引用形式。此外，变量有作用域，在顶部创建的变量会成为全局变量，其余变量的作用域范围根据其声明关键字而有不同。

### var

使用 var 关键字声明一个函数范围内的变量，示例如下：

```js
var name = '绝弹';
var toString = Object.prototype.toString;
```

以上， var 是 variable(变量) 的缩写，`'绝弹'` 是字面量形式，`Object.prototype.toString` 是引用形式：

```js
// 全局作用域
var name = '绝弹1';

// 函数作用域
function test() {
  var name = '绝弹2';
  // 输出 绝弹2
  console.log(name);
}
```

以上代码中，引用变量时会从最近的作用域开始向上查找，直到全局作用域，如果找不到就报错。

### let

使用 let 关键字声明一个块级作用域内的变量，示例：

```js
let name = '绝弹';
```

以上，let 的意思让 xx 的值为 xx，这是 ES6 中新增的声明变量的方式，相比 var 较宽的函数作用域，let 使用较窄的块级作用域，这允许我们更细粒度地控制变量的作用域，避免不符合预期的结果。例如：

```js
// 输出：3 3 3
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}

// 输出：0 1 2
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

以上代码，var 没有块级作用域，相当于声明全局变量，而 let 声明的是块级作用，得以保存下来。

### const

使用 const 关键字声明一个块级作用域内的常量，示例：

```js
const PI = 3.1415926;
```

以上，const 是 constant(不变的) 的缩写。声明时必须指定值，且不能修改，作用域与 let 一致。此外，不变指的是内存位置不变，如果值是复杂类型，还是可以修改内部值的，如下：

```js
// 报错
const name = '绝弹';
name = '绝弹2';

// 不报错
const juetan = {
  name: '绝弹',
};
juetan.name = '绝弹2';
```

### function

使用 function 关键字声明一个函数作用域内的函数，示例：

```js
function add(x, y) {
  return x + y;
}
add(1, 2);
```

完整的函数签名，包括形参和返回值，以上代码中：

- 函数名为 add
- 形参为 x, y，默认值为 undefined
- 实参为 1, 2
- 函数体为 3(number类型)，默认为 undefined

### arrow function

使用 => 符号声明一个块级作用域内的箭头函数，示例：

```js
const add = (x, y) => {
  const total = x + y;
  return total;
};
```

以上，箭头函数没有函数名，包含一个名为 content 的参数，没有返回值。至于箭头函数与普通函数的区别，后面会详细介绍。

### class

使用 class 关键字声明一个块级作用域内的类，示例：

```js
class Person {
  // 实例属性，使用 = 语法
  name = '绝弹';
  // 原型方法，不能声明原型属性，只能声明方法
  getName() {
    return this.name;
  }
}
```

以上，类名为 Person，包含一个名为 name 的属性。

## 简单类型

变量分为简单变量和复杂变量，简单变量存储的是值的本身，而复杂变量存储的是值的地址，其内容在另一个地方。

### string

不区分字符和字符串，统一都是字符串，可使用单引号`'`、双引号`"`或反引号`&#96;`包裹，示例：

```js
const name = '绝弹';
const age = "18";
const desc = `${name}今年${age}岁`;
```

以上，使用单引号或双引号没有区别，但习惯上使用单引号与 HTML 用的双引号区分，反引号是 ES6 新增的，可以使用 `${xx}` 引用变量。

字符串可以视为对象，编译器会自动包裹为 String 对象，此时可以 String 上的方法进行操作。

```js
const name = 'juetan';

// JUETAN
name.toUpperCase();

// jue
name.substring(0, 3);
```

### symbol

Symbol 是 ES6 新增的类型，表示一个独一无二的值，主要目的是替代字符串作为对象的属性名避免重名冲突，示例：

```js
const name = Symbol('name');

class Person {
  [name] = '绝弹';
}

const person = new Person();
console.log(person[name]);
```

此外，Symbol 也是一个对象，保存某些语言内部的常量属性，例如：

- Symbol.iterator: 通过 Symbol.iterator 属性，实现可遍历对象
- Symbol.toStringTag: 通过 Symbol.toStringTag 属性，实现对象的字符串描述
- Symbol.hasInstance: 通过 Symbol.hasInstance 属性，实现 instanceof
- Symbol.species: 通过 Symbol.species 属性，实现子类继承

### number

不区分整数和浮点数，统一按 64 位浮点数存储，示例

```js
const a = 1;
const b = 1.1;
```

存储遵循 IEEE 754 标准，因而会有一些意想不到的精度丢失问题，例如：

```js
// false
0.1 + 0.2 === 0.3;
```

以上，0.1 在转为二进制时是个无限不循环的数，但由于存储为 64 位浮点数，所以会丢失精度。

此外，还有几个特殊的值：

- NaN: Not a Number，表示这不是一个数字，常用作转换失败结果的表示，例如 Number('abc')
- Infinity: 无穷大，例如 Math.pow(2, 10000)
- -Infinity: 无穷小

### boolean

布尔值有两个值，true 和 false。在 JS 中，只有 6 个值会被视为 false，其余的值都视为 true，这 6 个值如下：

- ""
- 0
- NaN
- false
- undefined
- null

### undefined

undefined 是特殊类型，只有一个值 undefined，表示一个变量没有赋值，例如：

```js
// 声明但没有初始化的变量，输出 undefined
let name;
console.log(name);
```

转换：

- 在转为字符串时，输出 "undefined"
- 在转为数值时，输出 NaN
- 在转为布尔值时，输出 false

此外，这个类型某些场景是有特殊意义，例如：

- 在函数中，如果参数没有传递，则默认为 undefined，此时参数默认值会生效，例如 (name = '绝弹') => console.log(name)
- 函数默认返回值为 undefined
- 在旧版本中，undefined 是可以作为变量名使用的，可以用 void 0 得到真正的 undefined
- 在 JSON 序列化中，值为 undefined 的属性会被忽略

### null

null 是特殊类型，只有一个值 null，表示一个变量已赋值但值为空，例如：

```js
let name = null;
console.log(name);
```

同时，它也是原型链的终点，常常被 typeof 视为对象：

```js
// 输出 object
typeof null;

// 输出 true
Object.prototype === null;
```

转换：

- 在转为字符串时，输出 "null"
- 在转为数值时，输出 0
- 在转为布尔值时，输出 false

此外，这个类型某些场景是有特殊意义，例如：

- 作为函数参数值时，默认参数值不会生效，例如 (name = 'juetan') => console.log(name)
- 在 JSON 序列化时，值为 null 的属性会保留


## 复杂类型

复杂类型实际上只有一种：Object，其他类型都是 Object 的子类型，例如 Array、Function、Date、RegExp 等。嗯，function 也是一种 Object。

### object

创建对象通常使用字面量形式，其构造函数为 Object，其构造函数没有参数，例如：

```js
const value = ""
const person = {
  // 属性
  name: 'Juetan',
  // 方法
  sayHello: function () {
    return 'Hello, ' + this.name
  }
  // 简写，相当于 value: value
  value,
}
```

举几个常见的示例：

- Array

数组，是个可变数组，提供了二十几个方法操作，示例：

```js
const values = [1, 2, 3]

// 末尾插入元素 [1, 2, 3, 4]
values.push(4)

// 移除首位元素 [2, 3, 4]
values.shift()
```

- Set

集合，是数组的子集，集合不允许有重复元素，集合提供了一些方法操作，示例：

```js
const values = new Set([1, 2, 3])

// 添加重复元素 [1, 2, 3]
values.add(1)

// true
values.has(2)
```

- Map

字典映射，包含键值对，相比于普通对象只能用string/number/symbol做键名，Map 的键名可以是任意值，示例：

```js
const values = new Map()

const key = { name: 'key' }
values.set(key, 'value')
```
