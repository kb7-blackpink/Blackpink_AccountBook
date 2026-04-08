<template>
  <div>
    <div class="font-bold text-4xl">로그인</div>
    <BaseCard>
      <div class="flex flex-col gap-7">
        <BaseInput
          id="id"
          label="아이디"
          type="text"
          placeholder="아이디"
          v-model="id"
          :disabled="false"
        />
        <BaseInput
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호"
          v-model="password"
          :disabled="false"
        />
      </div>

      <BaseButton text="로그인" />

      <p class="text-xl text-center text-gray-500 text-sm">
        계정이 필요하신가요?
        <RouterLink
          to="/signup"
          class="text-xl ml-1 text-[#C0E068] underline hover:text-[#b3d45f]"
        >
          가입하기
        </RouterLink>
      </p>
    </BaseCard>
  </div>
</template>

<script setup>
import BaseButton from '@/components/common/BaseButton.vue';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseInput from '@/components/common/BaseInput.vue';
</script>

<style scoped></style>
