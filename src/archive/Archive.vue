<template>
  <div>
    <div class="text-gray-400 mb-4">
      统计：共 {{ posts.length }} 篇文章
    </div>
    <Timeline>
      <Timeline.Item v-for="post in posts" :key="post.url">
        <template #label> </template>
        <a :href="post.url" class="!text-slate-700 underline-offset-4">
          {{ post.frontmatter.title || '暂无标题' }}
        </a>
        <time class="block text-slate-400 text-xs mt-1">
          {{ dayjs(post.frontmatter.date).format('YYYY年MM月DD日') }}
        </time>
      </Timeline.Item>
    </Timeline>
  </div>
</template>

<script setup lang="ts">
import { data as posts } from '@app/data/posts.data.ts';
import { Timeline } from '@arco-design/web-vue';
import { dayjs } from '@theme/dayjs';
</script>

<style scoped></style>
