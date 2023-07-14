<template>
  <Layout>
    <template #doc-before>
      <DocTitle></DocTitle>
    </template>
    <template #not-found>
      <DocNotFound></DocNotFound>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import theme from 'vitepress/theme'
import DocTitle from '../components/DocTitle.vue';
import DocNotFound from '../components/DocNotFound.vue';

const { Layout } = theme
// console.log('theme', theme)
</script>

<style scoped>

</style>