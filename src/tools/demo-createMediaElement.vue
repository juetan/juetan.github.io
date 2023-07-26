<template>
  <div class="flex gap-4 items-center">
    <audio id="music" src="./NeverGonnaGiveYouUp.mp3" controls></audio>
    <Button @click="onClick">从元素获取并播放</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@arco-design/web-vue';
const onClick = () => {
  const audio = document.querySelector('#music') as HTMLAudioElement;
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaElementSource(audio!);
  source.connect(audioCtx.destination);
};
</script>

<style scoped></style>
