<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="flex justify-center items-center bg-primary text-lightgray h-12 w-full max-w-xs rounded-3px text-lg focus:outline-none shadow-lg"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class SubmitBtn extends Vue {}
</script>

<style lang="postcss" scoped>
button:disabled {
  @apply pointer-events-none;
  background: #fff;
  color: #262e45;
}
</style>
