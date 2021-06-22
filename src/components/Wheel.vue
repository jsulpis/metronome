<template>
  <!-- <p>{{ value }}</p> -->
  <div
    class="wheel"
    ref="wheel"
    @mousedown="onMouseDown"
    @touchstart="onTouchStart"
  >
    <div class="wheel__dot-container" :style="`transform: rotate(${angle}deg)`">
      <span class="wheel__dot"></span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  data: () => {
    return {
      initialValue: 100,
      angle: 0,
      lastPos: {},
      origin: {},
      speed: 1,
      min: 40,
      max: 240
    };
  },
  mounted() {
    this.setOrigin();
    window.addEventListener("resize", this.setOrigin);
  },
  computed: {
    value() {
      const internalValue = Math.floor(
        this.initialValue + 0.05 * this.speed * this.angle
      );
      return Math.max(Math.min(internalValue, this.max), this.min);
    }
  },
  methods: {
    setOrigin() {
      const { right, left, top, bottom } =
        this.$refs.wheel.getBoundingClientRect();
      this.origin = {
        x: left + (right - left) / 2,
        y: top + (bottom - top) / 2
      };
    },
    onDrag(e) {
      let x, y;
      if (e.type === "touchmove") {
        x = Math.floor(e.touches[0].clientX);
        y = Math.floor(e.touches[0].clientY);
      } else {
        x = e.x;
        y = e.y;
      }

      const currentPos = {
        x: x - this.origin.x,
        y: y - this.origin.y
      };

      const diffInRad = this.getAngleBetween(this.lastPos, currentPos);

      this.angle += this.radiansToDegrees(diffInRad);

      this.lastPos = currentPos;
    },
    getAngleBetween(u, v) {
      let diffInRad = Math.atan2(v.y, v.x) - Math.atan2(u.y, u.x);
      if (diffInRad < -Math.PI) diffInRad += 2 * Math.PI;
      if (diffInRad > Math.PI) diffInRad -= 2 * Math.PI;
      return diffInRad;
    },
    radiansToDegrees(radians) {
      return radians * (180 / Math.PI);
    },
    onMouseDown(e) {
      this.lastPos = {
        x: e.x - this.origin.x,
        y: e.y - this.origin.y
      };
      document.addEventListener("mousemove", this.onDrag);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", this.onDrag);
      });
    },
    onTouchStart(e) {
      this.lastPos = {
        x: Math.floor(e.touches[0].clientX) - this.origin.x,
        y: Math.floor(e.touches[0].clientY) - this.origin.y
      };
      document.addEventListener("touchmove", this.onDrag);
      document.addEventListener("touchend", () => {
        document.removeEventListener("touchmove", this.onDrag);
      });
    }
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
