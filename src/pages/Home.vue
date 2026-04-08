<template>
  <div class="w-250 mx-auto bg-white min-h-dvh">
    <div class="p-20 flex flex-col gap-10">
      <div class="flex justify-center gap-10">
        <TotalCard />
        <MonthDiff />
      </div>
      <TextBar />
    </div>
  </div>
</template>

<script setup>
import MonthDiff from '@/components/MonthDiff.vue';
import TextBar from '@/components/TextBar.vue';
import TotalCard from '@/components/TotalCard.vue';
</script>

<style scoped></style>
