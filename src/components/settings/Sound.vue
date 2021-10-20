<template>
  <article>
    <h3>Sound</h3>
    <div class="content" @change="updateSound">
      <RadioButton :checked="sound === 'click'" :name="`${context}-sound`" value="click">
        <Icon name="click"></Icon>
        <p>Click</p>
      </RadioButton>
      <RadioButton :checked="sound === 'sticks'" :name="`${context}-sound`" value="sticks">
        <Icon name="sticks"></Icon>
        <p>Sticks</p>
      </RadioButton>
      <RadioButton :checked="sound === 'hi-hat'" :name="`${context}-sound`" value="hi-hat">
        <Icon name="hi-hat"></Icon>
        <p>Hi-hat</p>
      </RadioButton>
      <RadioButton :checked="sound === 'kick'" :name="`${context}-sound`" value="kick">
        <Icon name="kick"></Icon>
        <p>Kick</p>
      </RadioButton>
    </div>
  </article>
</template>

<script setup lang="ts">
import RadioButton from "../RadioButton.vue";
import { useStore } from "vuex";
import { computed } from "vue-demi";
import Icon from "../icons/Icon.vue";

defineProps({
  context: String
});

const { state, commit } = useStore();

const sound = computed(() => state.settings.sound);

function updateSound(e: Event) {
  commit("setSound", (e.target as HTMLInputElement).value);
}
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  gap: 12px;
  width: fit-content;
  margin: 12px auto 0;

  @include tablet-portrait-up {
    grid-template: auto / repeat(4, 1fr);
  }
}
</style>
