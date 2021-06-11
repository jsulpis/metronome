<template>
  <h1 class="text-light">Metronome</h1>
  <PlayButton></PlayButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayButton from "./components/PlayButton.vue";

export default defineComponent({
  components: { PlayButton }
});
</script>

<style scoped>
h1 {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.445em;
  margin: 4rem 0 0;
  text-transform: uppercase;
}
</style>
