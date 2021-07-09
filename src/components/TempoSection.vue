<template>
  <section>
    <button @click="commit('decrementBpmBy', 5)" class="minus-five">-5</button>
    <button @click="commit('decrementBpmBy', 1)" class="minus-one">-1</button>
    <div class="bpm">
      <span class="bpm__value">{{ bpm }}</span>
      <span class="bpm__label">BPM</span>
    </div>
    <button @click="commit('incrementBpmBy', 1)" class="plus-one">+1</button>
    <button @click="commit('incrementBpmBy', 5)" class="plus-five">+5</button>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const { state, commit } = useStore();
    const bpm = computed(() => state.bpm);

    return { commit, bpm };
  }
});
</script>

<style lang="scss" scoped>
@import "../styles/abstract";

section {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  width: 90%;
  max-width: 400px;
  margin: auto;

  > * {
    flex-shrink: 0;
  }
}

.bpm {
  display: flex;
  flex-direction: column;
  margin: 0 10px;

  &__value {
    font-size: 6.4rem;
    line-height: 6.4rem;
    font-weight: 500;
    width: 3ch;
  }

  &__label {
    font-size: 1.8rem;
    font-weight: 400;
    letter-spacing: 0.185em;
  }
}

button {
  background: var(--grey-40);
  font-weight: 600;
  border: 1px solid var(--grey-50);
  box-shadow: $shadow-03;

  &[class$="one"] {
    width: 60px;
    height: 60px;
    font-size: 2.4rem;
  }

  &[class$="five"] {
    width: 48px;
    height: 48px;
    font-size: 1.8rem;
    margin: 0 10px;
    transform: translateY(30%);
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
</style>
