<template>
  <button type="button" class="play-button" @click="isPlaying = !isPlaying">
    <IconStop v-show="isPlaying"></IconStop>
    <IconPlay v-show="!isPlaying"></IconPlay>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import IconPlay from "./IconPlay.vue";
import IconStop from "./IconStop.vue";

export default defineComponent({
  components: {
    IconPlay,
    IconStop
  },
  setup() {
    const sound = new Audio("sounds/click.wav");
    const isPlaying = ref(false);
    let timeout: NodeJS.Timeout;

    const { state } = useStore();

    function playSound() {
      if (sound.paused) {
        sound.play();
      } else {
        sound.currentTime = 0;
      }
    }

    function loop() {
      playSound();
      timeout = setTimeout(loop, (60 / state.bpm) * 1000);
    }

    watch(isPlaying, (newVal) => {
      if (newVal) {
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
  background: var(--grey-50);
  border: 1px solid var(--grey-60);
  width: 10.5rem;
  height: 10.5rem;
  position: fixed;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);

  svg {
    width: 3rem;
    height: 3rem;
    color: inherit;
  }
}
</style>
