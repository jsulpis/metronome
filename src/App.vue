<template>
  <main>
    <h1>Metronome</h1>
    <div class="content-push">
      <TempoSection class="tempo" />
      <div class="progress-track">
        <svg id="progress-track" width="300" height="300" viewBox="0 0 300 300">
          <circle
            cx="150"
            cy="150"
            r="144"
            fill="none"
            stroke="var(--grey-70)"
            stroke-width="12"
            :stroke-dasharray="2 * Math.PI * 150"
            :stroke-dashoffset="2 * Math.PI * 150 * (1 - 0.66)"
            stroke-linecap="round"
          ></circle>
          <circle
            cx="150"
            cy="150"
            r="144"
            fill="none"
            stroke="var(--primary)"
            stroke-width="12"
            :stroke-dasharray="2 * Math.PI * 150"
            :stroke-dashoffset="2 * Math.PI * 150 * (1 - 0.66 * ((bpm - min) / (max - min)))"
            stroke-linecap="round"
          ></circle>
        </svg>
        <Wheel
          class="wheel"
          :value="bpm"
          :min="min"
          :max="max"
          @change="commit('setBpmValue', $event)"
        />
        <PlayButton class="play-button" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import PlayButton from "./components/PlayButton.vue";
import TempoSection from "./components/TempoSection.vue";
import Wheel from "./components/Wheel.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { PlayButton, TempoSection, Wheel },
  setup() {
    const { state, commit } = useStore();
    const bpm = computed(() => state.bpm);
    const min = computed(() => state.min);
    const max = computed(() => state.max);

    return { commit, bpm, min, max };
  }
});
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 60px;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.play-button,
#progress-track {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#progress-track {
  width: 100%;
  padding: 4px;
  height: auto;
}

circle {
  transform: rotate(146deg);
  transform-origin: center;
}

.progress-track {
  &::after {
    content: "";
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    box-shadow: inset -2px -4px 3px rgba(0, 0, 0, 0.05),
      inset 6px 4px 12px rgba(255, 255, 255, 0.54), -3px -3px 15px rgba(255, 255, 255, 0.7),
      4px 6px 20px rgba(0, 0, 0, 0.2);
  }

  position: relative;
  margin-bottom: 25vh;
  margin-top: 24px;
  display: flex;
  justify-content: center;

  background: var(--grey-50);
  border-radius: 50%;
  padding: 20px;
  display: inline-block;
}
</style>
