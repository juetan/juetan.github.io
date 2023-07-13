import { defineConfig } from "vitepress";
import { presetIcons, presetUno } from "unocss";
import Unocss from "unocss/vite";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
// import { icons } from "@iconify-json/icon-park-outline";

/**
 * 站点配置
 * @see https://vitepress.dev/reference/site-config
 */
export default defineConfig({
  lang: "zh-CN",
  title: "土豆淀粉",
  description: "一位前端开发者的博客",
  appearance: false,
  /**
   * 主题配置
   * @see https://vitepress.dev/reference/default-theme-config
   */
  themeConfig: {
    logo: "/juetan.jpg",
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索",
          },
          modal: {
            noResultsText: "没有找到结果",
            resetButtonTitle: "重置搜索",
            footer: {
              selectText: "选择",
              navigateText: "移动",
              closeText: "关闭",
            },
          },
        },
      },
    },
    outline: {
      label: "本篇目录",
      level: [2, 3],
    },
    nav: [
      {
        text: "首页",
        icon: "icon-park-outline-home",
        link: "/",
      },
      {
        text: "前端开发",
        icon: "icon-park-outline-html-five",
        link: "/frontend/",
      },
      {
        text: "后端开发",
        icon: "icon-park-outline-server",
        link: "/backend",
      },
      {
        text: "日常记录",
        icon: "icon-park-outline-coconut-tree",
        link: "/daily",
      },
      {
        text: "开发工具",
        icon: "icon-park-outline-tool",
        link: "/tools",
      },
      {
        text: "关于",
        icon: "icon-park-outline-user",
        link: "/about/index",
      },
    ] as any,
    sidebar: {
      "/front-end/1": [
        {
          text: "基础知识",
          items: [
            {
              text: "HTML中的标签有多少个?",
              link: "/front-end/a",
            },
            {
              text: "Runtime API示例",
              link: "/front-end/b",
            },
          ],
        },
        {
          text: "工具类库",
          items: [
            {
              text: "Lodash在日常开发中有用的函数",
            },
          ],
        },
        {
          text: "vue",
          items: [
            {
              text: "如何将.vue文件编译成js文件?",
            },
          ],
        },
        {
          text: "浏览器",
          items: [
            {
              text: "浏览器Console面板中有用的调试技巧",
            },
            {
              text: "如何利用EJS模板引擎辅助生成代码?",
              link: "/front-end/ejs-generate-code",
            },
            {
              text: "项目中的字典常量应该如何维护?",
            },
            {
              text: "从new xx()和new xx的区别聊聊JS中操作符的优先级问题",
              link: "/front-end/js-operator-priority",
            },
            {
              text: "TailwindCSS中一些有意思的用法和实现",
            },
            {
              text: "函数柯里化是什么如何实现它?",
            },
            {
              text: "写一个VITE插件: 根据配置加载不同后缀的文件",
            },
          ],
        },
      ],
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    footer: {
      message: "自由转载-非商用-非衍生-保持署名（创意共享3.0许可证）",
      copyright: "Copyright © 2023 土豆淀粉，版权所有",
    },
  },

  markdown: {
    theme: "one-dark-pro",
    lineNumbers: true,
  },

  /**
   * vite配置
   */
  vite: {
    resolve: {
      alias: [
        {
          find: "@app/",
          replacement: `${fileURLToPath(import.meta.url)}/../`,
        },
      ],
    },
    plugins: [
      /**
       * 提供CSS和图标的按需生成
       * @see https://github.com/unocss/unocss#readme
       */
      Unocss({
        content: {
          pipeline: {
            include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|ts)($|\?)/],
          },
        },
        safelist: [
          "icon-park-outline-home",
          "icon-park-outline-html-five",
          "icon-park-outline-server",
          "icon-park-outline-coconut-tree",
          "icon-park-outline-tool",
          "icon-park-outline-user",
          "icon-park-outline-bookshelf",
        ],
        presets: [
          presetUno(),
          presetIcons({
            prefix: "",
            collections: {
              "icon-park-outline": () => {
                const path = "./node_modules/@iconify-json/icon-park-outline/icons.json";
                return JSON.parse(readFileSync(path, "utf-8"));
              },
            },
          }),
        ],
      }) as any,
      {
        name: "vite:pres",
        load(id) {
          const list = ["VPNavBarMenuLink.vue"];
          const path = (i: string) => fileURLToPath(new URL(`./theme/override/${i}`, import.meta.url));
          const item = list.find((i) => id.includes(i) && !id.includes("?"));
          if (item) {
            return readFileSync(path(item), "utf-8");
          }
        },
      },
    ],
  },
});
