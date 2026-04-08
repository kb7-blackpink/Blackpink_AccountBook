<template>
  <button
    class="w-full text-white text-3xl bg-[#C0E068] rounded-[20px] py-4 cursor-pointer hover:bg-[#b3d45f] transition-colors duration-200"
  >
    {{ text }}
  </button>
</template>

<script setup>
const props = defineProps({
  text: String,
});
</script>

<style scoped></style>
