<template>
  <div>
    <Timeline>
      <h2>2023年</h2>
      <TimelineItem v-for="post in posts.slice(0,10)" :key="post.url">
        <template #label>
        </template>
        <a :href="post.url" class="!text-slate-700 underline-offset-4">
          {{ post.frontmatter.title || '暂无标题' }}
        </a>
        <time class="block text-slate-400 text-xs mt-1">
          {{ dayjs(post.frontmatter.date).format('YYYY年MM月DD日') }}
        </time>
      </TimelineItem>
      <h2>2022年</h2>
      <TimelineItem v-for="post in posts.slice(0,10)" :key="post.url">
        <template #label>
        </template>
        <a :href="post.url" class="!text-slate-700">
          {{ post.frontmatter.title || '暂无标题' }}
        </a>
        <time class="block text-slate-400 text-xs mt-1">
          {{ dayjs(post.frontmatter.date).format('YYYY年MM月DD日') }}
        </time>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script setup lang="ts">
import { data as posts } from '@app/data/posts.data.ts';
import { Timeline, TimelineItem } from '@arco-design/web-vue';
import { dayjs } from '@theme/dayjs';
</script>

<style scoped>

</style>