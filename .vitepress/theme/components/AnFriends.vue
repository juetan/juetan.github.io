<template>
  <div class="friends">
    <div class="text-gray-400 mb-4">
      共 {{ friends.length }} 位友链
    </div>
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
      <a
        v-for="friend in friends"
        :key="friend.url"
        :href="friend.url"
        target="_blank"
        rel="noopener noreferrer"
        class="friend-card"
      >
        <div class="flex items-start gap-3">
          <a-avatar :size="56" class="shrink-0">
            <img :src="friend.avatar" :alt="friend.name" loading="lazy" />
          </a-avatar>
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-2">
              <span class="friend-name text-slate-700 truncate">{{ friend.name }}</span>
              <a-tag :color="statusColor[friend.status]" size="small" class="!m-0 shrink-0">
                {{ statusText[friend.status] }}
              </a-tag>
            </div>
            <p class="friend-desc text-slate-400 text-sm mt-1 line-clamp-2">
              {{ friend.description }}
            </p>
            <span class="friend-url text-xs mt-2 block truncate">
              <i class="i-icon-park-outline-link"></i>
              {{ friend.url }}
            </span>
          </div>
        </div>
      </a>
    </div>

    <!-- 申请友链 -->
    <div class="apply mt-12">
      <h2 class="apply-title text-slate-700 text-xl font-semibold mb-4">
        <i class="i-icon-park-outline-hand-right"></i>
        申请友链
      </h2>

      <ul class="rules grid gap-3 grid-cols-1 mt-8! mb-6">
        <li v-for="rule in rules" :key="rule.text" class="rule-item text-sm">
          <i :class="rule.icon" class="shrink-0"></i>
          <span>{{ rule.text }}</span>
        </li>
      </ul>

      <div class="self-card">
        <div class="self-card-header text-sm font-semibold mb-3">
          <i class="i-icon-park-outline-info"></i>
          本站友链信息，添加后请通过下方方式告知我
        </div>
        <div class="self-card-body">
          <div v-for="field in selfFields" :key="field.label" class="self-field">
            <span class="self-field-label">{{ field.label }}</span>
            <code class="self-field-value">{{ field.value }}</code>
            <button class="copy-btn" type="button" @click="copy(field.value)">
              <i :class="copied === field.value ? 'i-icon-park-outline-check-correct' : 'i-icon-park-outline-copy'"></i>
              {{ copied === field.value ? '已复制' : '复制' }}
            </button>
          </div>
        </div>
      </div>

      
      <p class="contact text-sm mt-4">
        <i class="i-icon-park-outline-quote"></i>
        满足以上条件后，欢迎通过邮箱
        <a href="mailto:952222@163.com" class="!text-slate-500 underline-offset-4">952222@163.com</a>
        或 GitHub
        <a href="https://github.com/juetan" target="_blank" rel="noopener noreferrer" class="!text-slate-500 underline-offset-4">juetan</a>
        联系我，我会尽快添加你的友链～
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Avatar as AAvatar, Tag as ATag } from '@arco-design/web-vue';
import { data as friends } from '@app/data/friends.data.ts';
import type { FriendStatus } from '@app/data/friends.data.ts';

/** 状态文案映射 */
const statusText: Record<FriendStatus, string> = {
  active: '正常',
  inactive: '失联',
};

/** 状态颜色映射 */
const statusColor: Record<FriendStatus, string> = {
  active: 'green',
  inactive: 'red',
};

/** 申请友链条件 */
const rules = [
  { icon: 'i-icon-park-outline-check-correct', text: '请先将本站友链添加到你的网站，我会不定期回访确认' },
  { icon: 'i-icon-park-outline-forbid', text: '网站内容健康，不涉及黄赌毒、政治敏感等违法违规内容' },
  { icon: 'i-icon-park-outline-write', text: '有一定的原创内容，禁止纯采集、纯镜像站点' },
  { icon: 'i-icon-park-outline-earth', text: '拥有独立域名，可正常访问，拒绝免费二级域名' },
  { icon: 'i-icon-park-outline-refresh', text: '网站持续维护更新，长期无法访问的友链会被移除' },
  { icon: 'i-icon-park-outline-communication', text: '添加成功后请保持互链，任何一方移除即视为终止交换' },
];

/** 本站友链信息 */
const selfFields = [
  { label: '头像', value: 'https://juetan.cn/favicon.ico' },
  { label: '名字', value: '绝弹博客' },
  { label: '介绍', value: '一名前端开发工程师，分享前端工程化与 Node.js 全栈技术' },
  { label: '地址', value: 'https://juetan.cn' },
];

/** 当前已复制的字段值 */
const copied = ref('');

/** 复制字段内容到剪贴板 */
async function copy(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    copied.value = value;
    setTimeout(() => (copied.value = ''), 2000);
  } catch {
    console.error('复制失败，请手动复制');
  }
}
</script>

<style scoped>
.friend-card {
  display: block;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  text-decoration: none;
  transition: all 0.3s;
}

.friend-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  text-decoration: none;
}

.friend-name {
  font-weight: 600;
}

.friend-desc {
  line-height: 1.6;
}

.friend-url {
  color: var(--vp-c-text-3);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--vp-c-text-2);
}

.rule-item i {
  color: var(--vp-c-brand-1);
  font-size: 16px;
  margin-top: 2px;
}

.self-card {
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  background-color: var(--vp-c-bg-soft);
  margin-top: 48px;
}

.self-card-header {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--vp-c-text-1);
}

.self-field {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
}

.self-field-label {
  width: 3em;
  flex-shrink: 0;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.self-field-value {
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  white-space: nowrap;
  font-size: 13px;
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

.copy-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.contact {
  color: var(--vp-c-text-3);
}

.contact i {
  margin-right: 4px;
}
</style>
