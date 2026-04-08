<template>
  <div class="flex flex-col gap-3 lg:gap-10">
    <div class="flex justify-center gap-3 lg:gap-10">
      <TotalCard />
      <MonthDiff />
    </div>
    <TextBar />
  </div>
</template>

<script setup>
import MonthDiff from '@/components/MonthDiff.vue';
import TextBar from '@/components/TextBar.vue';
import TotalCard from '@/components/TotalCard.vue';
</script>

<style scoped></style>
