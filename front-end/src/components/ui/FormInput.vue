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
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  step: {
    type: [String, Number],
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: true,
  },
  autocomplete: {
    type: String,
    default: "off",
  },
  readonly: {
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
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-tertiary text-base bg-white"
      :step="type === 'number' ? step : null"
      :required="required"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :readonly="readonly"
    />
  </div>
</template>
