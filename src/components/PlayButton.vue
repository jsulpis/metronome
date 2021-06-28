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
    const sound = new Audio("sounds/click.mp3");
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
  box-shadow: inset 2px 4px 6px rgb(0 0 0 / 15%), inset -1px -1px 2px #ffffff;
  width: 170px;
  height: 170px;

  svg {
    width: 48px;
    height: 48px;
    color: inherit;
  }
}
</style>
