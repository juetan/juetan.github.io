<template>
  <div>
    <div class="text-base mb-2"><i class="icon-park-outline-bookshelf mr-1"></i>最新文章</div>
    <ul class="item-list">
      <li v-for="(post, index) in posts" :key="post.title" class="item flex justify-bewteen gap-2">
        <div class="flex-1 grid grid-rows-[auto_1fr_auto]">
          <a :href="post.url" class="item-link">
            <h2 class="item-title hover:text-blue-600">{{ post.frontmatter.title || "暂无标题" }}</h2>
          </a>
          <p class="item-excerpt line-clamp-2 text-gray-500">
            {{ post.excerpt || "暂无简介" }}
          </p>
          <div class="text-gray-400 flex items-center gap-3">
            <div class="cursor-pointer hover:text-blue-600">
              <span class="icon-park-outline-user" />
              绝弹
            </div>
            <div class="cursor-pointer hover:text-blue-600">
              <span class="icon-park-outline:tag-one" />
              前端
            </div>
            <div>
              <span class="icon-park-outline-time" />
              {{ dayjs(post.frontmatter.date).format("YYYY年MM月DD日") }}
            </div>
          </div>
        </div>
        <div>
          <img
            v-if="post.frontmatter.thumbnail"
            :src="post.frontmatter.thumbnail"
            :alt="post.frontmatter.title"
            class="rounded h-full aspect-ratio w-[180px] max-w-initial bg-slate-100 hover:opacity-80"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { data as posts } from "@app/data/posts.data.ts";
import { dayjs } from "../dayjs";
</script>

<style scoped>
.item-list {
  margin: 0;
  padding: 0;
}
.item {
  border-bottom: 1px solid #eee;
  padding: 16px 0;
}
.item:first-child {
  border-top: 1px solid #eee;
}
.item-title {
  font-size: 16px;
  font-weight: 600;
  border-bottom: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  line-height: 24px;
}
.item-excerpt {
  font-size: 14px;
  margin: 8px 0;
}
.item-link {
  display: initial;
  text-decoration: none;
  color: inherit;
}
.item-link:hover {
  text-decoration: none;
}
.icon-park-outline-bookshelf {
  vertical-align: -3px;
}
</style>
