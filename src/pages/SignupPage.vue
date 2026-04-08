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
            :disabled="false"
            autocomplete="nickname"
          />

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
            autocomplete="new-password"
          />
        </div>

        <BaseButton
          text="가입하기"
          type="submit"
          :disabled="!name || !email || !password"
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
import { RouterLink } from 'vue-router';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseInput from '@/components/common/BaseInput.vue';

const name = ref('');
const email = ref('');
const password = ref('');

const handleSignup = () => {
  console.log({
    name: name.value,
    email: email.value,
    password: password.value,
  });

  // 회원가입 API 호출
};
</script>

<style scoped></style>
