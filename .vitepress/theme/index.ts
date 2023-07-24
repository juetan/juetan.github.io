import { Image } from '@arco-design/web-vue';
import 'uno.css';
import { EnhanceAppContext } from 'vitepress';
import Theme from 'vitepress/theme';
import './css/animation.css';
import './css/cursor.css';
import './css/override.css';
import Layout from './override/Layout.vue';
import DemoBlock from '@ruabick/vitepress-demo-block';
import '@ruabick/vitepress-demo-block/dist/style.css';

/**
 * 自定义主题
 * @see https://vitepress.dev/guide/custom-theme
 */
export default {
  ...Theme,
  Layout,
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    app.component('Image', Image);
    app.component('demo', DemoBlock);
  },
};
