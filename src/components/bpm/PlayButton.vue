<template>
  <button type="button" class="play-button" @click="isPlaying ? stop() : play()">
    <IconStop v-show="isPlaying"></IconStop>
    <IconPlay v-show="!isPlaying"></IconPlay>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconPlay from "./IconPlay.vue";
import IconStop from "./IconStop.vue";
import usePlayer from "../../composables/usePlayer";

export default defineComponent({
  components: {
    IconPlay,
    IconStop
  },
  setup() {
    const { isPlaying, play, stop } = usePlayer();

    return {
      isPlaying,
      play,
      stop
    };
  }
});
</script>

<style lang="scss">
button.play-button {
  background: var(--grey-50);
  box-shadow: inset 2px 4px 6px rgb(0 0 0 / 15%), inset -1px -1px 2px #ffffff;
  width: 50%;
  height: 50%;

  svg {
    width: 48px;
    height: 48px;
    color: inherit;
  }
}
</style>
