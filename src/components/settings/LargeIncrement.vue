<template>
  <article class="large-increment">
    <div class="header">
      <h3>Large increment</h3>
      <p class="value">{{ largeIncrement }}</p>
    </div>
    <div class="content">
      <p>2</p>
      <Slider
        :modelValue="largeIncrement"
        :min="2"
        :max="10"
        @update:modelValue="commit('setLargeIncrement', $event)"
        label="large increment"
      ></Slider>
      <p>10</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import Slider from "./Slider.vue";

const { state, commit } = useStore();

const largeIncrement = computed(() => state.settings.largeIncrement);
</script>

<style lang="scss" scoped>
.large-increment {
  .header,
  .content {
    display: flex;
    justify-content: space-between;
    gap: 15px;
  }

  .content {
    margin-top: 24px;
    justify-content: center;

    > p {
      color: var(--grey-60);
      font-size: 1.7rem;
    }
  }

  .value {
    font-size: 1.8rem;
    font-weight: 500;
  }
}
</style>
