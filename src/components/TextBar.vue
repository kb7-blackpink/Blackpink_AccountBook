<template>
  <div
    class="h-10 lg:h-15 border rounded-2xl px-2.5 py-3 lg:px-4 lg:py-5 flex items-center justify-between gap-3 transition-colors duration-500 mt-2.5 lg:mt-4"
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

    <!-- 분석 버튼 숨기기 기능 추가 -->
    <button
    v-if="showButton"
      @click="goToStatistics"
      class="cursor-pointer rounded-lg border px-2 py-1 text-xs transition lg:px-5 lg:py-2 text-[10px] lg:text-sm"
      :class="[
        userStore.mode === 'lucky'
          ? 'bg-[#84cc16]/50 border-[#84cc16] text-white hover:bg-[#84cc16]/70'
          : 'bg-[#6a27df] border-[#cdafff]/70 text-[#e0cfff] hover:bg-[#6a27df]/80',
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

const props = defineProps({
  showButton: {
    type: Boolean,
    default: true // 버튼 기본값 보이게 설정
  }
});

onMounted(() => {
  budgetStore.fetchAllData();
  userStore.loadUserFromStorage();
});
</script>

<style scoped></style>
