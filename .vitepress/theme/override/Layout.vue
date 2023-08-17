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
      <div class="flex mx-auto max-w-[1080px] mt-6">
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
import { useRoute } from 'vitepress';
import theme from 'vitepress/theme';
import DocNotFound from '../components/DocNotFound.vue';
import DocTitle from '../components/DocTitle.vue';

const { Layout } = theme;
const route = useRoute();
const serverURL = 'https://jtwaline.vercel.app';
</script>

<style scoped></style>
