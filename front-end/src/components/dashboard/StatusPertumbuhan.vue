<script setup>
import { computed } from "vue";
import { whoCalculator } from "../../utils/who-calculator.js";

const props = defineProps({
  predictionData: {
    type: Object,
    default: null,
  },
});

// Process Z-scores dari API dengan progress bar yang benar
const processedStatuses = computed(() => {
  if (!props.predictionData?.zScores) {
    // Fallback data untuk testing
    return [
      {
        name: "Tinggi Berdasarkan Umur",
        value: 0,
        color: "yellow",
        percentage: whoCalculator.getWHOZoneProgress(-1.5),
        healthStatus: whoCalculator.getHealthStatus(1.5),
      },
      {
        name: "Berat Berdasarkan Umur",
        value: 2.3,
        color: "red",
        percentage: whoCalculator.getWHOZoneProgress(2.3),
        healthStatus: whoCalculator.getHealthStatus(2.3),
      },
      {
        name: "Berat Berdasarkan Tinggi",
        value: 0.5,
        color: "green",
        percentage: whoCalculator.getWHOZoneProgress(0.5),
        healthStatus: whoCalculator.getHealthStatus(0.5),
      },
    ];
  }

  const zScores = props.predictionData.zScores;
  const results = [];

  const indicatorOrder = ["tb-u", "bb-u", "bb-tb"];

  indicatorOrder.forEach((indicator) => {
    if (zScores[indicator] !== undefined && zScores[indicator] !== null) {
      const zScore = parseFloat(zScores[indicator]);
      const interpretation = whoCalculator.interpretZScore(indicator, zScore);
      const detailed = whoCalculator.getDetailedInterpretation(
        indicator,
        zScore,
      );

      results.push({
        name: whoCalculator.getIndicatorName(indicator),
        value: zScore,
        status: interpretation,
        percentage: detailed.percentage,
        recommendation: detailed.recommendation,
      });
    }
  });

  return results;
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

const getProgressColorByPercentage = (percentage) => {
  if (percentage >= 80) return "bg-green-500";
  if (percentage >= 50) return "bg-yellow-500";
  return "bg-red-500";
};
</script>

<template>
  <section class="px-8 py-3 md:px-14 lg:px-38">
    <div
      class="container mx-auto max-w-4xl bg-white rounded-xl shadow-xl mb-4 p-6"
    >
      <h2 class="font-bold text-gray-800 mb-3">Status Pertumbuhan</h2>

      <div class="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p class="text-xs text-blue-700">
          <strong>Target Patokan:</strong> Z-score = 0 (ideal). Progress bar
          menunjukkan seberapa dekat dengan target ideal WHO.
        </p>
      </div>

      <div v-for="status in processedStatuses" :key="status.name" class="mb-6">
        <div class="flex justify-between mb-2">
          <span class="text-base md:text-sm font-medium">
            {{ status.name }}
          </span>
          <span class="text-base md:text-sm font-medium text-tertiary">
            {{ status.value }} SD
          </span>
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
          <span class="text-gray-600"
            >Status Kesehatan: {{ status.healthStatus }}</span
          >
          <span class="text-xs font-medium text-gray-700"
            >{{ status.percentage }}%</span
          >
        </div>
      </div>

      <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 class="font-semibold text-blue-800 mb-2 text-base">
          Skala Penilaian Progress:
        </h3>
        <div class="text-xs text-blue-700 space-y-1">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-4 h-2 bg-green-500 rounded mr-2"></div>
              <span>Sangat Baik (80-100%)</span>
            </div>
            <span>Z-score: -1 hingga +1</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-4 h-2 bg-yellow-500 rounded mr-2"></div>
              <span>Perlu Perhatian (50-80%)</span>
            </div>
            <span>Z-score: -2 hingga -1 atau +1 hingga +2</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-4 h-2 bg-red-500 rounded mr-2"></div>
              <span>Perlu Tindakan (0-50%)</span>
            </div>
            <span>Z-score: < -2 atau > +2</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
