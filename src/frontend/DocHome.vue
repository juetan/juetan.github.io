<template>
  <div class="mx-4 md:mx-auto mt-5 flex gap-4 max-w-[1280px]">
    <div class="flex-1 bg-white px-5">
      <div>
        <div class="text-base h-13 flex items-center border-b border-[#eee]">
          <i class="icon-park-outline-bookshelf mr-1"></i>最新文章
        </div>
        <ul class="item-list bounce-in-bottom">
          <li v-for="(post, index) in posts" :key="post.title" class="item flex justify-bewteen gap-2">
            <div class="flex-1 grid grid-rows-[auto_1fr_auto]">
              <a :href="post.url" class="item-link flex gap-2 overflow-hidden">
                <h2 class="item-title hover:text-blue-600 truncate">
                  {{ post.frontmatter.title || '暂无标题' }}
                </h2>
              </a>
              <p class="item-excerpt line-clamp-2 text-gray-500 h-13">
                {{ post.excerpt || '暂无简介' }}
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
                  {{ dayjs(post.frontmatter.date).format('YYYY年MM月DD日') }}
                </div>
              </div>
            </div>
            <div>
              <img
                v-if="post.frontmatter.thumbnail"
                :src="post.frontmatter.thumbnail"
                :alt="post.frontmatter.title"
                class="hidden md:block rounded h-full aspect-video max-w-initial bg-slate-100 opacity-80 hover:opacity-100 transition-opacity duration-200 ease-in-out"
              />
            </div>
          </li>
        </ul>
        <div class="my-6 flex gap-2 justify-center">
          <div class="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-sm cursor-pointer">
            <span class="icon-park-outline-left"></span>
          </div>
          <div
            class="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-sm cursor-pointer bg-blue-50 text-blue-500"
          >
            <span> 1 </span>
          </div>
          <div class="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded cursor-pointer">
            <span> 2 </span>
          </div>
          <div class="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded cursor-pointer">
            <span> 3 </span>
          </div>
          <div class="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded cursor-pointer">
            <span class="icon-park-outline-right"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden md:block w-[264px]">
      <div class="bg-white rounded px-4">
        <div class="h-12 flex items-center border-b border-slate-200">
          <span class="icon-park-outline-hamburger-button mr-1"></span>
          站点导航
        </div>
        <div class="grid gap-1 py-2">
          <div class="h-8 leading-8 hover:text-[#09f] cursor-pointer">前端导航</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { data as posts } from '@app/data/posts.data.ts';
import { dayjs } from '@theme/dayjs';
</script>

<style scoped>
.item-list {
  margin: 0;
  padding: 0;
}
.item {
  border-bottom: 1px solid #eee;
  padding: 16px 0;
  height: 152px;
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
  text-decoration: none;
  color: inherit;
}
.item-link:hover {
  text-decoration: none;
}
.icon-park-outline-bookshelf {
  vertical-align: -3px;
}
.bounce-in-bottom {
  animation: bounce-in-bottom 1.1s both;
}
@keyframes bounce-in-bottom {
  0% {
    transform: translateY(500px);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    transform: translateY(0);
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    transform: translateY(65px);
    animation-timing-function: ease-in;
  }
  72% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateY(28px);
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateY(8px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
}
</style>
