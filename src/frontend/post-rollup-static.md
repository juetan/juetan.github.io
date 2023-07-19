---
title: 探索Rollup是如何对静态资源进行处理的
date: 2023-07-19 17:59:00
---

自从 Vite 3 发布起，就开始用它做了不少实践和项目，Vite 的底层是 Rollup 和 Esbuild。而 Rollup 用在打包阶段，一直以来我都好奇对 Rollup 如何处理静态资源的，那么今天主要是想探索一下，如何写一个 Rollup 插件，实现：

```ts
import Image from './image-actions.png';

console.log(Image);
```

打包成下面这样，且生成对应的文件

```ts
const Image = './image-actions-xxx.png';

console.log(Image);
```

想要上手，那肯定是得先搭建一个简易环境。

## 搭建打包环境

### 安装必要的依赖

1. 先建个空目录，进入里面初始化一个项目，`-y`表示一路`yes`，即使用默认参数。

```bash
npm init -y
```

2. 安装依赖

```bash
pnpm i rollup -D
```

3. 实现一下基本的打包流程

```ts
// <root>/build.js
const run = async () => {
  const bundle = await rollup({
    input: 'src/main.js',
    plugins: [plugin()],
  });
  await bundle.write({ dir: 'dist' });
};

run();
```

4. 插件

```ts
export const plugin = () => {
  const assets = new Map();
  return {
    name: 'rollup:plugin',
    load(id) {
      if (!id.endsWith('.png')) {
        return;
      }
      const key = this.emitFile({
        type: 'asset',
        name: path.basename(id),
        source: fs.readFileSync(id),
      });
      const ID = `ROLLUP_FILE_URL_${key}`;
      assets.set(key, ID);
      return `export default import.meta.${ID};`;
    },
    resolveFileUrl({ referenceId }) {
      console.log('resolve file url', referenceId, this.getFileName(referenceId));
      return `'${this.getFileName(referenceId)}'`;
    },
  };
};
```
