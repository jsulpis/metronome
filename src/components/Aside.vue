<template>
  <aside :class="position">
    <div class="aside__content">
      <slot></slot>
    </div>
    <svg
      width="502"
      height="1024"
      viewBox="0 0 502 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H92C92 0 420.5 200 502 1024H0V0Z" fill="url(#paint0_linear)" />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="450.5"
          y1="427.5"
          x2="15"
          y2="755"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--aside-gradient-light)" />
          <stop offset="0.853346" stop-color="var(--aside-gradient-dark)" />
        </linearGradient>
      </defs>
    </svg>
  </aside>
</template>

<script setup lang="ts">
defineProps<{ position: string }>();
</script>

<style lang="scss" scoped>
aside {
  position: relative;
  display: none;
  align-items: flex-end;
  padding-bottom: 15vh;

  .aside__content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  @include laptop-up {
    display: flex;
    max-width: 30vw;
  }

  @include big-laptop-up {
    max-width: 27vw;
  }

  @include desktop-up {
    max-width: 23vw;
  }

  @include big-desktop-up {
    transform: scale(1.25);

    &.left {
      transform-origin: bottom left;
    }
    &.right {
      transform-origin: bottom right;
    }
  }

  svg {
    position: absolute;
    bottom: 0;
    z-index: z-index(aside-background);
    max-height: 125%;
    min-height: 100%;
    width: auto;
  }

  &.left {
    padding-left: 3vw;
    padding-right: 4vw;
    text-align: left;

    svg {
      left: 0;
    }
  }

  &.right {
    padding-right: 3vw;
    padding-left: 4vw;
    margin-left: auto;
    text-align: right;

    svg {
      right: 0;
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }
  }
}
</style>
