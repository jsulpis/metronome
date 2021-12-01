<template>
  <label>
    <h3>Accentuate the first beat</h3>
    <input type="checkbox" name="first-beat" :checked="isChecked" @change="updateValue" />
    <span class="custom-checkbox">
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 4.2L4.2 7L9 1"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="12"
          stroke-dashoffset="0"
        />
      </svg>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const { state, commit } = useStore();

const isChecked = computed(() => state.settings.accentuateFirstBeat);

function updateValue(e: Event) {
  commit("setAccentuateFirstBeat", (e.target as HTMLInputElement).checked);
}
</script>

<style lang="scss" scoped>
label {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
}

input {
  opacity: 0;
  position: absolute;

  &:checked + .custom-checkbox {
    background: var(--primary-50);
    border-color: transparent;

    path {
      stroke-dashoffset: 0;
    }
  }

  &:focus + .custom-checkbox {
    box-shadow: 0 0 0 3px var(--primary-40);
  }

  &:focus-visible + .custom-checkbox {
    box-shadow: 0 0 0 3px var(--primary-40);
  }

  // no focus ring on browsers that support :focus-visible
  &:focus:not(:focus-visible) + .custom-checkbox {
    box-shadow: none;
  }

  &:hover:not(:checked) + .custom-checkbox::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.02;
    background: var(--grey-70);
    border-radius: inherit;
    transition: opacity 100ms;
  }
}

.custom-checkbox {
  width: 18px;
  height: 18px;
  background: var(--grey-40);
  border: 1px solid var(--grey-60);
  border-radius: 3px;
  position: relative;
  display: grid;
  place-items: center;

  path {
    stroke-dashoffset: 12;
    transition: stroke-dashoffset 200ms ease-in-out;
  }
}
</style>
