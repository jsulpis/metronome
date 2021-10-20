<template>
  <div class="rythms" @change="updateRythm">
    <RadioButton
      v-for="rythm in rythms"
      name="rythm"
      :key="rythm"
      :checked="currentRythm === rythm"
      :value="rythm"
    >
      <Icon :name="rythm"></Icon>
    </RadioButton>
  </div>
</template>

<script setup lang="ts">
import RadioButton from "../RadioButton.vue";
import Icon from "../icons/Icon.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const rythms = ["quarter", "eighth", "sixteenth", "triplet", "triplet-rest"];

const { state, commit } = useStore();
const currentRythm = computed(() => state.beat.rythm);

function updateRythm(e: Event) {
  commit("setRythm", (e.target as HTMLInputElement).value);
}
</script>

<style lang="scss">
.rythms {
  display: flex;
  justify-content: center;
  gap: 1.8rem;
  margin: 1rem auto 0;

  @include phone-only {
    transform: scale(0.8); // quick and dirty resizing for phones
  }

  @include tablet-portrait-up {
    margin: 3.5rem auto 3rem;
  }

  .custom-radio {
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 0.9rem;
  }
}
</style>
