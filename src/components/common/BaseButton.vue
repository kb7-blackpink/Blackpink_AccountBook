<template>
  <button
    :type="type"
    :disabled="disabled"
    class="rounded-xl px-4 py-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90 active:opacity-80 hover:cursor-pointer"
    :class="buttonClass"
  >
    {{ text }}
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary', // primary | income | delete | cancel
  },
});

const buttonClass = computed(() => {
  if (props.variant === 'income') return 'bg-income text-on-dark';
  if (props.variant === 'delete') return 'bg-delete text-on-dark';
  if (props.variant === 'cancel') return 'bg-cancel text-on-light';
  return 'bg-primary text-on-dark';
});
</script>

<style scoped></style>
