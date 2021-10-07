<template>
  <div class="progress-track">
    <svg :width="diameter" :height="diameter" :viewBox="`0 0 ${diameter} ${diameter}`">
      <circle
        :cx="radius"
        :cy="radius"
        :r="radius - strokeWidth / 2"
        fill="none"
        stroke="var(--grey-70)"
        :stroke-width="strokeWidth"
        :stroke-dasharray="perimeter"
        :stroke-dashoffset="perimeter * (1 - 0.66)"
        stroke-linecap="round"
      ></circle>
      <circle
        :cx="radius"
        :cy="radius"
        :r="radius - strokeWidth / 2"
        fill="none"
        stroke="var(--primary)"
        :stroke-width="strokeWidth"
        :stroke-dasharray="perimeter"
        :stroke-dashoffset="perimeter * (1 - 0.66 * progress)"
        stroke-linecap="round"
      ></circle>
    </svg>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

defineProps({
  progress: {
    type: Number,
    required: true,
    validator(value: number) {
      return value >= 0 && value <= 1;
    }
  }
});

const radius = ref(150);
const diameter = computed(() => 2 * radius.value);
const perimeter = computed(() => 2 * Math.PI * radius.value);
const strokeWidth = ref(12);
</script>

<style lang="scss" scoped>
svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 4px;
  height: auto;
}

circle {
  transform: rotate(146deg);
  transform-origin: center;
}

.progress-track {
  position: relative;
  background: var(--grey-50);
  border-radius: 50%;
  padding: 20px;
  display: inline-block;
  width: 42vh;
  height: 42vh;
  max-width: 360px;
  max-height: 360px;

  &::after {
    content: "";
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    box-shadow: inset -2px -4px 3px rgba(0, 0, 0, 0.05),
      inset 6px 4px 12px rgba(255, 255, 255, 0.54), -3px -3px 15px rgba(255, 255, 255, 0.7),
      4px 6px 20px rgba(0, 0, 0, 0.2);
  }
}

// Adjustment for tall mobile displays
@media screen and (min-height: 750px) and (max-width: 500px) {
  .progress-track {
    max-width: 315px;
    max-height: 315px;
  }
}
</style>
