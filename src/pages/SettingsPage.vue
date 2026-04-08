<template>
  <div class="flex flex-col gap-10">
    <BaseCard>
      <div class="font-bold text-4xl">내 정보</div>

      <div class="flex flex-col gap-7">
        <BaseInput
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일"
          v-model="email"
          :disabled="true"
        />
        <BaseInput
          id="name"
          label="닉네임"
          type="text"
          placeholder="닉네임"
          v-model="name"
          :disabled="false"
        />
      </div>

      <BaseButton text="닉네임 변경" @click="handleUpdateNickname" />
    </BaseCard>

    <BaseCard>
      <div class="font-bold text-4xl">비밀번호 변경</div>

      <div class="flex flex-col gap-7">
        <BaseInput
          id="current-password"
          label="현재 비밀번호"
          type="password"
          placeholder="현재 비밀번호를 입력하세요"
          v-model="currentPassword"
        />

        <BaseInput
          id="new-password"
          label="새 비밀번호"
          type="password"
          placeholder="새 비밀번호를 입력하세요(최소 8자)"
          v-model="newPassword"
        />

        <BaseInput
          id="new-password-confirm"
          label="새 비밀번호 확인"
          type="password"
          placeholder="새 비밀번호를 다시 입력하세요"
          v-model="newPasswordConfirm"
        />
      </div>

      <BaseButton text="비밀번호 변경" @click="handleUpdatePassword" />
    </BaseCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseInput from '@/components/common/BaseInput.vue';

const email = ref('demo@blackpink.com');
const name = ref('jenni');
const currentPassword = ref('');
const newPassword = ref('');
const newPasswordConfirm = ref('');

const handleUpdateNickname = () => {
  console.log('닉네임 변경');
};

const handleUpdatePassword = () => {
  console.log('비밀번호 변경');
};
</script>

<style scoped></style>
