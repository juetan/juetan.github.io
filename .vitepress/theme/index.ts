import { Image } from '@arco-design/web-vue';
import AnLayout from '@theme/components/AnLayout.vue';
import '@theme/styles/cursor.css';
import '@theme/styles/override.css';
import 'uno.css';
import { EnhanceAppContext } from 'vitepress';
import Theme from 'vitepress/theme';

/**
 * 自定义主题
 * @see https://vitepress.dev/guide/custom-theme
 */
export default {
  ...Theme,
  Layout: AnLayout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('Image', Image);
  },
};
