<template>
  <div class="rythms" @change="updateRythm">
    <RadioButton
      v-for="rythm in rythms"
      name="rythm"
      :key="rythm"
      :checked="currentRythm === rythm"
      :value="rythm"
      :label="rythm"
      class="rythm-radio"
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

<style lang="scss" scoped>
.rythms {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin: 10px auto 0;

  @include phone-only {
    transform: scale(0.8); // quick and dirty resizing for phones
  }

  @include tablet-portrait-up {
    margin: 35px auto 30px;
  }

  .rythm-radio {
    width: 55px;
    height: 55px;
    border-radius: 9px;
  }
}
</style>
