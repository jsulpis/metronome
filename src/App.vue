<template>
  <main>
    <h1>Metronome</h1>
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
import PlayButton from "./components/PlayButton.vue";
import TempoSection from "./components/TempoSection.vue";
import ProgressTrack from "./components/ProgressTrack.vue";
import Wheel from "./components/Wheel.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { PlayButton, TempoSection, Wheel, ProgressTrack },
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
