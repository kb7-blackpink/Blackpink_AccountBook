import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const isAddModalOpen = ref(false);
  const isEditMode = ref(false);
  const selectedTransaction = ref(null);

  const openAddModal = () => {
    isEditMode.value = false;
    selectedTransaction.value = null;
    isAddModalOpen.value = true;
  };

  const openEditModal = (tx) => {
    isEditMode.value = true;
    selectedTransaction.value = tx;
    isAddModalOpen.value = true;
  };

  const closeAddModal = () => {
    isAddModalOpen.value = false;
  };

  return {
    isAddModalOpen,
    isEditMode,
    selectedTransaction,
    openAddModal,
    openEditModal,
    closeAddModal,
  };
});
