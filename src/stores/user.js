import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const mode = ref('lucky');

  const isLucky = computed(() => mode.value === 'lucky');
  const isLogin = computed(() => !!user.value);

  function setUser(loginUser) {
    user.value = loginUser;
    mode.value = loginUser?.currentMode || 'lucky';
  }

  function setMode(newMode) {
    mode.value = newMode;
  }

  function loadUserFromStorage() {
    const savedUser = localStorage.getItem('loginUser');

    if (!savedUser) return;

    const parsedUser = JSON.parse(savedUser);
    user.value = parsedUser;
    mode.value = parsedUser.currentMode || 'lucky';
  }

  function logout() {
    user.value = null;
    mode.value = 'lucky';
    localStorage.removeItem('loginUser');
  }

  return {
    user,
    mode,
    isLucky,
    isLogin,
    setUser,
    setMode,
    loadUserFromStorage,
    logout,
  };
});
