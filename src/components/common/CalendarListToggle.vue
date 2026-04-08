<template>
  <div
    class="flex items-center justify-between w-full pb-4 mb-4 border-gray-200"
  >
    <div
      class="flex items-center p-1 space-x-1 rounded-lg"
      :class="isLucky ? 'bg-[#F3F3F4]' : 'bg-[#5E5B9B]'"
    >
      <button
        @click="setView('list')"
        :class="[
          'flex items-center px-3 py-1.5 text-sm font-bold rounded-md transition-all duration-200',
          currentView === 'list'
            ? isLucky
              ? 'bg-[#C0E068] text-white shadow-sm'
              : 'bg-violet-600 text-white shadow-sm'
            : isLucky
              ? 'bg-transparent text-gray-300 hover:text-[#9ab553] hover:bg-gray-200'
              : 'bg-transparent text-gray-400 hover:text-violet-500 hover:bg-gray-200',
        ]"
      >
        <svg
          class="w-4 h-4 mr-1.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
        목록
      </button>

      <button
        @click="setView('calendar')"
        :class="[
          'flex items-center px-3 py-1.5 text-sm font-bold rounded-md transition-all duration-200',
          currentView === 'calendar'
            ? isLucky
              ? 'bg-[#C0E068] text-white shadow-sm'
              : 'bg-violet-600 text-white shadow-sm'
            : isLucky
              ? 'text-gray-400 hover:text-[#9ab553] hover:bg-gray-200'
              : 'text-gray-400 hover:text-violet-500 hover:bg-gray-200',
        ]"
      >
        <svg
          class="w-4 h-4 mr-1.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        달력
      </button>
    </div>

    <button
      @click="$emit('click-filter')"
      class="flex items-center px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <svg
        class="w-4 h-4 mr-1.5 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
      필터
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isLucky } = storeToRefs(userStore);

// 부모 컴포넌트에서 v-model로 뷰 상태를 양방향 바인딩 할 수 있도록 설정
const props = defineProps({
  modelValue: {
    type: String,
    default: 'calendar', // 기본값: 달력 뷰 ('list' 또는 'calendar')
    validator: (value) => ['list', 'calendar'].includes(value),
  },
});

const emit = defineEmits(['update:modelValue', 'click-filter']);

// 현재 뷰 상태 관리
const currentView = ref(props.modelValue);

// 뷰 변경 함수
const setView = (view) => {
  if (currentView.value === view) return;
  currentView.value = view;
  emit('update:modelValue', view);
};

// 부모 컴포넌트에서 modelValue가 변경되었을 때 동기화
watch(
  () => props.modelValue,
  (newValue) => {
    currentView.value = newValue;
  },
);
</script>
