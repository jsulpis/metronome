<template>
  <section>
    <p class="value">{{ currentBeat || 1 }}</p>
    <p class="label">beat</p>

    <div class="controls">
      <button aria-label="remove one beat" @click="commit('removeBeat')">-</button>
      <div class="dots">
        <span v-for="i in beatCount" :class="{ active: i === currentBeat }" :key="i"></span>
      </div>
      <button aria-label="add one beat" @click="commit('addBeat')">+</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const { state, commit } = useStore();
const currentBeat = computed(() => state.beat.current);
const beatCount = computed(() => state.beat.count);
</script>

<style lang="scss" scoped>
.value {
  font-size: 3.6rem;
  line-height: 4.4rem;
}

.label {
  font-size: 1.2rem;
  line-height: 1.5rem;
  letter-spacing: 0.185em;
  text-transform: uppercase;
}

.controls {
  display: flex;
  gap: 24px;
  margin-top: 16px;
}

.dots {
  @include shadow-01;
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
  width: 200px;
  height: 40px;
  border-radius: 20px;
  background: var(--grey-40);

  span {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--grey-50);

    &.active {
      background: var(--primary-50);
    }
  }
}

button {
  @include shadow-02;
  background: var(--grey-40);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 2.1rem;
}
</style>
