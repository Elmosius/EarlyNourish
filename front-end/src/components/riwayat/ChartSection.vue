<script setup>
import { ref, computed, watch } from "vue";
import ChartTemplate from "../template/ChartTemplate.vue";

import { processHistoryData, getChartConfigurations } from "../../utils/chart";
import { CHART_TYPES, DEFAULT_CHART } from "../../utils/chart-config";

const props = defineProps({
  historyData: {
    type: Array,
    default: () => [],
  },
});

const selectedChart = ref(DEFAULT_CHART);

const processedHistoryData = computed(() => {
  return processHistoryData(props.historyData);
});

const chartConfigurations = computed(() => {
  return getChartConfigurations(processedHistoryData.value);
});

const currentChartConfig = computed(() => {
  const config = chartConfigurations.value[selectedChart.value];
  return config;
});

const hasValidData = computed(() => {
  return processedHistoryData.value.riskData.length > 0;
});

watch(
  () => props.historyData,
  (newData) => {
    console.log("History data changed:", newData);
  },
  { deep: true },
);

watch(selectedChart, (newChart) => {
  console.log("Selected chart changed:", newChart);
});
</script>

<template>
  <section class="px-8 md:px-14 lg:px-38">
    <div class="container mx-auto max-w-4xl">
      <div class="bg-white rounded-xl shadow-xl p-6 mb-6">
        <h2 class="font-bold text-gray-800 mb-3">Pilih Jenis Grafik</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            v-for="chartType in CHART_TYPES"
            :key="chartType.id"
            @click="selectedChart = chartType.id"
            :class="[
              'flex items-center gap-3 p-3 border-2 rounded-lg transition-colors',
              selectedChart === chartType.id
                ? 'bg-secondary text-white border-secondary'
                : 'bg-white text-gray-700 border-gray-300 hover:border-quaternary',
            ]"
          >
            <component :is="chartType.icon" class="h-5 w-5" />
            <div class="text-left">
              <div class="font-medium text-base md:text-sm">
                {{ chartType.title }}
              </div>
              <div class="text-xs opacity-75">
                {{ chartType.description }}
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Chart Display -->
      <ChartTemplate
        v-if="hasValidData && currentChartConfig?.data"
        :title="currentChartConfig.title"
        :template="selectedChart"
        :data="currentChartConfig.data"
      />

      <!-- No Data Message -->
      <div v-else class="bg-white rounded-xl shadow-xl p-6 text-center">
        <div class="text-gray-400 mb-4">
          <svg
            class="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">Tidak Ada Data</h3>
        <p class="text-gray-500">
          Belum ada riwayat pemeriksaan untuk ditampilkan dalam grafik.
        </p>
        <p class="text-sm text-gray-400 mt-2">
          Lakukan pemeriksaan pertama untuk melihat grafik perkembangan anak.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.transition-colors {
  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}
</style>
