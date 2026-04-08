import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const mode = ref('lucky');

  const isLucky = computed(() => mode.value === 'lucky');

  function setMode(m) {
    mode.value = m;
  }

  return { mode, isLucky, setMode };
});
