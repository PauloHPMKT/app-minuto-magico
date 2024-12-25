<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { defineProps } from 'vue';

interface MainButtonProps {
  class?: string;
}

const props = defineProps<MainButtonProps>();
</script>

<template>
  <button
    v-bind="$attrs"
    :class="twMerge(
      'bg-gray-300 w-full text-gray-950 px-4 py-2 rounded-md', props.class
    )"
  >
    <slot></slot>
  </button>
</template>
