<template>
  <button type="button" class="play-button" @click="isPlaying = !isPlaying">
    <IconPlay v-show="!isPlaying"></IconPlay>
    <IconStop v-show="isPlaying"></IconStop>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import IconPlay from "./IconPlay.vue";
import IconStop from "./IconStop.vue";

export default defineComponent({
  components: {
    IconPlay,
    IconStop
  },
  setup() {
    const sound = new Audio("sounds/click.wav");
    let timeout: NodeJS.Timeout;
    const isPlaying = ref(false);

    function playSound() {
      if (sound.paused) {
        sound.play();
      } else {
        sound.currentTime = 0;
      }
    }

    function loop() {
      playSound();
      timeout = setTimeout(loop, (60 / 120) * 1000);
    }

    watch(isPlaying, (isPlaying) => {
      if (isPlaying) {
        loop();
      } else {
        clearTimeout(timeout);
      }
    });

    return {
      isPlaying
    };
  }
});
</script>

<style lang="scss">
button.play-button {
  background: transparent;
  border: 1px solid var(--grey-60);
  border-radius: 50%;
  cursor: pointer;
  width: 10.5rem;
  height: 10.5rem;
  position: fixed;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  transition: background 100ms;
  outline: none;

  &:focus-visible,
  &:focus {
    box-shadow: 0 0 2px 2px var(--primary);
  }

  // for browsers that support :focus-visible
  &:focus:not(:focus-visible) {
    box-shadow: none;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  &:active {
    background: rgba(0, 0, 0, 0.07);
  }

  svg {
    width: 3rem;
    height: 3rem;
    color: var(--grey-70);
  }
}
</style>
