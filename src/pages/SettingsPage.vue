<template>
  <div
    class="flex w-full flex-col items-center justify-center gap-3 lg:gap-6 px-3 lg:py-3.5 lg:px-6"
  >
    <BaseCard>
      <div class="flex flex-col gap-6">
        <h1 class="text-lg font-bold lg:text-3xl">내 정보</h1>

        <div class="flex flex-col gap-3 lg:gap-6">
          <BaseInput
            id="email"
            v-model="email"
            label="이메일"
            type="email"
            placeholder="이메일"
            :disabled="true"
            autocomplete="email"
          />

          <BaseInput
            id="name"
            v-model="name"
            label="닉네임"
            type="text"
            placeholder="닉네임"
            :disabled="false"
            autocomplete="nickname"
          />
        </div>

        <BaseButton text="변경" @click="handleUpdateNickname" />
      </div>
    </BaseCard>

    <BaseCard>
      <form class="flex flex-col gap-6" @submit.prevent="handleUpdatePassword">
        <h2 class="text-lg font-bold lg:text-3xl">비밀번호 변경</h2>

        <div class="flex flex-col gap-3 lg:gap-6">
          <BaseInput
            id="current-password"
            v-model="currentPassword"
            label="현재 비밀번호"
            type="password"
            placeholder="현재 비밀번호를 입력하세요"
            autocomplete="current-password"
          />

          <BaseInput
            id="new-password"
            v-model="newPassword"
            label="새 비밀번호"
            type="password"
            placeholder="새 비밀번호를 입력하세요(최소 8자)"
            autocomplete="new-password"
          />

          <div>
            <BaseInput
              id="new-password-confirm"
              v-model="newPasswordConfirm"
              label="새 비밀번호 확인"
              type="password"
              placeholder="새 비밀번호를 다시 입력하세요"
              autocomplete="new-password"
            />

            <p v-if="passwordError" class="mt-1 ml-3 text-sm text-delete">
              {{ passwordError }}
            </p>
          </div>
        </div>

        <BaseButton
          text="변경"
          type="submit"
          :disabled="!currentPassword || !newPassword || !newPasswordConfirm"
        />
      </form>
    </BaseCard>
  </div>

  <ConfirmModal
    :open="isModalOpen"
    :message="modalMessage"
    variant="confirm"
    confirm-text="확인"
    @confirm="handleModalClose"
    @cancel="handleModalClose"
  />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseInput from '@/components/common/BaseInput.vue';
import ConfirmModal from '@/components/common/BaseModal.vue';
import { useUserStore } from '@/stores/user';
import { updateUserApi } from '@/services/api/userApi';

const userStore = useUserStore();
const router = useRouter();

const email = ref('');
const name = ref('');

const currentPassword = ref('');
const newPassword = ref('');
const newPasswordConfirm = ref('');
const passwordError = ref('');
const isPasswordChanged = ref(false);

const isModalOpen = ref(false);
const modalMessage = ref('');

watch([newPassword, newPasswordConfirm], () => {
  passwordError.value = '';
});

onMounted(() => {
  userStore.loadUserFromStorage();

  if (userStore.user) {
    email.value = userStore.user.email;
    name.value = userStore.user.name;
  }
});

const handleUpdateNickname = async () => {
  try {
    const updatedUser = await updateUserApi(userStore.user.id, {
      name: name.value,
    });

    userStore.setUser(updatedUser);

    isPasswordChanged.value = false;
    modalMessage.value = '닉네임이 변경되었습니다.';
    isModalOpen.value = true;
  } catch (error) {
    isPasswordChanged.value = false;
    modalMessage.value = '닉네임 변경에 실패했습니다.';
    isModalOpen.value = true;
  }
};

const handleUpdatePassword = async () => {
  if (newPassword.value !== newPasswordConfirm.value) {
    passwordError.value = '새 비밀번호가 일치하지 않습니다.';
    return;
  }

  if (currentPassword.value !== userStore.user.password) {
    passwordError.value = '현재 비밀번호가 올바르지 않습니다.';
    return;
  }

  try {
    await updateUserApi(userStore.user.id, {
      password: newPassword.value,
    });

    isPasswordChanged.value = true;
    modalMessage.value =
      '비밀번호가 변경되었습니다.\n보안을 위해 다시 로그인해주세요.';
    isModalOpen.value = true;

    currentPassword.value = '';
    newPassword.value = '';
    newPasswordConfirm.value = '';
  } catch (error) {
    isPasswordChanged.value = false;
    modalMessage.value = '비밀번호 변경에 실패했습니다.';
    isModalOpen.value = true;
  }
};

const handleModalClose = () => {
  isModalOpen.value = false;

  if (isPasswordChanged.value) {
    userStore.logout();
    router.push('/login');
  }
};
</script>

<style scoped></style>
