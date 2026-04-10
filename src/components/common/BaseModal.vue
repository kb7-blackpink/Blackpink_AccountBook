<template>
  <div
    v-if="open"
    class="fixed inset-0 z-1100 flex items-center justify-center bg-black/30 backdrop-blur-[3px] px-4"
  >
    <div
      class="bg-app border-app relative w-full max-w-[420px] rounded-2xl border shadow-lg"
    >
      <div class="flex justify-end px-6 pt-6">
        <button
          class="text-app-soft right-4 text-2xl font-bold transition hover:opacity-70 cursor-pointer"
          @click="handleCancel"
        >
          ×
        </button>
      </div>

      <!-- 내용 -->
      <div class="px-6 pt-3 pb-8 text-center">
        <h2
          class="text-app text-lg font-semibold sm:text-xl whitespace-pre-line"
        >
          {{ message }}
        </h2>
      </div>

      <!-- 버튼 -->
      <div class="flex gap-3 px-6 pb-6">
        <!-- 2버튼 -->
        <template v-if="variant === 'confirm-cancel'">
          <button
            class="bg-delete text-on-dark flex-1 rounded-xl py-3 text-sm font-semibold transition hover:opacity-90 cursor-pointer"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </button>

          <button
            class="bg-cancel text-on-dark flex-1 rounded-xl py-3 text-sm font-semibold transition hover:opacity-90 cursor-pointer"
            @click="handleCancel"
          >
            {{ cancelText }}
          </button>
        </template>

        <!-- 1버튼 -->
        <template v-else>
          <button
            class="bg-primary text-on-dark w-full rounded-xl py-3 text-sm font-semibold transition hover:opacity-90 cursor-pointer"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  open: Boolean,
  message: String,
  confirmText: String,
  cancelText: String,
  variant: String,
});

const emit = defineEmits(['confirm', 'cancel']);

const handleConfirm = () => emit('confirm');
const handleCancel = () => emit('cancel');
</script>
