<template>
  <button type="button" class="play-button" @click="isPlaying ? stop() : play()">
    <IconStop v-show="isPlaying"></IconStop>
    <IconPlay v-show="!isPlaying"></IconPlay>
  </button>
</template>

<script setup lang="ts">
import IconPlay from "./IconPlay.vue";
import IconStop from "./IconStop.vue";
import usePlayer from "../../composables/usePlayer";

const { isPlaying, play, stop } = usePlayer();
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
