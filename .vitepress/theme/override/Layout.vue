<template>
  <Layout>
    <template #doc-before>
      <DocTitle></DocTitle>
    </template>
    <template #not-found>
      <DocNotFound></DocNotFound>
    </template>
    <template #layout-bottom>
      <BackTop>
        <Button type="dashed" size="large" shape="circle" class="hidden md:inline-block">UP</Button>
      </BackTop>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { BackTop, Button } from '@arco-design/web-vue';
import theme from 'vitepress/theme';
import DocNotFound from '../components/DocNotFound.vue';
import DocTitle from '../components/DocTitle.vue';

const { Layout } = theme
</script>

<style scoped>

</style>