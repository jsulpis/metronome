<template>
  <section>
    <button @click="decrementByOne" class="minus-one">-1</button>
    <div class="bpm">
      <span class="bpm__value">{{ bpm }}</span>
      <span class="bpm__label">BPM</span>
    </div>
    <button @click="incrementByOne" class="plus-one">+1</button>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const { state, commit } = useStore();

    return {
      bpm: computed(() => state.bpm),
      incrementByOne: () => commit("incrementBpmByOne"),
      decrementByOne: () => commit("decrementBpmByOne")
    };
  }
});
</script>

<style lang="scss" scoped>
@import "../styles/abstract";

section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  position: relative;
}

button {
  width: 3.75rem;
  height: 3.75rem;
  background: var(--grey-40);
  font-size: 1.5rem;
  font-weight: 600;
  border: 1px solid var(--grey-50);
  box-shadow: $shadow-03;

  &.minus-one {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(75%, -50%);
  }

  &.plus-one {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-75%, -50%);
  }
}

.bpm {
  display: flex;
  flex-direction: column;

  &__value {
    font-size: 4rem;
    line-height: 4rem;
  }

  &__label {
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.185em;
  }
}
</style>
