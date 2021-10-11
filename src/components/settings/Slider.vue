<template>
  <span class="slider-container">
    <span class="slider">
      <input v-model.number="model" type="range" :min="min" :max="max" :aria-label="label" />
      <span
        class="track"
        :style="`width: calc(2.2rem + ${percentCompleted} * calc(100% - 2.2rem))`"
      ></span>
      <span
        class="dot"
        :style="{
          left: `calc(${percentCompleted} * 100%)`,
          transform: `translateX(calc(${percentCompleted} * -100%))`
        }"
      ></span>
    </span>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    modelValue: { type: Number, required: true },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    label: { type: String, required: true }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const model = ref(props.modelValue);

    const percentCompleted = computed(() => (model.value - props.min) / (props.max - props.min));

    watch(
      () => props.modelValue,
      (newValue) => (model.value = newValue)
    );

    watch(model, (value) => emit("update:modelValue", value));

    return { model, percentCompleted };
  }
});
</script>

<style lang="scss" scoped>
.slider-container {
  @include shadow-01;
  background: var(--grey-40);
  padding: 6px;
  border-radius: 40px;
  width: 250px;
}

$track-height: 1rem;
$thumb-size: 2.2rem;

.slider {
  position: relative;
  display: inline-flex;
  width: 100%;
}

input:focus-visible {
  outline: var(--primary-50) auto 1px;
}

.track {
  height: $track-height;
  display: inline-block;
  background: var(--primary-50);
  border-radius: 0.5rem;
  position: absolute;
  left: 0;
  pointer-events: none;
  min-width: 2.2rem;
}

@mixin track() {
  box-sizing: border-box;
  border: none;
  height: $track-height;
  background: var(--grey-50);
  border-radius: 0.5rem;
  cursor: pointer;
}

@mixin thumb() {
  box-sizing: border-box;
  border: none;
  width: $thumb-size;
  height: $thumb-size;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}

[type="range"] {
  background: transparent;
  width: 100%;

  &,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &::-webkit-slider-runnable-track {
    @include track();
  }
  &::-moz-range-track {
    @include track;
  }
  &::-ms-track {
    @include track;
  }

  &::-webkit-slider-thumb {
    margin-top: 0.5 * ($track-height - $thumb-size);
    @include thumb;
  }
  &::-moz-range-thumb {
    @include thumb;
  }
  &::-ms-thumb {
    margin-top: 0;
    @include thumb;
  }

  &::-ms-tooltip {
    display: none;
  }
}

.dot {
  border-radius: 50%;
  background: var(--primary-50);
  height: $thumb-size;
  width: $thumb-size;
  position: absolute;
  top: calc(50% - calc(#{$thumb-size} / 2));
  pointer-events: none;
  left: 1.2rem;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    border: 4px solid white;
    background: transparent;
    margin: 1px;
  }
}
</style>
