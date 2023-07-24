// @ts-nocheck
import { readFileSync } from 'fs';
import { presetUno, presetIcons } from 'unocss';
import Unocss from 'unocss/vite';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitepress';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import { applyPlugins } from '@ruabick/md-demo-plugins';

/**
 * 站点配置
 * @see https://vitepress.dev/reference/site-config
 */
export default defineConfig({
  lang: 'zh-CN',
  title: '绝弹博客',
  titleTemplate: ':title | 绝弹博客',
  description: '一位前端开发者的博客',
  appearance: false,
  srcDir: 'src',
  outDir: 'dist',
  cleanUrls: true,

  /**
   * markdown配置
   * @see https://github.com/markdown-it/markdown-it
   */
  markdown: {
    theme: 'github-light',
    lineNumbers: false,
    config(md) {
      applyPlugins(md);
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const aIndex = token.attrIndex('src');
        const src = token.attrs![aIndex][1];
        return `<Image src="${src}" class="cursor-pointer"  />`;
      };
    },
  },

  /**
   * @vitejs/plugin-vue配置
   * @see https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
   */
  vue: {
    /**
     * vue/compiler-sfc配置
     * @see https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#asset-url-handling
     */
    template: {
      /**
       * 默认只支持部分原生标签的src属性，例如img，video等
       * 由于使用了Image组件，配置后才能生成正确的src
       */
      transformAssetUrls: {
        Image: ['src'],
      },
    },
  },

  /**
   * vite配置
   * @see https://cn.vitejs.dev/config/
   */
  vite: {
    define: {
      __APP_LAST_MODIFIED__: JSON.stringify(new Date().toISOString()),
    },
    server: {
      port: 6060,
    },
    resolve: {
      alias: [
        {
          find: '@app/',
          replacement: `${fileURLToPath(import.meta.url)}/../`,
        },
        {
          find: '@theme/',
          replacement: `${fileURLToPath(import.meta.url)}/../theme`,
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'arcoblue-6': '#3b9',
          },
          javascriptEnabled: true,
        },
      },
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
          filesystem: ['.vitepress/config.ts'],
        },
        presets: [presetUno(), presetIcons()],
      }),
      /**
       * 组件样式加载
       */
      createStyleImportPlugin({
        libs: [
          {
            libraryName: '@arco-design/web-vue',
            esModule: true,
            resolveStyle: (name) => {
              return `@arco-design/web-vue/es/${name}/style/index.js`;
            },
          },
        ],
      }),
      /**
       * 替换默认主题的部分组件
       */
      {
        name: 'vite:juetan',
        load(id) {
          const list = ['VPNavBarMenuLink.vue', 'VPDocOutlineItem.vue'];
          const path = (i: string) => fileURLToPath(new URL(`./theme/override/${i}`, import.meta.url));
          const item = list.find((i) => id.includes(i) && !id.includes('?'));
          if (item) {
            return readFileSync(path(item), 'utf-8');
          }
        },
      },
    ],
  },

  /**
   * 主题配置
   * @see https://vitepress.dev/reference/default-theme-config
   */
  themeConfig: {
    logo: '/favicon.ico',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索',
          },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '重置搜索',
            footer: {
              selectText: '选择',
              navigateText: '移动',
              closeText: '关闭',
            },
          },
        },
      },
    },
    outline: {
      label: '本篇目录',
      level: [2, 3],
    },
    nav: [
      {
        text: '首页',
        icon: 'i-icon-park-outline-home',
        link: '/',
      },
      {
        text: '前端',
        icon: 'i-icon-park-outline-html-five',
        link: '/frontend/',
      },
      {
        text: '后端',
        icon: 'i-icon-park-outline-server',
        link: '/backend',
      },
      {
        text: '日常',
        icon: 'i-icon-park-outline-coconut-tree',
        link: '/daily',
      },
      {
        text: '工具',
        icon: 'i-icon-park-outline-tool',
        link: '/tools',
      },
      {
        text: '归档',
        icon: 'i-icon-park-outline-hourglass-null',
        link: '/archive/',
      },
      {
        text: '关于',
        icon: 'i-icon-park-outline-user',
        link: '/about/',
      },
    ] as any,
    sidebar: {
      '/frontend/1': [
        {
          text: '基础知识',
          items: [
            {
              text: 'HTML中的标签有多少个?',
              link: '/front-end/a',
            },
            {
              text: 'Runtime API示例',
              link: '/front-end/b',
            },
          ],
        },
        {
          text: '工具类库',
          items: [
            {
              text: 'Lodash在日常开发中有用的函数',
            },
          ],
        },
        {
          text: 'vue',
          items: [
            {
              text: '如何将.vue文件编译成js文件?',
            },
          ],
        },
        {
          text: '浏览器',
          items: [
            {
              text: '浏览器Console面板中有用的调试技巧',
            },
            {
              text: '如何利用EJS模板引擎辅助生成代码?',
              link: '/front-end/ejs-generate-code',
            },
            {
              text: '项目中的字典常量应该如何维护?',
            },
            {
              text: '从new xx()和new xx的区别聊聊JS中操作符的优先级问题',
              link: '/front-end/js-operator-priority',
            },
            {
              text: 'TailwindCSS中一些有意思的用法和实现',
            },
            {
              text: '函数柯里化是什么如何实现它?',
            },
            {
              text: '写一个VITE插件: 根据配置加载不同后缀的文件',
            },
          ],
        },
      ],
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    footer: {
      message: '自由转载-非商用-非衍生-保持署名(创意共享3.0许可证)',
      copyright: 'Copyright © 2023 土豆淀粉，版权所有',
    },
  },
});
