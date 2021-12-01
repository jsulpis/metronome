<template>
  <span class="theme-switch" role="radiogroup" aria-label="Theme" @change="updateTheme($event)">
    <label title="light">
      <input
        type="radio"
        :name="`${context}-theme`"
        value="light"
        aria-label="light"
        :checked="currentTheme === 'light'"
      />
      <span class="theme-switch__button"></span>
      <SunIcon></SunIcon>
    </label>

    <label title="dark">
      <input
        type="radio"
        :name="`${context}-theme`"
        value="dark"
        aria-label="dark"
        :checked="currentTheme === 'dark'"
      />
      <span class="theme-switch__button"></span>
      <MoonIcon></MoonIcon>
    </label>

    <label title="auto">
      <input
        type="radio"
        :name="`${context}-theme`"
        value="auto"
        aria-label="auto"
        :checked="currentTheme === 'auto'"
      />
      <span class="theme-switch__button"></span>
      <ComputerIcon></ComputerIcon>
    </label>
  </span>
</template>

<script setup lang="ts">
import SunIcon from "./SunIcon.vue";
import MoonIcon from "./MoonIcon.vue";
import ComputerIcon from "./ComputerIcon.vue";
import { useStore } from "vuex";
import { computed, inject, onMounted } from "vue";

const { state, commit } = useStore();
const context = inject("context", "desktop"); // make separate radio groups for the desktop and mobile settings

const currentTheme = computed(() => state.settings.theme);

onMounted(() => {
  document.documentElement.setAttribute("color-scheme", state.settings.theme);
});

function updateTheme(e: Event) {
  const theme = (e.target as HTMLInputElement).value;
  commit("setTheme", theme);
  document.documentElement.setAttribute("color-scheme", theme);
}
</script>

<style lang="scss">
.theme-switch {
  --switch-height: 2.5em;
  --switch-padding: 0.25em;
  --switch-button-size: calc(var(--switch-height) - 2 * var(--switch-padding));
  --standard-easing: cubic-bezier(0.4, 0, 0.2, 1);

  --icon-inactive-color: var(--grey-60);
  --switch-background-color: var(--grey-40);
  --switch-button-background: var(--progress-bar-background);

  font-size: 2rem;
  width: calc(3 * var(--switch-button-size) + 2 * var(--switch-padding));
  height: var(--switch-height);
  background: var(--switch-background-color);
  box-shadow: var(--switch-shadow);
  position: relative;
  display: inline-flex;
  border-radius: calc(var(--switch-height) / 2);

  &__button {
    width: var(--switch-button-size);
    height: var(--switch-button-size);
    background: var(--switch-button-background);
    border-radius: 50%;
    border: 1px solid var(--grey-50);
    box-shadow: var(--switch-button-shadow);
    position: absolute;
    pointer-events: none;
    left: var(--switch-padding);
    top: calc(50% - var(--switch-button-size) / 2);
    transition: left 150ms var(--standard-easing);
  }

  // GENERAL STYLE

  label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    cursor: pointer;

    // for hover
    &::before {
      content: "";
      position: absolute;
      width: var(--switch-button-size);
      height: var(--switch-button-size);
      background: var(--grey-70);
      opacity: 0;
      border-radius: 50%;
      transition: opacity 100ms;
    }

    &:hover::before {
      opacity: 0.08;
    }

    svg {
      max-width: calc(0.6 * var(--switch-button-size));
      max-height: calc(0.6 * var(--switch-button-size));
      width: 100%;
      height: auto;
      z-index: 1;
      color: var(--icon-inactive-color);

      > * {
        transition: transform 200ms, opacity 100ms;
      }
    }

    &:first-child {
      margin-left: var(--switch-padding);
    }
    &:last-child {
      margin-right: var(--switch-padding);
    }
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;

    &:focus-visible ~ .theme-switch__button {
      box-shadow: 0 0 0 3px var(--primary-40);
    }

    // fallback for older browsers
    &:focus ~ .theme-switch__button {
      box-shadow: 0 0 0 3px var(--primary-40);
    }

    // no focus ring on browsers that support :focus-visible
    &:focus:not(:focus-visible) ~ .theme-switch__button {
      box-shadow: var(--switch-button-shadow);
    }
  }

  input:checked ~ svg {
    color: var(--grey-70);
  }

  // ICON SUN

  input[value="light"] {
    ~ svg {
      max-width: calc(0.7 * var(--switch-button-size));
      max-height: calc(0.7 * var(--switch-button-size));
    }

    ~ svg > #sun-rays {
      transform-origin: center;
    }

    &:not(:checked) ~ svg > #sun-rays {
      transform: rotate(45deg);
      transform-origin: center;
      stroke-width: 0.5;
    }
  }

  input[value="light"]:checked ~ svg,
  input[value="auto"]:checked ~ svg {
    color: #facc15;
  }

  // ICON MOON

  input[value="dark"] {
    ~ svg > .star {
      transform-origin: bottom;
    }

    &:not(:checked) ~ svg > .star {
      transform: rotate(-45deg);
      opacity: 0;
    }
  }

  // ICON AUTO

  [color-scheme="dark"] & input[value="auto"]:checked ~ svg {
    color: inherit;
  }

  input[value="auto"] ~ svg > .sun,
  input[value="auto"] ~ svg > .star {
    opacity: 0;
    transform: translateY(50%);
  }

  input[value="auto"]:checked ~ svg > .sun {
    transform: none;
    opacity: 1;
  }

  @media (prefers-color-scheme: dark) {
    [color-scheme="auto"] & {
      input[value="auto"]:checked ~ svg {
        color: inherit;

        > .star {
          opacity: 1;
          transform: none;
        }

        > .sun {
          opacity: 0;
        }
      }
    }
  }

  // BUTTON

  input:not(:checked) + .theme-switch__button {
    visibility: hidden;

    &:hover {
      visibility: visible;
      opacity: 0.2;
    }
  }

  [color-scheme="dark"] & .theme-switch__button {
    left: calc(var(--switch-padding) + var(--switch-button-size));
  }

  [color-scheme="auto"] & .theme-switch__button {
    left: calc(var(--switch-padding) + 2 * var(--switch-button-size));
  }
}
</style>
