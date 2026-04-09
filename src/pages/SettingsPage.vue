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

        <BaseButton text="닉네임 변경" @click="handleUpdateNickname" />
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
          text="비밀번호 변경"
          type="submit"
          :disabled="!currentPassword || !newPassword || !newPasswordConfirm"
        />
      </form>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseInput from '@/components/common/BaseInput.vue';
import { useUserStore } from '@/stores/user';
import { updateUserApi } from '@/services/api/userApi';

const userStore = useUserStore();

const email = ref('');
const name = ref('');

const currentPassword = ref('');
const newPassword = ref('');
const newPasswordConfirm = ref('');
const passwordError = ref('');

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

    // store 업데이트
    userStore.setUser(updatedUser);

    // localStorage도 업데이트
    localStorage.setItem('loginUser', JSON.stringify(updatedUser));

    alert('닉네임 변경 완료!');
  } catch (error) {
    console.error(error);
    alert('닉네임 변경 실패');
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
    const updatedUser = await updateUserApi(userStore.user.id, {
      password: newPassword.value,
    });

    userStore.setUser(updatedUser);
    localStorage.setItem('loginUser', JSON.stringify(updatedUser));

    alert('비밀번호 변경 완료!');

    currentPassword.value = '';
    newPassword.value = '';
    newPasswordConfirm.value = '';
  } catch (error) {
    console.error(error);
    alert('비밀번호 변경 실패');
  }
};
</script>

<style scoped></style>
