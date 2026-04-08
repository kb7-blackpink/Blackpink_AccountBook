import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const mode = ref('lucky'); // 'lucky' | 'unlucky'

  const isLucky = computed(() => mode.value === 'lucky');

  async function fetchUserMode() {
    try {
      const res = await fetch('http://localhost:3000/users'); // 예시로 user
      const users = await res.json();

      if (users.length > 0) {
        mode.value = users[0].currentMode; // 첫 번째 유저의 모드 사용
      }
    } catch (error) {
      console.error('유저 모드 불러오기 실패:', error);
    }
  }

  function setMode(m) {
    mode.value = m;
  }

  return { mode, isLucky, setMode, fetchUserMode };
});
