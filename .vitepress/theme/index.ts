import Theme from 'vitepress/theme';
import { EnhanceAppContext } from 'vitepress';
import Layout from './override/Layout.vue';
import './css/override.css';
import './css/animation.css';
import 'uno.css';
import '@arco-design/web-vue/dist/arco.css';
import { Image } from '@arco-design/web-vue';

/**
 * 自定义主题
 * @see https://vitepress.dev/guide/custom-theme
 */
export default {
  ...Theme,
  Layout,
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    // ...
    app.component('Image', Image);
  },
};
