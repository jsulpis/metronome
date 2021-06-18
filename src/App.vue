<template>
  <main>
    <h1 class="text-light">Metronome</h1>
    <div class="content-push">
      <TempoSection class="tempo"></TempoSection>
      <PlayButton class="play-button"></PlayButton>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayButton from "./components/PlayButton.vue";
import TempoSection from "./components/TempoSection.vue";

export default defineComponent({
  components: { PlayButton, TempoSection }
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
  margin-top: 24px;
  margin-bottom: 25vh;
}
</style>
