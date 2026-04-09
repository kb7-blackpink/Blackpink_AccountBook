<template>
  <div
    class="flex h-13 items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition-colors duration-500 lg:h-15 lg:px-4 lg:py-5"
    :class="[
      userStore.mode === 'lucky'
        ? 'border-app bg-app'
        : 'border-white bg-transparent',
    ]"
  >
    <div class="flex items-center gap-3">
      <p class="text-xs lg:text-md">📢</p>
      <p
        class="text-xs lg:text-lg"
        :class="[userStore.mode === 'lucky' ? 'text-app' : 'text-white']"
      >
        {{ budgetStore.dynamicMessage }}
      </p>
    </div>

    <RouterLink to="/analysis">
      <button
        class="cursor-pointer rounded-lg border px-3 py-1.5 text-xs transition lg:px-5 lg:py-2 lg:text-sm"
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
  userStore.loadUserFromStorage();
});
</script>

<style scoped></style>
