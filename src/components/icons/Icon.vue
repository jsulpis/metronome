<template>
  <component :is="iconComponent"></component>
</template>

<script lang="ts">
import IconClick from "./IconClick.vue";
import IconSticks from "./IconSticks.vue";
import IconHiHat from "./IconHiHat.vue";
import IconKick from "./IconKick.vue";
import IconVolume from "./IconVolume.vue";
import IconVolumeMute from "./IconVolumeMute.vue";
import { computed, defineComponent } from "vue";

export default defineComponent({
  components: { IconClick, IconSticks, IconHiHat, IconKick, IconVolume, IconVolumeMute },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const iconComponent = computed(() => "icon-" + props.name);
    return { iconComponent };
  }
});
</script>
