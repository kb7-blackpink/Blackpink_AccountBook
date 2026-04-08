<template>
  <div
    class="h-13 lg:h-15 border rounded-2xl px-4 py-3 lg:px-4 lg:py-5 flex items-center justify-between gap-3 transition-colors duration-500"
    :class="[
      userStore.mode === 'lucky'
        ? 'border-neutral-400 bg-white'
        : 'border-white/30 bg-white/10',
    ]"
  >
    <div class="flex items-center gap-3">
      <p class="text-xs lg:text-md">📢</p>
      <p
        class="text-xs lg:text-lg"
        :class="[
          userStore.mode === 'lucky' ? 'text-neutral-800' : 'text-white',
        ]"
      >
        {{ budgetStore.dynamicMessage }}
      </p>
    </div>
    <RouterLink to="/analysis">
      <button
        class="border w-12 lg:w-17 transition px-3 py-1.5 lg:px-5 lg:py-2 rounded-lg text-xs lg:text-sm cursor-pointer"
        :class="[
          userStore.mode === 'lucky'
            ? 'bg-green-200/80 border-green-600 text-green-800 hover:bg-green-300/80'
            : 'bg-indigo-600 border-indigo-400 text-indigo-200 hover:bg-indigo-700',
        ]"
      >
        분석
      </button>
    </RouterLink>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useBudgetStore } from '@/stores/budget';
import { useUserStore } from '@/stores/user';

const budgetStore = useBudgetStore();
const userStore = useUserStore();

onMounted(() => {
  budgetStore.fetchAllData();
  userStore.fetchUserMode();
});
</script>

<style scoped></style>
