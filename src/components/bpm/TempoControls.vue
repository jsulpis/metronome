<template>
  <div class="bpm">
    <button
      class="minus-more"
      :aria-label="`substract ${largeIncrement} BPMs`"
      @click="commit('decrementBpmBy', largeIncrement)"
    >
      -{{ largeIncrement }}
    </button>
    <button class="minus-one" aria-label="substract 1 BPM" @click="commit('decrementBpmBy', 1)">
      -1
    </button>
    <div class="bpm__display">
      <span class="bpm__value">{{ bpm }}</span>
      <span class="bpm__label">BPM</span>
    </div>
    <button class="plus-one" aria-label="add 1 BPM" @click="commit('incrementBpmBy', 1)">+1</button>
    <button
      class="plus-more"
      :aria-label="`add ${largeIncrement} BPMs`"
      @click="commit('incrementBpmBy', largeIncrement)"
    >
      +{{ largeIncrement }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const { state, commit } = useStore();
const bpm = computed(() => state.bpm.value);
const largeIncrement = computed(() => state.settings.largeIncrement);
</script>

<style lang="scss" scoped>
.bpm {
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

  &__display {
    display: flex;
    flex-direction: column;
    margin: 0 10px;
  }

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
  @include shadow-02;
  background: var(--grey-40);
  font-weight: 600;
  border: 1px solid var(--grey-50);

  &[class$="one"] {
    width: 60px;
    height: 60px;
    font-size: 2.4rem;
  }

  &[class$="more"] {
    width: 48px;
    height: 48px;
    font-size: 1.8rem;
    margin: 0 10px;
    transform: translateY(20%);
  }
}

@include phone-only {
  button {
    &[class$="one"] {
      transform: translateY(15%);
    }

    &.minus-more {
      transform: translate(25%, 120%);
      margin: 0;
    }

    &.plus-more {
      transform: translate(-25%, 120%);
      margin: 0;
    }
  }
}
</style>
