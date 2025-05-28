<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  rows: {
    type: Number,
    default: 3,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block text-gray-700 mb-1 text-base font-semibold"
      >{{ label }}</label
    >
    <textarea
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :rows="rows"
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-tertiary text-base resize-none bg-white"
      :required="required"
    ></textarea>
  </div>
</template>
