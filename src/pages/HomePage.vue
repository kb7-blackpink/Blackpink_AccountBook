<template>
  <div class="flex flex-col gap-3 lg:gap-6 px-3 lg:py-3.5 lg:px-6">
    <div class="flex flex-col lg:flex-row justify-center gap-3 lg:gap-6">
      <TotalCard />
      <MonthDiff />
    </div>
    <TextBar />
    <DashboardView />
    <AddTransactionModal v-if="modalStore.isAddModalOpen" />
  </div>
</template>

<script setup>
import MonthDiff from '@/components/MonthDiff.vue';
import TextBar from '@/components/TextBar.vue';
import TotalCard from '@/components/TotalCard.vue';
import DashboardView from '@/components/dashboard/DashboardView.vue';
import AddTransactionModal from '@/components/AddTransactionModal.vue';
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();
</script>

<style scoped></style>
