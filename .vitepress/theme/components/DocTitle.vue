<template>
  <div v-if="frontmatter.title">
    <h1 class="doc-title">
      {{ frontmatter.title }}
    </h1>
    <div class="mt-2 text-slate-400 text-xs flex items-center gap-3 border-b border-slate-200 pb-2 mb-4">
      <div class="cursor-pointer hover:text-[var(--vp-c-brand)]">
        <span class="i-icon-park-outline:tag-one" />
        前端
      </div>
      <div>
        <span class="i-icon-park-outline:text" />
        约 {{ item?.frontmatter.wordCount || 0 }} 字
      </div>
      <time :datetime="frontmatter.date" :title="frontmatter.date">
        <span class="i-icon-park-outline-time" />
        {{ dayjs(frontmatter.date).format('YYYY年MM月DD日') }}
      </time>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PostItem, data } from '@app/data/posts.data.ts';
import { useData } from 'vitepress';
import { dayjs } from '../dayjs';

const { frontmatter, page } = useData<PostItem>();
const item = data.find((i) => i.frontmatter.title === page.value.frontmatter.title);
</script>

<style scoped>
.doc-title {
  letter-spacing: -0.02em;
  line-height: 40px;
  font-size: 32px;
  font-weight: 600;
}
</style>
