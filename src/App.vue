<template>
  <h1 class="text-light">Metronome</h1>
  <TempoSection></TempoSection>
  <PlayButton></PlayButton>
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
  font-size: 1.125rem;
  letter-spacing: 0.445em;
  margin: 4rem 0 0;
  text-transform: uppercase;
}
</style>
