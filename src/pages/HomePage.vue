<template>
  <div class="flex flex-col gap-3 lg:gap-6">
    <div class="flex justify-center gap-3 lg:gap-6">
      <TotalCard />
      <MonthDiff />
    </div>
    <TextBar />
    <CalendarSection mode="lucky" />
  </div>
</template>

<script setup>
import CalendarSection from '@/components/dashboard/CalendarSection.vue';
import MonthDiff from '@/components/MonthDiff.vue';
import TextBar from '@/components/TextBar.vue';
import TotalCard from '@/components/TotalCard.vue';
</script>

<style scoped></style>
