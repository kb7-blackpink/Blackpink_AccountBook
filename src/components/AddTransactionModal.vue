<template>
  <div
    class="fixed bg-black/40 inset-0 z-1000 flex items-end justify-center pt-20"
  >
    <div class="bg-white w-full rounded-t-3xl h-full px-4 pt-5">
      <div class="max-w-5xl mx-auto flex flex-col gap-3">
        <div class="text-xl font-bold">4월 7일</div>
        <div
          class="relative flex items-center text-3xl font-semibold outline-none"
        >
          <span class="invisible whitespace-pre">{{ amount || '0' }}</span>

          <input
            v-model="amount"
            type="text"
            class="absolute inset-0 w-full bg-transparent outline-none text-gray-800 border-b-green-400"
            @input="formatAmount"
          />

          <span class="ml-1 text-2xl font-medium text-gray-900">원</span>
        </div>
        <div>
          <button>수입</button>
          <button>지출</button>
        </div>
        <div>
          <p>제목</p>
          <input type="text" />
        </div>
        <div>
          <p>카테고리</p>
          <input type="text" />
        </div>
        <div>
          <p>메모</p>
          <input type="text" />
        </div>

        <div>
          <button>저장</button>
        </div>

        <button @click="modalStore.closeAddModal()">x</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useModalStore } from '@/stores/modal';

const amount = ref('100,000');
const modalStore = useModalStore();

const formatAmount = (e) => {
  let value = e.target.value.replace(/[^0-9]/g, '');

  if (!value) {
    amount.value = '';
  } else {
    amount.value = Number(value).toLocaleString();
  }
};
</script>

<style scoped></style>
