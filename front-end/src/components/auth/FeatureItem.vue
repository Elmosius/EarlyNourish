<script setup>
import { Check } from "lucide-vue-next";

defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center">
    <div class="rounded-full bg-white p-1 mr-3">
      <Check class="w-2 h-2 text-emerald-500 font-bold stroke-5" />
    </div>
    <span class="text-[0.9rem]">{{ text }}</span>
  </div>
</template>

<style scoped></style>
