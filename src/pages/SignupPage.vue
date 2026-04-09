<template>
  <div class="flex w-full flex-col items-center justify-center gap-10">
    <h1 class="text-4xl font-bold">회원가입</h1>

    <BaseCard>
      <form class="flex flex-col gap-7" @submit.prevent="handleSignup">
        <div class="flex flex-col gap-7">
          <BaseInput
            id="name"
            v-model="name"
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해주세요"
            :disabled="isLoading"
            autocomplete="nickname"
          />

          <BaseInput
            id="email"
            v-model="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            :disabled="isLoading"
            autocomplete="email"
          />

          <BaseInput
            id="password"
            v-model="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            :disabled="isLoading"
            autocomplete="new-password"
          />
        </div>

        <p v-if="errorMessage" class="text-sm text-red-500">
          {{ errorMessage }}
        </p>

        <BaseButton
          text="가입하기"
          type="submit"
          :disabled="!name || !email || !password || isLoading"
        />

        <p class="text-center text-md text-gray-500">
          이미 계정이 있나요?
          <RouterLink
            to="/login"
            class="ml-1 text-md text-[#C0E068] underline hover:text-[#b3d45f]"
          >
            로그인하기
          </RouterLink>
        </p>
      </form>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseInput from '@/components/common/BaseInput.vue';
import { signupApi } from '@/services/api/userApi';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const handleSignup = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    const user = await signupApi({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    localStorage.setItem('loginUser', JSON.stringify(user));
    userStore.setUser(user);

    router.push('/');
  } catch (error) {
    errorMessage.value = error.message || '회원가입 중 문제가 발생했습니다.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
