<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <p class="text-red-500 text-xs mt-1">{{ message }}</p>
</template>
