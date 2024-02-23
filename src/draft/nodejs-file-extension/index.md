---
title: NodeJS：文件后缀.js、.cjs、.mjs的区别
date: 2023-02-23 12:00:00
---

在Node.js中，文件后缀.js、.cjs、.mjs分别代表不同的模块系统：

- .js：取决于 package.json 中的 type 字段，默认为 CommonJS 类型。可以指定 type 为 module，声明为 EsModule。
- .cjs：CommonJS 类型
- .mjs：EsModule 类型