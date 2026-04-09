<template>
  <div class="flex flex-col gap-3 lg:gap-6 px-3 lg:py-3.5 lg:px-6">
    <div class="flex flex-col lg:flex-row justify-center gap-3 lg:gap-6">
      <TotalCard />
      <MonthDiff />
    </div>
    <TextBar />
    <CalendarListToggle v-model="currentView"></CalendarListToggle>
    <CalendarSection v-if="currentView === 'calendar'" mode="lucky" />
    <RecentTransactionList v-else-if="currentView === 'list'" />
    <AddTransactionModal v-if="modalStore.isAddModalOpen" />
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
import AddTransactionModal from '@/components/AddTransactionModal.vue';
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();

// 기본은 목록뷰
const currentView = ref('list');
</script>

<style scoped></style>
