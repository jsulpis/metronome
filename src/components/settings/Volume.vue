<template>
  <article class="volume">
    <div class="header">
      <h3>Volume</h3>
      <p class="value">{{ volume }}%</p>
    </div>
    <div class="content">
      <Icon v-if="volume > 0" name="volume"></Icon>
      <Icon v-else name="volume-mute"></Icon>
      <Slider
        :model-value="volume"
        label="volume"
        @update:model-value="commit('setVolume', $event)"
      ></Slider>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import Slider from "./Slider.vue";
import Icon from "../icons/Icon.vue";

const { state, commit } = useStore();

const volume = computed(() => state.settings.volume);
</script>

<style lang="scss" scoped>
.volume {
  .header,
  .content {
    display: flex;
    justify-content: space-between;
  }

  .content {
    margin-top: 24px;
    justify-content: center;
    gap: 16px;
  }

  .value {
    font-size: 1.8rem;
    font-weight: 500;
  }
}
</style>
