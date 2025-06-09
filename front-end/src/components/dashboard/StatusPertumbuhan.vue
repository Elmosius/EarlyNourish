<script setup>
import { computed } from "vue";

const props = defineProps({
  growthStatuses: {
    type: Array,
    default: () => [
      { name: "Tinggi Berdasarkan Umur", value: -1.5, color: "yellow" },
      { name: "Berat Berdasarkan Umur", value: 2.3, color: "red" },
      { name: "Berat Berdasarkan Tinggi", value: 0.5, color: "green" },
    ],
  },
});

function zScoreToPercent(z) {
  if (z <= -2) return 0;
  if (z >= 2) return 100;
  return ((z + 2) / 4) * 100;
}

function getGrowthCategory(z) {
  if (z < -2) return "Pertumbuhan terhambat";
  if (z > 2) return "Pertumbuhan lebih";
  return "Pertumbuhan normal";
}

// bangun array baru dengan percentage & category
const computedStatuses = computed(() =>
  props.growthStatuses.map((s) => ({
    ...s,
    percentage: Math.round(zScoreToPercent(s.value)),
    category: getGrowthCategory(s.value),
  })),
);

const getProgressBarClass = (color) => {
  switch (color) {
    case "yellow":
      return "bg-yellow-500";
    case "green":
      return "bg-secondary";
    case "red":
      return "bg-red-500";
    default:
      return "bg-secondary";
  }
};
</script>

<template>
  <section class="px-8 py-3 md:px-14 lg:px-38">
    <div
      class="container mx-auto max-w-4xl bg-white rounded-xl shadow-xl mb-4 p-6"
    >
      <h2 class="font-bold text-gray-800 mb-3">Status Pertumbuhan</h2>

      <div v-for="status in computedStatuses" :key="status.name" class="mb-4">
        <div class="flex justify-between mb-1">
          <span class="text-base md:text-sm font-medium">{{
            status.name
          }}</span>
          <span class="text-base md:text-sm font-medium text-tertiary">
            {{ status.value }} SD
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div
            :class="getProgressBarClass(status.color)"
            class="h-2.5 rounded-full transition-all duration-300"
            :style="{ width: status.percentage + '%' }"
          ></div>
        </div>
        <p class="text-sm text-gray-600 mt-1">{{ status.category }}</p>
      </div>
    </div>
  </section>
</template>
