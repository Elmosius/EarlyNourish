<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="mb-4 p-3 text-xs md:text-base bg-primary text-tertiary rounded">
    {{ message }}
  </div>
</template>
