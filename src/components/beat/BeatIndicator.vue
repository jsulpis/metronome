<template>
  <div class="beat">
    <p class="value">{{ currentBeat }}</p>
    <p class="label">beat</p>
  </div>
  <div class="beat-indicator">
    <span v-for="i in beatCount" :class="{ active: i === currentBeat }" :key="i"></span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const { state } = useStore();
    const currentBeat = computed(() => state.beat.current);
    const beatCount = computed(() => state.beat.count);
    return { currentBeat, beatCount };
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

.beat-indicator {
  @include shadow-01;
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 35px;
  min-width: 200px;
  padding: 0 22px;
  height: 40px;
  border-radius: 20px;
  background: var(--grey-40);

  span {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--grey-50);

    &.active {
      background: var(--primary);
    }
  }
}
</style>
