<template>
  <div v-if="frontmatter.title">
    <h1 class="doc-title">
      {{ frontmatter.title }}
    </h1>
    <div class="mt-3 text-gray-400 flex items-center gap-3 border-b border-[var(--vp-c-divider)] pb-2 mb-6">
      <div class="cursor-pointer hover:text-[var(--vp-c-brand)]">
        <span class="i-icon-park-outline-user" />
        绝弹
      </div>
      <div class="cursor-pointer hover:text-[var(--vp-c-brand)]">
        <span class="i-icon-park-outline:tag-one" />
        前端
      </div>
      <div>
        <span class="i-icon-park-outline:text" />
        {{ frontmatter.wordCount || 0 }} 字
      </div>
      <time :datetime="frontmatter.date">
        <span class="i-icon-park-outline-time" />
        {{ dayjs(frontmatter.date).format('YYYY年MM月DD日') }}
      </time>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import { dayjs } from '../dayjs';
import { PostItem } from '@app/data/posts.data.ts';

const { frontmatter } = useData<PostItem>();
</script>

<style scoped>
.doc-title {
  letter-spacing: -0.02em;
  line-height: 40px;
  font-size: 32px;
  font-weight: 600;
}
</style>
