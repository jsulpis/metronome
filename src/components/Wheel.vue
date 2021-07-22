<template>
  <div
    class="wheel"
    ref="wheel"
    tabindex="0"
    role="slider"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="Math.floor(internalValue)"
    @keydown.down.prevent="decrement"
    @keydown.left.prevent="decrement"
    @keydown.up.prevent="increment"
    @keydown.right.prevent="increment"
  >
    <div class="wheel__dot-wrapper" :style="`transform: rotate(${angle}deg)`">
      <span class="wheel__dot-element"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch } from "vue";
import { useMousePressed, useMouse, useRafFn, useEventListener } from "@vueuse/core";
import { Vector2 } from "./Vector2";

export default defineComponent({
  props: {
    min: {
      type: Number,
      default: 40
    },
    max: {
      type: Number,
      default: 180
    },
    speed: {
      type: Number,
      default: 0.1
    },
    value: {
      type: Number,
      default: 120
    }
  },
  emits: ["change"],
  setup(props, { emit }) {
    const { min, max, speed } = toRefs(props);
    const wheel = ref();
    const angle = ref(0);
    const internalValue = ref(props.value);
    let lastEmittedValue: number;
    let lastMousePos = new Vector2(0, 0);
    let wheelCenter = new Vector2(0, 0);

    const { x, y } = useMouse();
    const { pause: pauseLoop, resume: resumeLoop } = useRafFn(
      () => {
        const currentMousePos = new Vector2(x.value, y.value).minus(wheelCenter);
        loop(currentMousePos);
      },
      { immediate: false }
    );

    useEventListener(wheel, "touchstart", (e: TouchEvent) => {
      onDragStart(e.touches[0].clientX, e.touches[0].clientY);
    });

    useEventListener(wheel, "mousedown", (e: MouseEvent) => {
      onDragStart(e.x, e.y);
    });

    function onDragStart(x: number, y: number) {
      lastMousePos = new Vector2(x, y).minus(wheelCenter);
      resumeLoop();
      useEventListener(document, "touchend", pauseLoop, { once: true });
      useEventListener(document, "mouseup", pauseLoop, { once: true });
    }

    function loop(currentPos: Vector2) {
      const diff = Vector2.angleBetween(lastMousePos, currentPos);
      updateValue(diff);

      lastMousePos = currentPos;
    }

    function updateValue(diff: number) {
      angle.value += diff;

      internalValue.value = Math.max(
        Math.min(internalValue.value + speed.value * diff, max.value),
        min.value
      );

      const roundedValue = Math.floor(internalValue.value);
      if (roundedValue !== lastEmittedValue) {
        emit("change", roundedValue);
        lastEmittedValue = roundedValue;
      }
    }

    // wheelCenter of the wheel
    function setCenter() {
      const { right, left, top, bottom } = wheel.value.getBoundingClientRect();
      wheelCenter.x = left + (right - left) / 2;
      wheelCenter.y = top + (bottom - top) / 2;
    }

    onMounted(() => {
      setCenter();
      useEventListener(window, "resize", setCenter);
    });

    // Keyboard
    function decrement() {
      updateValue(-10);
    }

    function increment() {
      updateValue(10);
    }

    // update the value if the change is not being made by the wheel itself
    const { pressed } = useMousePressed();
    watch(
      () => props.value,
      (val) => {
        if (!pressed.value) {
          internalValue.value = val;
        }
      }
    );

    return {
      wheel,
      angle,
      decrement,
      increment,
      internalValue
    };
  }
});
</script>

<style lang="scss" scoped>
.wheel {
  @include shadow-02;
  position: relative;
  background: linear-gradient(330.65deg, #e2e8f0 13%, #f8fafc 92.84%);
  width: 270px;
  height: 270px;
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.wheel__dot-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.wheel__dot-element {
  position: absolute;
  left: 70%;
  top: 13%;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e5ebf0;
  box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.03), inset 1px 1px 4px rgba(147, 147, 147, 0.4);
}

.wheel__handle {
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform-origin: bottom left;
}
</style>
