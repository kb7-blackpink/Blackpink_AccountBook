<template>
  <div
    class="fixed bg-black/40 inset-0 z-1000 flex items-end justify-center pt-15"
  >
    <div
      class="w-full rounded-t-3xl h-full px-4 lg:pt-9 pt-5 pb-5"
      :class="[userStore.mode === 'lucky' ? 'bg-white' : 'bg-neutral-900']"
    >
      <div
        class="max-w-3xl h-full mx-auto flex flex-col justify-between gap-3 relative"
      >
        <div
          class="text-xl lg:text-4xl font-bold"
          :class="[
            userStore.mode === 'lucky' ? 'text-black' : 'text-[#cdafff]',
          ]"
        >
          4월 7일
        </div>
        <div
          class="relative flex items-center text-2xl lg:text-4xl border-b lg:pb-5 pb-2"
          :class="[
            userStore.mode === 'lucky'
              ? 'border-green-300'
              : 'border-[#cdafff]',
          ]"
        >
          <span
            class="invisible whitespace-pre"
            :class="[
              userStore.mode === 'lucky' ? 'text-gray-800' : 'text-gray-50',
            ]"
            >{{ amount || '0' }}</span
          >

          <input
            v-model="amount"
            type="text"
            class="absolute inset-0 w-full bg-transparent outline-none"
            :class="[
              userStore.mode === 'lucky' ? 'text-black' : 'text-gray-50',
            ]"
            @input="formatAmount"
          />

          <span
            class="ml-1 -mb-2 lg:-mb-5 lg:text-3xl text-2xl font-medium text-gray-900"
            :class="[
              userStore.mode === 'lucky' ? 'text-gray-800' : 'text-gray-50',
            ]"
            >원</span
          >
          <button
            v-if="amount"
            class="relative z-50 ml-auto -mb-2 rounded-full w-3 lg:w-6 h-3 lg:h-6 text-[8px] lg:text-lg font-light flex items-center justify-center cursor-pointer"
            :class="[
              userStore.mode === 'lucky'
                ? 'bg-gray-100 text-gray-500'
                : 'bg-neutral-600 text-neutral-900',
            ]"
            @click="clearAmount"
          >
            x
          </button>
        </div>
        <div class="flex gap-1.5">
          <button
            class="w-11 lg:w-17 lg:py-1 lg:text-lg py-1 rounded-lg text-xs"
            :class="[
              userStore.mode === 'lucky'
                ? 'bg-sky-200/70 border border-sky-300 text-sky-900 hover:bg-sky-300/60 transition duration-75 cursor-pointer'
                : 'bg-sky-700/90 border border-sky-500/70 text-sky-300 hover:bg-sky-800/90 transition duration-75 cursor-pointer',
            ]"
          >
            수입
          </button>
          <!-- 여기 unlucky 스타일 고민... -->
          <button
            class="w-11 lg:w-17 lg:py-1 lg:text-lg py-1 rounded-lg text-xs"
            :class="[
              userStore.mode === 'lucky'
                ? 'bg-red-200/70 border border-red-300 text-red-900 hover:bg-red-300/60 transition duration-75 cursor-pointer'
                : 'bg-red-500/90 border border-red-400 text-red-200 hover:bg-red-500/70 transition duration-75 cursor-pointer',
            ]"
          >
            지출
          </button>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-[11px] lg:text-lg font-semibold pl-1">제목</p>
          <input
            placeholder="상세 지출 내역"
            class="border outline-none lg:py-2.5 lg:px-3 lg:text-lg py-1.5 px-2 text-[10px] w-full rounded-lg"
            :class="[
              userStore.mode === 'lucky'
                ? 'border-neutral-300 bg-white'
                : 'border-[#826da2] bg-neutral-800 text-gray-300 focus:border-[#cdafff] focus:bg-neutral-700 transition duration-75',
            ]"
            type="text"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-[11px] lg:text-lg font-semibold pl-1"
            >카테고리</label
          >
          <div class="relative">
            <select
              class="appearance-none border outline-none lg:py-2.5 lg:px-3 py-1.5 px-2 lg:text-lg text-[10px] w-full rounded-lg"
              :class="[
                userStore.mode === 'lucky'
                  ? 'border-neutral-300 bg-white'
                  : 'border-[#826da2] bg-neutral-800 text-gray-300 focus:border-[#cdafff] focus:bg-neutral-700 transition duration-75',
              ]"
            >
              <option value="" disabled selected>선택</option>
              <option value="shopping">쇼핑</option>
              <option value="food">식비</option>
              <option value="transport">교통</option>
            </select>

            <div
              class="absolute inset-y-0 right-2.5 flex items-center pointer-events-none"
            >
              <svg
                class="w-2.5 h-2.5 text-neutral-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-[11px] lg:text-lg font-semibold pl-1">메모</p>
          <input
            placeholder="메모"
            class="border outline-none lg:py-2.5 lg:px-3 lg:text-lg py-1.5 px-2 text-[10px] w-full rounded-lg"
            :class="[
              userStore.mode === 'lucky'
                ? 'border-neutral-300 bg-white'
                : 'border-[#826da2] bg-neutral-800 text-gray-300 focus:border-[#cdafff] focus:bg-neutral-700 transition duration-75',
            ]"
            type="text"
          />
        </div>

        <!-- unlucky 스타일 바꿔야할듯... 넘 맘에 안들어요... -->
        <div>
          <button
            class="w-full text-center lg:text-lg text-[11px] lg:py-2 py-1 rounded-lg"
            :class="[
              userStore.mode === 'lucky'
                ? 'bg-green-200 border border-green-500 text-green-900'
                : 'bg-[#c29bff] border border-[#826da2] text-[#433b4e] hover:bg-[#a87de0] transition duration-75',
            ]"
          >
            저장
          </button>
        </div>

        <button
          @click="modalStore.closeAddModal()"
          class="lg:text-2xl text-sm absolute top-0 right-1 cursor-pointer"
          :class="[
            userStore.mode === 'lucky' ? 'text-black' : 'text-[#cdafff]',
          ]"
        >
          x
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'; // watch, onUnmounted 추가
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';

const amount = ref('100,000');
const modalStore = useModalStore();
const userStore = useUserStore();

// --- 스크롤 방지 로직 ---
// modalStore의 상태가 바뀌는 것을 감시하거나,
// 현재 컴포넌트(모달)가 mount되었을 때 스크롤을 막습니다.
if (typeof document !== 'undefined') {
  document.body.style.overflow = 'hidden';
}

// 모달이 닫힐 때(컴포넌트가 사라질 때) 다시 스크롤을 허용합니다.
onUnmounted(() => {
  document.body.style.overflow = 'auto';
});
// -----------------------

const formatAmount = (e) => {
  let value = e.target.value.replace(/[^0-9]/g, '');
  if (!value) {
    amount.value = '';
  } else {
    amount.value = Number(value).toLocaleString();
  }
};

const clearAmount = () => {
  amount.value = '';
};
</script>

<style scoped></style>
