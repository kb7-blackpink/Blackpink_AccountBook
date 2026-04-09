<template>
  <div
    class="h-10 lg:h-15 border rounded-2xl px-2.5 py-3 lg:px-4 lg:py-5 flex items-center justify-between gap-3 transition-colors duration-500"
    :class="[
      userStore.mode === 'lucky'
        ? 'border-app bg-app'
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

    <button
      @click="goToStatistics"
      class="cursor-pointer rounded-lg border px-2 py-1 text-xs transition lg:px-5 lg:py-2 text-[10px] lg:text-sm"
      :class="[
        userStore.mode === 'lucky'
          ? 'bg-green-200/80 border-green-600 text-green-800 hover:bg-green-300/80'
          : 'bg-indigo-600 border-indigo-400 text-indigo-200 hover:bg-indigo-700',
      ]"
    >
      분석
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useBudgetStore } from '@/stores/budget';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const budgetStore = useBudgetStore();
const userStore = useUserStore();

const router = useRouter();
const goToStatistics = () => {
  router.push('/statistics');
};

onMounted(() => {
  budgetStore.fetchAllData();
  userStore.loadUserFromStorage();
});
</script>

<style scoped></style>
