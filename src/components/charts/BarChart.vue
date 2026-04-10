<template>
  <div
    class="border border-solid border-app rounded-2xl p-6 bg-box shadow-sm text-app"
  >
    <div class="text-center text-lg font-semibold mb-4">기간별 지출 추이</div>

    <div class="flex justify-start mb-6 gap-3 p-1">
      <button
        v-for="v in ['월별', '주별', '일별']"
        :key="v"
        @click="$emit('update:view', v)"
        class="px-3 py-1 text-xs border border-solid border-app rounded-md transition-all"
        :class="
          view === v /* props.view와 비교 */
            ? 'bg-primary text-white font-bold'
            : mode === 'lucky'
              ? 'text-app-soft hover:bg-black/5'
              : 'text-white bg-white/10 hover:bg-black/5'
        "
      >
        {{ v }}
      </button>
    </div>

    <div class="h-64">
      <Bar :data="chartData" :options="options" />
    </div>
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs';

const props = defineProps({
  chartData: Object,
  options: Object,
  view: String,
  mode: String,
});

defineEmits(['update:view']);
</script>
