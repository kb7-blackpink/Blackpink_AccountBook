import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export default useUserStore = defineStore('user', () => {
  const user = ref(null);

  const currentMode = computed(() => user.value?.currentMode || 'lucky');
  const monthlyBudget = computed(() => user.value?.monthlyBudget || 0);

  async function fetchUser() {
    const res = await fetch('http://localhost:3000/users/1');
    user.value = res.json();
  }

  function setMode(mode) {
    user.value.currentMode = mode;
  }

  return {
    user,
    currentMode,
    monthlyBudget,
    fetchUser,
    setMode,
  };
});
