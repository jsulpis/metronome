<template>
  <article class="sound">
    <div class="header">
      <h3>Sound</h3>
    </div>
    <div class="content" @change="updateSound">
      <RadioButton :checked="sound === 'click'" name="sound" value="click">
        <ClickIcon></ClickIcon>
        <p>Click</p>
      </RadioButton>
      <RadioButton :checked="sound === 'sticks'" name="sound" value="sticks">
        <SticksIcon></SticksIcon>
        <p>Sticks</p>
      </RadioButton>
      <RadioButton :checked="sound === 'hi-hat'" name="sound" value="hi-hat">
        <HiHatIcon></HiHatIcon>
        <p>Hi-hat</p>
      </RadioButton>
      <RadioButton :checked="sound === 'kick'" name="sound" value="kick">
        <KickIcon></KickIcon>
        <p>Kick</p>
      </RadioButton>
    </div>
  </article>
</template>

<script setup lang="ts">
import RadioButton from "./RadioButton.vue";
import ClickIcon from "./icons/ClickIcon.vue";
import SticksIcon from "./icons/SticksIcon.vue";
import HiHatIcon from "./icons/HiHatIcon.vue";
import KickIcon from "./icons/KickIcon.vue";
import { useStore } from "vuex";
import { computed } from "vue-demi";

const { state, commit } = useStore();

const sound = computed(() => state.settings.sound);

function updateSound(e: Event) {
  commit("setSound", (e.target as HTMLInputElement).value);
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  margin-top: 12px;
  gap: 10px;
}
</style>
