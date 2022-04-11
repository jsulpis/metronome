<template>
  <label>
    <input type="radio" :name="name" :value="value" :checked="checked" :aria-label="label" />
    <span class="custom-radio">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  value: string;
  name: string;
  checked: boolean;
  label?: string;
}>();
</script>

<style lang="scss" scoped>
label {
  -webkit-tap-highlight-color: transparent;
  width: 75px;
  height: 75px;
  border-radius: 12px;
}

.custom-radio {
  @include shadow-02;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  background: var(--grey-40);
  position: relative;
  color: var(--grey-70);
  font-size: 1.25rem;
}

input {
  opacity: 0;
  position: absolute;

  &:checked + .custom-radio {
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--primary-50);
    color: var(--primary-50);
    font-weight: bold;
  }

  &:focus + .custom-radio,
  &:focus-visible + .custom-radio {
    box-shadow: 0 0 0 2px var(--primary-40);
  }

  // no focus ring on browsers that support :focus-visible
  &:focus:not(:focus-visible) + .custom-radio {
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:hover:not(:checked) + .custom-radio::before {
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
