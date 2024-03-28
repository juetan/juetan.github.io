<script setup lang="ts">
import { formatNumber, state } from '@theme/utils/state';
import { onMounted } from 'vue';
import type { MenuItem } from '../composables/outline';

function getId(link: string) {
  const id = link.split('#')?.[1];
  return id && decodeURIComponent(id);
}
function updateActive() {
  state.hash = getId(location.href);
}
function isSame(link: string) {
  return state.hash === getId(link);
}

onMounted(() => {
  updateActive();
});

defineProps<{
  headers: MenuItem[];
  root?: boolean;
}>();

function onClick({ target: el }: Event) {
  const id = (el as HTMLAnchorElement).href!.split('#')[1];
  const heading = document.getElementById(decodeURIComponent(id));
  heading?.focus();
  updateActive();
}

function getOrder(index: number, root?: boolean) {
  if(root) {
    return formatNumber(index + 1) + '、';
  }
}
</script>

<template>
  <ul :class="root ? 'root' : 'nested'">
    <li v-for="({ children, link, title }, index) in headers">
      <a class="outline-link" :class="{ 'outline-active': isSame(link) }" :href="link" @click="onClick" :title="title">
        {{ getOrder(index, root) }}{{ title }}
      </a>
      <template v-if="children?.length">
        <VPDocOutlineItem :headers="children" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
.root {
  position: relative;
  z-index: 1;
}

.nested {
  padding-left: 13px;
}

.outline-link {
  display: block;
  line-height: 28px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;
  font-weight: 500;
}

.outline-link:hover,
.outline-link.active {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.outline-link.nested {
  padding-left: 13px;
}
</style>
