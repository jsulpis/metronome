<template>
  <article>
    <h3>Range</h3>
    <p>
      Tip ! You can use the “min” value as the tempo you <em>can</em> currently play, and the “max”
      as your target tempo. Now the blue bar shows your progress !
    </p>
    <div class="inputs">
      <label>
        Min
        <input
          type="number"
          :value="minBpm"
          :min="40"
          :max="maxBpm"
          aria-label="minimum bpm value"
          @change="updateMinValue"
        />
      </label>
      <label>
        Max
        <input
          type="number"
          :value="maxBpm"
          :min="minBpm"
          :max="180"
          aria-label="maximum bpm value"
          @change="updateMaxValue"
        />
      </label>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const { state, commit } = useStore();

const minBpm = computed(() => state.bpm.min);
const maxBpm = computed(() => state.bpm.max);

function updateMinValue(e: Event) {
  commit("setMinBpmValue", (e.target as HTMLInputElement).value);
}

function updateMaxValue(e: Event) {
  commit("setMaxBpmValue", (e.target as HTMLInputElement).value);
}
</script>

<style lang="scss" scoped>
h3,
p {
  text-align: left;
}

p {
  font-size: 1.4rem;
  color: var(--grey-60);
  margin-top: 12px;
}

.inputs {
  display: flex;
  gap: 40px;
  justify-content: center;
  margin-top: 1.5rem;
}

label {
  display: inline-flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--grey-60);
}

input {
  width: 7.5rem;
  height: 5rem;
  border-radius: 0.8rem;
  font-size: 2.1rem;
  text-align: center;
  background: var(--grey-40);
  color: var(--grey-70);
  border: 1px solid var(--grey-60);
  border: 0;

  &:focus-visible {
    outline: var(--primary-50) auto 1px;
  }
}
</style>
