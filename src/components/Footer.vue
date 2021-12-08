<template>
  <footer>
    <ThemeSwitch></ThemeSwitch>
    <p>
      @ {{ new Date().getFullYear() }} • Design & code by
      <a href="https://twitter.com/jsulpis">Julien Sulpis</a>
    </p>
  </footer>
</template>

<script setup lang="ts">
import ThemeSwitch from "./settings/theme-switch/ThemeSwitch.vue";
</script>

<style lang="scss">
footer {
  color: var(--grey-60);
  margin-top: 2rem;
  text-align: center;

  p {
    margin-top: 2rem;
    font-size: 1.2rem;
  }

  @include laptop-up {
    text-align: left;
    position: fixed;
    bottom: 2rem;
  }

  a:not(:visited) {
    color: var(--primary-50);
    font-weight: bold;
  }

  a:focus-visible {
    outline-color: var(--primary-50);
  }
}
</style>
