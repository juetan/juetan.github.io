---
title: 手写系列：实现call/apply/debounce/throtle等函数
date: 2023-08-09 18:20:00
---

ES自带很多内置函数，且有些函数是可以通过现有代码实现的，例如数组多达二十几个函数，这些函数都是可以自己实现的。这里挑一些常见的函数，巩固下。

## 手写call

call，即调用，这是函数的一个方法，用于给函数绑定执行上下文(this)并执行，然后返回执行结果。 由于this是动态的，在运行时才能确定，因此一般都是把这个函数挂在对象上执行，完事后再删除掉；需要注意的是，挂到对象上的键名应是唯一的，避免与现有属性名冲突，使用 new Symbol 可以创建一个唯一符号。实现如下：

```ts
Function.prototype.myCall = function call(context, ...args) {
  const prop = new Symbol();
  const fn = this || window;
  context[prop] = fn;
  const result = context[prop].(...args)
  delete context[prop];
  return result;
}
```

## 手写apply

apply，即应用。 与 call 功能一样，不同的是 call 是单独传参，apply 使用数组传参，因此稍微封装一下 myCall 就行。

```ts
Function.prototype.myApply = function (context, args) {
  return this.myCall(context, ...args);
}
```

## 手写bind

bind，即绑定，用于返回一个绑定上下文(this)的函数。且参数可以叠加，实现如下：

```ts
Function.prototype.myBind = function(context, ...args) {
  return function binded(...bindArgs) {
    selft.call(context, ...args, ...bindArgs)
  };
}
```

## 手写debounce

debounce，即防抖，防止抖动。当某个动作触发后，等待特定时间后再执行，如果在这期间再次触发，则重新开始等待。常见例子，搜索框的查询。

```ts
function debounce(fn, wait) {
  let timer;
  return function(...args) {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, wait)
  }
}
```

## 手写throttle

throttle，即节流，节制流入或流出。当某个动作触发后，立即执行并等待特定时间，如果这期间有动作触发一律不执行，时间过后再接收执行。常见例子，登陆按钮的调用。

```ts
function throttle(fn, wait) {
  let timer;
  return function(...args) {
    if(timer) {
      return;
    }
    fn(...args);
    timer = setTimeout(() => {
      timer = null;
    }, wait)
  }
}
```

## 手写new

new 操作符可以对一个构造函数操作，返回一个实例化的对象或其他对象，实现如下：

```ts
function myNew(fn, ...args) {
  const context = {};
  const result = fn.apply(context, args);
  if(Object.prototype.toString.call(result) === '[Object Object]') {
    return result;
  }
  return context;
}
```

## 结语

在日常开发中，我们不总是写这样的函数，而是深克隆、数组扁平化这样的实用函数。但对于个人来说，这是练手和巩固基础的一种方式。