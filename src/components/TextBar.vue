<template>
  <div
    class="h-10 lg:h-15 border rounded-2xl px-2.5 py-3 lg:px-4 lg:py-5 flex items-center justify-between gap-3 transition-colors duration-500"
    :class="[
      userStore.mode === 'lucky'
        ? 'border-neutral-400'
        : 'border-white/30 bg-white/10',
    ]"
  >
    <div class="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
      <p class="text-xs lg:text-md">📢</p>
      <p
        class="text-[10px] lg:text-lg line-clamp-2"
        :class="[
          userStore.mode === 'lucky' ? 'text-neutral-700' : 'text-white',
        ]"
      >
        {{ budgetStore.dynamicMessage }}
      </p>
    </div>

    <RouterLink to="/analysis" class="shrink-0">
      <button
        class="border transition px-2 py-1 lg:px-5 lg:py-2 rounded-lg text-[10px] lg:text-sm cursor-pointer"
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
