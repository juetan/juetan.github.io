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
        <Button type="primary" class="!hidden !md:inline-block">
          <template #icon>
            <i class="i-icon-park-outline-up-small"></i>
          </template>
        </Button>
      </BackTop>
    </template>
    <template #doc-bottom>
      <div class="flex mx-auto max-w-[1280px] mt-6">
        <Waline class="flex-1" :serverURL="serverURL" :path="route.path" :copyright="false" lang="zh-CN" />
        <div class="hidden md:block w-[256px]"></div>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { BackTop, Button } from '@arco-design/web-vue';
import { Waline } from '@waline/client/component';
import '@waline/client/dist/waline.css';
import { fairyDustCursor } from 'cursor-effects';
import { useRoute } from 'vitepress';
import theme from 'vitepress/theme';
import { nextTick, onMounted, onUnmounted, watch } from 'vue';
import DocNotFound from '../components/DocNotFound.vue';
import DocTitle from '../components/DocTitle.vue';
import { useTocSync } from './state';

const { Layout } = theme;
const route = useRoute();
const serverURL = 'https://jtwaline.vercel.app';
const toc = useTocSync();

onMounted(() => {
  new fairyDustCursor({
    colors: ['#98EBC7', '#89E9E0', '#9FD4FD', '#C396ED', '#F08EE6', '#FCC59F', '#FFCF8B'],
  });
  toc.run();
});

watch(
  () => route.path,
  async () => {
    await nextTick();
    toc.run();
  }
);

onUnmounted(() => {
  toc.cancel();
});
</script>

<style scoped></style>
