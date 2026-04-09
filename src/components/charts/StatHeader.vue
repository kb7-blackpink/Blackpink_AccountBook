<template>
  <div class="flex items-center justify-center mb-6">
    <!-- home 페이지로 이동 -->
    <RouterLink to="/home" class="p-2 transition-transform active:scale-90 hidden">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    </RouterLink>

    <div class="flex items-center justify-center gap-4 text-xl font-bold">
      <!-- 월 변경 버튼 -->
      <button @click="$emit('change', -1)" class="p-2 hover:opacity-70">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <span class="min-w-30 text-center">{{ year }}년 {{ month }}월</span>
      <!--  -->
      <button @click="$emit('change', 1)" class="p-2 hover:opacity-70">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['year', 'month']);
defineEmits(['change']);
</script>