<template>
  <main class="md:mx-auto mx-2 mt-3 flex gap-4 max-w-[920px]">
    <div class="item-list-wrapper flex-1 bg-white px-3 md:px-0">
      <div>
        <div class="text-base h-13 flex items-center border-b border-[#eee]">
          <i class="i-icon-park-outline-bookshelf mr-1"></i>最新文章
        </div>
        <ul class="item-list bounce-in-bottom">
          <li v-for="(post, index) in data" :key="post.url" class="item flex justify-bewteen gap-2">
            <div class="flex-1 grid grid-rows-[auto_1fr_auto]">
              <a :href="post.url" class="item-link text-slate-700 flex gap-2 overflow-hidden">
                <h2 class="item-title truncate">
                  {{ post.frontmatter.title || '暂无标题' }}
                </h2>
              </a>
              <p class="item-excerpt line-clamp-2 text-gray-500 h-13 mt-2">
                {{ post.excerpt || '暂无简介' }}
              </p>
              <div class="text-gray-400 text-xs flex items-center gap-3">
                <div>
                  <span class="i-icon-park-outline-user" />
                  绝弹
                </div>
                <div>
                  <span class="i-icon-park-outline-time" />
                  {{ dayjs(post.frontmatter.date).format('YYYY年MM月DD日') }}
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <Image
                v-if="post.frontmatter.thumbnail"
                :src="post.frontmatter.thumbnail"
                :alt="post.frontmatter.title"
                :preview="false"
                class="rounded h-full aspect-video max-w-initial bg-slate-100 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-200 ease-in-out"
              />
            </div>
          </li>
        </ul>
        <div class="my-6 flex gap-2 justify-center">
          <Pagination :total="posts.length" :page-size="size" :current="page" @change="onPageSizeChange" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { data as posts } from '@app/data/posts.data.ts';
import { Pagination } from '@arco-design/web-vue';
import { dayjs } from '@theme/utils/dayjs';
import { useRoute, useRouter } from 'vitepress';
import { computed, ref } from 'vue';

const route = useRoute();
const query = new URLSearchParams(location.search);
const page = ref(Number(query.get('page') ?? '1'));
const size = ref(10);
const data = computed(() => posts.slice(size.value * (page.value - 1), size.value * page.value));
const router = useRouter();
const founded = dayjs().diff(dayjs('2023-01-01 00:00:00'), 'day');
const lastModified = dayjs('2023-01-01 00:00:00').fromNow();

const onPageSizeChange = (newPage: number) => {
  page.value = newPage;
  router.go(`?page=${newPage}`);
};

const stat = [
  {
    icon: 'i-icon-park-outline-rss',
    title: '文章数量',
    value: `${posts.length} 篇`,
  },
  {
    icon: 'i-icon-park-outline-tag-one',
    title: '标签数量',
    value: `${posts.length} 个`,
  },
  {
    icon: 'i-icon-park-outline-hourglass-full',
    title: '运行天数',
    value: `${founded} 天`,
  },
  {
    icon: 'i-icon-park-outline-lightning',
    title: '最近活跃',
    value: lastModified,
  },
];
</script>

<style scoped>
.item-list {
  margin: 0;
  padding: 0;
}
.item {
  border-bottom: 1px solid #eee;
  padding: 16px 0;
  height: 148px;
}
.item-title {
  font-size: 18px;
  font-weight: 400;
  border-bottom: none;
  margin: 0;
  padding: 0;
  line-height: 24px;
}
.item-excerpt {
  font-size: 14px;
}
.item-link {
  text-decoration: none;
}
.item-link:hover {
  color: var(--vp-c-brand);
  text-decoration: underline;
}
.i-icon-park-outline-bookshelf {
  vertical-align: -3px;
}
</style>
