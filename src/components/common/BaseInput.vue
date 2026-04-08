<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="ml-3 mb-3 block text-xl font-semibold text-black"
    >
      {{ label }}
    </label>

    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      class="w-full rounded-[20px] p-6 bg-[#F4F4F4] text-xl text-black outline-none transition-colors duration-200 placeholder:text-[#868686] focus:border focus:border-black"
      :class="disabled ? 'cursor-not-allowed bg-[#F3F3F3] text-[#A0A0A0]' : ''"
      :disabled="disabled"
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
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (e) => {
  emit('update:modelValue', e.target.value);
};
</script>

<style scoped></style>
