<template>
  <span class="slider-container">
    <span class="slider">
      <input v-model="model" type="range" :min="min" :max="max" :aria-label="label" />
      <span
        class="track"
        :style="`width: calc(2.4rem + ${(model - min) / (max - min)} * calc(20rem - 2.4rem))`"
      ></span>
      <span
        class="dot"
        :style="`transform: translateX(calc(${
          (model - min) / (max - min)
        } * calc(20rem - 2.4rem) - 50%))`"
      ></span>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

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

    watch(
      () => props.modelValue,
      (newValue) => (model.value = newValue)
    );

    watch(model, (value) => emit("update:modelValue", value));

    return { model };
  }
});
</script>

<style lang="scss" scoped>
.slider-container {
  @include shadow-01;
  background: var(--grey-40);
  padding: 6px;
  border-radius: 40px;
}

$track-height: 1rem;
$thumb-size: 2.4rem;

.slider {
  position: relative;
  display: inline-flex;
}

.track {
  height: $track-height;
  display: inline-block;
  background: var(--primary);
  border-radius: 0.5rem;
  position: absolute;
  left: 0;
  pointer-events: none;
  min-width: 2.4rem;
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
  background: var(--primary);
  cursor: pointer;
}

[type="range"] {
  background: transparent;
  width: 200px;

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
  $dot-size: 1.2rem;
  border-radius: 50%;
  border: 4px solid white;
  background: transparent;
  height: $dot-size;
  width: $dot-size;
  position: absolute;
  top: calc(50% - 1rem);
  transform: translateY(-50%);
  pointer-events: none;
  left: 1.2rem;
  padding: 0.6rem;
}
</style>
