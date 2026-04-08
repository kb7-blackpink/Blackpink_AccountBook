<template>
  <button
    :type="type"
    :disabled="disabled"
    class="w-full flex items-center justify-center rounded-xl bg-[#C0E068] py-4 text-xl text-white transition-colors duration-200"
    :class="[
      disabled
        ? 'cursor-not-allowed opacity-50'
        : 'cursor-pointer hover:bg-[#b3d45f]',
    ]"
  >
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
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
});
</script>

<style scoped></style>
