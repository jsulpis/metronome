<template>
  <label>
    <input type="radio" :name="name" :value="value" :checked="checked" />
    <div class="checkbox">
      <slot></slot>
    </div>
  </label>
</template>

<script setup lang="ts">
defineProps({
  value: String,
  name: String,
  checked: Boolean
});
</script>

<style lang="scss">
.checkbox {
  @include shadow-02;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  width: 75px;
  height: 75px;
  border-radius: 12px;
  background: white;
  position: relative;
  color: var(--grey-60);
  font-size: 1.25rem;
  transition: all 100ms ease-in-out;
}

input {
  width: 1px;
  height: 1px;
  opacity: 0;

  &:checked + .checkbox {
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--primary);
    color: var(--primary);
    font-weight: bold;
  }

  &:focus + .checkbox {
    &::after {
      $outline-width: 3px;
      content: "";
      position: absolute;
      top: -$outline-width;
      bottom: -$outline-width;
      left: -$outline-width;
      right: -$outline-width;
      border: $outline-width solid var(--primary);
      border-radius: inherit;
    }
  }

  // focus outline alternative that allows to use box-shadows
  &:focus-visible + .checkbox {
    &::after {
      $outline-width: 3px;
      content: "";
      position: absolute;
      top: -$outline-width;
      bottom: -$outline-width;
      left: -$outline-width;
      right: -$outline-width;
      border: $outline-width solid var(--primary);
      border-radius: inherit;
    }
  }

  // no focus ring on browsers that support :focus-visible
  &:focus:not(:focus-visible) + .checkbox::after {
    border: none;
  }

  &:hover:not(:checked) + .checkbox::before {
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
</style>
