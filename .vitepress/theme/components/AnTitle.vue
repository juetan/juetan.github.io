<template>
  <div v-if="frontmatter.title">
    <h1 class="doc-title">
      {{ frontmatter.title }}
    </h1>
    <div class="w-full text-gray-500 text-xs flex items-center gap-3 border-b border-slate-200 pb-4 mt-4 mb-6">
      <div>
        <span class="i-icon-park-outline-user" />
        绝弹
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
import { dayjs } from '@theme/utils/dayjs';
import { useData } from 'vitepress';

const { frontmatter, page } = useData<PostItem>();
const item = data.find((i) => i.frontmatter.title === page.value.frontmatter.title);
</script>

<style scoped>
.doc-title {
  letter-spacing: -0.02em;
  line-height: 40px;
  font-size: 22px;
  font-weight: 600;
}
</style>
../utils