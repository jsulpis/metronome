<template>
  <div class="wheel" ref="wheel">
    <div class="wheel__dot-container" :style="`transform: rotate(${angle}deg)`">
      <span class="wheel__dot"></span>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import {
  useMousePressed,
  useMouse,
  useRafFn,
  toRefs,
  useEventListener
} from "@vueuse/core";

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
      default: 3
    },
    value: {
      type: Number,
      default: 100
    }
  },
  emits: ["change"],
  setup(props, { emit }) {
    const { min, max, speed } = toRefs(props);
    const wheel = ref(null);
    const angle = ref(0);
    const internalValue = ref(props.value);
    let lastEmittedValue = ref(null);
    let lastPos = reactive({});
    let origin = reactive({
      x: 0,
      y: 0
    });

    function onDrag(x, y) {
      const currentPos = {
        x: x - origin.x,
        y: y - origin.y
      };

      const diffInRad = getAngleBetween(lastPos, currentPos);

      angle.value += radiansToDegrees(diffInRad);

      internalValue.value = Math.max(
        Math.min(internalValue.value + speed.value * diffInRad, max.value),
        min.value
      );

      if (Math.floor(internalValue.value) !== lastEmittedValue.value) {
        emit("change", Math.floor(internalValue.value));
        lastEmittedValue.value = Math.floor(internalValue.value);
      }

      lastPos = currentPos;
    }

    function getAngleBetween(u, v) {
      let diffInRad = Math.atan2(v.y, v.x) - Math.atan2(u.y, u.x);
      if (diffInRad < -Math.PI) diffInRad += 2 * Math.PI;
      if (diffInRad > Math.PI) diffInRad -= 2 * Math.PI;
      return diffInRad;
    }

    function radiansToDegrees(radians) {
      return radians * (180 / Math.PI);
    }

    const { x, y } = useMouse();

    const { pause, resume } = useRafFn(() => onDrag(x.value, y.value), {
      immediate: false
    });

    function onDragStart(x, y) {
      lastPos.x = x - origin.x;
      lastPos.y = y - origin.y;
      resume();
      useEventListener(document, "touchend", pause, { once: true });
      useEventListener(document, "mouseup", pause, { once: true });
    }

    useEventListener(wheel, "touchstart", (e) => {
      onDragStart(e.touches[0].clientX, e.touches[0].clientY);
    });

    useEventListener(wheel, "mousedown", (e) => {
      onDragStart(e.x, e.y);
    });

    // Origin
    function setOrigin() {
      const { right, left, top, bottom } = wheel.value.getBoundingClientRect();
      origin.x = left + (right - left) / 2;
      origin.y = top + (bottom - top) / 2;
    }

    onMounted(() => {
      setOrigin();
      useEventListener(window, "resize", setOrigin);
    });

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
      angle
    };
  }
});
</script>

<style lang="scss" scoped>
.wheel {
  position: relative;
  background: linear-gradient(330.65deg, #e2e8f0 13%, #f8fafc 92.84%);
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.15), inset 1px 1px 2px #ffffff;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.wheel__dot-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.wheel__dot {
  position: absolute;
  left: 70%;
  top: 14%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e5ebf0;
  box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.03),
    inset 1px 1px 4px rgba(147, 147, 147, 0.4);
}

.wheel__handle {
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform-origin: bottom left;
}

svg > circle {
  background: #e5ebf0;
  box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.03),
    inset 1px 1px 4px rgba(147, 147, 147, 0.4),
    inset -1px -2px 4px rgba(255, 255, 255, 0.8);
}
</style>
