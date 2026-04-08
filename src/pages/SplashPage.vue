<template>
  <Transition name="splash-fade" appear>
    <div
      v-if="isVisible"
      class="fixed inset-0 z-9999 flex items-center justify-center bg-linear-to-r from-[#e7fbd2] 50% to-[#201a61] 50% overflow-hidden"
    >
      <div
        class="w-[90%] max-w-md md:max-w-lg rounded-[30px] md:rounded-[40px] bg-white/80 p-8 md:p-12 text-center shadow-2xl backdrop-blur-md border border-white/20"
      >
        <div class="mb-8 relative flex items-center justify-center h-16 md:h-20 overflow-hidden">
          <span class="text-3xl sm:text-4xl md:text-5xl shrink-0">🍀</span>

          <div
            class="text-4xl sm:text-5xl md:text-5xl font-medium text-[#548c00] whitespace-nowrap"
            style="font-family: 'OkMallangB'"
          >
            Lucky Bank
          </div>

          <span class="text-3xl sm:text-4xl md:text-5xl shrink-0">😈</span>
        </div>

        <div class="mb-8 space-y-2">
          <p class="text-base md:text-xl font-bold text-gray-800">
            행운도, 불운도 당신의 소비 기록입니다
          </p>
          <p class="text-xs md:text-sm font-medium text-gray-400">
            오늘의 소비를 두 가지 시선으로 만나는 중...
          </p>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-[10px] md:text-xs font-bold text-[#548c00]">Lucky</span>
          <div class="relative h-2 md:h-2.5 flex-1 overflow-hidden rounded-full bg-gray-200/50">
            <div
              class="absolute h-full w-1/3 animate-loading-move rounded-full bg-linear-to-r from-[#548c00] via-[#a855f7] to-[#201a61]"
            ></div>
          </div>
          <span class="text-[10px] md:text-xs font-bold text-[#a855f7]">Unlucky</span>
        </div>

        <p class="mt-6 text-xs md:text-sm font-light tracking-[0.2em] text-gray-400 uppercase">
          Loading...
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isVisible = ref(true);

onMounted(() => {
  // 3초 로딩 후 페이드 아웃 및 이동
  setTimeout(() => {
    isVisible.value = false;
    setTimeout(() => {
      router.push('/statistic');
    }, 800);
  }, 3000);
});
</script>

<style scoped>
/* 로딩 애니메이션, 페이드 효과 */
@keyframes loading-move {
  0% { left: -40%; }
  50% { left: 40%; }
  100% { left: 110%; }
}
.animate-loading-move {
  animation: loading-move 2.5s infinite ease-in-out;
}

.splash-fade-enter-active,
.splash-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.splash-fade-enter-from,
.splash-fade-leave-to {
  opacity: 0;
  transform: scale(0.95); 
}
</style>