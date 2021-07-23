<template>
  <div class="beat">
    <p class="value">{{ currentBeat }}</p>
    <p class="label">beat</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const { state } = useStore();
    const currentBeat = computed(() => state.beat.current);
    return { currentBeat };
  }
});
</script>

<style lang="scss" scoped>
.beat {
  .value {
    font-size: 3.6rem;
    line-height: 4.4rem;
  }

  .label {
    font-size: 1.2rem;
    line-height: 1.5rem;
    letter-spacing: 0.185em;
    text-transform: uppercase;
  }
}
</style>
