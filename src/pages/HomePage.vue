<template>
  <div class="flex flex-col gap-1 lg:gap-2 px-3 lg:py-3.5 lg:px-6">
    <div class="flex flex-col lg:flex-row justify-center gap-3 lg:gap-6">
      <TotalCard class="flex-[7]" />
      <MonthDiff class="flex-[3]" />
    </div>
    <TextBar />
    <DashboardView />
    <AddTransactionModal v-if="modalStore.isAddModalOpen" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import MonthDiff from '@/components/dashboard/MonthDiff.vue';
import TextBar from '@/components/dashboard/TextBar.vue';
import TotalCard from '@/components/dashboard/TotalCard.vue';
import DashboardView from '@/components/dashboard/DashboardView.vue';
import AddTransactionModal from '@/components/common/AddTransactionModal.vue';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import { useBudgetStore } from '@/stores/budget';

const modalStore = useModalStore();
const userStore = useUserStore();
const budgetStore = useBudgetStore();

onMounted(async () => {
  userStore.loadUserFromStorage();
  await budgetStore.fetchAllData();
});
</script>

<style scoped></style>
