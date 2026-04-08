<template>
  <header
    class="flex items-center justify-between px-15 h-[60px] bg-white border-b border-gray-100 drop-shadow"
  >
    <div
      class="flex items-center ml-0 lg:ml-10 text-xl font-medium text-[#365A00]"
      style="font-family: 'OkMallangB'"
    >
      Lucky Bank
      <span class="text-lg">🍀</span>
    </div>
    <div class="relative" ref="menuRef">
      <button
        @click="isOpen = !isOpen"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-800 hover:bg-gray-100 transition-colors"
      >
        {{ nickname }} 님
        <span
          class="text-[10px] text-gray-400 transition-transfrom duration-200"
          :class="{ 'rotate-180': isOpen }"
          >▼</span
        >
      </button>
    </div>

    <!-- 드롭다운 -->
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute right-7 top-[calc(100%)] bg-white border border-gray-100 rounded-xl py-1.5 min-w-[180px] shadow-md z-50"
      >
        <button
          @click="goToProfile"
          class="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-settings-icon lucide-settings"
          >
            <path
              d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>

          profile settings
        </button>

        <div class="h-px bg-gray-100 my-1" />

        <button
          @click="logout"
          class="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-log-out-icon lucide-log-out"
          >
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          </svg>
          Logout
        </button>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, defineProps, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isOpen = ref(false);

const menuRef = ref(null);
function handleClickOutside(e) {
  // 바깥 클릭 시 드롭다운 닫힘.
  if (menuRef.value && !menuRef.value.contains(e.target)) {
    isOpen.value = false;
  }
}

// props로 로그인 유저의 nickname 받음.
const props = defineProps({
  nickname: {
    type: String,
    default: 'black_pink',
  },
});

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));

// 설정으로 이동
function goToProfile() {
  isOpen.value = false;
  //   router.push('')
}

// 로그아웃(로그인으로 이동)
function logout() {
  authStore.logout();
  //   router.replace('/login')  // 뒤로가기로 돌아오지 못하게
}
</script>

<style scoped></style>
