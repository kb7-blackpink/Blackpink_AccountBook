<template>
  <div
    class="fixed bottom-2 right-2 lg:bottom-6 lg:right-6 flex lg:flex-row flex-col gap-1 lg:gap-1.5 z-50"
  >
    <button
      @click="modalStore.openAddModal()"
      class="w-12 h-12 lg:w-12 lg:h-12 pb-0.5 font-bold border rounded-full text-xl lg:text-2xl flex items-center justify-center cursor-pointer"
      :class="[
        userStore.mode === 'lucky'
          ? 'border-app bg-app text-[#84cc16]'
          : 'border-[#cdafff] bg-neutral-50 text-[#7c3aed] ',
      ]"
    >
      <Plus stroke-width="5" />
    </button>
    <button
      @click="scrollTop"
      class="flex items-center justify-center w-12 h-12 lg:w-12 lg:h-12 lg:text-lg text-xs border rounded-full cursor-pointer"
      :class="[
        userStore.mode === 'lucky'
          ? 'border-app bg-app text-neutral-400'
          : 'border-[#cdafff]  bg-neutral-50 text-neutral-500',
      ]"
    >
      <ArrowBigUp stroke-width="2" />
    </button>
  </div>
</template>

<script setup>
import { useBudgetStore } from '@/stores/budget';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useModalStore } from '@/stores/modal';
import { ArrowBigUp, Plus } from 'lucide-vue-next';

const budgetStore = useBudgetStore();
const userStore = useUserStore();
const modalStore = useModalStore();

onMounted(() => {
  budgetStore.fetchAllData();
  userStore.loadUserFromStorage();
});

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped></style>
