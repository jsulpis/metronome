<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { provide } from "vue";

const props = defineProps<{ context: "desktop" | "mobile" }>();

provide("context", props.context);
</script>
