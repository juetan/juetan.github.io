<template>
  <div>
    <input type="file" accept=".wav,.mp3" @change="onFileChange" />
  </div>
</template>

<script setup lang="ts">
const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement)?.files?.[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    const buffer = e.target?.result as ArrayBuffer;
    const audioCtx = new AudioContext();
    const source = audioCtx.createBufferSource();
    audioCtx.decodeAudioData(buffer, (buffer) => {
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start();
    });
  };
  reader.readAsArrayBuffer(file);
};
</script>

<style scoped></style>
