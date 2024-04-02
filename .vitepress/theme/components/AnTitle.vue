<template>
  <div v-if="frontmatter.title">
    <h1 class="doc-title">
      {{ frontmatter.title }}
    </h1>
    <div class="w-full text-gray-500 text-xs flex items-center gap-3 pb-4 mt-2 mb-6">
      <span>作者：绝弹</span>
      <time :datetime="frontmatter.date" :title="frontmatter.date">
        发布时间：{{ dayjs(frontmatter.date).format('YYYY年MM月DD日') }}
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
