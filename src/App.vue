<template>
  <Aside position="left">
    <h2>Sound</h2>
    <Volume></Volume>
    <Sound></Sound>
    <FirstBeat></FirstBeat>
  </Aside>

  <main>
    <h1>Metronome</h1>
    <BeatIndicator></BeatIndicator>
    <section>
      <TempoControls />
      <ProgressTrack :progress="(bpm - min) / (max - min || 1)">
        <Wheel :value="bpm" :min="min" :max="max" @change="commit('setBpmValue', $event)" />
        <PlayButton class="play-button" />
      </ProgressTrack>
    </section>
  </main>

  <Aside position="right">
    <h2>BPM</h2>
    <LargeIncrement></LargeIncrement>
    <BpmRange></BpmRange>
  </Aside>

  <MobileSettings></MobileSettings>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PlayButton from "./components/bpm/PlayButton.vue";
import TempoControls from "./components/bpm/TempoControls.vue";
import ProgressTrack from "./components/bpm/ProgressTrack.vue";
import Wheel from "./components/bpm/Wheel.vue";
import { useStore } from "vuex";
import BeatIndicator from "./components/beat/BeatIndicator.vue";
import { useRegisterSW } from "virtual:pwa-register/vue";
import Aside from "./components/Aside.vue";
import Volume from "./components/settings/volume/Volume.vue";
import Sound from "./components/settings/sound/Sound.vue";
import FirstBeat from "./components/settings/FirstBeat.vue";
import LargeIncrement from "./components/settings/LargeIncrement.vue";
import BpmRange from "./components/settings/BpmRange.vue";
import MobileSettings from "./components/settings/MobileSettings.vue";

useRegisterSW();

const { state, commit } = useStore();
const bpm = computed(() => state.bpm.value);
const min = computed(() => state.bpm.min);
const max = computed(() => state.bpm.max);
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

@include tablet-portrait-up {
  .progress-track {
    margin-top: 20px;
  }
}
</style>
