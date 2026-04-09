import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { updateModeApi } from '@/services/api/userApi';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const mode = ref('lucky');
  const isModeLoading = ref(false);

  const isLucky = computed(() => mode.value === 'lucky');
  const isLogin = computed(() => !!user.value);

  function setUser(loginUser) {
    user.value = loginUser;
    mode.value = loginUser?.currentMode || 'lucky';

    if (loginUser) {
      localStorage.setItem('loginUser', JSON.stringify(loginUser));
    }
  }

  function loadUserFromStorage() {
    const savedUser = localStorage.getItem('loginUser');

    if (!savedUser) return;

    const parsedUser = JSON.parse(savedUser);
    user.value = parsedUser;
    mode.value = parsedUser.currentMode || 'lucky';
  }

  async function changeMode(newMode) {
    if (!user.value) return;
    if (mode.value === newMode) return;

    try {
      isModeLoading.value = true;

      const updatedUser = await updateModeApi(user.value.id, newMode);

      user.value = updatedUser;
      mode.value = updatedUser.currentMode || 'lucky';
      localStorage.setItem('loginUser', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('모드 변경 실패:', error);
      throw error;
    } finally {
      isModeLoading.value = false;
    }
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
    isModeLoading,
    setUser,
    loadUserFromStorage,
    changeMode,
    logout,
  };
});
