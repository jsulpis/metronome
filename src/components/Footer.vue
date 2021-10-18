<template>
  <footer>@2021 Made by <a href="https://twitter.com/jsulpis">Julien Sulpis</a></footer>
</template>

<style lang="scss">
footer {
  color: var(--grey-60);
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;

  @include laptop-up {
    position: fixed;
    bottom: 2rem;
  }

  a:not(:visited) {
    color: var(--primary-50);
    font-weight: bold;
  }
}
</style>
