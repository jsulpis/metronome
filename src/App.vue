<template>
  <main>
    <h1 class="text-light">Metronome</h1>
    <div class="content-push">
      <TempoSection class="tempo" />
      <div class="wheel-container">
        <Wheel class="wheel" />
        <PlayButton class="play-button" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayButton from "./components/PlayButton.vue";
import TempoSection from "./components/TempoSection.vue";
import Wheel from "./components/Wheel.vue";

export default defineComponent({
  components: { PlayButton, TempoSection, Wheel }
});
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 1.8rem;
  letter-spacing: 0.445em;
  margin: 60px 0 0;
  text-transform: uppercase;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wheel-container {
  position: relative;
  margin-bottom: 25vh;
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
</style>
