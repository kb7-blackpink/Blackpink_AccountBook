<template>
  <header
    class="relative z-[100] flex h-[60px] items-center justify-between px-6 transition-colors duration-300 drop-shadow md:px-15"
    :class="
      isLucky ? 'bg-app border-b border-app' : 'bg-header border-b border-app'
    "
  >
    <RouterLink
      to="/home"
      class="flex items-center gap-1.5 text-xl font-medium font-serif tracking-tight transition-colors duration-300 cursor-pointer hover:opacity-80 active:opacity-70"
      :class="isLucky ? 'text-[#365A00]' : 'text-[#AF5AD5]'"
      style="font-family: 'OkMallangB'"
    >
      {{ isLucky ? 'Lucky Bank' : 'Unlucky Bank' }}
      <span class="text-lg">{{ isLucky ? '🍀' : '😈' }}</span>
    </RouterLink>

    <!-- 데스크탑 -->
    <div class="hidden items-center gap-3 md:flex">
      <div
        v-if="!isAuthPage"
        class="flex items-center gap-0.5 rounded-full p-1"
        :class="isLucky ? 'bg-gray-100' : 'bg-[#5E5B9B]'"
      >
        <button
          @click="handleModeChange('lucky')"
          :disabled="isModeLoading"
          class="rounded-full px-5 py-1.5 text-[13px] font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
          :class="
            isLucky
              ? 'bg-brand text-white shadow-sm'
              : 'bg-transparent text-gray-300'
          "
        >
          Lucky
        </button>
        <button
          @click="handleModeChange('unlucky')"
          :disabled="isModeLoading"
          class="rounded-full px-5 py-1.5 text-[13px] font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
          :class="
            !isLucky
              ? 'bg-primary text-white shadow-sm'
              : 'bg-transparent text-gray-400'
          "
        >
          Unlucky
        </button>
      </div>

      <div v-if="!isAuthPage" ref="menuRef" class="relative">
        <button
          @click="isOpen = !isOpen"
          class="ml-0 mr-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold transition-colors duration-200 md:ml-7 md:mr-7"
          :class="
            isLucky
              ? 'text-app hover:bg-gray-100'
              : 'text-app hover:bg-white/10'
          "
        >
          {{ user?.name }} 님
          <span
            class="text-[10px] transition-transform duration-200"
            :class="[
              isLucky ? 'text-gray-400' : 'text-purple-300',
              { 'rotate-180': isOpen },
            ]"
            >▼</span
          >
        </button>

        <Transition name="dropdown">
          <div
            v-if="isOpen"
            class="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[180px] rounded-xl py-1.5"
            :class="
              isLucky
                ? 'bg-app border border-app shadow-md'
                : 'bg-header border border-app shadow-lg'
            "
          >
            <button
              @click="goToProfile"
              class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors"
              :class="
                isLucky
                  ? 'text-app hover:bg-gray-50'
                  : 'text-app hover:bg-white/[0.08]'
              "
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
              >
                <path
                  d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
              profile settings
            </button>
            <div class="border-app my-1 h-px border-t" />
            <button
              @click="handleLogout"
              class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors"
              :class="
                isLucky
                  ? 'text-red-500 hover:bg-red-50'
                  : 'text-red-400 hover:bg-red-500/10'
              "
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
              >
                <path d="m16 17 5-5-5-5" />
                <path d="M21 12H9" />
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              </svg>
              Logout
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <!-- 모바일 햄버거 -->
    <button
      v-if="!isAuthPage"
      class="flex flex-col gap-1.5 rounded-lg p-2 transition-colors md:hidden"
      :class="isLucky ? 'hover:bg-gray-100' : 'hover:bg-white/10'"
      @click="isMobileOpen = !isMobileOpen"
    >
      <span
        class="block h-0.5 w-5 origin-center rounded transition-all duration-300"
        :class="[
          isLucky ? 'bg-gray-700' : 'bg-white',
          isMobileOpen ? 'translate-y-2 rotate-45' : '',
        ]"
      />
      <span
        class="block h-0.5 w-5 rounded transition-all duration-300"
        :class="[
          isLucky ? 'bg-gray-700' : 'bg-white',
          isMobileOpen ? 'opacity-0' : '',
        ]"
      />
      <span
        class="block h-0.5 w-5 origin-center rounded transition-all duration-300"
        :class="[
          isLucky ? 'bg-gray-700' : 'bg-white',
          isMobileOpen ? '-translate-y-2 -rotate-45' : '',
        ]"
      />
    </button>

    <!-- 모바일 드로어 -->
    <Transition name="drawer">
      <div
        v-if="isMobileOpen"
        class="absolute left-0 right-0 top-[60px] z-50 flex flex-col gap-3 px-4 py-4 md:hidden"
        :class="
          isLucky
            ? 'bg-app border-b border-app shadow-md'
            : 'bg-header border-b border-app shadow-lg'
        "
      >
        <div
          v-if="!isAuthPage"
          class="flex w-full items-center gap-0.5 rounded-full p-1"
          :class="isLucky ? 'bg-gray-100' : 'bg-[#5E5B9B]'"
        >
          <button
            @click="handleModeChange('lucky')"
            :disabled="isModeLoading"
            class="flex-1 rounded-full py-1.5 text-[13px] font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
            :class="
              isLucky
                ? 'bg-brand text-white shadow-sm'
                : 'bg-transparent text-gray-300'
            "
          >
            Lucky
          </button>
          <button
            @click="handleModeChange('unlucky')"
            :disabled="isModeLoading"
            class="flex-1 rounded-full py-1.5 text-[13px] font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
            :class="
              !isLucky
                ? 'bg-primary text-white shadow-sm'
                : 'bg-transparent text-gray-400'
            "
          >
            Unlucky
          </button>
        </div>

        <template v-if="!isAuthPage">
          <div class="border-app h-px border-t" />

          <p class="text-app px-1 text-sm font-bold">{{ user?.name }} 님</p>

          <button
            @click="goToProfile"
            class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors"
            :class="
              isLucky
                ? 'text-app hover:bg-gray-50'
                : 'text-app hover:bg-white/[0.08]'
            "
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
            >
              <path
                d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
            profile settings
          </button>

          <button
            @click="handleLogout"
            class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors"
            :class="
              isLucky
                ? 'text-red-500 hover:bg-red-50'
                : 'text-red-400 hover:bg-red-500/10'
            "
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
            >
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            </svg>
            Logout
          </button>
        </template>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isLucky, isModeLoading, user } = storeToRefs(userStore);
const { changeMode, logout } = userStore;

const route = useRoute();
const router = useRouter();

const isOpen = ref(false);
const isMobileOpen = ref(false);
const menuRef = ref(null);

const isAuthPage = computed(() => {
  return ['login', 'signup'].includes(route.name);
});

function handleClickOutside(e) {
  if (menuRef.value && !menuRef.value.contains(e.target)) {
    isOpen.value = false;
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));

async function handleModeChange(newMode) {
  try {
    await changeMode(newMode);
  } catch (error) {
    console.error(error);
    alert('모드 변경에 실패했습니다.');
  }
}

function goToProfile() {
  isOpen.value = false;
  isMobileOpen.value = false;
  router.push('/settings');
}

function handleLogout() {
  isOpen.value = false;
  isMobileOpen.value = false;
  logout();
  router.replace('/login');
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s,
    transform 0.15s;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.drawer-enter-active,
.drawer-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
