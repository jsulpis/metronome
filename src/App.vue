<template>
  <aside>
    <h2>Sound</h2>
  </aside>
  <main>
    <h1>Metronome</h1>
    <BeatIndicator></BeatIndicator>
    <section>
      <TempoControls />
      <ProgressTrack :progress="(bpm - min) / (max - min)">
        <Wheel :value="bpm" :min="min" :max="max" @change="commit('setBpmValue', $event)" />
        <PlayButton class="play-button" />
      </ProgressTrack>
    </section>
  </main>
  <aside>
    <h2>BPM</h2>
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import PlayButton from "./components/bpm/PlayButton.vue";
import TempoControls from "./components/bpm/TempoControls.vue";
import ProgressTrack from "./components/bpm/ProgressTrack.vue";
import Wheel from "./components/bpm/Wheel.vue";
import { useStore } from "vuex";
import BeatIndicator from "./components/beat/BeatIndicator.vue";
import { useRegisterSW } from "virtual:pwa-register/vue";

export default defineComponent({
  components: { PlayButton, TempoControls, Wheel, ProgressTrack, BeatIndicator },
  setup() {
    useRegisterSW();

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

aside {
  position: relative;
  padding-top: 50vh;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(213.1deg, #f8fafb 29.32%, #dee6ed 75.06%);
    border-radius: 20% 80% 100% 0% / 0% 100% 0% 100%;
  }

  > * {
    position: relative;
  }
}

aside:first-of-type {
  padding-left: 4vw;
  text-align: left;
}

aside:last-of-type {
  padding-right: 4vw;
  text-align: right;

  &::before {
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }
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
