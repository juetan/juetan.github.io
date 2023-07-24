<template>
  <Layout>
    <template #doc-before>
      <DocTitle></DocTitle>
    </template>
    <template #not-found>
      <DocNotFound></DocNotFound>
    </template>
    <template #layout-bottom>
      <BackTop>
        <Button type="dashed" size="large" shape="circle" class="hidden md:inline-block">UP</Button>
      </BackTop>
    </template>
    <template #doc-bottom>
      <div id="gittalk"></div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { BackTop, Button } from '@arco-design/web-vue';
import { fairyDustCursor } from 'cursor-effects';
import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';
import { useRoute } from 'vitepress';
import theme from 'vitepress/theme';
import { onMounted, watch } from 'vue';
import DocNotFound from '../components/DocNotFound.vue';
import DocTitle from '../components/DocTitle.vue';

const { Layout } = theme;

const initGitTalk = () => {
  const gitalk = new Gitalk({
    clientID: '8786fc7940415da9145f',
    clientSecret: 'd22ea694891436d822e392611b536d9df0612ce7',
    owner: 'juetan',
    repo: 'juetan.github.io',
    id: encodeURIComponent(location.pathname),
    admin: ['juetan'],
  });
  gitalk.render('gittalk');
};

onMounted(() => {
  new fairyDustCursor({
    colors: ['#98EBC7', '#89E9E0', '#9FD4FD', '#C396ED', '#F08EE6', '#FCC59F', '#FFCF8B'],
  });
  initGitTalk();
});

const route = useRoute();

watch(
  () => route.path,
  () => {
    initGitTalk();
  }
);
</script>

<style scoped></style>
