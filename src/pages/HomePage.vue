<template>
  <div class="flex flex-col gap-3 lg:gap-6 px-3 lg:px-0">
    <div class="flex flex-col lg:flex-row justify-center gap-3 lg:gap-6">
      <TotalCard />
      <MonthDiff />
    </div>
    <TextBar />
    <DashboardView />
  </div>
</template>

<script setup>
import MonthDiff from '@/components/MonthDiff.vue';
import TextBar from '@/components/TextBar.vue';
import TotalCard from '@/components/TotalCard.vue';
import DashboardView from '@/components/dashboard/DashboardView.vue';
</script>

<style scoped></style>
