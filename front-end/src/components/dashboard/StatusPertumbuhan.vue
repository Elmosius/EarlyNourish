<script setup>
import { computed } from "vue";
import {
  getProgressColorByPercentage,
  getStatusColorClass,
  processGrowthStatuses,
} from "../../utils/status.js";

const { predictionData } = defineProps({
  predictionData: {
    type: Object,
    default: null,
  },
});

const processedStatuses = computed(() => {
  return processGrowthStatuses(predictionData);
});
</script>

<template>
  <section class="px-8 py-3 md:px-14 lg:px-38">
    <div
      class="container mx-auto max-w-4xl bg-white rounded-xl shadow-xl mb-4 p-6"
    >
      <h2 class="font-bold text-gray-800 mb-3">Status Pertumbuhan</h2>

      <div v-for="status in processedStatuses" :key="status.name" class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <span class="text-base md:text-sm font-medium">
            {{ status.name }}
          </span>
          <div class="flex items-center space-x-2">
            <span class="text-xs font-medium text-tertiary">
              {{ status.value.toFixed(2) }} SD
            </span>
            <span
              :class="getStatusColorClass(status.color)"
              class="px-2 py-1 rounded-full text-xs font-medium"
            >
              {{ status.status }}
            </span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            :class="getProgressColorByPercentage(status.percentage)"
            class="h-3 rounded-full transition-all duration-300 relative"
            :style="{ width: status.percentage + '%' }"
          ></div>
        </div>

        <!-- Status Info -->
        <div class="flex justify-between text-sm mb-1">
          <span class="text-gray-600 text-xs">
            Status Kesehatan: {{ status.healthStatus }}
          </span>
          <span class="text-xs font-medium text-gray-700">
            {{ status.percentage }}%
          </span>
        </div>
      </div>

      <div class="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p class="text-xs text-blue-700">
          <strong>Target Patokan:</strong> Z-score = 0 (ideal). Progress bar
          menunjukkan seberapa dekat dengan target ideal WHO.
        </p>
      </div>
    </div>
  </section>
</template>
