<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="w-full min-h-dvh bg-gray-50">
    <!-- <Header /> -->
    <div class="lg:w-5xl sm:w-lg mx-auto bg-white min-h-dvh p-5 lg:p-10">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
