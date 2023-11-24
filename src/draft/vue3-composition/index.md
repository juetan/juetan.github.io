---
title: 浅谈vue3与vue2之间的不同与思想差异
date: 2023-11-08 08:41:00
---

最近在 vue2 项目和 vue3 项目之间跳来跳去，有了一些体会。

## 组合式

组合式刚上手可能是有些不适应的，咋看会觉得不如选项式看着顺眼。但组合式确实是很好的写法，不仅是形式上的好处，还有带来思想上的一些启示。先聊聊为什么需要组合式：复用和解耦。

复用

复用，即可以重复使用。组件复用说得比较多，例如 UI 库的按钮、弹窗和输入框等，主要我想说说逻辑复用。在 vue2，会使用 mixin 进行复用，但会带来问题，例如来源不清。代码如下，引入 4 个 mixin，但 add 方法却不能看出是哪个 mixin 携带的。

```ts
<script>
import { AMixin, BMixin, CMixin, DMixin } from './mixin';

export default {
  mixins: [AMixin, BMixin, CMixin, DMixin],
  methods: {
    demo() {
      this.add();
    },
  },
};
</script>
```

在 vue3，使用组合式可以很好的解决这个问题。代码如下，没有黑魔法，每个方法来源都清晰可见。

```ts
<script>
import { useA, useB, useC, useD } from './composable';

const { add1 } = useA();
const { add2 } = useB();
const { add } = useC();
const { add: add4 } = useD();

export default {
  methods: {
    demo() {
      add();
    },
  },
};
</script>
```

除以上，组合式配合其他写法能达到很好的开发体验。例如，使用setup语法可以简化书写结构；使用typescript能带来不错的类型提示。

解耦

解耦是