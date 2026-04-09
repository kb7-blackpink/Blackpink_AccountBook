import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const isAddModalOpen = ref(false);

  const openAddModal = () => {
    isAddModalOpen.value = true;
  };
  const closeAddModal = () => {
    isAddModalOpen.value = false;
  };

  return {
    isAddModalOpen,
    openAddModal,
    closeAddModal,
  };
});
