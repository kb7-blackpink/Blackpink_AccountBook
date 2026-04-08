<template>
  <main class="w-full px-4 py-4 sm:px-6">
    <CalendarListToggle v-model="currentView"></CalendarListToggle>

    <div class="mx-auto w-full max-w-5xl">
      <CalendarSection v-if="currentView === 'calendar'" mode="lucky" />
      <RecentTransactionList v-else-if="currentView === 'list'" />
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

import CalendarListToggle from '@/components/common/CalendarListToggle.vue';
import CalendarSection from '@/components/dashboard/CalendarSection.vue';
import RecentTransactionList from '@/components/dashboard/RecentTransactionList.vue';

// 기본은 목록뷰
const currentView = ref('list');
</script>

<style scoped></style>
