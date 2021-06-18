<template>
  <section>
    <button @click="commit('decrementBpmByFive')" class="minus-five">-5</button>
    <button @click="commit('decrementBpmByOne')" class="minus-one">-1</button>
    <div class="bpm">
      <span class="bpm__value">{{ bpm }}</span>
      <span class="bpm__label">BPM</span>
    </div>
    <button @click="commit('incrementBpmByOne')" class="plus-one">+1</button>
    <button @click="commit('incrementBpmByFive')" class="plus-five">+5</button>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const { state, commit } = useStore();

    return {
      commit,
      bpm: computed(() => state.bpm)
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
  position: relative;
}

button {
  background: var(--grey-40);
  font-weight: 600;
  border: 1px solid var(--grey-50);
  box-shadow: $shadow-03;

  &[class$="one"] {
    width: 3.75rem;
    height: 3.75rem;
    font-size: 1.5rem;
  }

  &[class$="five"] {
    width: 3rem;
    height: 3rem;
    font-size: 1.125rem;
    margin: 0 1.25rem;
  }
}

@media screen and (max-width: 640px) {
  button {
    &[class$="one"] {
      transform: translateY(15%);
    }

    &.minus-five {
      transform: translate(25%, 120%);
      margin: 0;
    }

    &.plus-five {
      transform: translate(-25%, 120%);
      margin: 0;
    }
  }
}

.bpm {
  display: flex;
  flex-direction: column;
  margin: 0 1.75rem;

  &__value {
    font-size: 4rem;
    line-height: 4rem;
    font-weight: 500;
    width: 3ch;
  }

  &__label {
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.185em;
  }
}
</style>
