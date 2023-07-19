<template>
  <div class="w-full h-full flex justify-center items-center p-4">
    <div class="flex flex-col items-center">
      <div>
        <img src="/assets/404.svg" alt="404" class="w-[320px]" />
      </div>
      <div class="text-center">
        <p class="mt-0">抱歉页面未找到，请检查访问的地址是否正确!</p>
        <div class="space-x-3 mt-5">
          <Button type="primary" @click="onGoBack">
            <template #icon>
              <i class="i-icon-park-outline-back"></i>
            </template>
            返回上页
          </Button>
          <Button type="outline" @click="router.go('/')">
            <template #icon>
              <i class="i-icon-park-outline-home"></i>
            </template>
            返回首页
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@arco-design/web-vue';
import { useRouter } from "vitepress";

const router = useRouter();
const onGoBack = () => {
  window.history.back();
}
</script>

<style scoped></style>
