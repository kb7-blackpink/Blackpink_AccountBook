<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="mb-3 ml-3 block text-md font-semibold text-black"
    >
      {{ label }}
    </label>

    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :autocomplete="autocomplete"
      class="w-full rounded-xl bg-[#F4F4F4] p-4 text-md text-black outline-none transition-colors duration-200 placeholder:text-[#868686] focus:border focus:border-black"
      :class="disabled ? 'cursor-not-allowed bg-[#F3F3F3] text-[#A0A0A0]' : ''"
      @input="handleInput"
    />
  </div>
</template>

<script setup>
defineProps({
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

const handleInput = (e) => {
  emit('update:modelValue', e.target.value);
};
</script>

<style scoped></style>
