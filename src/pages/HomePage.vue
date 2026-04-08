<template>
  <div class="flex flex-col gap-3 lg:gap-6">
    <div class="flex justify-center gap-3 lg:gap-6">
      <TotalCard />
      <MonthDiff />
    </div>
    <TextBar />
    <div class="w-full px-4 py-4 sm:px-6">
      <CalendarListToggle v-model="currentView"></CalendarListToggle>

      <div class="mx-auto w-full max-w-5xl">
        <CalendarSection v-if="currentView === 'calendar'" mode="lucky" />
        <RecentTransactionList v-else-if="currentView === 'list'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CalendarListToggle from '@/components/common/CalendarListToggle.vue';
import CalendarSection from '@/components/dashboard/CalendarSection.vue';
import RecentTransactionList from '@/components/dashboard/RecentTransactionList.vue';
import MonthDiff from '@/components/MonthDiff.vue';
import TextBar from '@/components/TextBar.vue';
import TotalCard from '@/components/TotalCard.vue';

// 기본은 목록뷰
const currentView = ref('list');
</script>

<style scoped></style>
