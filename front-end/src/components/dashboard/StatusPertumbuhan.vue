<script setup>
defineProps({
  growthStatuses: {
    type: Array,
    default: () => [
      {
        name: "Tinggi Berdasarkan Umur",
        value: "x",
        percentage: 75,
        color: "yellow",
      },
      {
        name: "Berat Berdasarkan Umur",
        value: "x",
        percentage: 65,
        color: "red",
      },
      {
        name: "Berat Berdasarkan Tinggi",
        value: "x",
        percentage: 85,
        color: "green",
      },
      {
        name: "Lingkar Kepala",
        value: "x",
        percentage: 90,
        color: "green",
      },
    ],
  },
});

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
    <div class="bg-white rounded-xl shadow-xl mb-4 p-6">
      <h2 class="font-bold text-gray-800 mb-3">Status Pertumbuhan</h2>

      <div v-for="status in growthStatuses" :key="status.name" class="mb-3 p-1">
        <div class="flex justify-between mb-1">
          <span class="text-base md:text-sm font-medium">
            {{ status.name }}
          </span>
          <span class="text-base md:text-sm font-medium text-tertiary">
            {{ status.value }}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div
            :class="getProgressBarClass(status.color)"
            class="h-2.5 rounded-full transition-all duration-300"
            :style="{ width: status.percentage + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>
