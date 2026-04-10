<template>
  <Transition name="fade" appear>
    <div
      class="fixed bg-black/40 inset-0 z-[1000] flex items-end justify-center pt-15"
      @click.self="modalStore.closeAddModal()"
    >
      <Transition name="slide-up" appear>
        <div
          v-if="modalStore.isAddModalOpen"
          class="w-full rounded-t-3xl h-full px-4 lg:pt-9 pt-5 pb-5"
          :class="[userStore.mode === 'lucky' ? 'bg-white' : 'bg-neutral-900']"
        >
          <div
            class="max-w-3xl h-full mx-auto flex flex-col justify-between gap-3 relative"
          >
            <div class="flex justify-between items-center gap-4">
              <div
                class="text-xl lg:text-4xl font-bold cursor-pointer"
                :class="[
                  userStore.mode === 'lucky' ? 'text-black' : 'text-[#cdafff]',
                ]"
                @click="openDatePicker"
              >
                {{ formattedDate }}
              </div>
              <input
                ref="dateInput"
                type="date"
                v-model="selectedDate"
                class="absolute opacity-0 pointer-events-none"
              />
            </div>
            <div
              class="relative flex items-center text-2xl lg:text-4xl border-b lg:pb-5 pb-2"
              :class="[
                userStore.mode === 'lucky'
                  ? 'border-[#84cc16]'
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
                ref="amountInput"
                v-model="amount"
                type="text"
                class="absolute inset-0 w-full bg-transparent outline-none"
                :class="[
                  userStore.mode === 'lucky' ? 'text-black' : 'text-gray-50',
                  amount.length > 50
                    ? 'text-xl lg:text-2xl'
                    : 'text-2xl lg:text-4xl',
                ]"
                @input="formatAmount"
              />

              <span
                class="ml-1 -mb-2 lg:-mb-5 lg:text-3xl text-2xl font-medium"
                :class="[
                  userStore.mode === 'lucky' ? 'text-blck' : 'text-gray-50',
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
                @click="type = 'income'"
                class="w-11 lg:w-17 lg:py-1 lg:text-lg py-1 rounded-lg text-xs"
                :class="[
                  type === 'income'
                    ? userStore.mode === 'lucky'
                      ? 'ring-2 ring-[#84cc16]/50 bg-[#84cc16]/80 text-white'
                      : 'ring-2 ring-[#cdafff]/70 bg-[#6a27df] text-white'
                    : userStore.mode === 'lucky'
                      ? 'bg-[#84cc16]/30 border border-[#84cc16]/70 text-[#84cc16] hover:bg-[#84cc16]/40 transition duration-75 cursor-pointer'
                      : 'bg-[#2e1065] border border-[#cdafff]/50 text-[#cdafff]/70 hover:bg-[#6a27df]/60 transition duration-75 cursor-pointer',
                ]"
              >
                수입
              </button>
              <!-- 여기 unlucky 스타일 고민... -->
              <button
                @click="type = 'expense'"
                class="w-11 lg:w-17 lg:py-1 lg:text-lg py-1 rounded-lg text-xs"
                :class="[
                  type === 'expense'
                    ? userStore.mode === 'lucky'
                      ? 'ring-2 ring-[#84cc16]/50 bg-[#84cc16]/80 text-white'
                      : 'ring-2 ring-[#cdafff]/70 bg-[#6a27df] text-white'
                    : userStore.mode === 'lucky'
                      ? 'bg-[#84cc16]/30 border border-[#84cc16]/70 text-[#84cc16] hover:bg-[#84cc16]/40 transition duration-75 cursor-pointer'
                      : 'bg-[#2e1065] border border-[#cdafff]/50 text-[#cdafff]/70 hover:bg-[#6a27df]/60 transition duration-75 cursor-pointer',
                ]"
              >
                지출
              </button>
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-[11px] lg:text-lg font-semibold pl-1">제목</p>
              <input
                v-model="title"
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
                  v-model="category"
                  class="appearance-none border outline-none lg:py-2.5 lg:px-3 py-1.5 px-2 lg:text-lg text-[10px] w-full rounded-lg"
                  :class="[
                    userStore.mode === 'lucky'
                      ? 'border-neutral-300 bg-white'
                      : 'border-[#826da2] bg-neutral-800 text-gray-300 focus:border-[#cdafff] focus:bg-neutral-700 transition duration-75',
                  ]"
                >
                  <option value="" disabled>선택</option>
                  <option
                    v-for="item in categoryOptions"
                    :key="item"
                    :value="item"
                  >
                    {{ item }}
                  </option>
                </select>

                <div
                  class="absolute inset-y-0 right-2.5 flex items-center pointer-events-none"
                >
                  <svg
                    class="w-2.5 h-2.5 lg:w-5 lg:h-5"
                    :class="[
                      userStore.mode === 'lucky'
                        ? 'text-neutral-600'
                        : 'text-neutral-200',
                    ]"
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
              <textarea
                v-model="memo"
                :placeholder="
                  userStore.mode === 'lucky'
                    ? type === 'income'
                      ? '행복한 수입! 어디서 들어왔나요? ^0^🍀'
                      : '어떤걸 샀는지 자세히 적어보세요 >.<🍀'
                    : type === 'income'
                      ? '저축할거지^^? '
                      : '왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?왜썼어?'
                "
                class="border outline-none lg:py-2.5 lg:px-3 lg:text-lg py-1.5 px-2 text-[10px] w-full rounded-lg"
                :class="[
                  userStore.mode === 'lucky'
                    ? 'border-neutral-300 bg-white'
                    : 'border-[#826da2] bg-neutral-800 text-gray-300 focus:border-[#cdafff] focus:bg-neutral-700 transition duration-75',
                ]"
                type="text"
              />
            </div>

            <div class="flex gap-2">
              <!-- 수정 모드 -->
              <template v-if="isEdit">
                <button
                  @click="handleDelete"
                  class="flex-1 text-center lg:text-lg text-[11px] lg:py-2 py-1 rounded-lg"
                  :class="[
                    userStore.mode === 'lucky'
                      ? 'bg-red-100 border border-red-300 text-red-400 hover:bg-red-200/80 transition duration-75'
                      : 'bg-red-400/80 border border-red-500 text-red-100 hover:bg-red-500/90 transition duration-75',
                  ]"
                >
                  삭제
                </button>

                <button
                  @click="handleSubmit"
                  :disabled="!isValid"
                  class="flex-1 text-center lg:text-lg text-[11px] lg:py-2 py-1 rounded-lg"
                  :class="[
                    !isValid ? 'opacity-40 cursor-not-allowed' : '',
                    userStore.mode === 'lucky'
                      ? 'bg-[#84cc16]/60 border border-[#84cc16] text-white hover:bg-[#84cc16]/70 transition duration-75'
                      : 'bg-[#c29bff] border border-[#826da2] text-[#433b4e] hover:bg-[#ac78ff] transition duration-75',
                  ]"
                >
                  저장
                </button>
              </template>

              <!-- 추가 모드 -->
              <button
                v-else
                @click="handleSubmit"
                :disabled="!isValid"
                class="w-full text-center lg:text-lg text-[11px] lg:py-2 py-1 rounded-lg"
                :class="[
                  !isValid ? 'opacity-40 cursor-not-allowed' : '',
                  userStore.mode === 'lucky'
                    ? 'bg-[#84cc16]/70 border border-[#84cc16] text-white'
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
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onUnmounted, computed, watch } from 'vue';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '@/services/api/list';

const amount = ref('');
const type = ref('expense');
const title = ref('');
const category = ref('');
const memo = ref('');

const selectedDate = ref(new Date().toISOString().slice(0, 10));
const dateInput = ref(null);

const isValid = computed(() => {
  return amount.value && title.value.trim() !== '' && category.value !== '';
});

const formattedDate = computed(() => {
  const date = new Date(selectedDate.value);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
});

const modalStore = useModalStore();
const userStore = useUserStore();

const isEdit = computed(() => modalStore.isEditMode);

const categoryOptions = computed(() => {
  if (type.value === 'income') {
    return ['월급', '용돈', '보너스'];
  } else {
    return ['식비', '카페/간식', '술/유흥', '교통', '쇼핑'];
  }
});

watch(
  () => modalStore.selectedTransaction,
  (tx) => {
    if (tx) {
      amount.value = tx.amount ? tx.amount.toLocaleString() : '';
      title.value = tx.title || '';
      category.value = tx.category || '';
      memo.value = tx.memo || '';
      type.value = tx.type || 'expense';
      selectedDate.value = tx.date || new Date().toISOString().slice(0, 10);
    } else {
      amount.value = '';
      title.value = '';
      category.value = '';
      memo.value = '';
      type.value = 'expense';
      selectedDate.value = new Date().toISOString().slice(0, 10);
    }
  },
  { immediate: true },
);

if (typeof document !== 'undefined') {
  document.body.style.overflow = 'hidden';
}

onUnmounted(() => {
  document.body.style.overflow = 'auto';
});

const formatAmount = (e) => {
  const value = e.target.value.replace(/[^0-9]/g, '');
  amount.value = value ? Number(value).toLocaleString() : '';
};

const clearAmount = () => {
  amount.value = '';
};

const openDatePicker = () => {
  if (dateInput.value?.showPicker) {
    dateInput.value.showPicker();
  } else {
    dateInput.value?.focus();
  }
};

const handleSubmit = async () => {
  if (!isValid.value) return;
  try {
    if (!userStore.user) {
      userStore.loadUserFromStorage();
    }

    const currentUserId = userStore.user?.id;
    if (!currentUserId) {
      console.error('로그인 사용자 정보가 없습니다.');
      return;
    }

    const newData = {
      userId: modalStore.selectedTransaction?.userId || currentUserId,
      date: selectedDate.value,
      type: type.value,
      title: title.value,
      category: category.value,
      amount: Number(amount.value.replace(/,/g, '')),
      memo: memo.value,
      reflection: '',
    };

    if (isEdit.value && modalStore.selectedTransaction?.id) {
      await updateTransaction(modalStore.selectedTransaction.id, newData);
    } else {
      await createTransaction(newData);
    }

    modalStore.closeAddModal();
    window.dispatchEvent(new Event('transactionAdded'));
  } catch (e) {
    console.error('거래 내역 저장 실패:', e);
  }
};

const handleDelete = async () => {
  try {
    if (!modalStore.selectedTransaction?.id) return;

    await deleteTransaction(modalStore.selectedTransaction.id);

    modalStore.closeAddModal();
    window.dispatchEvent(new Event('transactionAdded'));
  } catch (e) {
    console.error('삭제 실패:', e);
  }
};
</script>

<style>
.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
</style>
