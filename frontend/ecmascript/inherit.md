---
title: 实现继承
date: 2024-04-07 12:00:00
---

继承、封装、多态是面向对象的三个重要特性。JS 支持面向对象，但与 C++、Java 不同，JS 的继承是依靠原型链实现的。在 ES6 之前，这种继承不是语言特性，而是社区提出和实践出来的，主要经历过以下 4 个阶段：

## 原型式继承

基于构造函数、原型和实例的三角关系，通过修改构造函数的 prototype 属性，实现继承，来看一个例子：

```js
function Parent() {
  this.name = 'parent';
}
Parent.prototype.getName = function () {
  return this.name;
};

function Child() {}
Child.prototype = new Parent();

var child1 = new Child();
console.log(child1.getName());
```

以上，把 Parent 的实例挂载到 Child 的 prototype 上，这样，Child 的实例就可以通过原型链访问到 Parent 的属性和方法。你可能会奇怪，为什么要 new Parent() 而不是 Parent.prototype 呢？这是为了能继承到 Parent 实例的属性，此时的继承关系如下：

```
new Child() -> Child.prototype = new Parent() -> Parent.prototype
```

不过这种继承比较简陋，会有一些问题，例如：

- Child 的构造函数，无法调用 Parent 并向其传递参数。
- Child 实例共享一个 Parent 实例，修改 Parent 实例属性会影响到所有 Child 实例。

## 构造式继承

对于 Child 无法调用 Parent 构造函数的问题，可以在 Child 的构造函数中调用 Parent 构造函数：

```js
function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  Parent.call(this, 'child');
}

var child1 = new Child();
console.log(child1.getName());
```

以上代码中，Child 构造函数中调用了 Parent 构造函数，这样就解决了无法调用 Parent 构造函数的问题。不过，这种方式只继承到 Parent 实例却没有继承到 Parent 原型。

## 组合式继承

以上两种方式单独使用都有问题，组合在一起后便会相互弥补，如下：

```js
function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  Parent.call(this, 'child');
}

Child.prototype = new Parent();

var child1 = new Child();
console.log(child1.getName());
```

以上，已经实现继承，使用起来是没有问题的。不过，还是有一个看起来不够雅观的小缺陷：Parent 构造函数在 Parent.call 和 new Parent() 之间执行两次，new Parent() 调用 Parent 构造函数其实是多余的。实际上，我们希望 Child 构造函数调用 Parent 构造函数来实现父类实例的继承，Child.prototype 只继承 Parent 原型就行。

## 寄生组合式继承

既然 Child.prototype = new Parent() 调用 Parent 构造函数是多余的，那么想办法不调用就行了，如下：

```js
function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  Parent.call(this, 'child');
}

Child.prototype = Object.create(Parent.prototype);

var child1 = new Child();
console.log(child1.getName());
```

以上，使用 Object.create()，会创建实例但不调用构造函数。Object.create 的简单模拟实现如下：

```js
function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}
```

你可能又会奇怪，既然 Parent.call 已经实现父类实例的继承，为啥要用 Object.create() 创建实例而不是直接使用 Parent.prototype 呢？一个原因是，避免修改 Child.prototype 时也修改到 Parent.prototype。此时的继承关系如下:

```
new Child(): 调用 Parent()，继承父类实例属性 -> Child.prototype = Object.create(Parent.prototype) 继承父类原型属性 -> Parent.prototype
```

这便是实现继承继承的终极形态，据说 babel 也会使用这种方式。

## 现代继承

以上，其实是 ES6 之前的继承方式，ES6 引入了 class，更接近我们使用的方式。但 ES6 的 class 并不是真正的 class，只是原有实现的的一种语法糖，规范了一些书写的方式。

```js
class Parent {
  constructor(name) {
    this.name = 'parent';
  }

  getName() {
    return this.name;
  }
}

class Child extends Parent {
  constructor(name) {
    super(name);
  }
}

const child = new Child('child');
console.log(child.getName());
```

可以看到，语法更直观和简介。既然 class 这么好用，前面说的四种继承是不是就可以抛弃了？前面说到语法糖，其实了解前面的继承其实也是了解 class 的继承。此外，既然说到 class 是语法糖，我们可以举个例子来看看：

```js
class A {
  name = '1';
  b = () => {
    console.log(this.name);
  };
}
```

以上代码中，方法 b 是一个箭头函数而不是普通函数，this 为啥能正确绑定到 A 上？其实，上面代码降级到 ES5 后，是这样的：

```js
var A = (function () {
  function A() {
    var _this = this;
    this.name = '1';
    this.b = function () {
      console.log(_this.name);
    };
  }
  return A;
})();
```

这样是不是很熟悉？

## 结语

JS 虽然支持面向对象，但一些特性却不是很符合或很完善，本篇讨论了在 JS 中实现继承的方式。在 ES5 或更早以前，经过原型式、构造式、组合式和寄生组合式等演变，模拟出了很好的的继承行为。在 ES6 后，我们有了更现代化的 class 语法，不过也只是个语法糖。