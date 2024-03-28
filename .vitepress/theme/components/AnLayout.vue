<template>
  <Layout>
    <template #doc-before>
      <AnTitle></AnTitle>
    </template>
    <template #not-found>
      <AnNotFound></AnNotFound>
    </template>
    <template #layout-bottom>
      <BackTop>
        <Button type="primary" shape="round" size="large" class="!hidden !md:inline-block">
          <template #icon>
            <i class="i-icon-park-outline-up-small text-lg"></i>
          </template>
        </Button>
      </BackTop>
      <footer class="text-gray-500 text-sm text-center pt-6 pb-5">
        <div>
          <ul class="list-none flex gap-2 justify-center items-center">
            <li>已有 {{ posts.length }} 篇文章</li>
            <li class="text-xs">|</li>
            <li>已运行 {{ createdAt }} 天</li>
            <li class="text-xs">|</li>
            <li>最近更新于 {{ updatedAt }}</li>
          </ul>
        </div>
        <div class="mt-1">
          Copyright © 2023 绝弹笔记
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            class="hover:text-[var(--vp-c-brand)] hover:underline underline-offset-2"
          >
            桂ICP备2021001859号-1
          </a>
        </div>
      </footer>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { data as posts } from '@app/data/posts.data.ts';
import { BackTop, Button } from '@arco-design/web-vue';
import AnNotFound from '@theme/components/AnNotFound.vue';
import AnTitle from '@theme/components/AnTitle.vue';
import { dayjs } from '@theme/utils/dayjs';
import { useRoute } from 'vitepress';
import theme from 'vitepress/theme';

const { Layout } = theme;
const route = useRoute();
const serverURL = 'https://jtwaline.vercel.app';

const created = import.meta.env.VITE_CREATED_AT ?? '2023-01-01 00:00:00';
const createdAt = dayjs().diff(dayjs(created), 'day');
const updatedAt = dayjs(__APP_LAST_MODIFIED__).fromNow();
</script>

<style scoped></style>
../utils