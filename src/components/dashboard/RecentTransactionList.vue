<template>
  <div
    class="w-full rounded-[20px] border p-3 transition-colors sm:rounded-3xl sm:p-5"
    :class="
      isUnlucky ? 'border-white/30 bg-white/10' : 'border-neutral-400 bg-white'
    "
  >
    <!-- 로딩 -->
    <div v-if="isLoading" class="flex justify-center items-center py-16">
      <span class="text-sm text-neutral-400 animate-pulse">불러오는 중...</span>
    </div>

    <!-- 에러 -->
    <div v-else-if="error" class="py-12 text-center">
      <p class="text-sm text-red-400 mb-3">{{ error }}</p>
      <button
        class="text-xs text-neutral-500 underline underline-offset-2"
        @click="fetchAll"
      >
        다시 시도
      </button>
    </div>

    <!-- 빈 상태 -->
    <p
      v-else-if="groupedTransactions.length === 0"
      class="py-12 text-center text-sm text-neutral-400"
    >
      거래 내역이 없습니다.
    </p>

    <!-- 리스트 -->
    <template v-else>
      <template v-for="group in groupedTransactions" :key="group.date">
        <div class="flex items-center gap-2.5 px-4 pt-1 pb-2">
          <span
            class="shrink-0 text-[13px] font-semibold tracking-tight"
            :class="isUnlucky ? 'text-white/60' : 'text-neutral-500'"
          >
            {{ group.label }}
          </span>
          <hr
            class="flex-1 border-t"
            :class="isUnlucky ? 'border-white/20' : 'border-neutral-300'"
          />
        </div>

        <div
          v-for="tx in group.items"
          :key="tx.id"
          class="flex items-center justify-between px-4 py-3.5"
          :class="isUnlucky ? 'border-white/10' : 'border-neutral-100'"
        >
          <div class="flex items-center gap-3 min-w-0">
            <span class="text-xl w-7 text-center shrink-0">{{
              categoryIcon(tx.category)
            }}</span>
            <div class="flex flex-col gap-0.5 min-w-0">
              <span
                class="text-[15px] font-semibold tracking-tight truncate"
                :class="isUnlucky ? 'text-white' : 'text-neutral-900'"
              >
                {{ tx.title }}
              </span>
              <span
                class="text-xs tracking-tight"
                :class="isUnlucky ? 'text-white/60' : 'text-neutral-400'"
              >
                {{ tx.category }}
              </span>
            </div>
          </div>

          <span
            class="shrink-0 ml-4 text-[15px] font-bold tracking-tight"
            :class="
              tx.type === 'income'
                ? isUnlucky
                  ? 'text-green-300'
                  : 'text-green-500/80'
                : isUnlucky
                  ? 'text-red-400'
                  : 'text-red-500/80'
            "
          >
            {{ formatAmount(tx.amount, tx.type) }}
          </span>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchTransactionData } from '@/services/api/list';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isLucky } = storeToRefs(userStore);
const isUnlucky = computed(() => !isLucky.value);

const props = defineProps({
  currencyUnit: { type: String, default: '원' },
  exchangeRate: { type: Number, default: 1 },
  activeFilter: { type: Object, default: null },
});

const TEMP_USER_ID = 'u-1'; // TODO: localStorage로 교체

// ── 데이터 fetch ──────────────────────────────────
const transactions = ref([]);
const categoryIconMap = ref({});
const isLoading = ref(false);
const error = ref(null);

async function fetchAll() {
  isLoading.value = true;
  error.value = null;
  try {
    const { transactions: txData, categoryIconMap: iconMap } =
      await fetchTransactionData(TEMP_USER_ID);
    transactions.value = txData;
    categoryIconMap.value = iconMap;
  } catch (e) {
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchAll);

// ── 날짜 유틸 ─────────────────────────────────────
const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

function parseDateLabel(dateStr) {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  const [y, m, d] = dateStr.split('-').map(Number);
  const target = new Date(y, m - 1, d);
  const diff = Math.round((t - target) / 86400000);
  const dayName = DAY_NAMES[target.getDay()];
  if (diff === 0) return `${d}일 오늘`;
  if (diff === 1) return `${d}일 어제`;
  return `${d}일 ${dayName}요일`;
}

// ── 필터링 + 그룹핑 ───────────────────────────────
const groupedTransactions = computed(() => {
  const filtered = props.activeFilter
    ? transactions.value.filter(
        (tx) =>
          tx.date >= props.activeFilter.start &&
          tx.date <= props.activeFilter.end,
      )
    : transactions.value;

  const map = new Map();
  [...filtered]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((tx) => {
      if (!map.has(tx.date)) map.set(tx.date, []);
      map.get(tx.date).push(tx);
    });

  return [...map.entries()].map(([date, items]) => ({
    date,
    label: parseDateLabel(date),
    items,
  }));
});

// ── 금액 포맷 ─────────────────────────────────────
function formatAmount(amount, type) {
  const converted =
    props.exchangeRate !== 1 ? Math.round(amount / props.exchangeRate) : amount;
  const formatted = converted.toLocaleString('ko-KR');
  const sign = type === 'expense' ? '-' : '+';
  return props.currencyUnit === '원'
    ? `${sign}${formatted}원`
    : `${sign}${formatted} ${props.currencyUnit}`;
}

function categoryIcon(name) {
  return categoryIconMap.value[name] ?? '📌';
}
</script>
