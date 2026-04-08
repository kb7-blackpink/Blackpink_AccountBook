<template>
  <div class="flex w-full flex-col items-center justify-center gap-10">
    <h1 class="text-4xl font-bold">로그인</h1>

    <BaseCard>
      <form class="flex flex-col gap-7" @submit.prevent="handleLogin">
        <div class="flex flex-col gap-7">
          <BaseInput
            id="email"
            v-model="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            :disabled="false"
            autocomplete="email"
          />

          <BaseInput
            id="password"
            v-model="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            :disabled="false"
            autocomplete="current-password"
          />
        </div>

        <BaseButton
          text="로그인"
          type="submit"
          :disabled="!email || !password"
        />

        <p class="text-center text-md text-gray-500">
          계정이 필요하신가요?
          <RouterLink
            to="/signup"
            class="ml-1 text-md text-[#C0E068] underline hover:text-[#b3d45f]"
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
import { RouterLink } from 'vue-router';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseInput from '@/components/common/BaseInput.vue';

const email = ref('');
const password = ref('');

const handleLogin = () => {
  console.log({
    email: email.value,
    password: password.value,
  });

  // 로그인 API 호출
};
</script>

<style scoped></style>
