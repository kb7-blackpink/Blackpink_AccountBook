<template>
  <div class="border border-solid border-app rounded-2xl p-6 bg-box shadow-sm text-app">
    <div class="text-center text-lg font-semibold mb-12">카테고리별 지출</div>
    <div class="h-64">
      <Doughnut :data="chartData" :options="options" />
    </div>
  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs';
defineProps(['chartData', 'options']);
</script>