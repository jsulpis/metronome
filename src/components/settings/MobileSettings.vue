<template>
  <button ref="buttonOpen" id="open-settings" aria-label="open settings" @click="openSettings">
    <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.58333 0H2.75V9.16667H4.58333V0ZM15.7667 9.16667H9.9L9.16667 8.15833V6.325L9.9 5.5H15.7667L16.5 6.41667V8.25L15.7667 9.16667ZM6.6 14.6667H0.733333L0 13.75V11.9167L0.733333 11H6.6L7.33333 11.9167V13.75L6.6 14.6667ZM13.75 0H11.9167V3.66667H13.75V0ZM11.9167 11H13.75V22H11.9167V11ZM4.58333 16.5H2.75V22H4.58333V16.5ZM19.0667 16.5H24.915L25.6483 15.5833V13.8417L24.915 12.925H19.0667L18.3333 13.8417V15.5833L19.0667 16.5ZM22.9167 0H21.0833V11H22.9167V0ZM21.0833 18.3333H22.9167V22H21.0833V18.3333Z"
        fill="#475569"
      />
    </svg>
  </button>

  <div ref="backdrop" class="backdrop" :class="{ visible: isOpen }" @click="closeSettings"></div>

  <section ref="panel" class="mobile-settings" :aria-hidden="!isOpen" :class="{ visible: isOpen }">
    <button ref="handle" class="handle" @click="closeSettings" aria-label="close settings"></button>

    <div class="content">
      <h1>Settings</h1>
      <Volume></Volume>
      <Sound context="mobile"></Sound>
      <FirstBeat></FirstBeat>
      <LargeIncrement></LargeIncrement>
      <BpmRange></BpmRange>
      <Footer></Footer>
    </div>
  </section>
</template>

<script setup lang="ts">
import Volume from "./Volume.vue";
import Sound from "./Sound.vue";
import FirstBeat from "./FirstBeat.vue";
import LargeIncrement from "./LargeIncrement.vue";
import BpmRange from "./BpmRange.vue";
import Footer from "../Footer.vue";
import { ref } from "vue";
import { useDrag } from "@vueuse/gesture";
import { useWindowSize } from "@vueuse/core";

const isOpen = ref(false);
const handle = ref<HTMLElement>();
const panel = ref<HTMLElement>();
const backdrop = ref<HTMLElement>();
const buttonOpen = ref<HTMLElement>();

const openSettings = () => (isOpen.value = true);
const closeSettings = () => (isOpen.value = false);

const { height: windowHeight } = useWindowSize();

useDrag(
  ({ movement: [, y], dragging, direction }) => {
    if (!panel.value || !backdrop.value) {
      return; // avoid typescript warning
    }
    if (y > 0) {
      panel.value.style.transition = "none";
      panel.value.style.transform = `translate3d(-50%, calc(-100% + ${y}px), 0)`;
      backdrop.value.style.transition = "none";
      backdrop.value.style.opacity = `${0.5 * (1 - y / windowHeight.value)}`;
    }

    if (!dragging) {
      panel.value?.removeAttribute("style");
      backdrop.value?.removeAttribute("style");

      if (direction[1] > 0) {
        isOpen.value = false;
        buttonOpen.value?.focus();
      }
    }
  },
  { domTarget: handle }
);
</script>

<style lang="scss" scoped>
button#open-settings {
  @include shadow-02;
  position: fixed;
  width: 48px;
  height: 48px;
  bottom: 25px;
  right: 25px;
  background: var(--grey-40);
  border: 1px solid var(--grey-50);

  @include laptop-up {
    display: none;
  }
}

.mobile-settings {
  width: 90%;
  height: 94vh;
  position: fixed;
  background: var(--grey-40);
  top: 100vh;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 25px 25px 0 0;
  border: 1px solid var(--grey-60);
  display: grid;
  grid-template: 44px auto / auto;
  transition: transform 300ms ease;
  overflow: hidden;

  &.visible {
    display: grid;
    transform: translate3d(-50%, -100%, 0);
  }
}

.content {
  display: flex;
  flex-direction: column;
  padding: 0 30px 70px 30px;
  gap: 40px;
  overflow: auto;
  text-align: left;
  max-width: 450px;
  margin: 0 auto;
}

.handle {
  width: 100%;
  height: 44px;
  position: relative;
  border-radius: 0;
  background: none;

  &::before {
    position: absolute;
    content: "";
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    height: 4px;
    width: 72px;
    background: var(--grey-60);
    border-radius: 2px;
    opacity: 1 !important; // override global style on the buttons
  }
}

h1 {
  margin-top: 5px;
  text-align: center;
}

.backdrop {
  position: absolute;
  content: "";
  background: var(--grey-70);
  top: 0;
  left: 0;
  height: 100%;
  right: 0;
  transition: opacity 200ms;
  opacity: 0;
  pointer-events: none;

  &.visible {
    opacity: 0.5;
    pointer-events: initial;
  }
}
</style>
