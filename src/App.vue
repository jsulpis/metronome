<template>
  <main>
    <h1>Metronome</h1>
    <BeatIndicator></BeatIndicator>
    <section>
      <TempoSection />
      <ProgressTrack :progress="(bpm - min) / (max - min)">
        <Wheel :value="bpm" :min="min" :max="max" @change="commit('setBpmValue', $event)" />
        <PlayButton class="play-button" />
      </ProgressTrack>
    </section>
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
main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
  padding: 4vh 0;
}

.progress-track {
  margin-top: 10px;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media screen and (min-width: 640px) {
  .progress-track {
    margin-top: 20px;
  }
}
</style>
