<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="mb-3 ml-3 block text-md font-semibold text-app"
    >
      {{ label }}
    </label>

    <div class="relative w-full">
      <input
        :id="id"
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :autocomplete="autocomplete"
        class="w-full rounded-xl p-4 text-md outline-none transition-colors duration-200 placeholder-app focus:ring-1"
        :class="[
          disabled
            ? 'cursor-not-allowed bg-input-disabled text-input-disabled'
            : 'bg-input text-app',
          isPassword ? 'pr-14' : '',
        ]"
        @input="handleInput"
      />

      <button
        v-if="isPassword"
        type="button"
        class="absolute top-1/2 right-4 -translate-y-1/2 text-secondary hover:cursor-pointer"
        :disabled="disabled"
        @click="togglePasswordVisibility"
      >
        <EyeOff v-if="!showPassword" :size="20" />
        <Eye v-else :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
});

const emit = defineEmits(['update:modelValue']);

const showPassword = ref(false);

const isPassword = computed(() => props.type === 'password');

const inputType = computed(() => {
  if (isPassword.value) {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

const handleInput = (e) => {
  emit('update:modelValue', e.target.value);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped></style>
