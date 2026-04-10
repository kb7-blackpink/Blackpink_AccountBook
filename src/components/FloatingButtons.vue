<template>
  <div
    class="fixed bottom-2 right-2 lg:bottom-6 lg:right-6 flex lg:flex-row flex-col gap-1 lg:gap-1.5 z-50"
  >
    <button
      @click="modalStore.openAddModal()"
      class="w-12 h-12 lg:w-12 lg:h-12 pb-0.5 font-bold border rounded-full text-xl lg:text-2xl flex items-center justify-center cursor-pointer"
      :class="[
        userStore.mode === 'lucky'
          ? 'border-app text-white bg-[#C0E068]'
          : 'border-white/30 text-white bg-[#7c3aed]',
      ]"
    >
      <Plus stroke-width="5" />
    </button>
    <button
      @click="scrollTop"
      class="flex items-center justify-center w-12 h-12 lg:w-12 lg:h-12 lg:text-lg text-xs border rounded-full cursor-pointer"
      :class="[
        userStore.mode === 'lucky'
          ? 'border-app text-app bg-neutral-100'
          : 'border-white/30  text-white bg-white/10',
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
