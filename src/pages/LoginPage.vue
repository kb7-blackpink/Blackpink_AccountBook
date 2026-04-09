<template>
  <div
    class="flex min-h-[calc(100dvh-60px-24px)] w-full flex-col items-center justify-center gap-3 lg:gap-6 px-3 lg:py-3.5 lg:px-6"
  >
    <h1 class="text-2xl font-bold lg:text-3xl">로그인</h1>

    <BaseCard>
      <form class="flex flex-col gap-7" @submit.prevent="handleLogin">
        <div class="flex flex-col gap-7">
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
            autocomplete="current-password"
          />
        </div>

        <p v-if="errorMessage" class="text-sm text-delete">
          {{ errorMessage }}
        </p>

        <BaseButton
          text="로그인"
          type="submit"
          :disabled="!email || !password || isLoading"
        />

        <p class="text-center text-sm lg:text-base text-secondary">
          계정이 필요하신가요?
          <RouterLink
            to="/signup"
            class="ml-1 text-sm lg:text-base text-primary underline hover:opacity-90 active:opacity-80"
          >
            가입하기
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
import { loginApi } from '@/services/api/userApi';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    const user = await loginApi({
      email: email.value,
      password: password.value,
    });

    localStorage.setItem('loginUser', JSON.stringify(user));
    userStore.setUser(user);

    router.push('/home');
  } catch (error) {
    errorMessage.value = error.message || '로그인 중 문제가 발생했습니다.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
