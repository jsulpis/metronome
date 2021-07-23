<template>
  <main>
    <h1>Metronome</h1>
    <BeatIndicator></BeatIndicator>
    <div class="content-push">
      <TempoSection />
      <ProgressTrack :progress="(bpm - min) / (max - min)" class="progress-track">
        <Wheel :value="bpm" :min="min" :max="max" @change="commit('setBpmValue', $event)" />
        <PlayButton class="play-button" />
      </ProgressTrack>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import PlayButton from "./components/bpm/PlayButton.vue";
import TempoSection from "./components/bpm/TempoSection.vue";
import ProgressTrack from "./components/bpm/ProgressTrack.vue";
import Wheel from "./components/bpm/Wheel.vue";
import { useStore } from "vuex";
import BeatIndicator from "./components/beat/BeatIndicator.vue";

export default defineComponent({
  components: { PlayButton, TempoSection, Wheel, ProgressTrack, BeatIndicator },
  setup() {
    const { state, commit } = useStore();
    const bpm = computed(() => state.bpm.value);
    const min = computed(() => state.bpm.min);
    const max = computed(() => state.bpm.max);

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
  align-items: center;
  min-height: 100vh;
}

.progress-track {
  position: relative;
  margin-bottom: 25vh;
  margin-top: 24px;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
