<template>
  <header
    class="flex items-center justify-between px-6 md:px-15 h-[60px] transition-colors duration-300 drop-shadow"
    :class="
      isLucky
        ? 'bg-white border-b border-gray-100'
        : 'bg-[#3b1f6e] border-b border-[#5a3a9a]'
    "
  >
    <!-- 로고 -->
    <div
      class="flex items-center gap-1.5 text-xl font-medium font-serif tracking-tight transition-colors duration-300"
      :class="isLucky ? 'text-[#365A00]' : 'text-[#AF5AD5]'"
      style="font-family: 'OkMallangB'"
    >
      {{ isLucky ? 'Lucky Bank' : 'Unlucky Bank' }}
      <span class="text-lg">{{ isLucky ? '🍀' : '😈' }}</span>
    </div>

    <!-- 데스크탑: 토글 + 닉네임 -->
    <div class="hidden md:flex items-center gap-3">
      <!-- 토글 -->
      <div
        class="flex items-center rounded-full p-1 gap-0.5"
        :class="isLucky ? 'bg-gray-100' : 'bg-[#5E5B9B]'"
      >
        <button
          @click="setMode('lucky')"
          class="px-5 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200"
          :class="
            isLucky
              ? 'bg-[#C0E068] text-white shadow-sm'
              : 'bg-transparent text-gray-300'
          "
        >
          Lucky
        </button>
        <button
          @click="setMode('unlucky')"
          class="px-5 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200"
          :class="
            !isLucky
              ? 'bg-violet-600 text-white shadow-sm'
              : 'bg-transparent text-gray-400'
          "
        >
          Unlucky
        </button>
      </div>

      <!-- 닉네임 -->
      <div class="relative" ref="menuRef">
        <button
          @click="isOpen = !isOpen"
          class="flex items-center gap-1.5 px-3 py-1.5 mr-0 md:mr-7 ml-0 md:ml-7 rounded-lg text-sm font-bold transition-colors duration-200"
          :class="
            isLucky
              ? 'text-gray-800 hover:bg-gray-100'
              : 'text-white hover:bg-white/10'
          "
        >
          {{ nickname }} 님
          <span
            class="text-[10px] transition-transform duration-200"
            :class="[
              isLucky ? 'text-gray-400' : 'text-purple-300',
              { 'rotate-180': isOpen },
            ]"
            >▼</span
          >
        </button>

        <!-- 드롭다운메뉴 -->
        <Transition name="dropdown">
          <div
            v-if="isOpen"
            class="absolute right-0 top-[calc(100%+6px)] rounded-xl py-1.5 min-w-[180px] z-50"
            :class="
              isLucky
                ? 'bg-white border border-gray-100 shadow-md'
                : 'bg-[#2d1657] border border-[#5a3a9a] shadow-lg'
            "
          >
            <button
              @click="goToProfile"
              class="flex items-center gap-2.5 w-full px-3 py-2 text-sm rounded-lg transition-colors"
              :class="
                isLucky
                  ? 'text-gray-700 hover:bg-gray-50'
                  : 'text-white hover:bg-white/[0.08]'
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
            <div
              class="h-px my-1"
              :class="isLucky ? 'bg-gray-100' : 'bg-[#5a3a9a]'"
            />
            <button
              @click="logout"
              class="flex items-center gap-2.5 w-full px-3 py-2 text-sm rounded-lg transition-colors"
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

    <!-- 모바일: 햄버거 버튼 -->
    <button
      class="flex md:hidden flex-col gap-1.5 p-2 rounded-lg transition-colors"
      :class="isLucky ? 'hover:bg-gray-100' : 'hover:bg-white/10'"
      @click="isMobileOpen = !isMobileOpen"
    >
      <span
        class="block w-5 h-0.5 rounded transition-all duration-300 origin-center"
        :class="[
          isLucky ? 'bg-gray-700' : 'bg-white',
          isMobileOpen ? 'rotate-45 translate-y-2' : '',
        ]"
      />
      <span
        class="block w-5 h-0.5 rounded transition-all duration-300"
        :class="[
          isLucky ? 'bg-gray-700' : 'bg-white',
          isMobileOpen ? 'opacity-0' : '',
        ]"
      />
      <span
        class="block w-5 h-0.5 rounded transition-all duration-300 origin-center"
        :class="[
          isLucky ? 'bg-gray-700' : 'bg-white',
          isMobileOpen ? '-rotate-45 -translate-y-2' : '',
        ]"
      />
    </button>

    <!-- 모바일 드로어 -->
    <Transition name="drawer">
      <div
        v-if="isMobileOpen"
        class="md:hidden absolute top-[60px] left-0 right-0 z-50 px-4 py-4 flex flex-col gap-3"
        :class="
          isLucky
            ? 'bg-white border-b border-gray-100 shadow-md'
            : 'bg-[#3b1f6e] border-b border-[#5a3a9a] shadow-lg'
        "
      >
        <!-- 토글 -->
        <div
          class="flex items-center rounded-full p-1 gap-0.5 w-full"
          :class="isLucky ? 'bg-gray-100' : 'bg-[#5E5B9B]'"
        >
          <button
            @click="setMode('lucky')"
            class="flex-1 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200"
            :class="
              isLucky
                ? 'bg-[#C0E068] text-white shadow-sm'
                : 'bg-transparent text-gray-300'
            "
          >
            Lucky
          </button>
          <button
            @click="setMode('unlucky')"
            class="flex-1 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200"
            :class="
              !isLucky
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-transparent text-gray-400'
            "
          >
            Unlucky
          </button>
        </div>

        <div class="h-px" :class="isLucky ? 'bg-gray-100' : 'bg-[#5a3a9a]'" />

        <!-- 닉네임 -->
        <p
          class="text-sm font-bold px-1"
          :class="isLucky ? 'text-gray-800' : 'text-white'"
        >
          {{ nickname }} 님
        </p>

        <button
          @click="goToProfile"
          class="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors"
          :class="
            isLucky
              ? 'text-gray-700 hover:bg-gray-50'
              : 'text-white hover:bg-white/[0.08]'
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
          @click="logout"
          class="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors"
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
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isLucky } = storeToRefs(userStore);
const { setMode } = userStore;

const router = useRouter();
const isOpen = ref(false); // 데스크탑 드롭다운
const isMobileOpen = ref(false); // 모바일 드로어

const menuRef = ref(null);
function handleClickOutside(e) {
  if (menuRef.value && !menuRef.value.contains(e.target)) {
    isOpen.value = false;
  }
}

const props = defineProps({
  nickname: { type: String, default: 'black_pink' },
});

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));

function goToProfile() {
  isOpen.value = false;
  isMobileOpen.value = false;
  // router.push('/profile')
}

function logout() {
  isMobileOpen.value = false;
  // authStore.logout()
  // router.replace('/login')
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
