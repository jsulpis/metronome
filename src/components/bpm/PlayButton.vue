<template>
  <button type="button" class="play-button" @click="togglePlay()">
    <IconStop v-show="isPlaying"></IconStop>
    <IconPlay v-show="!isPlaying"></IconPlay>
  </button>
</template>

<script setup lang="ts">
import IconPlay from "./IconPlay.vue";
import IconStop from "./IconStop.vue";
import usePlayer from "../../composables/usePlayer";
import { onBeforeUnmount, onMounted } from "vue-demi";

const { isPlaying, play, stop } = usePlayer();

function onKeyPress(e: KeyboardEvent) {
  if (e.code === "Space" && !document.activeElement?.classList.contains("play-button")) {
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

<style lang="scss">
button.play-button {
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
