---
title: 写一个Vite插件：根据配置加载不同后缀的文件
date: 2023-07-18 11:31:00
---

最近在工作中，遇到两个小问题，让我想写个 Vite 插件。一个是不同项目间的微小差异，某个项目在 A 页面加了需求，其他项目又不需要，直接在页面上加判断感觉没必要，毕竟差异只有一丢丢。另一个时，有新功能时，要新增页面但这个页面最近的版本又不上，这就得动代码了。

偶然下想起 Taro 根据不同后缀打包的文档，于是去翻了下，想着能不能写一个 Vite 插件，根据配置打包不同后缀的文件。例如，配置为 mx，导入 index.vue 文件时，在 load 钩子中先尝试加载同目录下的 index.mx.vue 文件，再加载 index.vue 文件。

费了一番功夫，总算搞出来了，这里记录下实现思路。

## 在 ResolveId 中判断

最开始想的是，有一个解析模块路径的钩子，先调用其他插件解析完 ID，再判断指定后缀的文件是否存在，存在就返回包含该后缀的文件路径。实现如下：

```ts
export function plugin({ extension = 'me' }) {
  return {
    name: 'vite:file-extension',
    resolveId(id) {
      if (!extension || !id.startsWith('/src')) {
        return;
      }
      const resolution = await this.resolve(id, importer, { skipSelf: true, ...options });
      const targetPath = resolution?.id.replace(/\.([^.]*?)$/, `.${extension}.$1`);
      if (targetPath && fs.existsSync(targetPath)) {
        return targetPath;
      }
    },
  };
}
```

上面，没有配置参数或不是src目录下的就跳过，通过 `this.resolve` 调用其他插件完成路径解析，一般就能得到最终的路径。此时，再通过 `fs.existSync` 判断指定后缀的文件是否存在，存在就返回新路径。

很快啊，再开发环境跑没什么问题，但打包就出问题了。
