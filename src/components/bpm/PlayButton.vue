<template>
  <button type="button" @click="togglePlay()">
    <IconStop v-show="isPlaying"></IconStop>
    <IconPlay v-show="!isPlaying"></IconPlay>
  </button>
</template>

<script setup lang="ts">
import IconPlay from "./IconPlay.vue";
import IconStop from "./IconStop.vue";
import usePlayer from "../../composables/usePlayer";
import { onBeforeUnmount, onMounted } from "vue";

const { isPlaying, play, stop } = usePlayer();

function onKeyPress(e: KeyboardEvent) {
  const nothingInFocus = !document.activeElement || document.activeElement === document.body;

  if (e.code === "Space" && nothingInFocus) {
    togglePlay();
  }
}

function togglePlay() {
  isPlaying.value ? stop() : play();
}

onMounted(() => {
  document.addEventListener("keypress", onKeyPress);
});

onBeforeUnmount(() => {
  document.removeEventListener("keypress", onKeyPress);
});
</script>

<style lang="scss" scoped>
button {
  background: var(--grey-50);
  box-shadow: var(--shadow-02-inset);
  width: 50%;
  height: 50%;

  svg {
    width: 48px;
    height: 48px;
    color: inherit;
  }
}
</style>
